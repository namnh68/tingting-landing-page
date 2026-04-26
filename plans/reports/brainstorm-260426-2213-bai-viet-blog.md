# Brainstorm: Thêm Mục "Bài Viết" cho Ting Ting Landing Page

**Date:** 2026-04-26
**Status:** Agreed

---

## Problem Statement

Thêm mục "Bài viết" vào landing page Ting Ting để lưu các bài viết hữu ích, hướng dẫn mua sắm. Yêu cầu:
- Thêm/sửa/xóa bài viết được
- Chuẩn SEO để Google index
- Hỗ trợ chạy quảng cáo sau này

## Constraints

- Stack hiện tại: Next.js 15 App Router + Cloudflare Workers (OpenNext)
- Chỉ 1 người (dev) quản lý bài viết
- Deploy lại sau khi thêm bài là OK
- Dưới 50 bài viết

## Evaluated Approaches

| | Option A: MDX Files | Option B: Notion CMS | Option C: D1 + Admin |
|---|---|---|---|
| SEO | ✅ Static HTML | ⚠️ Phụ thuộc API | ✅ Tốt |
| Chi phí | ✅ $0 | ⚠️ Notion rate limit | ❌ Phức tạp |
| CF Workers | ✅ 100% tương thích | ❌ Edge runtime issues | ✅ Native |
| Dev effort | ✅ Thấp | ⚠️ Trung bình | ❌ Cao |
| KISS | ✅ | ❌ | ❌ |

## Final Solution: MDX Files + Next.js SSG

### File Structure

```
content/
└── posts/
    └── [slug].mdx

src/
├── app/
│   ├── page.tsx                  ← thêm <BaiVietPreview /> sau FAQ
│   └── bai-viet/
│       ├── page.tsx              ← /bai-viet (danh sách)
│       └── [slug]/page.tsx       ← /bai-viet/[slug] (nội dung)
├── components/
│   ├── bai-viet-preview.tsx      ← section trên landing (3 bài mới nhất)
│   └── bai-viet-card.tsx         ← card tái sử dụng
└── lib/
    └── posts.ts                  ← read/parse MDX (build-time only)
```

### MDX Frontmatter Schema

```yaml
---
title: "Mẹo mua sắm Shopee tiết kiệm nhất 2026"
description: "Hướng dẫn chi tiết..."
date: "2026-04-26"
slug: "meo-mua-sam-shopee"
tags: ["shopee", "meo-mua-sam"]
published: true
---
```

### SEO Implementation

- `generateMetadata()` per article — title, description, OG tags
- JSON-LD `Article` schema cho mỗi bài
- Sitemap tự động include tất cả published posts
- Static HTML via `generateStaticParams` — Google crawl tức thì

### New Dependencies

- `gray-matter` — parse YAML frontmatter
- `next-mdx-remote` — render MDX in RSC (App Router compatible)
- `rehype-highlight` (optional) — code syntax highlight

### UI: Section trên Landing Page (sau FAQ)

- Tiêu đề "Bài viết hữu ích"
- Grid 3 bài mới nhất (card: ảnh bìa, tiêu đề, ngày, excerpt)
- Link "Xem tất cả bài viết →" → /bai-viet

### Workflow quản lý bài viết

1. Tạo file `content/posts/[slug].mdx`
2. Viết frontmatter + nội dung Markdown
3. Set `published: true`
4. Commit + push → Cloudflare tự deploy (~2 phút)

## Success Criteria

- Google index từng bài trong 1-7 ngày sau deploy
- Lighthouse SEO score > 95
- Load time < 1s (static HTML)
- Sitemap tự động cập nhật khi có bài mới
- Mobile responsive

## Risks

| Risk | Mitigation |
|------|-----------|
| `fs` module trên Cloudflare runtime | Chỉ dùng `fs` trong `generateStaticParams` (build-time) |
| MDX render chậm | Dùng `next-mdx-remote/rsc` — server component, zero client JS |

## Next Steps

Tạo implementation plan chi tiết với các phases.
