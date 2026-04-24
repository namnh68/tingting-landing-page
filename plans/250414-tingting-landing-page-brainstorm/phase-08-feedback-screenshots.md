# Phase 8: Feedback Screenshots Gallery

## Context Links
- [Plan Overview](./plan.md)
- [Phase 4: Content Components](./phase-04-content-components.md)
- [Phase 6: Animations & Polish](./phase-06-animations-and-polish.md)

## Overview
- **Priority:** P1
- **Status:** Complete
- **Effort:** 1.5h
- **Description:** Thêm section hiển thị 3–5 ảnh chụp màn hình chat thực tế từ người dùng Ting Ting. Mục tiêu tăng trust (social proof trực quan) — người dùng thấy hình ảnh giao dịch thật sẽ tin tưởng hơn text testimonials. Section đặt ngay sau Testimonials, trước FAQ.

## Key Insights
- Ảnh chat thật tạo social proof mạnh hơn text vì khó làm giả
- Dùng Next.js `<Image>` với `fill` / `width`+`height` cho optimization tự động (WebP, lazy load)
- Lightbox đơn giản bằng `useState` + portal overlay — không cần thư viện ngoài (KISS)
- Grid responsive: 2 cột mobile → 3 cột desktop; stagger animation khi scroll vào viewport
- Ảnh đặt tại `public/images/feedback/` — user thay thế bằng ảnh thật trước khi deploy
- Không hardcode dimensions — dùng `aspect-ratio` container để ảnh mọi tỉ lệ đều hiển thị đẹp
- Section title: "Bằng chứng thực tế" hoặc "Ảnh chụp từ thành viên"

## Requirements

### Functional
- Hiển thị 3–5 ảnh trong grid responsive
- Click vào ảnh mở lightbox full-screen với nút đóng (X) và điều hướng prev/next
- Lightbox đóng khi nhấn `Escape` hoặc click ra ngoài ảnh
- Lazy load ảnh (Next.js Image tự xử lý)

### Non-functional
- Không thêm library ngoài (no react-lightbox, no swiper)
- Ảnh được optimize qua Next.js Image pipeline
- Accessibility: `alt` text mô tả, keyboard navigation trong lightbox (`Escape`, arrow keys)
- Scroll reveal animation khi vào viewport (dùng `<ScrollReveal>` đã có)
- Dark mode: overlay đậm hơn, border cards phù hợp theme

## Architecture

```
New Section:
  <FeedbackScreenshots />
    ├── Section header ("Bằng chứng thực tế")
    ├── Grid (2-col mobile / 3-col desktop)
    │   └── ImageCard × N  (click → open lightbox)
    └── Lightbox (conditional render)
        ├── Backdrop (click to close)
        ├── <Image> full view
        └── Prev / Next / Close buttons

Data:
  src/lib/constants.ts  → thêm FEEDBACK_IMAGES array
  public/images/feedback/
    ├── feedback-01.jpg  (placeholder → user thay bằng ảnh thật)
    ├── feedback-02.jpg
    ├── feedback-03.jpg
    ├── feedback-04.jpg  (tuỳ chọn)
    └── feedback-05.jpg  (tuỳ chọn)
```

## Related Code Files

### Files to Create
- `src/components/feedback-screenshots.tsx` — section + lightbox component

### Files to Modify
- `src/lib/constants.ts` — thêm `FEEDBACK_IMAGES` array
- `src/app/page.tsx` — import và thêm `<FeedbackScreenshots />` sau `<Testimonials />`

### Assets to Add
- `public/images/feedback/feedback-01.jpg` đến `feedback-05.jpg`
  - **Placeholder ngay:** dùng ảnh mẫu kích thước 390×844 (tỉ lệ màn hình điện thoại)
  - User replace bằng ảnh chat thật trước khi production deploy

## Implementation Steps

### Step 1: Thêm data vào constants.ts

```ts
// src/lib/constants.ts — thêm vào cuối
export const FEEDBACK_IMAGES = [
  {
    src: "/images/feedback/feedback-01.jpg",
    alt: "Thành viên hoàn tiền thành công qua Ting Ting",
    caption: "Hoàn 45.000đ đơn Shopee",
  },
  {
    src: "/images/feedback/feedback-02.jpg",
    alt: "Chat xác nhận hoàn tiền từ nhóm Ting Ting",
    caption: "Hoàn 120.000đ đơn TikTok Shop",
  },
  {
    src: "/images/feedback/feedback-03.jpg",
    alt: "Thành viên chia sẻ trải nghiệm nhóm Ting Ting",
    caption: "Feedback thành viên",
  },
  // Tuỳ chọn — thêm tối đa 5
  // { src: "/images/feedback/feedback-04.jpg", alt: "...", caption: "..." },
  // { src: "/images/feedback/feedback-05.jpg", alt: "...", caption: "..." },
];
```

