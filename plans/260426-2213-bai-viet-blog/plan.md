---
title: "Ting Ting - Tính năng Bài Viết (Blog)"
description: "Thêm mục Bài viết vào landing page: MDX files, SSG, chuẩn SEO, section preview sau FAQ"
status: completed
priority: P1
effort: 3.5h
branch: main
tags: [blog, mdx, seo, nextjs, cloudflare]
created: 2026-04-26
completed: 2026-04-26
brainstorm: plans/reports/brainstorm-260426-2213-bai-viet-blog.md
---

# Ting Ting - Tính năng Bài Viết

## Overview

Thêm mục "Bài viết" vào landing page Ting Ting. Người dùng có thể đọc bài viết hữu ích về mua sắm tiết kiệm. Dev quản lý bài bằng cách viết file MDX và deploy lại.

**Approach:** MDX files + Next.js SSG — static HTML hoàn toàn, SEO tốt nhất, tương thích Cloudflare Workers.

## Tech Constraints

- Next.js 15 App Router + Cloudflare Workers (OpenNext)
- `fs` module: chỉ dùng tại build-time (trong `generateStaticParams`, `generateMetadata`)
- Tailwind CSS v4 (CSS-first, không config file)
- Design tokens hiện có: `text-gradient`, `bg-gradient-brand`, `bg-surface-secondary`, `dark:bg-dark-secondary`

## Phase Overview

| Phase | Title | Effort | Status |
|-------|-------|--------|--------|
| 1 | [Setup Dependencies & Sample Content](./phase-01-setup-deps-content.md) | 30m | completed |
| 2 | [Posts Library](./phase-02-posts-library.md) | 30m | completed |
| 3 | [Blog Pages](./phase-03-blog-pages.md) | 1.5h | completed |
| 4 | [Blog Components](./phase-04-blog-components.md) | 1h | completed |
| 5 | [Integration & SEO](./phase-05-integration-seo.md) | 30m | completed |

## File Ownership

```
content/posts/               ← Phase 1
src/lib/posts.ts             ← Phase 2
src/app/bai-viet/**          ← Phase 3
src/components/bai-viet-*.tsx ← Phase 4
src/app/page.tsx             ← Phase 5
src/lib/constants.ts         ← Phase 5
src/app/sitemap.ts           ← Phase 5
```

## New Dependencies

```bash
npm install gray-matter next-mdx-remote
```

## URL Structure

- `/bai-viet` — danh sách tất cả bài
- `/bai-viet/[slug]` — nội dung từng bài

## Success Criteria

- Build thành công: `npm run build` không lỗi
- Sitemap tự động bao gồm tất cả published posts
- Lighthouse SEO score > 95
- Mobile responsive
- Dark/light mode đúng
