---
phase: 5
title: "Integration & SEO"
status: completed
effort: 30m
dependencies: [phase-03, phase-04]
completed: 2026-04-26
---

# Phase 5: Integration & SEO

## Overview

Kết nối tất cả lại: thêm `BaiVietPreview` vào landing page sau FAQ, thêm nav link "Bài viết" vào header, cập nhật sitemap để Google index tất cả bài.

## Files to Modify

- `src/app/page.tsx` — thêm `<BaiVietPreview />` sau `<FAQ />`
- `src/lib/constants.ts` — thêm "Bài viết" vào `NAV_ITEMS`
- `src/app/sitemap.ts` — include tất cả published posts

## Implementation

### 1. `src/app/page.tsx` — thêm BaiVietPreview sau FAQ

```typescript
// Thêm import:
import { BaiVietPreview } from "@/components/tips-preview";

// Trong JSX, thêm sau <FAQ />:
<FAQ />
<BaiVietPreview />
<Promotion />
```

File đầy đủ sau khi sửa:

```typescript
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { HowItWorks } from "@/components/how-it-works";
import { Comparison } from "@/components/comparison";
import { Testimonials } from "@/components/testimonials";
import { FeedbackScreenshots } from "@/components/feedback-screenshots";
import { FAQ } from "@/components/faq";
import { BaiVietPreview } from "@/components/tips-preview";
import { Promotion } from "@/components/promotion";
import { CTAFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";
import { StickyCtaBar } from "@/components/sticky-cta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Comparison />
        <Testimonials />
        <FeedbackScreenshots />
        <FAQ />
        <BaiVietPreview />
        <Promotion />
        <CTAFinal />
      </main>
      <Footer />
      <StickyCtaBar />
    </>
  );
}
```

### 2. `src/lib/constants.ts` — thêm nav item

```typescript
export const NAV_ITEMS = [
  { label: "Cách hoạt động", href: "#how-it-works" },
  { label: "So sánh", href: "#comparison" },
  { label: "Đánh giá", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Bài viết", href: "/tips" },
] as const;
```

**Lưu ý:** Item mới dùng `href: "/tips"` (absolute path) thay vì `#anchor`. Header hiện tại dùng `<a href={item.href}>` nên hoạt động bình thường.

### 3. `src/app/sitemap.ts` — include blog posts

```typescript
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = "https://tingting.vercel.app";
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/tips/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tips`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postEntries,
  ];
}
```

## Verification Checklist

Sau khi sửa xong, chạy:

```bash
npm run build
```

Kiểm tra output:
- `○ /tips` — static page ✓
- `○ /tips/meo-mua-sam-shopee-tiet-kiem` — static page ✓
- `○ /tips/huong-dan-hoan-tien-tiktok-shop` — static page ✓
- `○ /sitemap.xml` — static ✓

## Todo

- [x] Sửa `src/app/page.tsx` — thêm import + `<BaiVietPreview />`
- [x] Sửa `src/lib/constants.ts` — thêm "Bài viết" vào `NAV_ITEMS`
- [x] Sửa `src/app/sitemap.ts` — include blog posts
- [x] Chạy `npm run build` — verify không lỗi
- [x] Chạy `npm run dev` — kiểm tra UI visually

## Success Criteria

- `npm run build` thành công, không lỗi TypeScript
- Landing page: section "Bài viết hữu ích" hiển thị sau FAQ
- Header: có link "Bài viết" dẫn tới `/tips`
- `sitemap.xml` chứa URL từng bài viết
- Dark/light mode đúng trên tất cả trang mới
- Mobile responsive: grid 1 cột trên mobile, 2-3 cột trên desktop
