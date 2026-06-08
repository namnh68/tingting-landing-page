import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const dynamic = "force-static";

const SITE_URL = "https://tingting.vercel.app";

export const metadata: Metadata = {
  title: "Bài viết - VnTing",
  description:
    "Các bài viết hướng dẫn mua sắm thông minh, hoàn tiền hoa hồng Shopee và TikTok Shop từ VnTing.",
  openGraph: {
    title: "Bài viết - VnTing",
    description: "Hướng dẫn mua sắm thông minh, hoàn tiền hoa hồng Shopee và TikTok Shop.",
    url: `${SITE_URL}/bai-viet`,
    siteName: "VnTing",
    locale: "vi_VN",
    type: "website",
  },
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Page header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-gradient sm:text-4xl">Bài viết</h1>
            <p className="mt-3 text-text-secondary dark:text-gray-400">
              Hướng dẫn mua sắm thông minh &amp; hoàn tiền hoa hồng
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-text-secondary dark:text-gray-400">
              Chưa có bài viết nào.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/bai-viet/${post.slug}`}
                  className="group block rounded-2xl border border-surface-secondary dark:border-dark-tertiary bg-white dark:bg-dark-secondary overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {post.image && (
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {post.date && (
                      <time
                        dateTime={post.date}
                        className="text-xs text-text-muted dark:text-gray-500"
                      >
                        {formatDate(post.date)}
                      </time>
                    )}
                    <h2 className="mt-1 text-lg font-bold text-text-primary dark:text-white group-hover:text-brand-orange dark:group-hover:text-brand-yellow transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="mt-2 text-sm text-text-secondary dark:text-gray-400 line-clamp-3">
                        {post.description}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-surface-secondary dark:bg-dark-tertiary px-2.5 py-0.5 text-xs font-medium text-brand-orange dark:text-brand-yellow"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange dark:text-brand-yellow">
                      Đọc thêm →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
