# Phase 3: Core Components

## Context Links
- [Plan Overview](./plan.md)
- [Phase 2: Layout & Theme](./phase-02-layout-and-theme.md)
- [Brainstorm Summary](./brainstorm-summary.md)

## Overview
- **Priority:** P1 (Critical)
- **Status:** Complete
- **Effort:** 3h
- **Description:** Implement the four core above-the-fold and early-scroll sections: Header (sticky navigation), Hero (headline + QR + CTA), Social Proof Bar (animated counters), and How It Works (3-step guide).

## Key Insights
- Header must be sticky with backdrop blur for modern glass effect
- Hero section is the first impression — needs strong gradient background and clear CTA
- Social Proof counters should NOT animate until scrolled into view (Intersection Observer)
- How It Works needs visual step numbering (stepper/timeline layout)
- All components are server components by default; only add "use client" when needed (theme toggle, counters)

## Requirements

### Functional
- Sticky header with logo, theme toggle, and CTA button
- Hero with headline, subheadline, QR code image, and CTA button
- Social proof bar with 3 animated counters (members, orders, VND refunded)
- How It Works section with 3 illustrated steps

### Non-functional
- Header z-index high enough to overlay all content
- Hero gradient responsive to theme (light vs dark)
- Counter animation triggers only once (when first scrolled into view)
- All sections responsive: mobile-first, scales to desktop

## Architecture

```
page.tsx
  ├── <Header />          (sticky, z-50)
  ├── <main>
  │   ├── <Hero />        (full viewport height on mobile)
  │   ├── <SocialProof /> (animated counters)
  │   └── <HowItWorks />  (3-step stepper)
  │   └── ...remaining sections
  └── </main>
```

## Related Code Files

### Files to Create
- `src/components/header.tsx`
- `src/components/hero.tsx`
- `src/components/social-proof.tsx`
- `src/components/how-it-works.tsx`
- `src/hooks/use-counter.ts`

### Files to Modify
- `src/app/page.tsx` — compose sections
- `src/lib/constants.ts` — add content data

## Implementation Steps

### Step 1: Populate Constants

Update `src/lib/constants.ts` with all content data:

```ts
export const ZALO_GROUP_LINK = "https://zalo.me/g/YOUR_GROUP_ID";

export const STATS = {
  members: { value: 100, suffix: "+", label: "Thanh vien tin tuong" },
  orders: { value: 300, suffix: "+", label: "Don hang hoan tien thanh cong" },
  refunded: { value: 5, suffix: " trieu+", label: "VND da hoan cho thanh vien" },
} as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Gui link san pham",
    description: "Copy link san pham tu Shopee hoac TikTok Shop, gui vao nhom Zalo Ting Ting.",
    icon: "link",
  },
  {
    step: 2,
    title: "Nhan link hoan tien",
    description: "Bot tu dong gui lai link affiliate. Ban mua hang binh thuong qua link nay.",
    icon: "bot",
  },
  {
    step: 3,
    title: "Nhan hoan 80% hoa hong",
    description: "Don hang thanh cong, ban nhan lai 80% hoa hong affiliate. Chuyen khoan truc tiep!",
    icon: "money",
  },
] as const;

export const NAV_ITEMS = [
  { label: "Cach hoat dong", href: "#how-it-works" },
  { label: "So sanh", href: "#comparison" },
  { label: "Danh gia", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Co mat phi tham gia khong?",
    answer: "Hoan toan mien phi! Ban khong can tra bat ky chi phi nao de tham gia nhom va su dung dich vu hoan tien.",
  },
  {
    question: "Hoan tien bao lau?",
    answer: "Thoi gian hoan tien theo chu ky cua tung san thuong mai. Shopee thuong tu 30-45 ngay, TikTok Shop tu 15-30 ngay sau khi don hang hoan tat.",
  },
  {
    question: "Co an toan khong?",
    answer: "Hoan toan an toan! Link san pham van la link chinh hang tu Shopee/TikTok Shop. Chung toi chi them ma affiliate de theo doi hoa hong, khong anh huong den don hang cua ban.",
  },
  {
    question: "Ap dung cho san thuong mai nao?",
    answer: "Hien tai ho tro Shopee va TikTok Shop - hai san thuong mai dien tu lon nhat Viet Nam.",
  },
  {
    question: "Tien hoan ve dau?",
    answer: "Tien hoan se duoc chuyen khoan truc tiep vao tai khoan ngan hang cua ban. Ho tro tat ca ngan hang tai Viet Nam.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Thanh vien A.",
    avatar: null,
    content: "Mua dien thoai 10 trieu, duoc hoan lai gan 300k. Chi can gui link la xong, de qua!",
    orderAmount: "10,000,000d",
    refundAmount: "~300,000d",
  },
  {
    name: "Thanh vien B.",
    avatar: null,
    content: "Tham gia 2 thang, tong hoan duoc gan 1 trieu. Mua gi cung gui link truoc, khong mat gi ma duoc tien.",
    orderAmount: "Nhieu don",
    refundAmount: "~1,000,000d",
  },
  {
    name: "Thanh vien C.",
    avatar: null,
    content: "Bot tra link nhanh lam, gui link xong 5 giay la co link moi. Rat tien loi!",
    orderAmount: "",
    refundAmount: "",
  },
] as const;
```

