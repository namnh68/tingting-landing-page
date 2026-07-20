# Project Changelog

All notable changes to Ting Ting Landing Page are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.2.0] — 2026-07-20

### Added
- **Multi-CTV Personalization**
  - Per-subdomain content personalization (e.g., `ainguyen.vnting.com`)
  - Dynamic Zalo group link, Zalo personal link, and QR image resolution by request hostname
  - Static `CTV_MAP` configuration in `src/lib/ctv-config.ts` (no database)
  - Middleware request header forwarding (`x-ctv-id`, `x-ctv-path`)
  - Server component `getCtvConfig()` and `getCtvMeta()` for CTV resolution
  - Client context `CtvProvider` + `useCtv()` hook for component access
  - SEO handling: `robots: {index: false}` + canonical URL for CTV subdomains (root domain is canonical)
  - QR asset convention: `public/images/ctv/{slug}/qr.jpg`
  - Development override: `?ctv={hostname-key}` query parameter (development-only, tree-shaken in production)

- **Cloudflare Workers Integration**
  - Deployment platform confirmed as Cloudflare Workers via OpenNext
  - Custom domain provisioning flow documented (auto-DNS + SSL via Cloudflare dashboard)
  - External domain routing support (same Cloudflare account, different account, or non-Cloudflare registrar)

- **Dynamic Rendering Fix**
  - Explicit `export const dynamic = "force-dynamic"` added to all CTV-consuming routes to ensure per-request Host header resolution
  - Affected: `src/app/page.tsx`, `src/app/blogs/page.tsx`, `src/app/blogs/phuot-ha-noi-da-nang/page.tsx`, `src/app/blogs/[slug]/page.tsx`
  - **Critical rule:** Future pages using CTV components MUST set dynamic rendering to "force-dynamic"

### Changed
- `src/app/layout.tsx` — Now async, calls `getCtvConfig()` for per-request CTV resolution
- `src/app/layout.tsx` — Wraps children in `<CtvProvider>` for client-side CTV access
- `src/app/layout.tsx` — Metadata branches by CTV host (adds noindex + canonical for subdomains)
- 10 consumer components updated to use `getCtvConfig()` (server) or `useCtv()` (client)
- Hero QR code and final CTA QR code now use `ctv.qrImage` instead of hardcoded `/qr-code.jpg`
- `public/images/` structure extended: added `public/images/ctv/{slug}/` subdirectories for per-CTV QR images

### Fixed
- **Dynamic Rendering Bug:** Child pages with `generateStaticParams` now explicitly force dynamic rendering to prevent baking DEFAULT_CTV at build time

### Security
- Middleware dev-only query override (`?ctv=`) eliminated from production builds (tree-shaken via `NODE_ENV === "development"`)
- Subdomains marked non-indexable (`robots: {index: false}`) to prevent duplicate content indexing
- No sensitive data in static `CTV_MAP` configuration

---

## [0.1.0] — 2026-04-26

### Added
- **Blog System**
  - New blog listing page at `/bai-viet`
  - New blog detail page at `/bai-viet/[slug]` with SSG
  - MDX support via `next-mdx-remote` for rich content rendering
  - Frontmatter parsing with `gray-matter` (YAML metadata)
  - Reading time calculation (words ÷ 200, min 1 minute)
  - Tag support for posts (up to 2 tags displayed on card)
  - Dynamic metadata generation from post frontmatter
  - Open Graph tags for social sharing (article type)
  - JSON-LD Article schema for SEO (headline, date, author, keywords)
  - Breadcrumb navigation on detail pages
  - Vietnamese date formatting (DD/MM/YYYY)

- **New Components**
  - `BaiVietCard.tsx` — Blog post card with title, description, date, tags
  - `BaiVietPreview.tsx` — Reserved for future MDX preview component

- **New Utilities**
  - `src/lib/posts.ts` — Post management (getAllPosts, getPostBySlug, reading time)
  - `PostFrontmatter` interface — Type-safe frontmatter validation

- **Content Structure**
  - `content/posts/` directory for `.mdx` files
  - Example posts: "Mẹo mua sắm Shopee" & "Hướng dẫn hoàn tiền TikTok Shop"
  - Frontmatter schema: title, description, date, slug, tags, published

- **Navigation Updates**
  - Added "Bài viết" (Blog) link to header navigation
  - Updated `NAV_ITEMS` in constants with blog link

- **SEO Enhancements**
  - Dynamic sitemap includes blog routes (`/bai-viet`, `/bai-viet/[slug]`)
  - Open Graph support for blog posts
  - Canonical URLs on blog detail pages
  - JSON-LD structured data for Article type

- **Dependencies**
  - `gray-matter@4.0.3` — YAML frontmatter parsing
  - `next-mdx-remote@6.0.0` — Server-side MDX rendering
  - `@tailwindcss/typography@0.5.19` — Prose styles for blog content

### Changed
- `src/app/page.tsx` — Updated import to match new blog structure
- `src/lib/constants.ts` — Added blog link to `NAV_ITEMS`
- `src/app/sitemap.ts` — Includes dynamically generated blog routes
- `src/app/globals.css` — Enhanced typography with Tailwind prose classes
- `package.json` — Updated dependencies (see Added section)

### Fixed
- N/A (first release with blog)

