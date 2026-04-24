# Ting Ting Landing Page - Brainstorm Summary

**Date:** 2026-04-14
**Status:** Agreed
**Project:** tingting-landingpage

---

## Problem Statement

Xay dung landing page gioi thieu nhom Zalo "Ting Ting - San deal hoi - Hoan hoa hong". Mo hinh: nguoi dung gui link san pham vao nhom → bot tra link affiliate → don thanh cong → hoan 80% hoa hong cho nguoi dung, 20% cho chu nhom. Landing page can tao do tin cay va chuyen doi nguoi xem thanh thanh vien nhom Zalo.

---

## Final Solution

### Tech Stack
| Component | Choice | Reason |
|-----------|--------|--------|
| Framework | Next.js 15 (App Router) | SSG, SEO, image optimization |
| Styling | Tailwind CSS v4 | Dark/light mode, utility-first |
| Animation | Framer Motion | Counter, scroll reveal, hover |
| Theme | next-themes | Dark/light toggle |
| Icons | react-icons | Lightweight icon set |
| Deploy | Vercel | Free tier, zero-config |
| Domain | Vercel subdomain (initial) | tingting.vercel.app |

### Page Structure (10 Sections)

#### 1. Header (Sticky)
- Logo + "Ting Ting"
- Dark/Light toggle button
- CTA "Tham gia ngay" (sticky, always visible)

#### 2. Hero Section
- **Headline:** "Mua sam thong minh - Hoan tien len den 80%"
- **Subheadline:** Giai thich ngan gon mo hinh hoan hoa hong
- CTA button lon + QR code nhom Zalo
- Background gradient cam/do (light) hoac dark gradient
- Hinh minh hoa (screenshot nhom/app)

#### 3. Social Proof Bar (Animated Counters)
- `100+` thanh vien tin tuong
- `300+` don hang hoan tien thanh cong
- `5,000,000d+` da hoan cho thanh vien
- Animation: counter chay so khi scroll vao view

#### 4. How It Works (3 Steps)
1. Gui link san pham Shopee/TikTok vao nhom Zalo
2. Bot gui lai link hoan tien - ban mua hang binh thuong
3. Don thanh cong → nhan hoan 80% hoa hong

- Visual: Icons/illustrations cho moi buoc
- Timeline/stepper layout

#### 5. So Sanh Loi Ich (Comparison Table)
| | Mua binh thuong | Mua qua Ting Ting |
|---|---|---|
| Hoan tien | 0% | Len den 80% hoa hong |
| Gia san pham | Giong nhau | Giong nhau |
| Buoc them | Khong | Chi 1 buoc gui link |
| Ho tro | Tu luc | 24/7 trong nhom |
| San thuong mai | - | Shopee, TikTok Shop |

#### 6. Testimonials (Carousel)
- Cards xoay tu dong + swipe manual
- Feedback thuc tu thanh vien
- Screenshots don hang hoan tien thanh cong
- Ten/avatar thanh vien (co the an danh)

#### 7. FAQ (Accordion)
- Co mat phi tham gia khong? → Mien phi 100%
- Hoan tien bao lau? → Theo chu ky Shopee/TikTok (thuong 30-45 ngay)
- Co an toan khong? → Link chinh hang, chi them ma affiliate
- Ap dung san nao? → Shopee, TikTok Shop
- Tien hoan ve dau? → Chuyen khoan truc tiep

#### 8. Khuyen Mai / Uu Dai
- Banner noi bat cho thanh vien moi
- Countdown timer (optional, cho deal gioi han)
- Badge "FREE" / "Mien phi tron doi"

#### 9. CTA Final
- QR code lon + nut "Tham gia nhom Zalo"
- Reinforcement: "Hon 100 nguoi da tiet kiem cung Ting Ting"
- Urgency element nhe

#### 10. Footer
- Thong tin lien he
- Disclaimer ve hoa hong va dieu kien
- Social links (neu co)

### Design System
- **Light theme:** Gradient cam/do (#FF6B35 → #F7931E), nen trang
- **Dark theme:** Nen toi (#0F172A), accent cam/vang
- **Font:** Inter hoac Be Vietnam Pro (Vietnamese optimized)
- **Border radius:** Rounded (bo tron)
- **Shadows:** Soft shadows cho cards
- **Responsive:** Mobile-first (da so user Zalo dung mobile)

### Animations
- Counter chay so (intersection observer trigger)
- Scroll reveal (fade up, stagger)
- Hover effects tren cards va buttons
- Smooth scroll giua cac sections
- Theme transition animation

---

## Project Structure (Proposed)

```
tingting-landingpage/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Main landing page
│   │   └── globals.css         # Tailwind + custom styles
│   ├── components/
│   │   ├── header.tsx          # Sticky header
│   │   ├── hero.tsx            # Hero section
│   │   ├── social-proof.tsx    # Animated counters
│   │   ├── how-it-works.tsx    # 3-step guide
│   │   ├── comparison.tsx      # Benefits comparison
│   │   ├── testimonials.tsx    # Carousel testimonials
│   │   ├── faq.tsx             # Accordion FAQ
│   │   ├── promotion.tsx       # Deals/offers
│   │   ├── cta-final.tsx       # Final CTA + QR
│   │   ├── footer.tsx          # Footer
│   │   └── theme-toggle.tsx    # Dark/light switch
│   ├── hooks/
│   │   └── use-counter.ts      # Animated counter hook
│   └── lib/
│       └── constants.ts        # Content data, stats, FAQ items
├── public/
│   ├── images/                 # Logo, screenshots, testimonials
│   └── qr-code.jpg            # QR code nhom Zalo
├── docs/
│   ├── code-standards.md
│   └── system-architecture.md
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| User khong tin tuong | High | Social proof manh (so lieu thuc, testimonials, screenshots) |
| Load cham tren mobile | Medium | SSG, image optimization, lazy loading |
| QR code bi loi | Low | Backup link text ben canh QR |
| Dark mode loi hien thi | Low | Test ky ca 2 themes |

## Success Metrics
- Bounce rate < 40%
- Time on page > 2 phut
- Click-through rate (CTA) > 15%
- QR scan / link click conversion

## Next Steps
1. Khoi tao project Next.js + Tailwind
2. Setup dark/light theme
3. Implement tung section theo thu tu
4. Them assets (logo, anh, QR)
5. Test responsive + dark mode
6. Deploy len Vercel