### Step 2: Create Header Component

`src/components/header.tsx`:
```tsx
"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { ZALO_GROUP_LINK, NAV_ITEMS } from "@/lib/constants";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-primary/80 dark:bg-dark-primary/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-bold text-gradient">
            Ting Ting
          </a>

          {/* Nav (hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-text-secondary hover:text-brand-orange transition-colors dark:text-gray-300 dark:hover:text-brand-yellow"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-shadow"
            >
              Tham gia ngay
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
```

**Key patterns:**
- `"use client"` needed for scroll listener
- Backdrop blur on scroll for glass morphism
- `bg-surface-primary/80` for semi-transparent background
- `text-gradient` custom utility for branded logo text
- CTA button uses `bg-gradient-brand` utility

### Step 3: Create Hero Section

`src/components/hero.tsx`:
```tsx
import Image from "next/image";
import { ZALO_GROUP_LINK } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-brand-yellow/5 to-transparent dark:from-brand-orange/5 dark:via-transparent dark:to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Mua sam thong minh{" "}
              <span className="text-gradient">
                Hoan tien len den 80%
              </span>
            </h1>
            <p className="mt-4 text-lg text-text-secondary dark:text-gray-400 max-w-lg mx-auto md:mx-0">
              Gui link san pham Shopee, TikTok Shop vao nhom Zalo — nhan hoan
              80% hoa hong affiliate. Mien phi, an toan, tu dong.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a
                href={ZALO_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full bg-gradient-brand px-8 py-3.5 text-center text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                Tham gia nhom Zalo
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto rounded-full border-2 border-brand-orange px-8 py-3.5 text-center text-lg font-semibold text-brand-orange hover:bg-brand-orange hover:text-white transition-colors dark:border-brand-yellow dark:text-brand-yellow dark:hover:bg-brand-yellow dark:hover:text-dark-primary"
              >
                Tim hieu them
              </a>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center md:justify-end">
            <div className="relative rounded-2xl bg-white p-6 shadow-2xl dark:bg-dark-secondary">
              <Image
                src="/qr-code.jpg"
                alt="QR Code nhom Zalo Ting Ting"
                width={280}
                height={280}
                className="rounded-xl"
                priority
              />
              <p className="mt-3 text-center text-sm font-medium text-text-secondary dark:text-gray-400">
                Quet ma de tham gia nhom Zalo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Key patterns:**
- Server component (no "use client" needed)
- `min-h-screen` for full viewport hero
- `pt-16` to offset fixed header
- Grid layout: text left, QR right on desktop; stacked on mobile
- `priority` on QR Image for LCP optimization
- Gradient background with theme-aware opacity

### Step 4: Create useCounter Hook

`src/hooks/use-counter.ts`:
```ts
"use client";

import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  end: number;
  duration?: number;
  startOnView?: boolean;
}

