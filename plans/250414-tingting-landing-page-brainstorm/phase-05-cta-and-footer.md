# Phase 5: CTA & Footer

## Context Links
- [Plan Overview](./plan.md)
- [Phase 4: Content Components](./phase-04-content-components.md)
- [Brainstorm Summary](./brainstorm-summary.md)

## Overview
- **Priority:** P1
- **Status:** Complete
- **Effort:** 1.5h
- **Description:** Implement the final three sections: Promotion/Offers banner, Final CTA with large QR code, and Footer with contact info and disclaimer.

## Key Insights
- Promotion section creates urgency/scarcity (free lifetime badge)
- Final CTA is the strongest conversion point — large QR, bold button, reinforcement text
- Footer must include disclaimer about commission conditions (transparency builds trust)
- These sections complete the page structure

## Requirements

### Functional
- Promotion: eye-catching banner with "FREE" badge and benefits
- Final CTA: large QR code, prominent Zalo join button, social proof reinforcement
- Footer: contact info, disclaimer, copyright

### Non-functional
- CTA buttons link to Zalo group
- Footer disclaimer clearly visible
- Responsive across breakpoints

## Related Code Files

### Files to Create
- `src/components/promotion.tsx`
- `src/components/cta-final.tsx`
- `src/components/footer.tsx`

### Files to Modify
- `src/app/page.tsx` — add final sections
- `src/lib/constants.ts` — add promotion/footer constants if needed

## Implementation Steps

### Step 1: Create Promotion Component

`src/components/promotion.tsx`:
```tsx
import { FiGift, FiShield, FiZap } from "react-icons/fi";

const BENEFITS = [
  {
    icon: FiGift,
    title: "Miễn phí trọn đời",
    description: "Không mất phí tham gia, chỉ cần tham gia vào nhóm Zalo, gửi link sản phẩm.",
  },
  {
    icon: FiShield,
    title: "An toàn tuyệt đối",
    description: "Vẫn là link sản phẩm của người mua, chỉ gắn thêm Aff để nhận được hoa hồng.",
  },
  {
    icon: FiZap,
    title: "Tu dong & nhanh chong",
    description: "Bot xử lý tự động, trả link có hoa hồng ngay lập tức",
  },
];

export function Promotion() {
  return (
    <section className="py-16 md:py-24 bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-600 dark:text-green-400 mb-4">
            FREE — Mien phi tron doi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Tai sao chon{" "}
            <span className="text-gradient">Ting Ting?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-2xl bg-surface-primary dark:bg-dark-primary p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-orange/10 dark:bg-brand-orange/20">
                  <Icon className="h-7 w-7 text-brand-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

### Step 2: Create Final CTA Component

`src/components/cta-final.tsx`:
```tsx
import Image from "next/image";
import { ZALO_GROUP_LINK } from "@/lib/constants";

export function CTAFinal() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        {/* Gradient background card */}
        <div className="rounded-3xl bg-gradient-brand p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            San sang tiet kiem?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-md mx-auto">
            Tham gia nhom Zalo Ting Ting ngay — hon 100 nguoi da tiet kiem cung chung toi!
          </p>

          {/* QR Code */}
          <div className="inline-block rounded-2xl bg-white p-5 shadow-lg mb-6">
            <Image
              src="/qr-code.jpg"
              alt="QR Code nhom Zalo Ting Ting"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>

          <p className="text-white/80 text-sm mb-6">
            Quet ma QR hoac nhan nut ben duoi
          </p>

          {/* CTA Button */}
          <a
            href={ZALO_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-white px-10 py-4 text-lg font-bold text-brand-orange shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Tham gia nhom Zalo
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Key patterns:**
- Full gradient background card for maximum visual impact
- White QR code container for contrast
- White CTA button (inverted from gradient) for contrast
- `hover:scale-105` for subtle press feedback
- Reinforcement stat ("hon 100 nguoi") for social proof

### Step 3: Create Footer Component

`src/components/footer.tsx`:
```tsx
import { ZALO_GROUP_LINK } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-surface-tertiary dark:border-dark-tertiary bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-gradient mb-2">
              Ting Ting
            </div>
            <p className="text-sm text-text-secondary dark:text-gray-400">
              San deal hoi — Hoan hoa hong. Tiet kiem thong minh voi Shopee va TikTok Shop.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 dark:text-white">Lien ket</h4>
            <ul className="space-y-2 text-sm text-text-secondary dark:text-gray-400">
              <li>
                <a href="#how-it-works" className="hover:text-brand-orange transition-colors">
                  Cach hoat dong
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-brand-orange transition-colors">
                  So sanh loi ich
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-orange transition-colors">
                  Cau hoi thuong gap
                </a>
              </li>
              <li>
                <a
                  href={ZALO_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  Nhom Zalo
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 dark:text-white">Lien he</h4>
            <ul className="space-y-2 text-sm text-text-secondary dark:text-gray-400">
              <li>Zalo: Nhom Ting Ting</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-surface-tertiary dark:border-dark-tertiary">
          <p className="text-xs text-text-muted text-center leading-relaxed">
            Disclaimer: Hoa hong phu thuoc vao chinh sach affiliate cua tung san thuong mai
            (Shopee, TikTok Shop). Ty le hoan va thoi gian xu ly co the thay doi. Ting Ting
            hoan lai 80% hoa hong affiliate nhan duoc. Khong phai la dich vu tai chinh.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Ting Ting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

### Step 4: Final Page Composition

Update `src/app/page.tsx` with all 10 sections:
```tsx
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { HowItWorks } from "@/components/how-it-works";
import { Comparison } from "@/components/comparison";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Promotion } from "@/components/promotion";
import { CTAFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";

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
        <Promotion />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
```

## Todo List

- [x] Create Promotion component (3 benefit cards with FREE badge)
- [x] Create CTAFinal component (gradient card, large QR, join button)
- [x] Create Footer component (brand, links, contact, disclaimer, copyright)
- [x] Update page.tsx with all 10 sections in correct order
- [x] Test mobile layout (stacked cards, centered QR)
- [x] Test dark mode for all three components
- [x] Verify all Zalo links work correctly
- [x] Verify disclaimer text is readable

## Success Criteria

- Promotion shows 3 benefit cards with icons and FREE badge
- Final CTA displays large QR on gradient background with prominent button
- Footer shows brand, links, contact, disclaimer, and copyright
- All sections render correctly in dark mode
- Page composition complete with all 10 sections
- CTA button and QR code link to Zalo group

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| QR code image not provided | High | Medium | Use placeholder, add real QR later |
| Disclaimer text too small | Low | Medium | Use text-xs but ensure readable contrast |
| CTA gradient not visible in dark mode | Low | Low | Gradient bg is self-contained, works in both themes |

## Security Considerations
- External Zalo links use `rel="noopener noreferrer"`
- Disclaimer clearly states commission conditions
- `new Date().getFullYear()` used for dynamic copyright year

## Next Steps
- Phase 6: Animations & Polish