### Step 2: Tạo component `feedback-screenshots.tsx`

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FEEDBACK_IMAGES } from "@/lib/constants";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";

type FeedbackImage = (typeof FEEDBACK_IMAGES)[number];

function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: FeedbackImage[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Image container — click không đóng */}
      <div
        className="relative max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden">
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 384px"
            priority
          />
        </div>

        {/* Caption */}
        {images[current].caption && (
          <p className="text-center text-sm text-gray-300 mt-3">
            {images[current].caption}
          </p>
        )}

        {/* Counter */}
        <p className="text-center text-xs text-gray-500 mt-1">
          {current + 1} / {images.length}
        </p>
      </div>

      {/* Controls */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Đóng"
      >
        <FiX className="h-5 w-5 text-white" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Ảnh trước"
          >
            <FiChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Ảnh tiếp"
          >
            <FiChevronRight className="h-5 w-5 text-white" />
          </button>
        </>
      )}
    </div>
  );
}

export function FeedbackScreenshots() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="feedback-screenshots" className="py-16 md:py-24 bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Bằng chứng{" "}
            <span className="text-gradient">thực tế</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400">
            Ảnh chụp màn hình thật từ thành viên nhóm Ting Ting
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {FEEDBACK_IMAGES.map((img, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
            >
              <button
                onClick={() => setLightboxIndex(index)}
                className="group relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-surface-tertiary dark:bg-dark-tertiary shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-orange"
                aria-label={`Xem ảnh: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <FiZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Caption badge */}
                {img.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs text-white font-medium truncate">{img.caption}</p>
                  </div>
                )}
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={FEEDBACK_IMAGES}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
```

### Step 3: Thêm placeholder images

Tạo thư mục `public/images/feedback/` và đặt ảnh placeholder:
```bash
mkdir -p public/images/feedback
# Dùng ảnh mẫu từ picsum hoặc copy ảnh tạm 390x844px
# User sẽ thay thế bằng ảnh chat thật trước deploy
```

**Lưu ý cho user:** Đặt ảnh chụp màn hình chat (JPG/PNG) vào `public/images/feedback/` với tên `feedback-01.jpg`, `feedback-02.jpg`, ..., `feedback-05.jpg`. Kích thước khuyến nghị: tối thiểu 390×844px (portrait, tỉ lệ 9:16 giống màn hình điện thoại).

### Step 4: Cập nhật page.tsx

```tsx
// src/app/page.tsx
import { FeedbackScreenshots } from "@/components/feedback-screenshots";

// Thêm vào sau <Testimonials />:
<Testimonials />
<FeedbackScreenshots />
<FAQ />
```

## Todo List

- [x] Thêm `FEEDBACK_IMAGES` array vào `src/lib/constants.ts`
- [x] Tạo `src/components/feedback-screenshots.tsx` (grid + lightbox)
- [x] Tạo thư mục `public/images/feedback/`
- [x] Đặt ảnh placeholder (3–5 ảnh) vào `public/images/feedback/`
- [x] Import và thêm `<FeedbackScreenshots />` vào `src/app/page.tsx`
- [x] Test lightbox: mở, đóng (X, Escape, click ngoài), prev/next, keyboard
- [x] Test grid responsive: 2 cột mobile, 3 cột tablet+
- [x] Test dark mode: background, hover overlay
- [ ] Thay placeholder bằng ảnh chat thật trước khi deploy
- [x] Kiểm tra Next.js Image build không báo lỗi missing images

## Success Criteria

- Grid hiển thị đúng 2 cột trên mobile, 3 cột trên desktop
- Click ảnh → lightbox mở với ảnh đó; prev/next hoạt động đúng thứ tự vòng lặp
- Escape / click ngoài → lightbox đóng; `body` scroll được restore
- Ảnh lazy load, không blocking render
- Dark mode đúng màu nền và overlay
- Không có dependency mới ngoài Next.js built-in

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Ảnh tỉ lệ khác 9:16 bị crop xấu | Medium | Low | Dùng `object-cover` + user đặt ảnh đúng tỉ lệ |
| Lightbox body scroll lock conflict | Low | Low | `document.body.style.overflow` cleanup trong `useEffect` return |
| Missing image → build error | Medium | Medium | Đặt đủ placeholder trước khi build |
| ScrollReveal delay tổng quá dài nếu 5 ảnh | Low | Low | Giới hạn delay tối đa 0.4s (index * 0.1) |

## Security Considerations
- Không có user input, không có upload — toàn bộ ảnh từ `public/` static
- `alt` text không render HTML, không XSS risk

## Next Steps
- Sau khi implement xong, user thay thế placeholder bằng ảnh chat thật
- Có thể mở rộng thêm caption chi tiết hơn (tên thành viên ẩn danh + số tiền hoàn)
