# Phase 4: Content Components

## Context Links
- [Plan Overview](./plan.md)
- [Phase 3: Core Components](./phase-03-core-components.md)
- [Brainstorm Summary](./brainstorm-summary.md)

## Overview
- **Priority:** P1
- **Status:** Complete
- **Effort:** 2.5h
- **Description:** Implement the three content-heavy sections: Comparison Table (normal vs Ting Ting), Testimonials (carousel with swipe), and FAQ (accordion). These sections build trust and address objections.

## Key Insights
- Comparison table is the key conversion driver — visual "aha" moment showing value
- Testimonials carousel should auto-play but be swipeable on mobile
- FAQ accordion reduces support burden and addresses trust concerns
- Carousel can be built with CSS scroll-snap (no heavy carousel library needed) — KISS principle
- FAQ accordion uses native `<details>/<summary>` enhanced with state for animation

## Requirements

### Functional
- Comparison: side-by-side table/cards contrasting normal buying vs Ting Ting
- Testimonials: horizontal carousel with auto-scroll and manual navigation
- FAQ: expandable accordion with smooth open/close animation

### Non-functional
- Carousel accessible (keyboard nav, aria labels)
- FAQ items individually expandable/collapsible
- Mobile: cards stack vertically for comparison
- All content driven from constants.ts (DRY)

## Architecture

```
Content Sections:
  <Comparison />     — CSS grid table, responsive to card layout
  <Testimonials />   — CSS scroll-snap carousel, auto-play with pause-on-hover
  <FAQ />            — Controlled accordion with height animation
```

## Related Code Files

### Files to Create
- `src/components/comparison.tsx`
- `src/components/testimonials.tsx`
- `src/components/faq.tsx`

### Files to Modify
- `src/app/page.tsx` — add new sections
- `src/lib/constants.ts` — already populated in Phase 3

## Implementation Steps

### Step 1: Create Comparison Component

