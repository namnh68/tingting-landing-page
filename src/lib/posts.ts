import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

const postsDir = path.join(process.cwd(), "content/blogs");

// Accepts tags as array or comma-separated string
function normalizeTags(raw: unknown): string[] | undefined {
  if (!raw) return undefined;
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  if (typeof raw === "string") return raw.split(",").map((t) => t.trim()).filter(Boolean);
  return undefined;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(postsDir, filename), "utf8")
      );
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        image: data.image,
        tags: normalizeTags(data.tags),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    image: data.image,
    tags: normalizeTags(data.tags),
    content,
  };
}
