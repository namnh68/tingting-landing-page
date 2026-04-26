---
title: "Phase 09 — Mobile Responsive Polish"
status: complete
priority: P1
effort: 2h
depends_on: [phase-08]
completed_date: 2026-04-24
---

# Phase 09 — Mobile Responsive Polish

## Context
- Brainstorm: [plans/reports/brainstorm-260424-1148-mobile-responsive-polish.md](../reports/brainstorm-260424-1148-mobile-responsive-polish.md)
- Target devices: 360px (Samsung A), 375px (iPhone SE), 390px (iPhone 14), 414px (iPhone XS Max)

## Overview
Audit toàn bộ landing page, fix 5 responsive gaps rõ ràng, thêm sticky bottom CTA bar cho mobile.

---

## Requirements
- Header nav accessible trên mobile (hamburger menu)
- Testimonials không overflow arrows ra ngoài screen
- CTAFinal button full-width trên mobile
- SocialProof compact 3-col trên mọi viewport
- Sticky bottom CTA bar (md:hidden) để tăng conversion

---

## Related Code Files

**Modify:**
- `src/components/header.tsx`
- `src/components/testimonials.tsx`
- `src/components/cta-final.tsx`
- `src/components/social-proof.tsx`
- `src/app/page.tsx`

**Create:**
- `src/components/sticky-cta.tsx`

---

## Implementation Steps

### Task 1 — Hamburger menu (header.tsx)

1. Thêm state `const [menuOpen, setMenuOpen] = useState(false)`
2. Thêm `useEffect` đóng menu khi scroll (reuse `handleScroll`) và Escape key
3. Trong header div, thêm button `md:hidden` với `FiMenu`/`FiX` icon toggle
4. Ẩn CTA "Tham gia ngay" trong header trên mobile (`hidden sm:block`) — sẽ thay bằng sticky bar
5. Thêm mobile menu div ngay sau `<div className="flex h-16...">`:

```tsx
{/* Mobile menu */}
<div className={`md:hidden overflow-hidden transition-all duration-300 ${
  menuOpen ? "max-h-96 border-t border-surface-tertiary dark:border-dark-tertiary" : "max-h-0"
}`}>
  <nav className="flex flex-col gap-1 px-4 py-3">
    {NAV_ITEMS.map(...)}
    <a href={ZALO_GROUP_LINK} className="...rounded-full CTA button...">Tham gia ngay</a>
  </nav>
</div>
```

6. Đóng menu khi click link: thêm `onClick={() => setMenuOpen(false)}` vào mỗi nav link

### Task 2 — Testimonials mobile (testimonials.tsx)

1. Arrow buttons: thêm `hidden md:flex` vào className của cả 2 buttons
2. Card width: đổi `w-[300px]` → `w-[85vw] sm:w-[300px]`

### Task 3 — CTAFinal button (cta-final.tsx)

1. Button `<a>`: thêm `block sm:inline-block` và `w-full sm:w-auto text-center`

### Task 4 — SocialProof compact (social-proof.tsx)

1. Grid: đổi `grid-cols-1 sm:grid-cols-3` → `grid-cols-3`
2. StatItem padding: `p-2 sm:p-4`
3. Counter số: `text-2xl sm:text-4xl`
4. Gap: `gap-2 sm:gap-6`

### Task 5 — Sticky bottom CTA bar (sticky-cta.tsx — mới)

```tsx
"use client";
// IntersectionObserver trên #hero-anchor → ẩn khi Hero visible, hiện khi scroll past
// fixed bottom-0 left-0 right-0 z-40 md:hidden
// pb-safe (env(safe-area-inset-bottom)) cho notch phones
```

Cấu trúc:
- `fixed bottom-0 left-0 right-0 z-40 md:hidden`
- Gradient `bg-gradient-brand` hoặc white với shadow-top
- Full-width button "Tham gia nhóm Zalo" → `ZALO_GROUP_LINK`
- `style={{ paddingBottom: "env(safe-area-inset-bottom)" }}` cho iPhone notch

Trong `page.tsx`:
- Import `<StickyCtaBar />` và render sau `<Footer />`
- Thêm `id="hero-section"` vào `<section>` trong `hero.tsx` (IntersectionObserver target)
- Thêm `pb-20 md:pb-0` vào `<main>` trong `page.tsx`

### Task 6 — Cross-breakpoint audit

Mở Chrome DevTools → Responsive mode, test tại:
- 360 × 800 (Samsung Galaxy A series — phổ biến nhất VN)
- 375 × 667 (iPhone SE)
- 390 × 844 (iPhone 14)
- 414 × 896 (iPhone XS Max)

Checklist:
- [ ] Không có horizontal scroll
- [ ] Header hamburger hoạt động
- [ ] Sticky bar hiện sau Hero
- [ ] Testimonials swipe smooth, arrows ẩn
- [ ] CTAFinal button full-width
- [ ] SocialProof 3-col không overflow text

---

## Todo List

- [x] Task 1: Header hamburger menu
- [x] Task 2: Testimonials mobile fix
- [x] Task 3: CTAFinal button width
- [x] Task 4: SocialProof compact grid
- [x] Task 5: Sticky bottom CTA bar
- [x] Task 6: Cross-breakpoint audit
- [x] Update plan.md status → complete

---

## Success Criteria
- Không horizontal scroll ở 360px
- Nav accessible qua hamburger
- Sticky CTA visible khi scroll past Hero
- Touch targets ≥ 44px trên tất cả interactive elements

## Risk Assessment
| Risk | Mitigation |
|------|-----------|
| Sticky bar che footer/content | `pb-16 md:pb-0` trên `<main>` |
| Hamburger animation gây reflow | CSS max-height transition (không JS) |
| `env(safe-area-inset-bottom)` không support cũ | Fallback `pb-4` |