`src/components/comparison.tsx`:
```tsx
import { FiX, FiCheck } from "react-icons/fi";

const COMPARISON_ROWS = [
  {
    feature: "Hoan tien",
    normal: "0%",
    tingting: "Len den 80% hoa hong",
    normalBad: true,
  },
  {
    feature: "Gia san pham",
    normal: "Giong nhau",
    tingting: "Giong nhau",
    normalBad: false,
  },
  {
    feature: "Buoc them",
    normal: "Khong",
    tingting: "Chi 1 buoc gui link",
    normalBad: false,
  },
  {
    feature: "Ho tro",
    normal: "Tu luc",
    tingting: "24/7 trong nhom Zalo",
    normalBad: true,
  },
  {
    feature: "San thuong mai",
    normal: "—",
    tingting: "Shopee, TikTok Shop",
    normalBad: true,
  },
];

export function Comparison() {
  return (
    <section id="comparison" className="py-16 md:py-24 bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            So sanh{" "}
            <span className="text-gradient">loi ich</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400">
            Mua binh thuong vs. Mua qua Ting Ting
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-surface-tertiary dark:border-dark-tertiary">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-tertiary dark:bg-dark-tertiary">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Tieu chi
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary dark:text-gray-400">
                  Mua binh thuong
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-brand-orange">
                  Mua qua Ting Ting
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-surface-primary dark:bg-dark-primary" : "bg-surface-secondary dark:bg-dark-secondary"}
                >
                  <td className="px-6 py-4 text-sm font-medium dark:text-white">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-text-secondary dark:text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      {row.normalBad && <FiX className="h-4 w-4 text-red-500" />}
                      {row.normal}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-brand-orange dark:text-brand-yellow">
                    <span className="inline-flex items-center gap-1">
                      <FiCheck className="h-4 w-4 text-green-500" />
                      {row.tingting}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.feature}
              className="rounded-xl bg-surface-primary dark:bg-dark-primary p-4 shadow-sm"
            >
              <div className="text-sm font-semibold mb-2 dark:text-white">
                {row.feature}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-text-secondary dark:text-gray-400">
                  <div className="text-xs text-text-muted mb-1">Binh thuong</div>
                  {row.normal}
                </div>
                <div className="text-brand-orange dark:text-brand-yellow font-medium">
                  <div className="text-xs text-text-muted mb-1">Ting Ting</div>
                  {row.tingting}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Key patterns:**
- Server component (no client interactivity needed)
- Desktop: standard HTML table with alternating row colors
- Mobile: cards layout for better readability
- Color-coded: red X for disadvantages, green check for Ting Ting advantages

### Step 2: Create Testimonials Carousel

`src/components/testimonials.tsx`:
```tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { FiChevronLeft, FiChevronRight, FiUser } from "react-icons/fi";

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  // Auto-scroll every 4s
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 4000);

    // Pause on hover
    const pause = () => clearInterval(interval);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("touchstart", pause, { passive: true });

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("touchstart", pause);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Thanh vien{" "}
            <span className="text-gradient">noi gi?</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400">
            Feedback thuc tu thanh vien nhom Ting Ting
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Scroll buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-10 w-10 rounded-full bg-surface-primary dark:bg-dark-secondary shadow-lg flex items-center justify-center hover:bg-surface-secondary dark:hover:bg-dark-tertiary transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-10 w-10 rounded-full bg-surface-primary dark:bg-dark-secondary shadow-lg flex items-center justify-center hover:bg-surface-secondary dark:hover:bg-dark-tertiary transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] snap-center rounded-2xl bg-surface-secondary dark:bg-dark-secondary p-6 shadow-sm"
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-brand-orange" />
                  </div>
                  <span className="font-semibold text-sm dark:text-white">
                    {testimonial.name}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-text-secondary dark:text-gray-400 mb-4 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Refund badge */}
                {testimonial.refundAmount && (
                  <div className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                    Hoan: {testimonial.refundAmount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Key patterns:**
- CSS scroll-snap for native smooth snapping (no external carousel lib)
- Auto-scroll every 4 seconds, pauses on hover/touch
- Left/right arrow buttons shown conditionally
- `scrollbar-hide` via inline styles (cross-browser)
- Cards fixed at 300px width for consistent snap behavior

### Step 3: Create FAQ Accordion

`src/components/faq.tsx`:
```tsx
"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";
import { FiChevronDown } from "react-icons/fi";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-surface-tertiary dark:border-dark-tertiary">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-semibold pr-4 dark:text-white">
          {question}
        </span>
        <FiChevronDown
          className={`h-5 w-5 flex-shrink-0 text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Cau hoi{" "}
            <span className="text-gradient">thuong gap</span>
          </h2>
        </div>

        <div className="rounded-2xl bg-surface-secondary dark:bg-dark-secondary p-4 sm:p-6">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Key patterns:**
- Controlled accordion: only one item open at a time
- First item open by default (index 0) for immediate content visibility
- `max-h` transition for smooth expand/collapse
- `rotate-180` on chevron for open state indication
- `aria-expanded` for accessibility

### Step 4: Update Page Composition

Update `src/app/page.tsx` to include new sections:
```tsx
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { HowItWorks } from "@/components/how-it-works";
import { Comparison } from "@/components/comparison";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Comparison />
        <Testimonials />
        <FAQ />
        {/* Phase 5: Promotion, CTA Final, Footer */}
      </main>
    </>
  );
}
```

## Todo List

- [x] Create Comparison component (desktop table + mobile cards)
- [x] Create Testimonials carousel (CSS scroll-snap, auto-play, nav buttons)
- [x] Create FAQ accordion (single-open, animated expand/collapse)
- [x] Add sections to page.tsx composition
- [x] Test mobile responsiveness (comparison cards, carousel swipe, FAQ touch)
- [x] Test dark mode for all three components
- [x] Verify carousel auto-scroll and pause-on-hover behavior
- [x] Test FAQ keyboard accessibility (tab through, enter to toggle)

## Success Criteria

- Comparison table renders as table on desktop, cards on mobile
- Testimonials carousel auto-scrolls and is swipeable on mobile
- FAQ accordion opens/closes smoothly with only one item open at a time
- All content matches constants.ts data
- Dark mode: correct colors, readable text contrast
- No horizontal overflow from carousel

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Carousel overflow on mobile | Medium | Medium | `overflow-x-auto` + `scrollbar-hide` |
| FAQ max-h animation choppy | Low | Low | Use `duration-300` + `overflow-hidden` |
| Table unreadable on small screens | Medium | Medium | Switch to cards on mobile |
| Testimonial content too long | Low | Low | Fixed card height with ellipsis or scroll |

## Security Considerations
- No user input in any component
- All content hardcoded from constants
- Testimonials use anonymized names

## Next Steps
- Phase 5: CTA & Footer (Promotion, Final CTA, Footer)
