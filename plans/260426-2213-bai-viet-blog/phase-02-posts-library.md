---
phase: 2
title: "Posts Library"
status: completed
effort: 30m
dependencies: [phase-01]
completed: 2026-04-26
---

# Phase 2: Posts Library

## Overview

Tạo `src/lib/posts.ts` — utility module đọc và parse MDX files tại build-time. Chỉ dùng `fs` tại build-time (generateStaticParams, generateMetadata), không gọi ở runtime (Cloudflare Workers).

## Files to Create

- `src/lib/posts.ts`

## Implementation

### `src/lib/posts.ts`

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
  published: boolean;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number; // minutes
}

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): PostFrontmatter[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return data as PostFrontmatter;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (!frontmatter.published) return null;

  return {
    frontmatter,
    content,
    readingTime: calcReadingTime(content),
  };
}
```

## Key Notes

- `fs` chỉ chạy ở build-time — an toàn với Cloudflare Workers
- Sort theo `date` mới nhất lên đầu
- Filter `published: false` để draft bài chưa đăng
- `readingTime` tính theo ~200 từ/phút

## Todo

- [x] Tạo `src/lib/posts.ts` với nội dung trên
- [x] Verify TypeScript compile: không lỗi type

## Success Criteria

- `getAllPosts()` trả về danh sách đúng thứ tự (mới nhất trước)
- `getPostBySlug("meo-mua-sam-shopee-tiet-kiem")` trả về Post object đúng
- `getPostBySlug("khong-ton-tai")` trả về `null`
