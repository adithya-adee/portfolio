import { MetadataRoute } from "next";
import blogsData from "@/asset/blog.json";

const BASE_URL = "https://glitchymoon.dev";

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
      lastModified: blogs.length > 0 ? new Date(blogs[0].date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/archive`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/uses`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return staticRoutes;
}
