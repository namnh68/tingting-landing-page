# Ting Ting Landing Page

Landing page cho dịch vụ hoàn tiền Shopee / TikTok Shop qua nhóm Zalo **Ting Ting**.

## Tech Stack

| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| Next.js | 15 (App Router) | SSG, SEO, image optimization |
| React | 19 | UI framework |
| Tailwind CSS | v4 (CSS-first) | Styling, responsive layout |
| Framer Motion | 11 | Scroll reveal, stagger animations |
| next-themes | 0.4 | Dark/light mode toggle |
| react-icons | 5 | Icon library |
| TypeScript | 5 | Type safety |

## Yêu cầu

- Node.js >= 18
- npm >= 9

## Cài đặt & chạy

```bash
# Cài dependencies
npm install

# Chạy dev server (http://localhost:3000)
npm run dev

# Build production (static export -> /out)
npm run build

# Chạy production build
npm start

# Kiểm tra linting
npm run lint
```

## Cấu trúc dự án

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 @theme tokens, dark mode, custom utilities
│   ├── layout.tsx           # Root layout: font, ThemeProvider, metadata, JSON-LD
│   ├── page.tsx             # Trang chính — ghép toàn bộ sections
│   ├── robots.ts            # Tạo /robots.txt tĩnh
│   └── sitemap.ts           # Tạo /sitemap.xml tĩnh
├── components/
│   ├── header.tsx           # Sticky header: logo, nav, theme toggle, CTA button
│   ├── hero.tsx             # Section đầu: headline, CTA, QR code
│   ├── social-proof.tsx     # Animated counters: thành viên, đơn hàng, tiền hoàn
│   ├── how-it-works.tsx     # 3 bước hoạt động (stagger animation)
│   ├── comparison.tsx       # So sánh bảng (desktop) / cards (mobile)
│   ├── testimonials.tsx     # Carousel feedback thành viên (auto-scroll)
│   ├── faq.tsx              # Accordion câu hỏi thường gặp
│   ├── promotion.tsx        # 3 lợi ích nổi bật (stagger animation)
│   ├── cta-final.tsx        # CTA cuối trang với QR code lớn
│   ├── footer.tsx           # Footer: links, disclaimer, copyright
│   ├── scroll-reveal.tsx    # Framer Motion scroll reveal wrapper & stagger item
│   ├── theme-provider.tsx   # next-themes ThemeProvider (class strategy)
│   └── theme-toggle.tsx     # Nút chuyển dark/light mode
├── hooks/
│   └── use-counter.ts       # Intersection Observer + rAF animated counter
└── lib/
    └── constants.ts         # Toàn bộ nội dung: stats, FAQ, testimonials, nav items
public/
├── qr-code.jpg              # QR code nhóm Zalo (thay bằng ảnh thật)
└── og-image.png             # Open Graph image 1200×630
```

## Tùy chỉnh nội dung

Mọi nội dung văn bản nằm trong **`src/lib/constants.ts`**:

| Constant | Mô tả |
|----------|-------|
| `ZALO_GROUP_LINK` | URL nhóm Zalo — **cần cập nhật trước khi deploy** |
| `STATS` | Số liệu thống kê (thành viên, đơn hàng, tiền hoàn) |
| `HOW_IT_WORKS_STEPS` | 3 bước hướng dẫn |
| `NAV_ITEMS` | Menu điều hướng |
| `FAQ_ITEMS` | Câu hỏi & trả lời |
| `TESTIMONIALS` | Feedback thành viên |

## Trước khi deploy

- [ ] Thay `public/qr-code.jpg` bằng QR code thật của nhóm Zalo
- [ ] Cập nhật `ZALO_GROUP_LINK` trong `src/lib/constants.ts`
- [ ] Thay `public/og-image.png` bằng ảnh social preview thiết kế (1200×630px)
- [ ] Thêm `public/favicon.ico`
- [ ] Cập nhật `SITE_URL` trong `src/app/layout.tsx` với domain thật

## Deploy lên Vercel

```bash
# Cài Vercel CLI (nếu chưa có)
npm i -g vercel

# Deploy
vercel --prod
```

Hoặc kết nối GitHub repo với [vercel.com](https://vercel.com) để tự động deploy khi push.

## Design System

- **Font:** Be Vietnam Pro (Google Fonts, tối ưu tiếng Việt)
- **Light theme:** Nền trắng, accent cam/đỏ `#FF6B35 → #F7931E`
- **Dark theme:** Nền `#0F172A`, accent cam/vàng
- **Dark mode:** Toggle thủ công (class strategy, không theo hệ thống)
- **Responsive:** Mobile-first, breakpoints `sm` / `md`
- **Animations:** Scroll reveal fade-up, stagger cards, animated counters khi vào viewport

## Build output

```
Route (app)          Size     First Load JS
○ /                 48 kB         150 kB
○ /robots.txt      124 B         102 kB
○ /sitemap.xml     124 B         102 kB
```

Tất cả routes được xuất dưới dạng **static HTML** (`output: "export"`).
