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

      <h3 className="font-semibold text-text-primary dark:text-white leading-snug group-hover:text-brand-orange dark:group-hover:text-brand-yellow transition-colors line-clamp-2">
        {post.title}
      </h3>

      <p className="mt-2 text-sm text-text-secondary dark:text-gray-400 leading-relaxed line-clamp-2">
        {post.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <time dateTime={post.date} className="text-xs text-text-muted dark:text-gray-500">
          {formattedDate}
        </time>
        <span className="text-xs font-medium text-brand-orange dark:text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity">
          Đọc thêm →
        </span>
      </div>
    </Link>
  );
}