export function useCounter({ end, duration = 2000, startOnView = true }: UseCounterOptions) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { count, ref };
}
```

**Key patterns:**
- Intersection Observer triggers counter only when scrolled into view
- `requestAnimationFrame` for smooth 60fps animation
- Ease-out cubic easing for natural feel
- Counter only fires once (`hasStarted` flag)
- Returns `ref` to attach to the container element

### Step 5: Create Social Proof Component

`src/components/social-proof.tsx`:
```tsx
"use client";

import { useCounter } from "@/hooks/use-counter";
import { STATS } from "@/lib/constants";
import { FiUsers, FiShoppingBag, FiDollarSign } from "react-icons/fi";

const STAT_CONFIG = [
  { key: "members" as const, icon: FiUsers, color: "text-brand-orange" },
  { key: "orders" as const, icon: FiShoppingBag, color: "text-brand-yellow" },
  { key: "refunded" as const, icon: FiDollarSign, color: "text-brand-red" },
];

function StatItem({
  value,
  suffix,
  label,
  icon: Icon,
  color,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  const { count, ref } = useCounter({ end: value, duration: 2000 });

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 p-4">
      <Icon className={`h-8 w-8 ${color}`} />
      <div className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-white">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-text-secondary dark:text-gray-400 text-center">
        {label}
      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section className="py-12 bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STAT_CONFIG.map(({ key, icon, color }) => (
            <StatItem
              key={key}
              value={STATS[key].value}
              suffix={STATS[key].suffix}
              label={STATS[key].label}
              icon={icon}
              color={color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Step 6: Create How It Works Component

`src/components/how-it-works.tsx`:
```tsx
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { FiLink, FiMessageCircle, FiDollarSign } from "react-icons/fi";

const STEP_ICONS = [FiLink, FiMessageCircle, FiDollarSign];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Cach hoat dong{" "}
            <span className="text-gradient">don gian</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400 max-w-lg mx-auto">
            Chi 3 buoc de bat dau tiet kiem voi Ting Ting
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            return (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-surface-secondary dark:bg-dark-secondary"
              >
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="mt-4 mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-orange/10 dark:bg-brand-orange/20">
                  <Icon className="h-8 w-8 text-brand-orange" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Connector lines (desktop only) */}
        {/* Handled via CSS pseudo-elements or kept simple without lines */}
      </div>
    </section>
  );
}
```

### Step 7: Compose Page

Update `src/app/page.tsx`:
```tsx
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { HowItWorks } from "@/components/how-it-works";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        {/* Remaining sections added in Phase 4 & 5 */}
      </main>
    </>
  );
}
```

## Todo List

- [x] Populate constants.ts with all content data (stats, steps, FAQ, testimonials, nav)
- [x] Create Header component (sticky, glass blur, logo, nav, theme toggle, CTA)
- [x] Create Hero component (headline, subheadline, QR image, CTA buttons, gradient bg)
- [x] Create useCounter hook (intersection observer + requestAnimationFrame)
- [x] Create SocialProof component (3 animated stat counters)
- [x] Create HowItWorks component (3-step stepper with icons)
- [x] Compose all sections in page.tsx
- [x] Create placeholder QR code image in public/
- [x] Test mobile responsiveness of all 4 components
- [x] Test dark mode rendering of all components
- [x] Verify counter animation triggers on scroll

## Success Criteria

- Header sticks to top, becomes translucent with blur on scroll
- Hero displays correctly with headline, QR, and two CTA buttons
- Counter animation plays smoothly when Social Proof scrolls into view
- How It Works shows 3 cards with step numbers, icons, and descriptions
- All sections render correctly in both light and dark themes
- Mobile layout: single column, centered content
- Desktop layout: hero grid 2-col, stats 3-col, steps 3-col

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| QR code image missing | High | Medium | Use placeholder, add actual QR later |
| Counter perf on low-end mobile | Low | Low | requestAnimationFrame handles this well |
| Header z-index conflicts | Low | Low | Use z-50, test with all sections |
| Image optimization issues | Low | Medium | Use next/image with explicit width/height |

## Security Considerations
- External links (Zalo) use `rel="noopener noreferrer"`
- QR code points to legitimate Zalo group link
- No user input or form handling at this stage

## Next Steps
- Phase 4: Content Components (Comparison, Testimonials, FAQ)
