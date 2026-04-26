# Brainstorm: Mobile Responsive Polish

**Date:** 2026-04-24
**Status:** Agreed
**Phase:** 9 — Mobile Responsive Polish

---

## Problem Statement

Landing page đã có responsive foundation tốt (Tailwind mobile-first, breakpoints sm/md), nhưng còn 5 gaps cụ thể ảnh hưởng UX người dùng Zalo mobile (đa số dùng 360–414px):

1. Header nav hoàn toàn ẩn trên mobile — không có hamburger menu
2. Testimonials arrow buttons tràn ra ngoài container (`-translate-x-4`)
3. Testimonials card `w-[300px]` cứng — gần full-width trên 360px, không peek card kế
4. CTAFinal button không full-width — tap target nhỏ trên mobile
5. SocialProof `grid-cols-1 sm:grid-cols-3` — lãng phí vertical space trên mobile

Không có bug report cụ thể — đây là proactive audit trước khi share rộng.

---

## Evaluated Approaches

### Header hamburger
- **Slide-down dropdown** (chosen): ~40 lines inline trong `header.tsx`, slide-down bên dưới header với backdrop-blur. KISS.
- **Full-screen overlay**: UX tốt hơn nhưng +60 lines, over-engineering cho landing page 4 nav links.

### Sticky bottom CTA bar
- **IntersectionObserver trên Hero**: trigger ẩn/hiện khi Hero ra khỏi viewport — chính xác, không dùng scroll event.
- **Scroll listener**: đơn giản hơn nhưng kém performant.

---

## Final Solution

### Task 1 — Hamburger menu (header.tsx)
- State `menuOpen` — icon FiMenu/FiX toggle
- Nav dropdown: `absolute top-full left-0 right-0`, `max-h-0 → max-h-96` CSS transition
- Đóng khi: link click, Escape, scroll

### Task 2 — Testimonials mobile (testimonials.tsx)
- Arrow buttons: thêm `hidden md:flex`
- Cards: `w-[85vw] sm:w-[300px]` — tạo peek ~15% card tiếp theo

### Task 3 — CTAFinal button (cta-final.tsx)
- `w-full sm:w-auto block sm:inline-block`

### Task 4 — SocialProof compact (social-proof.tsx)
- `grid-cols-3` luôn (bỏ `sm:` prefix)
- Numbers: `text-2xl sm:text-4xl`, gap: `gap-1 sm:gap-6`, padding: `p-2 sm:p-4`

### Task 5 — Sticky bottom CTA bar (sticky-cta.tsx — mới)
- `fixed bottom-0 left-0 right-0 z-40 md:hidden`
- IntersectionObserver trên Hero — ẩn khi Hero visible, hiện khi scroll past
- Thêm `pb-16 md:pb-0` vào `<main>` để tránh content bị che
- Gradient background, full-width button, safe area inset-bottom

### Task 6 — Cross-breakpoint audit
- Test manual: 360px (Samsung A), 375px (iPhone SE), 390px (iPhone 14), 414px (iPhone XS Max)
- Dùng Chrome DevTools

---

## Files Affected

| File | Action |
|------|--------|
| `src/components/header.tsx` | Modify — hamburger + mobile menu |
| `src/components/testimonials.tsx` | Modify — hide arrows, card width |
| `src/components/cta-final.tsx` | Modify — button width |
| `src/components/social-proof.tsx` | Modify — compact grid |
| `src/components/sticky-cta.tsx` | **NEW** — sticky bottom bar |
| `src/app/page.tsx` | Modify — import StickyCtaBar |
| `plans/250414-tingting-landing-page-brainstorm/plan.md` | Update — add Phase 9 |

---

## Risks

| Risk | Mitigation |
|------|-----------|
| Sticky bar che nội dung | `pb-16 md:pb-0` trên main |
| Hamburger menu gây reflow | CSS max-height transition, không dùng JS animation |
| IntersectionObserver không support | Fallback: luôn show sticky bar |

---

## Success Criteria
- Header nav accessible trên tất cả breakpoints
- Testimonials arrows không overflow
- Sticky bar hiện sau khi scroll past Hero
- Không có horizontal scroll trên 360px
- Touch targets ≥ 44px
