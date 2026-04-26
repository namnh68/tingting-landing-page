# Development Roadmap

Last updated: 2026-04-26

## Version 0.1.0 (Current — MVP with Blog)

**Status:** Release Candidate (2026-04-26)
**Progress:** 100%

### Completed Features
- [x] Landing page (hero, social proof, how-it-works, comparison, testimonials, FAQ, promotion, CTA)
- [x] Navigation header with theme toggle
- [x] Dark/light mode support (class strategy)
- [x] Responsive design (mobile-first, sm/md breakpoints)
- [x] Blog listing page (`/bai-viet`)
- [x] Blog detail page with MDX rendering (`/bai-viet/[slug]`)
- [x] SEO metadata and Open Graph tags
- [x] JSON-LD structured data (Article schema for blog)
- [x] Static site generation (SSG) with `generateStaticParams()`
- [x] robots.txt and sitemap.xml auto-generation
- [x] Vercel deployment pipeline
- [x] Cloudflare Workers deployment support (OpenNext)
- [x] TypeScript strict mode
- [x] ESLint configuration

### Dependencies Added
- `gray-matter@4.0.3` — Parse YAML frontmatter
- `next-mdx-remote@6.0.0` — Render MDX on server
- `@tailwindcss/typography@0.5.19` — Prose styles for blog

### Known Issues
- None identified in current release

---

## Version 0.2.0 (Engagement — Q2 2026)

**Status:** Planning
**Target:** End of May 2026
**Priority:** Medium

### Planned Features
- [ ] Blog tag filtering/search
- [ ] Related posts recommendation
- [ ] Reading progress indicator (scroll bar)
- [ ] Email newsletter signup (Mailchimp/Convertkit)
- [ ] Author bio section on blog posts
- [ ] Blog post comments (Giscus)
- [ ] Social share buttons (blog detail)

### Technical Debt
- [ ] Add E2E tests (Playwright)
- [ ] Implement blog full-text search (Algolia or Meilisearch)
- [ ] Accessibility audit and fixes (WCAG 2.1 AA)
- [ ] Performance optimization (image lazy loading, srcset)
- [ ] Setup Sentry for error tracking

### Dependencies to Add
- `giscus` — Blog comments
- `next-seo` or similar — Simplified meta tag management
- `@playwright/test` — E2E testing

---

## Version 0.3.0 (Analytics & Insights — Q3 2026)

**Status:** Planning
**Target:** July-August 2026
**Priority:** Medium

### Planned Features
- [ ] Vercel Analytics integration
- [ ] Goal tracking (CTA clicks, form submissions, blog reads)
- [ ] Heatmap analysis (Hotjar or Microsoft Clarity)
- [ ] Blog engagement metrics (reading time, bounce rate)
- [ ] Conversion funnel tracking
- [ ] Custom events for Zalo group joins

### Metrics to Track
- Page views by section
- CTA click-through rate
- Blog post performance (views, shares)
- Mobile vs desktop conversion
- Geographic distribution (Vietnam focus)

---

## Version 0.4.0 (Community Features — Q4 2026)

**Status:** Planning
**Target:** October-November 2026
**Priority:** Low

### Planned Features
- [ ] User testimonials form (replace static array)
- [ ] Member leaderboard (top savers)
- [ ] Referral tracking & rewards (if applicable)
- [ ] Community success stories page
- [ ] Live members counter (webhook from Zalo)

### Backend Requirements
- Simple API for form submissions (email notifications)
- Optional database for testimonials & leaderboard
- Webhook integration with Zalo group API (if available)

---

## Version 1.0.0 (Stable Release — Q1 2027)

**Status:** Planning
**Target:** January 2027
**Priority:** High

### Goals
- Stabilize all features from v0.2 + v0.3
- Full test coverage (unit + E2E)
- WCAG 2.1 AA compliance
- Performance score > 95 (Lighthouse)
- Documented API for community integrations

### Milestones
- [x] v0.1.0 (MVP) — 2026-04-26
- [ ] v0.2.0 (Engagement) — 2026-05-31
- [ ] v0.3.0 (Analytics) — 2026-08-31
- [ ] v0.4.0 (Community) — 2026-11-30
- [ ] v1.0.0 (Stable) — 2027-01-31

---

## Future Roadmap (Post-1.0.0)

### Long-term Vision
- [ ] Mobile app (React Native)
- [ ] Integration with Shopee/TikTok Shop API (track orders, refunds in-app)
- [ ] Multi-language support (English, Chinese)
- [ ] International expansion (Thailand, Philippines)
- [ ] Premium features/membership tier

