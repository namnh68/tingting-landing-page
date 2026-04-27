---
phase: 3
title: "Blog Pages"
status: completed
effort: 1.5h
dependencies: [phase-02]
completed: 2026-04-26
---

# Phase 3: Blog Pages

## Overview

Tạo 2 Next.js App Router pages:
1. `/tips` — danh sách tất cả bài viết (SSG)
2. `/tips/[slug]` — nội dung từng bài (SSG + generateMetadata + JSON-LD)

## Files to Create

- `src/app/tips/page.tsx`
- `src/app/tips/[slug]/page.tsx`

## Implementation

### `src/app/tips/page.tsx`

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { BaiVietCard } from "@/components/tips-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Bài viết | Ting Ting - Mẹo mua sắm & Hoàn tiền",
  description:
    "Tổng hợp các bài viết hữu ích về mẹo mua sắm tiết kiệm, hướng dẫn hoàn tiền Shopee, TikTok Shop qua nhóm Ting Ting.",
  openGraph: {
    title: "Bài viết | Ting Ting",
    description: "Mẹo mua sắm & hướng dẫn hoàn tiền Shopee, TikTok Shop.",
    type: "website",
  },
};

export default function BaiVietPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold dark:text-white">
              Bài viết{" "}
              <span className="text-gradient">hữu ích</span>
            </h1>
            <p className="mt-3 text-text-secondary dark:text-gray-400">
              Mẹo mua sắm tiết kiệm, hướng dẫn hoàn tiền Shopee & TikTok Shop
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-text-muted dark:text-gray-500">
              Chưa có bài viết nào.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <BaiVietCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-sm text-text-secondary hover:text-brand-orange dark:text-gray-400 dark:hover:text-brand-yellow transition-colors"
            >
              ← Về trang chủ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

### `src/app/tips/[slug]/page.tsx`

```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const SITE_URL = "https://tingting.vercel.app";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;
  return {
    title: `${frontmatter.title} | Ting Ting`,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      publishedTime: frontmatter.date,
      url: `${SITE_URL}/tips/${frontmatter.slug}`,
      siteName: "Ting Ting",
    },
    alternates: {
      canonical: `${SITE_URL}/tips/${frontmatter.slug}`,
    },
  };
}

export default async function BaiVietDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: { "@type": "Organization", name: "Ting Ting" },
    publisher: { "@type": "Organization", name: "Ting Ting", url: SITE_URL },
    url: `${SITE_URL}/tips/${frontmatter.slug}`,
    keywords: frontmatter.tags?.join(", "),
  };

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <article className="mx-auto max-w-2xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-muted dark:text-gray-500">
            <Link href="/" className="hover:text-brand-orange dark:hover:text-brand-yellow transition-colors">
              Trang chủ
            </Link>
            <span className="mx-2">›</span>
            <Link href="/tips" className="hover:text-brand-orange dark:hover:text-brand-yellow transition-colors">
              Bài viết
            </Link>
            <span className="mx-2">›</span>
            <span className="text-text-secondary dark:text-gray-300">{frontmatter.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold leading-snug dark:text-white">
              {frontmatter.title}
            </h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-text-muted dark:text-gray-500">
              <time dateTime={frontmatter.date}>{formattedDate}</time>
              <span>•</span>
              <span>{readingTime} phút đọc</span>
            </div>
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-secondary dark:bg-dark-secondary px-3 py-1 text-xs text-text-secondary dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-sm sm:prose dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:dark:text-white
            prose-p:text-text-secondary prose-p:dark:text-gray-300
            prose-a:text-brand-orange prose-a:dark:text-brand-yellow prose-a:no-underline hover:prose-a:underline
            prose-strong:text-text-primary prose-strong:dark:text-white
            prose-li:text-text-secondary prose-li:dark:text-gray-300">
            <MDXRemote source={content} />
          </div>

          {/* Footer nav */}
          <div className="mt-12 pt-8 border-t border-surface-tertiary dark:border-dark-tertiary">
            <Link
              href="/tips"
              className="text-sm text-text-secondary hover:text-brand-orange dark:text-gray-400 dark:hover:text-brand-yellow transition-colors"
            >
              ← Xem tất cả bài viết
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
```

## Key Notes

- `params` là `Promise<{slug}>` trong Next.js 15 App Router — phải `await`
- `MDXRemote` từ `next-mdx-remote/rsc` — Server Component, zero client JS
- JSON-LD Article schema giúp Google hiểu đây là bài viết (tốt cho SEO)
- Breadcrumb hiện thị rõ cấu trúc trang
- `prose` classes từ `@tailwindcss/typography` — cần cài thêm nếu chưa có

## Tailwind Typography

Kiểm tra `package.json`, nếu chưa có `@tailwindcss/typography`:

```bash
npm install @tailwindcss/typography
```

Thêm vào `src/app/globals.css` (Tailwind v4 CSS-first):
```css
@plugin "@tailwindcss/typography";
```

Nếu không muốn cài thêm package, thay `prose` classes bằng custom CSS cho headings, paragraphs, lists.

## Todo

- [x] Tạo `src/app/tips/page.tsx`
- [x] Tạo `src/app/tips/[slug]/page.tsx`
- [x] Kiểm tra `@tailwindcss/typography` — cài nếu chưa có
- [x] Chạy `npm run build` verify không lỗi

## Success Criteria

- `/tips` render danh sách bài, SSG
- `/tips/meo-mua-sam-shopee-tiet-kiem` render đúng nội dung
- `/tips/khong-ton-tai` → 404 page
- JSON-LD Article có trong `<head>` của trang bài viết
