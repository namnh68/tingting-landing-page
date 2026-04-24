# Phase 6: Animations & Polish

## Context Links
- [Plan Overview](./plan.md)
- [Phase 3-5: Component implementations](./phase-03-core-components.md)
- [Framer Motion docs](https://www.framer.com/motion/)

## Overview
- **Priority:** P2
- **Status:** Complete
- **Effort:** 1.5h
- **Description:** Add Framer Motion animations (scroll reveal, hover effects, stagger), polish responsive design, and ensure smooth performance across devices.

## Key Insights
- Framer Motion's `motion` component and `useInView` hook handle scroll-reveal
- Use `variants` + `staggerChildren` for orchestrated reveal animations
- Wrap animation logic in a reusable `<ScrollReveal>` wrapper to keep components clean (DRY)
- Keep animations subtle — 0.5-0.8s duration max, ease-out curves
- `whileHover` and `whileTap` for button interactivity
- Test on mobile: disable heavy animations if `prefers-reduced-motion` is set

## Requirements

### Functional
- Scroll reveal animations on all sections (fade up on enter)
- Staggered animations for card grids (how-it-works, comparison, promotion)
- Hover scale effect on CTA buttons and cards
- Smooth section transitions as user scrolls

### Non-functional
- Animations at 60fps (no jank)
- Respect `prefers-reduced-motion` media query
- Animations fire once (not on every scroll pass)
- Total animation JS < 30KB gzipped

## Architecture

```
Animation Strategy:
  <ScrollReveal>          — Reusable wrapper using motion.div + useInView
    ├── fade-up           — Default: translateY(20px) → 0, opacity 0 → 1
    ├── fade-in           — opacity 0 → 1 only
    └── stagger-children  — Parent delays children by 0.1s each

  Button animations:
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
```

## Related Code Files

### Files to Create
- `src/components/scroll-reveal.tsx` — Reusable animation wrapper

### Files to Modify
- `src/components/hero.tsx` — Add entrance animation
- `src/components/social-proof.tsx` — Already has counter animation, add fade-in
- `src/components/how-it-works.tsx` — Add stagger reveal to cards
- `src/components/comparison.tsx` — Add scroll reveal
- `src/components/testimonials.tsx` — Add scroll reveal to section
- `src/components/faq.tsx` — Add scroll reveal
- `src/components/promotion.tsx` — Add stagger reveal to cards
- `src/components/cta-final.tsx` — Add scale-in animation
- `src/app/globals.css` — Add `prefers-reduced-motion` overrides

## Implementation Steps

### Step 1: Create ScrollReveal Wrapper

`src/components/scroll-reveal.tsx`:
```tsx
"use client";

import { useRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-in" | "fade-left" | "fade-right";
  delay?: number;
  duration?: number;
  once?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const variants = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
};

export function ScrollReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  once = true,
  stagger = false,
  staggerDelay = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const containerVariants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }
    : undefined;

  const itemVariants = variants[variant];

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Child component for use inside stagger containers
export function ScrollRevealItem({
  children,
  className,
  variant = "fade-up",
  duration = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-in" | "fade-left" | "fade-right";
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{ duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

**Usage pattern for staggered grids:**
```tsx
<ScrollReveal stagger className="grid md:grid-cols-3 gap-8">
  <ScrollRevealItem>Card 1</ScrollRevealItem>
  <ScrollRevealItem>Card 2</ScrollRevealItem>
  <ScrollRevealItem>Card 3</ScrollRevealItem>
</ScrollReveal>
```

### Step 2: Add Animations to Hero

Wrap hero content in ScrollReveal:
```tsx
// In hero.tsx, wrap text content:
<ScrollReveal variant="fade-up" delay={0.2}>
  <h1>...</h1>
  <p>...</p>
  <div>...buttons...</div>
</ScrollReveal>

// Wrap QR code:
<ScrollReveal variant="fade-up" delay={0.4}>
  <div className="...qr container...">...</div>
</ScrollReveal>
```

### Step 3: Add Stagger to Card Grids

For HowItWorks, Promotion (3-card grids):
```tsx
// Replace <div className="grid md:grid-cols-3 gap-8"> with:
<ScrollReveal stagger staggerDelay={0.15} className="grid md:grid-cols-3 gap-8">
  {items.map((item) => (
    <ScrollRevealItem key={item.key}>
      {/* card content */}
    </ScrollRevealItem>
  ))}
</ScrollReveal>
```

### Step 4: Add Button Hover Animations

For CTA buttons throughout the page, either:

**Option A:** Use Framer Motion `motion.a`:
```tsx
import { motion } from "framer-motion";

<motion.a
  href={ZALO_GROUP_LINK}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="..."
>
  Tham gia ngay
</motion.a>
```

**Option B:** Use CSS `hover:scale-105 active:scale-95 transition-transform` (simpler, no JS):
```tsx
<a className="... hover:scale-105 active:scale-95 transition-transform">
  Tham gia ngay
</a>
```

Recommendation: Use Option B (CSS) for most buttons. Use Framer Motion only for the Final CTA button where the animation needs to be more prominent.

### Step 5: Add Section Scroll Reveals

Wrap each section's content container in `<ScrollReveal>`:
```tsx
// Pattern for each section:
<section id="section-name" className="py-16 md:py-24">
  <div className="mx-auto max-w-5xl px-4 sm:px-6">
    <ScrollReveal>
      {/* heading */}
    </ScrollReveal>
    <ScrollReveal delay={0.2}>
      {/* content - or use stagger for grids */}
    </ScrollReveal>
  </div>
</section>
```

### Step 6: Respect prefers-reduced-motion

Add to `src/app/globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Note: Framer Motion automatically respects `prefers-reduced-motion` via its `useReducedMotion` hook.

### Step 7: Responsive Polish

Test and fix these breakpoints:
- `< 640px` (sm): Mobile phones — everything single column, centered
- `640-768px` (md): Large phones / small tablets
- `768-1024px` (lg): Tablets — grid layouts kick in
- `> 1024px` (xl): Desktop — full layout

Key responsive fixes to verify:
```
Header: Logo left, toggle+CTA right. Nav hidden on mobile.
Hero: Stack text above QR on mobile. Side-by-side on md+.
Social Proof: 1 col on mobile, 3 col on sm+.
How It Works: 1 col on mobile, 3 col on md+.
Comparison: Cards on mobile, table on md+.
Testimonials: Full-width carousel, swipeable.
FAQ: Full width, same on all sizes.
Promotion: 1 col on mobile, 3 col on md+.
CTA Final: Centered, padding adjusts.
Footer: 1 col on mobile, 3 col on md+.
```

## Todo List

- [x] Create ScrollReveal and ScrollRevealItem wrapper components
- [x] Add fade-up animation to Hero section (text + QR)
- [x] Add stagger animation to HowItWorks cards
- [x] Add scroll reveal to Comparison section
- [x] Add scroll reveal to Testimonials section
- [x] Add scroll reveal to FAQ section
- [x] Add stagger animation to Promotion cards
- [x] Add scale animation to CTA Final card
- [x] Add hover:scale to CTA buttons (CSS approach)
- [x] Add prefers-reduced-motion CSS overrides
- [x] Test all animations on mobile (iOS Safari, Chrome Android)
- [x] Verify 60fps animation performance
- [x] Final responsive design polish across all breakpoints

## Success Criteria

- All sections animate in smoothly as user scrolls
- Card grids reveal with staggered timing
- CTA buttons have subtle hover/tap feedback
- Animations fire once and don't replay on scroll back
- No animation jank (60fps on modern devices)
- `prefers-reduced-motion` disables all animations
- Page looks polished on mobile, tablet, and desktop

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Framer Motion bundle size too large | Low | Medium | Tree-shaking works well; only import used features |
| Animation jank on low-end mobile | Medium | Medium | Keep animations simple (opacity + transform only) |
| Flash of unanimated content | Low | Low | `initial="hidden"` ensures content hidden until animation |

## Security Considerations
- No security concerns — animations are purely visual
- Framer Motion loaded from npm (trusted package)

## Next Steps
- Phase 7: SEO, Metadata & Deployment
