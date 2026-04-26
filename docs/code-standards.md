# Code Standards & Codebase Structure

## TypeScript & Type Safety

- **Target:** ES2020, Module resolution: bundler
- **Strict mode:** Enabled (`strict: true`)
- All components and utilities must be **fully typed**

### Type Naming Conventions
```typescript
// Interfaces/Types
interface PostFrontmatter { ... }
interface BaiVietCardProps { ... }

// Enums
enum ThemeMode { Light = "light", Dark = "dark" }

// Utility types
type Post = { frontmatter: PostFrontmatter; content: string }
```

## Component Structure

### Naming
- **PascalCase** for component files: `Header.tsx`, `BaiVietCard.tsx`
- **Props interface:** `{ComponentName}Props`

### Layout
```typescript
interface HeaderProps {
  /* Props defined inline or from constants */
}

export function Header({ prop }: HeaderProps) {
  return (
    {/* JSX */}
  )
}
```

### Props
- Destructure props inline
- Define types with `interface {ComponentName}Props`
- Keep props focused and minimal

## Styling

### Tailwind CSS v4 (CSS-first)
- **Global tokens:** `src/app/globals.css` (@theme, @dark)
- **Utility-first:** Prefer utility classes over CSS modules
- **Dark mode:** `dark:` prefix (class strategy, not system)
- **Custom utilities:** In `globals.css` @layer utilities

### Color System
```css
Light theme:
  - Text primary: text-text-primary
  - Background: bg-white
  - Accent: text-brand-orange (#FF6B35)

Dark theme:
  - Text: dark:text-white, dark:text-gray-300
  - Background: dark:bg-dark-secondary (#1E293B)
  - Accent: dark:text-brand-yellow
```

### Responsive Design
- **Mobile-first** approach
- Breakpoints: `sm`, `md`, `lg`
- Example: `text-xl sm:text-2xl md:text-3xl`

## File Organization

### Root Directories
```
src/
├── app/                      # Next.js App Router
├── components/               # React components
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities, types, constants
├── types/ (optional)         # Shared types (if many)

content/                      # Blog posts & assets
public/                       # Static assets (QR, OG image)
```

### Utilities & Constants

**`src/lib/constants.ts`**
- Navigation items
- Stats, testimonials, FAQ
- Content arrays (no secret keys)

**`src/lib/posts.ts`**
- `getAllPosts()` — fetch + sort all published posts
- `getPostBySlug(slug)` — fetch single post
- `PostFrontmatter` interface
- Helper: `calcReadingTime()`

## Blog System

### Post Frontmatter (YAML)
```yaml
---
title: "Post Title"
description: "Short description (used in previews & meta)"
date: "2026-04-26"
slug: "kebab-case-url"
tags: ["tag1", "tag2"]
published: true/false
---
```

### Reading Time Calculation
- Formula: `words / 200` (rounded up, minimum 1 minute)
- Calculated on demand in `calcReadingTime()`

### MDX Rendering
- Files in `content/posts/*.mdx`
- Parsed with **gray-matter** (YAML frontmatter)
- Rendered with **next-mdx-remote** (server-side)
- Prose styles via `@tailwindcss/typography`

## Routing & SSG

### Dynamic Static Generation
```typescript
// Declare static params
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

// Generate metadata per route
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post.frontmatter.title, ... }
}

// Page component
export default async function Page({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <article>{/* content */}</article>
}
```

## JSON-LD Structured Data

### Article Schema (Blog Detail)
```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  author: { "@type": "Organization", name: "Ting Ting" },
  publisher: { "@type": "Organization", name: "Ting Ting", url: SITE_URL },
  url: canonicalUrl,
  keywords: tags.join(", ")
};
```

Inject via `<script type="application/ld+json" dangerouslySetInnerHTML />`

## Error Handling

### Not Found
```typescript
import { notFound } from "next/navigation";

if (!post) notFound(); // Triggers 404 page
```

### Graceful Degradation
```typescript
export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return []; // Empty if missing
  // ...
}
```

## Code Patterns

### Conditional Classes
```typescript
className={`base-classes ${condition ? "active" : "inactive"}`}

// Or for complex logic:
const classes = cn(
  "base",
  condition && "conditional",
  status === "active" && "active"
);
```

### Fragments & Keys
```typescript
// Use keys for list rendering
posts.map(post => (
  <BaiVietCard key={post.slug} post={post} />
))

// Fragments for grouping
<>
  <Header />
  <Main />
  <Footer />
</>
```

## Date Formatting

### Locale-specific (Vietnamese)
```typescript
const formattedDate = new Date(post.date)
  .toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
// Output: "26/04/2026"
```

## Testing

- **Unit tests:** Jest (configured via `tsconfig.json`)
- **E2E tests:** Playwright (recommended)
- **Test file naming:** `{component}.test.tsx` or `{util}.test.ts`

## Performance Optimization

### Image Optimization
- Use Next.js `Image` component
- Provide `alt` attribute
- Set `width`/`height` for layout stability

### Code Splitting
- Dynamic imports for heavy components: `const Comp = dynamic(() => import(...))`
- Tree-shake unused utilities from Tailwind

### Bundle Size
- Monitor via `next/bundle-analyzer` if needed
- Keep components focused and composable

## Linting & Formatting

```bash
npm run lint  # ESLint (Next.js config)
npm run build # Type check + build
```

**Rules:**
- No `any` types (unless unavoidable)
- Unused variables: remove or prefix with `_`
- Consistent quotes: double quotes preferred

## Naming Conventions Summary

| Entity | Convention | Example |
|--------|-----------|---------|
| Files (Component) | PascalCase | `Header.tsx`, `BaiVietCard.tsx` |
| Files (Utility) | kebab-case | `use-counter.ts`, `posts.ts` |
| Functions | camelCase | `getAllPosts()`, `calcReadingTime()` |
| Constants | UPPER_SNAKE_CASE | `POSTS_DIR`, `SITE_URL` |
| Interfaces | PascalCase | `PostFrontmatter`, `BaiVietCardProps` |
| CSS Classes | kebab-case | `text-primary`, `brand-orange` |
| URL Slugs | kebab-case | `/bai-viet`, `meo-mua-sam-shopee` |
| React Props | camelCase | `isActive`, `onClick`, `className` |

## Common Tasks

### Adding a New Blog Post
1. Create `content/posts/new-slug.mdx`
2. Add YAML frontmatter (title, description, date, slug, tags, published)
3. Write content in Markdown + optional JSX
4. Set `published: true` to make it visible
5. Build: `npm run build` (SSG generates route)

### Updating Navigation
1. Edit `src/lib/constants.ts` → `NAV_ITEMS`
2. Run linting: `npm run lint`
3. Build & test: `npm run build`

### Adding a New Section
1. Create component in `src/components/new-section.tsx`
2. Style with Tailwind + dark mode support
3. Add to `src/app/page.tsx`
4. Test dark/light modes

### Modifying Theme Colors
1. Edit `src/app/globals.css` (light & dark theme tokens)
2. Update Tailwind color utilities
3. Rebuild: `npm run build`

## Reserved Keywords

Do **not** use these as component names (Next.js reserved):
- `layout`, `page`, `loading`, `error`, `not-found`, `template`

These are special files in the `app/` directory.
