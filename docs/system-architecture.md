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

All routes are **static HTML** — served as pre-rendered static assets via Cloudflare Workers + OpenNext.

## Multi-CTV Personalization

### Overview
Per-subdomain content personalization for CTV (Customer/Partner) partners. Each CTV gets a branded subdomain (e.g., `ainguyen.vnting.com`) with personalized Zalo group link, Zalo personal link, and QR code image. Root domain (`vnting.com`) and unknown hosts serve default content. Static config, no database.

### Data Flow
```
HTTP Request (Host header: ainguyen.vnting.com)
        ↓
[Middleware] src/middleware.ts
  ├─ Extract Host header
  ├─ resolveCtvId(host) → "ainguyen" or "default"
  ├─ Resolve CtvConfig from CTV_MAP
  └─ Attach headers: x-ctv-id, x-ctv-path
        ↓
[Server Components] src/lib/ctv-server.ts
  ├─ getCtvConfig() — reads x-ctv-id header
  └─ Returns CtvConfig (zaloGroupLink, zaloPersonalLink, qrImage)
        ↓
[Client Components] src/lib/ctv-context.tsx
  ├─ CtvProvider wraps layout
  ├─ useCtv() hook → CtvConfig
  └─ Components render personalized links/QR
```

### Configuration
- **File:** `src/lib/ctv-config.ts`
- **Structure:** `CTV_MAP: Record<hostname, CtvConfig>`
  ```typescript
  export const CTV_MAP: Record<string, CtvConfig> = {
    // "ainguyen.vnting.com": { zaloGroupLink: "...", zaloPersonalLink: "...", qrImage: "/images/ctv/ainguyen/qr.jpg" },
  };
  ```
- **QR Asset Convention:** `public/images/ctv/{slug}/qr.jpg`
- **Deployment:** Static config only; no runtime DB queries

### SEO Handling
- **Default host** (`vnting.com`): Normal metadata, indexable
- **CTV host** (subdomain): Add `robots: {index: false, follow: true}` + `alternates.canonical: https://vnting.com{path}`
  - Prevents subdomain indexing, signals canonical to default domain
  - Implemented in `src/app/layout.tsx` via `getCtvMeta()`

### Dynamic Rendering Requirement (Critical)
**All routes rendering CTV-consuming components MUST explicitly set `export const dynamic = "force-dynamic"` at the page level.**

Rationale: Even if root layout calls `headers()` (which forces dynamic), child pages with `generateStaticParams` or explicit static overrides will bake in DEFAULT_CTV at BUILD time, ignoring the actual request's Host header.

Affected pages:
- `src/app/page.tsx` (homepage)
- `src/app/blogs/page.tsx` (blog listing)
- `src/app/blogs/phuot-ha-noi-da-nang/page.tsx` (featured blog)
- `src/app/blogs/[slug]/page.tsx` (blog detail)

**Future page additions:** If the page uses `useCtv()` or `getCtvConfig()`, add `export const dynamic = "force-dynamic"`.

### Onboarding a New CTV (Ops Runbook)

#### Prerequisites
- CTV subdomain must be under `vnting.com` OR on a separate domain (see step 4)
- QR code image ready (JPG recommended, e.g., 300x300px)
- Zalo group and personal links finalized

#### Steps

**1. Prepare QR Asset**
```bash
# Create CTV asset directory
mkdir -p public/images/ctv/{slug}
# Add QR image
cp {local-qr-path}.jpg public/images/ctv/{slug}/qr.jpg
```

**2. Update CTV Config**
Edit `src/lib/ctv-config.ts`:
```typescript
export const CTV_MAP: Record<string, CtvConfig> = {
  "ainguyen.vnting.com": {
    zaloGroupLink: "https://zalo.me/g/...",
    zaloPersonalLink: "https://zalo.me/...",
    qrImage: "/images/ctv/ainguyen/qr.jpg"
  }
};
```

**3. Deploy Code Changes**
```bash
npm run build          # Verify no errors
npm run preview        # Test locally: curl -H "Host: ainguyen.vnting.com" http://localhost:3000
git commit -m "feat: add CTV ainguyen"
git push origin main
```
Worker will auto-redeploy via CI/CD.

**4a. Add Subdomain (vnting.com subdomain)**
If CTV subdomain is under `vnting.com` (typical case):
- **Cloudflare Dashboard** → Domains → `vnting.com` → DNS
- Add DNS record: `A` or `CNAME` pointing to Worker
  - For auto-domain provisioning: Workers & Pages → [this worker] → Settings → Domains & Routes → Add custom domain
  - Enter `ainguyen.vnting.com` — Cloudflare auto-creates DNS record + provisions SSL
- SSL/TLS should auto-provision (verify in SSL/TLS tab after ~5min)

**4b. Add External Domain (different registrar/account)**
If CTV owns their own domain or uses a different Cloudflare account:
- **Operator decision required:** Confirm account topology
  - **Same Cloudflare account, different zone:** Add the domain to this account's Workers & Pages settings
  - **Different Cloudflare account:** CTV's provider must point their DNS at Cloudflare, add the domain to their own Cloudflare account, then create a Route (not custom domain) in this Worker for their domain
  - **Non-Cloudflare registrar:** Add a Route in Workers settings pointing to their domain (requires DNS CNAME setup on their end)

**5. Test in Production**
```bash
# From terminal or via curl command:
curl -H "Host: ainguyen.vnting.com" https://vnting.com/

# Check response:
# - x-ctv-id header present in request (internal)
# - Zalo links point to ainguyen's group/personal
# - QR image loads from /images/ctv/ainguyen/qr.jpg
# - SEO: robots noindex should be present
# - Canonical: https://vnting.com/
```

#### Rollback
```bash
# Remove CTV config entry from src/lib/ctv-config.ts
# Remove public/images/ctv/{slug}/ directory
git commit -m "chore: remove CTV {slug}"
git push origin main
```

### Build & Deployment
- **Build time:** Static assets only; no runtime data fetching
- **Middleware:** Runs at request time on Cloudflare Workers (OpenNext runtime)
- **Server Components:** Async `getCtvConfig()` reads request headers per-request
- **Client Components:** `CtvProvider` passes `DEFAULT_CTV` by default; server-side hydration overrides if needed
- **CDN:** Cloudflare caches static HTML per subdomain (Host-based cache key)

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
