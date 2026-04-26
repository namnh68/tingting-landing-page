import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { BaiVietCard } from "@/components/bai-viet-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Mẹo nhỏ | Ting Ting - Mẹo mua sắm & Hoàn tiền",
  description:
    "Tổng hợp các mẹo nhỏ hữu ích về mua sắm tiết kiệm, hướng dẫn hoàn tiền Shopee, TikTok Shop qua nhóm Ting Ting.",
  openGraph: {
    title: "Mẹo nhỏ | Ting Ting",
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
              Mẹo nhỏ <span className="text-gradient">hữu ích</span>
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
