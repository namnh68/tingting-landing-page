# System Architecture

## Overview

Ting Ting Landing Page is a static-first Next.js 15 application with SSG (Static Site Generation) and blog functionality.

## Core Architecture Patterns

### Static Generation (SSG)
- **Home page** (`/`): Pre-rendered static HTML at build time
- **Blog listing** (`/bai-viet`): Static list of published posts
- **Blog detail** (`/bai-viet/[slug]`): Pre-rendered for each post via `generateStaticParams()`
- **Dynamic routes**: Auto-generated from `content/posts/*.mdx` filenames

### Content System
```
content/posts/
├── *.mdx              # Markdown with frontmatter (YAML)
│   ├── title
│   ├── description
│   ├── date
│   ├── slug
│   ├── tags
│   └── published (boolean)
```

**Processing flow:**
1. `src/lib/posts.ts`: Read `.mdx` files, parse frontmatter (gray-matter)
2. Filter by `published: true`
3. Sort by date (newest first)
4. Render MDX → HTML via `next-mdx-remote`

### Directory Structure

```
src/
├── app/
│   ├── page.tsx                    # Home (landing page)
│   ├── bai-viet/
│   │   ├── page.tsx               # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx           # Blog detail (SSG)
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                # Tailwind v4 + dark mode
│   ├── sitemap.ts                 # Dynamic sitemap
│   └── robots.ts                  # robots.txt
├── components/
│   ├── bai-viet-card.tsx          # Blog card (list view)
│   ├── bai-viet-preview.tsx       # (Reserved for future)
│   ├── header.tsx                 # Navigation + theme toggle
│   ├── hero.tsx                   # Hero section
│   ├── footer.tsx                 # Footer
│   └── [other sections]
├── hooks/
│   └── use-counter.ts             # Animated counter
└── lib/
    ├── posts.ts                   # Blog post utilities
    └── constants.ts               # Content: stats, FAQ, nav, testimonials

content/
└── posts/
    ├── *.mdx                      # Blog posts (markdown + JSX)
    └── [post frontmatter]

public/
├── qr-code.jpg
├── og-image.png
└── images/
```

## Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 | SSG, routing, image optimization |
| **UI** | React 19 | Components |
| **Styling** | Tailwind CSS v4 | CSS-first styling + dark mode |
| **Blog** | gray-matter | Parse YAML frontmatter |
| **MDX** | next-mdx-remote | Render markdown + JSX |
| **Typography** | @tailwindcss/typography | Prose styles for blog content |
| **Animations** | Framer Motion 11 | Scroll reveal, stagger |
| **Theme** | next-themes | Dark/light mode (class strategy) |
| **Icons** | react-icons 5 | UI icons |

## Routing

### Static Routes
- `/` → Home (landing page)
- `/robots.txt` → Generated at build
- `/sitemap.xml` → Generated at build (includes blog routes)

### Dynamic Routes
- `/bai-viet` → Blog listing (SSG)
- `/bai-viet/[slug]` → Blog detail (SSG per post)

**Dynamic params generated via `generateStaticParams()`** from published posts.

## SEO & Meta Tags

### Home Page
- Open Graph (og:title, og:description, og:image)
- Standard meta tags
- JSON-LD for Schema.org

### Blog Listing (`/bai-viet`)
- Page-level metadata with Open Graph
- Meta description with blog focus keywords

### Blog Detail (`/bai-viet/[slug]`)
- **Post-level metadata** from frontmatter
- Open Graph (article type, publishedTime)
- **Canonical URL** to prevent duplicates
- **JSON-LD Article schema** with headline, description, date, author, keywords
- Breadcrumb navigation

## Dark Mode Implementation

**Strategy:** Class-based (not system-dependent)
- Managed by `next-themes`
- Toggle in header
- Classes: `dark:` prefix for dark styles
- Default: light mode

## Build Output

```
Route           Size    First Load JS
/               48 kB   150 kB
/robots.txt     124 B   102 kB
/sitemap.xml    124 B   102 kB
/bai-viet       (SSG)   -
/bai-viet/[slug] (SSG) -
```

All routes are **static HTML** (output: "export").

## Performance Considerations

- **Image optimization:** Next.js Image component with Tailwind breakpoints
- **Bundle splitting:** Minimal JS per route
- **Font optimization:** Be Vietnam Pro (Google Fonts, preload)
- **CSS:** Tailwind v4 with tree-shaking
- **Animations:** Framer Motion with GPU acceleration

## Data Flow (Blog)

```
content/posts/*.mdx
        ↓
  fs.readFileSync
        ↓
  gray-matter (parse frontmatter)
        ↓
  PostFrontmatter interface
        ↓
  Filter (published: true)
        ↓
  Sort (by date, descending)
        ↓
  BaiVietCard or BaiVietDetailPage
        ↓
  next-mdx-remote (render MDX)
        ↓
  HTML
```

## Error Handling

- **Invalid post slug:** `notFound()` triggers 404 page
- **Missing content directory:** `getAllPosts()` returns empty array
- **Unpublished posts:** Filtered out at read time, not displayed

## Future Considerations

- **Categories/filtering:** Extend TagList
- **Search:** Algolia or Meilisearch
- **Comments:** Giscus or Utterances
- **Related posts:** Algorithm based on tags
- **Reading progress:** Client-side scroll indicator
- **Analytics:** Vercel Analytics or Plausible
