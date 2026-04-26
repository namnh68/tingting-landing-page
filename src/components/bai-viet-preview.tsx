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
              Bài viết <span className="text-gradient">hữu ích</span>
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
