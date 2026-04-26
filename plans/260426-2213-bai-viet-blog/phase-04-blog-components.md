---
phase: 4
title: "Blog Components"
status: completed
effort: 1h
dependencies: [phase-02]
completed: 2026-04-26
---

# Phase 4: Blog Components

## Overview

Tạo 2 components:
1. `bai-viet-card.tsx` — card hiển thị 1 bài viết (tái sử dụng ở cả list page và landing page preview)
2. `bai-viet-preview.tsx` — section "Bài viết hữu ích" trên landing page (3 bài mới nhất, đặt sau FAQ)

## Files to Create

- `src/components/bai-viet-card.tsx`
- `src/components/bai-viet-preview.tsx`

## Implementation

### `src/components/bai-viet-card.tsx`

Server Component — không cần `"use client"`.

```typescript
import Link from "next/link";
import type { PostFrontmatter } from "@/lib/posts";

interface BaiVietCardProps {
  post: PostFrontmatter;
}

export function BaiVietCard({ post }: BaiVietCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Link
      href={`/bai-viet/${post.slug}`}
      className="group block rounded-2xl bg-surface-secondary dark:bg-dark-secondary p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-tertiary dark:bg-dark-tertiary px-2.5 py-0.5 text-xs text-text-muted dark:text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="font-semibold text-text-primary dark:text-white leading-snug group-hover:text-brand-orange dark:group-hover:text-brand-yellow transition-colors line-clamp-2">
        {post.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-text-secondary dark:text-gray-400 leading-relaxed line-clamp-2">
        {post.description}
      </p>

      {/* Date */}
      <div className="mt-4 flex items-center justify-between">
        <time
          dateTime={post.date}
          className="text-xs text-text-muted dark:text-gray-500"
        >
          {formattedDate}
        </time>
        <span className="text-xs font-medium text-brand-orange dark:text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity">
          Đọc thêm →
        </span>
      </div>
    </Link>
  );
}
```

### `src/components/bai-viet-preview.tsx`

Server Component — gọi `getAllPosts()` trực tiếp, lấy 3 bài mới nhất.

```typescript
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { BaiVietCard } from "@/components/bai-viet-card";
import { ScrollReveal } from "@/components/scroll-reveal";

export function BaiVietPreview() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="bai-viet" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
              Bài viết{" "}
              <span className="text-gradient">hữu ích</span>
            </h2>
            <p className="mt-2 text-text-secondary dark:text-gray-400 text-sm">
              Mẹo mua sắm & hướng dẫn hoàn tiền
            </p>
          </div>
          <Link
            href="/bai-viet"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-orange dark:text-brand-yellow hover:underline flex-shrink-0 ml-4"
          >
            Xem tất cả →
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BaiVietCard key={post.slug} post={post} />
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile "Xem tất cả" */}
        <ScrollReveal delay={0.2} className="mt-6 text-center sm:hidden">
          <Link
            href="/bai-viet"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-orange dark:text-brand-yellow hover:underline"
          >
            Xem tất cả bài viết →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

## Key Notes

- Cả 2 đều là **Server Components** — không có `"use client"`, không cần state
- `getAllPosts()` chỉ chạy ở build-time → an toàn với Cloudflare Workers
- `line-clamp-2` cần Tailwind (built-in từ v3+, v4 có sẵn)
- `ScrollReveal` dùng lại từ component hiện có (`src/components/scroll-reveal.tsx`)
- `brand-orange`, `brand-yellow`, `surface-secondary`, `dark-secondary` là design tokens hiện có

## Design Tokens hiện có (tham khảo từ globals.css)

```
text-text-primary / dark:text-white
text-text-secondary / dark:text-gray-400
text-text-muted / dark:text-gray-500
bg-surface-secondary / dark:bg-dark-secondary
bg-surface-tertiary / dark:bg-dark-tertiary
text-brand-orange / dark:text-brand-yellow
text-gradient (class hiện có)
```

## Todo

- [x] Tạo `src/components/bai-viet-card.tsx`
- [x] Tạo `src/components/bai-viet-preview.tsx`
- [x] Verify không có lỗi TypeScript

## Success Criteria

- `BaiVietCard` render đúng với dark/light mode
- `BaiVietPreview` hiển thị tối đa 3 bài, ẩn hẳn nếu chưa có bài nào (`return null`)
- Hover animation trên card hoạt động
- Link "Xem tất cả" hiển thị đúng ở desktop, mobile
