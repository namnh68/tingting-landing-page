import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { ScrollReveal } from "@/components/scroll-reveal";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="blogs" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Bài viết <span className="text-gradient">hữu ích</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400">
            Mẹo mua sắm thông minh &amp; hướng dẫn hoàn tiền hoa hồng
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-surface-secondary dark:border-dark-tertiary bg-surface-secondary dark:bg-dark-secondary overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {post.image && (
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-4">
                {post.date && (
                  <time dateTime={post.date} className="text-xs text-text-muted dark:text-gray-500">
                    {formatDate(post.date)}
                  </time>
                )}
                <h3 className="mt-1 text-sm font-bold text-text-primary dark:text-white group-hover:text-brand-orange dark:group-hover:text-brand-yellow transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="mt-2 text-xs text-text-secondary dark:text-gray-400 line-clamp-2 flex-1">
                    {post.description}
                  </p>
                )}
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-orange dark:text-brand-yellow">
                  Đọc thêm →
                </span>
              </div>
            </Link>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="mt-8 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-brand-orange dark:border-brand-yellow px-6 py-2.5 text-sm font-semibold text-brand-orange dark:text-brand-yellow hover:bg-brand-orange dark:hover:bg-brand-yellow hover:text-white dark:hover:text-dark-primary transition-colors"
          >
            Xem tất cả bài viết →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
