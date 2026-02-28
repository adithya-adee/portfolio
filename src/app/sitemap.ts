import { MetadataRoute } from "next";
import blogsData from "@/asset/blog.json";

const BASE_URL = "https://glitchymoon.vercel.app";

interface Blog {
  id: number;
  highlight: boolean;
  title: string;
  url: string;
  date: string;
  posted_in: string;
  category: string;
  description: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = blogsData as Blog[];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // If blogs ever get individual pages (/blog/[slug]), add them here.
  // For now they live on /blog, so we track last blog date as the page's lastModified.
  if (blogs.length > 0) {
    staticRoutes[1].lastModified = new Date(blogs[0].date);
  }

  return staticRoutes;
}
