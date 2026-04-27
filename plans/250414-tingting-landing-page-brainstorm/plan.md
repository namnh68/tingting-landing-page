---
title: "Ting Ting Landing Page Implementation"
description: "Single-page landing page for Zalo cashback group with dark/light mode, animations, and mobile-first design"
status: complete
priority: P1
effort: 12h
branch: main
tags: [landing-page, nextjs, tailwind, framer-motion, vietnamese]
created: 2026-04-14
---

# Ting Ting Landing Page - Implementation Plan

## Overview

Build a single-page landing page for "Ting Ting - San deal hoi - Hoan hoa hong" — a Zalo group business for Shopee/TikTok cashback (affiliate commission refund). The page converts visitors into Zalo group members through trust-building sections, social proof, and clear CTAs.

**Business model:** Users send product links to Zalo group -> bot returns affiliate link -> order completes -> user gets 80% commission back.

## Tech Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15 (App Router) | SSG, SEO, image optimization |
| Tailwind CSS | v4 | CSS-first config, utility classes |
| Framer Motion | latest | Animations, scroll reveal, counters |
| next-themes | latest | Dark/light mode toggle |
| react-icons | latest | Icon library |
| TypeScript | 5.x | Type safety |
| Vercel | - | Deployment platform |

## Design System

- **Light theme:** Orange/Red gradient (#FF6B35 -> #F7931E), white background
- **Dark theme:** Dark background (#0F172A), orange/yellow accent
- **Font:** Be Vietnam Pro (Google Fonts, Vietnamese optimized)
- **Border radius:** Rounded (large radius for cards)
- **Shadows:** Soft shadows for cards
- **Approach:** Mobile-first responsive

## Phase Overview

| Phase | Title | Effort | Status | Dependencies |
|-------|-------|--------|--------|-------------|
| 1 | [Project Setup](./phase-01-project-setup.md) | 1h | complete | None |
| 2 | [Layout & Theme System](./phase-02-layout-and-theme.md) | 2h | complete | Phase 1 |
| 3 | [Core Components](./phase-03-core-components.md) | 3h | complete | Phase 2 |
| 4 | [Content Components](./phase-04-content-components.md) | 2.5h | complete | Phase 2 |
| 5 | [CTA & Footer](./phase-05-cta-and-footer.md) | 1.5h | complete | Phase 2 |
| 6 | [Animations & Polish](./phase-06-animations-and-polish.md) | 1.5h | complete | Phase 3-5 |
| 7 | [SEO, Metadata & Deployment](./phase-07-seo-and-deployment.md) | 0.5h | complete | Phase 6 |
| 8 | [Feedback Screenshots Gallery](./phase-08-feedback-screenshots.md) | 1.5h | complete | Phase 4, 6 |
| 9 | [Mobile Responsive Polish](./phase-09-mobile-responsive-polish.md) | 2h | complete | Phase 8 |
| 10 | [Floating Action Buttons (Zalo)](./phase-10-floating-action-buttons.md) | 1h | complete | Phase 9 |

## Project Structure

```
tingting-landingpage/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, metadata, fonts, theme provider
│   │   ├── page.tsx            # Main landing page (composes all sections)
│   │   └── globals.css         # Tailwind v4 imports, @theme, custom styles
│   ├── components/
│   │   ├── header.tsx          # Sticky header with logo, theme toggle, CTA
│   │   ├── hero.tsx            # Hero with headline, QR, CTA
│   │   ├── social-proof.tsx    # Animated counter stats bar
│   │   ├── how-it-works.tsx    # 3-step guide with icons
│   │   ├── comparison.tsx      # Normal vs Ting Ting table
│   │   ├── testimonials.tsx    # Carousel with member feedback
│   │   ├── faq.tsx             # Accordion FAQ section
│   │   ├── promotion.tsx       # Deals/offers banner
│   │   ├── cta-final.tsx       # Final CTA with large QR
│   │   ├── footer.tsx          # Footer with contact/disclaimer
│   │   └── theme-toggle.tsx    # Dark/light switch button
│   ├── hooks/
│   │   └── use-counter.ts      # Intersection observer + animated counter
│   └── lib/
│       └── constants.ts        # All content data, stats, FAQ items, testimonials
├── public/
│   ├── images/                 # Logo, screenshots, testimonials
│   └── qr-code.jpg            # Zalo group QR code
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "framer-motion": "^11",
    "next-themes": "^0.4",
    "react-icons": "^5"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19"
  }
}
```

## Real Stats for Content

- 100+ members (thanh vien)
- 300+ successful orders (don hang thanh cong)
- 5,000,000 VND+ refunded (da hoan)

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Trust deficit (users skeptical) | High | Strong social proof, real stats, testimonials |
| Slow mobile load | Medium | SSG, image optimization, lazy loading |
| QR code unreadable | Low | Fallback text link beside QR |
| Dark mode rendering issues | Low | Thorough testing both themes |
| Tailwind v4 migration pitfalls | Medium | Follow CSS-first config pattern exactly |

## Success Criteria

- Page loads under 2s on mobile 3G
- Lighthouse score > 90 (all categories)
- Both dark/light themes render correctly
- All animations perform at 60fps
- Responsive across mobile/tablet/desktop
- QR code and CTA links functional
