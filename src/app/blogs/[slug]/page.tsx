import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const dynamic = "force-static";

const SITE_URL = "https://tingting.vercel.app";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} - VnTing`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blogs/${post.slug}`,
      siteName: "VnTing",
      locale: "vi_VN",
      type: "article",
      publishedTime: post.date,
      ...(post.image && { images: [{ url: `${SITE_URL}${post.image}` }] }),
    },
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "VnTing" },
    publisher: { "@type": "Organization", name: "VnTing", url: SITE_URL },
    url: `${SITE_URL}/blogs/${post.slug}`,
    ...(post.image && { image: `${SITE_URL}${post.image}` }),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/blogs"
            className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-yellow transition-colors"
          >
            ← Tất cả bài viết
          </Link>

          {/* Hero image */}
          {post.image && (
            <div className="relative mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Article header */}
          <header className="mb-8">
            {post.date && (
              <time
                dateTime={post.date}
                className="text-sm text-text-muted dark:text-gray-500"
              >
                {formatDate(post.date)}
              </time>
            )}
            <h1 className="mt-2 text-2xl font-extrabold text-text-primary dark:text-white sm:text-3xl leading-snug">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-3 text-base text-text-secondary dark:text-gray-400 leading-relaxed">
                {post.description}
              </p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-secondary dark:bg-dark-tertiary px-3 py-1 text-xs font-semibold text-brand-orange dark:text-brand-yellow"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Divider */}
          <div className="mb-8 h-px bg-gradient-to-r from-brand-orange/30 via-purple-400/30 to-transparent" />

          {/* Markdown content */}
          <article className="prose prose-rose dark:prose-invert max-w-none prose-headings:font-extrabold prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md">
            <MDXRemote source={post.content} />
          </article>

          {/* Footer nav */}
          <div className="mt-12 border-t border-surface-secondary dark:border-dark-tertiary pt-8 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              ← Xem tất cả bài viết
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
