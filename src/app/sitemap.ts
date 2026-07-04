import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const SITE_URL = "https://vnting.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs/phuot-ha-noi-da-nang`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts,
  ];
}