### Exploratory Ideas
- AI-powered deal recommendations (blog + product ML)
- Browser extension for affiliate link auto-injection
- Telegram/Discord bot alternative to Zalo
- Affiliate partnership marketplace

---

## Dependencies Management

### Current Stack (v0.1.0)
```json
{
  "react": "^19.0.0",
  "next": "^15.3.0",
  "typescript": "^5",
  "tailwindcss": "^4.0.0",
  "@tailwindcss/typography": "^0.5.19",
  "framer-motion": "^11.0.0",
  "next-themes": "^0.4.6",
  "react-icons": "^5.4.0",
  "gray-matter": "^4.0.3",
  "next-mdx-remote": "^6.0.0"
}
```

### Planned Additions
- `giscus` (v0.2.0)
- `@playwright/test` (v0.2.0)
- `@sentry/nextjs` (v0.3.0)
- `mailchimp-api` or `react-mailchimp-subscribe` (v0.2.0)

### Dependency Updates Strategy
- **Minor/patch:** Apply monthly
- **Major:** Evaluate impact before updating (next.js, react major versions)
- **Security:** Apply immediately for critical vulnerabilities

---

## Progress Tracking

### Key Performance Indicators (KPIs)
| KPI | Target v0.1 | Target v1.0 | Status |
|-----|-----------|-----------|--------|
| Lighthouse (Mobile) | > 80 | > 95 | On track |
| Lighthouse (Desktop) | > 85 | > 95 | On track |
| Page Load Time (4G) | < 3s | < 2s | On track |
| CLS Score | < 0.1 | < 0.05 | On track |
| Blog Posts | 2+ | 20+ | On track (2/20) |
| Mobile Conversion | Baseline | +20% | TBD |
| Zalo Members | Baseline | 2x growth | Tracking |

### Release Checklist Template

Before each release:
- [ ] All PRs merged and reviewed
- [ ] Unit tests passing (`npm run test`)
- [ ] TypeScript compiles (`npx tsc`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Manual QA on mobile & desktop
- [ ] Documentation updated
- [ ] Changelog entries added
- [ ] Version bumped in `package.json`
- [ ] Tag created in git (`git tag v0.x.x`)
- [ ] Deployed to Vercel & tested on production URL
- [ ] Performance metrics checked (Vercel Dashboard)

---

## Backlog & Technical Debt

### High Priority
- [ ] Blog search/filter (users requested)
- [ ] E2E tests for critical flows
- [ ] Accessibility audit

### Medium Priority
- [ ] Image optimization (WebP, lazy load)
- [ ] Cache strategy for blog posts
- [ ] Analytics dashboard
- [ ] Error tracking (Sentry)

### Low Priority
- [ ] Blog categories (instead of tags)
- [ ] Dark mode system theme detection option
- [ ] Automated social media posting for new posts
- [ ] Multi-author support

---

## Communication & Coordination

### Weekly Sync
- Release status review
- Blockers & risk assessment
- Sprint planning (if applicable)

### Deployment
- Production deploys via Vercel (auto on `main` merge)
- Staging preview URLs auto-generated for PRs
- Hotfix protocol: urgent fixes bypass sprint (tag & release immediately)

### Issue Tracking
- Use GitHub Issues for bugs & features
- Label: `bug`, `feature`, `documentation`, `question`
- Assign to owner + priority (`p0`-`p3`)

---

## Success Criteria for v1.0.0

1. ✅ Zero critical bugs
2. ✅ All unit tests passing
3. ✅ Full E2E test coverage for user journeys
4. ✅ Lighthouse score > 95 on both mobile & desktop
5. ✅ Page load < 2s on 4G
6. ✅ WCAG 2.1 AA compliance verified
7. ✅ 20+ published blog posts
8. ✅ Zero TypeScript errors
9. ✅ All documentation updated & reviewed
10. ✅ Production metrics tracked & baseline established

---

## Notes & Decisions

### Why Static-First (SSG)?
- Fast CDN delivery (no server latency)
- Low operational cost (Vercel/Cloudflare)
- SEO-friendly (pre-rendered HTML)
- Scales infinitely without backend load

### Why MDX for Blog?
- Write markdown + embed React components
- Rich content without API changes
- Version control friendly (git-tracked)
- No database dependency

### Why Tailwind v4 (CSS-first)?
- Smaller bundle size (CSS-only, no JS framework)
- Modern CSS capabilities (nesting, @apply)
- Dark mode via class strategy (explicit control)
- Rapid iteration on design system

### Why Vercel + Cloudflare Options?
- Vercel: Simple GitHub integration, great DX
- Cloudflare: Edge computing, lower latency globally, cost-effective

---

Last updated: 2026-04-26  
Next roadmap review: 2026-05-31
