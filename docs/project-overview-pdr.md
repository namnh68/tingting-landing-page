# Ting Ting Landing Page — Project Overview & PDR

## Project Context

**Ting Ting** is a Shopee/TikTok Shop cashback referral community. Members share product links in a Zalo group, receive affiliate-enabled links, purchase through them, and get 80% of the affiliate commission back as cash refund.

## Product Overview

### Core Value Proposition
Members save money by earning 80% affiliate commission refunds on every Shopee/TikTok Shop purchase — without paying fees or changing shopping habits.

### Current Features (MVP)
- **Landing page** with hero, social proof (stats), how-it-works, comparison, testimonials, FAQ
- **Call-to-action** buttons linking to Zalo group
- **Dark/light mode** toggle
- **Responsive design** (mobile-first)
- **Blog system** (new) for tips and guides

### Target Audience
- Vietnamese online shoppers on Shopee & TikTok Shop
- Age: 18-45
- Tech comfort: moderate to high
- Primary device: mobile

## Product Development Requirements (PDR)

### 1. Functional Requirements

#### Landing Page (Complete)
- [x] Hero section with headline, CTA, QR code
- [x] Social proof counters (members, orders, refunded amount)
- [x] How-it-works explanation (3 steps)
- [x] Comparison table (affiliate vs Ting Ting benefits)
- [x] Testimonials carousel (auto-scroll)
- [x] FAQ accordion
- [x] Promotion highlights (stagger animation)
- [x] Final CTA with large QR code

#### Blog System (New)
- [x] Blog listing page (`/bai-viet`)
- [x] Blog detail page with MDX rendering
- [x] Metadata & Open Graph for sharing
- [x] JSON-LD Article schema for SEO
- [x] Reading time calculation
- [x] Tag support
- [x] Date formatting (Vietnamese locale)

#### Navigation & Links
- [x] Header with logo, nav menu, theme toggle, CTA button
- [x] Footer with links and disclaimer
- [x] Breadcrumb on blog detail page
- [x] SEO-friendly robots.txt & sitemap.xml

### 2. Non-Functional Requirements

#### Performance
- **Target:** Lighthouse score > 90
- **TTL:** < 2s on 4G
- **CLS:** < 0.1
- **Static export:** All routes pre-rendered at build time (no server needed)

#### SEO
- [x] Responsive meta tags (title, description, OG)
- [x] JSON-LD structured data (Article for blog, Organization for home)
- [x] Canonical URLs (blog detail pages)
- [x] Sitemap & robots.txt auto-generated
- [x] Mobile-friendly (responsive, fast)
- [x] Vietnamese language optimization (font, meta lang)

#### Accessibility
- [ ] WCAG 2.1 AA compliance (ongoing)
- [ ] Semantic HTML
- [ ] Alt text on images
- [ ] ARIA labels for interactive elements

#### Security
- [ ] No sensitive data in repo (API keys, secrets)
- [ ] HTTPS enforced on production
- [ ] Content Security Policy (CSP) headers (Vercel-managed)
- [ ] XSS protection via Next.js sanitization

#### Scalability
- Static hosting (Vercel/Cloudflare Workers)
- Blog posts added via filesystem (`content/posts/*.mdx`)
- No backend database needed for MVP

### 3. Acceptance Criteria

#### Home Page
- [x] All sections render on mobile (320px+) and desktop
- [x] Animations smooth on 60fps
- [x] Dark/light mode toggle works
- [x] QR code scannable
- [x] All CTAs lead to correct Zalo group link

#### Blog System
- [x] Blog listing shows all published posts, sorted newest first
- [x] Blog detail page renders MDX content (headings, lists, code blocks, links)
- [x] Metadata dynamically generated from frontmatter
- [x] Reading time displayed and accurate
- [x] Unpublished posts (`published: false`) not visible
- [x] Static generation on build (`npm run build`)
- [x] 404 page if slug not found
- [x] Open Graph image shared correctly on social media

#### Build & Deployment
- [x] `npm run build` completes without errors
- [x] No TypeScript errors
- [x] ESLint passes
- [x] Static export to `/out` directory
- [x] Deployable to Vercel/Cloudflare Workers

### 4. Success Metrics

| Metric | Target | Owner |
|--------|--------|-------|
| Lighthouse (Mobile) | > 85 | Tech Lead |
| Lighthouse (Desktop) | > 90 | Tech Lead |
| Page Load Time (4G) | < 3s | Tech Lead |
| CLS Score | < 0.1 | Tech Lead |
| Blog Posts Published | 5+ | Content Team |
| Social Shares (OG) | Trackable | Marketing |
| Mobile Conversion Rate | Baseline | Marketing |
| Zalo Group Members | Growth tracked | Community |

### 5. Technical Constraints

- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS v4 (CSS-first)
- **Hosting:** Vercel (or Cloudflare Workers via OpenNext)
- **Blog Format:** MDX with gray-matter frontmatter
- **TypeScript:** Strict mode enabled
- **Node:** >= 18
- **Output:** Static export (no server runtime needed for MVP)

### 6. Deployment Pipeline

#### Development
```bash
npm install
npm run dev        # Start dev server with Turbopack
npm run lint       # Check linting
npm run build      # Build static export
npm start          # Serve static build locally
```

#### Production (Vercel)
1. Push to `main` branch
2. Vercel auto-triggers build
3. Static export deployed to CDN
4. Live on `tingting.vercel.app`

#### Production (Cloudflare Workers)
```bash
npm run deploy     # OpenNext adapter → Cloudflare Workers
```

### 7. Roadmap & Phase Status

#### Phase 1: Foundation (Complete)
- [x] Landing page design & implementation
- [x] Navigation & theme system
- [x] Responsive layout
- [x] Vercel deployment

#### Phase 2: Blog System (Complete as of 2026-04-26)
- [x] Blog listing & detail pages
- [x] MDX rendering
- [x] Metadata & SEO
- [x] Static generation
- [x] JSON-LD Article schema
- [x] Content structure (`content/posts/*.mdx`)

#### Phase 3: Engagement (Planned)
- [ ] Email newsletter signup
- [ ] Blog search/filter by tag
- [ ] Related posts suggestions
- [ ] Reading progress indicator

#### Phase 4: Analytics (Planned)
- [ ] Vercel Analytics integration
- [ ] Goal tracking (CTA clicks, form submissions)
- [ ] Heatmap analysis

#### Phase 5: Community Features (Future)
- [ ] Comments on blog posts (Giscus)
- [ ] User testimonials form
- [ ] Leaderboard (top savers)

### 8. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Blog content outdated | Medium | Low | Editorial calendar + scheduled reviews |
| High latency on slow networks | Low | Medium | Image optimization, lazy loading |
| Vercel downtime | Very Low | High | Redundancy plan (Cloudflare backup) |
| SEO ranking plateau | Medium | Medium | Content strategy, backlink building |
| Poor mobile UX | Low | High | Continuous testing on devices |

### 9. Dependencies & Integration Points

#### External
- **Google Fonts:** Be Vietnam Pro (font service)
- **Zalo:** Group link & QR code (community management)
- **Vercel:** Deployment & CDN
- **Cloudflare:** DNS, optional Workers deployment

#### Internal
- `src/lib/constants.ts` → Updated with blog nav link
- `src/app/sitemap.ts` → Includes blog routes
- `src/app/layout.tsx` → Root metadata & JSON-LD

#### No Backend Required
- Static rendering eliminates database needs
- Content managed via filesystem (`content/posts/`)
- No user authentication (yet)

### 10. Maintenance & Support

#### Content Updates
- Add posts: Place `new-slug.mdx` in `content/posts/`
- Edit constants: `src/lib/constants.ts`
- Rebuild: `npm run build`
- Deploy: `git push` (Vercel auto-deploys)

#### Monitoring
- Vercel dashboard: build logs, performance
- Web Vitals: track CLS, LCP, FID
- Error tracking: Sentry (optional)

#### Versioning
- Version 0.1.0 (MVP with blog)
- Semantic versioning for releases
- Changelog in `docs/project-changelog.md`

## Technical Debt & Future Work

- [ ] Add E2E tests (Playwright)
- [ ] Implement blog search (Algolia/Meilisearch)
- [ ] Add categories/tag filtering
- [ ] Optimize image delivery (WebP, srcset)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Blog comments system (Giscus)
- [ ] Related posts algorithm
- [ ] Analytics dashboard

## Definition of Done

A feature/task is "done" when:
1. Code written and tested locally
2. TypeScript compiles with zero errors
3. ESLint passes (`npm run lint`)
4. `npm run build` succeeds
5. Feature works on mobile & desktop
6. Documentation updated (this file, code comments)
7. Merged to `main` and deployed to production
8. Metrics tracked (if applicable)

## Glossary

| Term | Definition |
|------|-----------|
| **Affiliate** | Shopee/TikTok Shop commission for driving sales |
| **Hoa hồng** | Commission percentage from sales referrals |
| **Hoàn tiền** | Cashback/refund of affiliate commission to member |
| **SSG** | Static Site Generation (build-time rendering) |
| **MDX** | Markdown + JSX (write markdown with React components) |
| **Frontmatter** | YAML metadata at top of markdown file |
| **JSON-LD** | Structured data format for search engines |
| **OG Tags** | Open Graph meta tags for social sharing |

## Contact & Ownership

- **Product Manager:** TBD
- **Tech Lead:** Nam Nguyen (namnh68)
- **Content Lead:** TBD
- **Community Manager:** TBD

Last updated: 2026-04-26
