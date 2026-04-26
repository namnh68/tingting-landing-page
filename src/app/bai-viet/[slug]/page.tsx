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
      url: `${SITE_URL}/bai-viet/${frontmatter.slug}`,
      siteName: "Ting Ting",
    },
    alternates: {
      canonical: `${SITE_URL}/bai-viet/${frontmatter.slug}`,
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
    url: `${SITE_URL}/bai-viet/${frontmatter.slug}`,
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
            <Link href="/bai-viet" className="hover:text-brand-orange dark:hover:text-brand-yellow transition-colors">
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
              href="/bai-viet"
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