### Security
- No API keys or secrets in repository
- Static export eliminates backend security concerns
- Content served from Vercel CDN (HTTPS enforced)

---

## [0.0.1] — 2026-04-24 (Pre-blog Release)

### Added
- Initial landing page with sections:
  - Hero (headline, CTA, QR code)
  - Social proof (animated counters)
  - How-it-works (3-step process)
  - Comparison table (desktop) / cards (mobile)
  - Testimonials carousel (auto-scroll)
  - FAQ accordion
  - Promotion highlights (3 benefits)
  - Final CTA with large QR code
  - Footer with links & disclaimer

- **Components**
  - Header with navigation, theme toggle, CTA button
  - Footer with social links & copyright
  - ScrollReveal wrapper for Framer Motion animations
  - ThemeProvider for dark/light mode (next-themes)
  - ThemeToggle button

- **Styling & Theme**
  - Tailwind CSS v4 (CSS-first)
  - Dark/light mode support (class strategy)
  - Custom color system (brand-orange, brand-yellow)
  - Responsive breakpoints (sm, md)
  - Global utilities in `globals.css`

- **SEO & Meta Tags**
  - Open Graph image (og-image.png)
  - Metadata in root layout
  - robots.txt and sitemap.xml auto-generation

- **Deployment**
  - Vercel deployment pipeline
  - Static export configuration
  - Cloudflare Workers support (OpenNext)

- **Development Tools**
  - TypeScript strict mode
  - ESLint configuration
  - Turbopack for dev server
  - Build optimization

### Dependencies
```json
{
  "react": "^19.0.0",
  "next": "^15.3.0",
  "typescript": "^5",
  "tailwindcss": "^4.0.0",
  "framer-motion": "^11.0.0",
  "next-themes": "^0.4.6",
  "react-icons": "^5.4.0"
}
```

### Configuration
- `next.config.ts` — Static export output
- `tailwind.config.ts` — Custom color tokens, dark mode
- `tsconfig.json` — Strict mode, path aliases
- `wrangler.jsonc` — Cloudflare Workers config

---

## Migration Guide

### From v0.0.1 to v0.1.0

#### Blog System Adoption
1. **Create blog posts:**
   ```bash
   mkdir -p content/posts
   # Add .mdx files with YAML frontmatter
   ```

2. **Update navigation:**
   - Blog link already added to `NAV_ITEMS`
   - Header automatically reflects new link

3. **No breaking changes:**
   - Home page unchanged
   - All existing styles compatible
   - Static export still works

#### For Content Creators
- Place post files in `content/posts/filename.mdx`
- Required frontmatter: title, description, date, slug, tags, published
- Markdown + JSX supported
- Build command triggers SSG for new routes

---

## Known Issues & Workarounds

### v0.1.0
- **Issue:** Blog comments not yet implemented
  - **Workaround:** Direct feedback via Zalo group
  - **Target Fix:** v0.2.0 (Giscus integration)

- **Issue:** Blog search not available
  - **Workaround:** Manual navigation via tags & date
  - **Target Fix:** v0.2.0 (Algolia/Meilisearch)

---

## Deployment History

### Production Deployments
| Date | Version | Platform | Notes |
|------|---------|----------|-------|
| 2026-04-26 | 0.1.0 | Vercel | Blog system + MDX support |
| 2026-04-24 | 0.0.1 | Vercel | Initial landing page |

### Preview URLs
- Main: https://tingting.vercel.app
- Staging: Auto-generated on PRs

---

## Performance Metrics

### v0.1.0 (Blog Release)
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Lighthouse (Mobile) | > 80 | TBD | Pending audit |
| Lighthouse (Desktop) | > 85 | TBD | Pending audit |
| Page Load (4G) | < 3s | TBD | Pending audit |
| CLS | < 0.1 | TBD | Pending audit |
| Blog Route Count | 2+ | 2 | ✅ |
| Build Time | < 60s | TBD | Pending build |

---

## Contributors & Credits

- **Nam Nguyen (namnh68)** — Tech Lead, blog implementation
- **Design System** — Tailwind CSS v4
- **Animation Library** — Framer Motion
- **Content Format** — Next.js + MDX + gray-matter

---

## Release Notes

### v0.1.0 Highlights
- ✅ **Full blog system** with MDX support
- ✅ **SEO-optimized** with JSON-LD schemas
- ✅ **SSG** for fast static delivery
- ✅ **No breaking changes** from v0.0.1
- ✅ **Ready for content publishing**

### Testing Checklist Before Release
- [x] Blog listing page renders correctly
- [x] Blog detail page renders MDX
- [x] Metadata generated from frontmatter
- [x] SSG builds without errors
- [x] Dark/light mode works on blog pages
- [x] Mobile responsive (tested at 320px+)
- [x] Sitemap includes blog routes
- [x] TypeScript compiles (zero errors)
- [x] ESLint passes
- [x] Manual QA on Chrome, Safari, Firefox

---

## Support & Questions

For issues or questions:
1. Check existing GitHub issues
2. Create new issue with:
   - Version number
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if UI-related)
3. Contact: Nam Nguyen (namnh68@github)

---

**Last updated:** 2026-04-26  
**Next review:** After v0.2.0 release (estimated 2026-05-31)
