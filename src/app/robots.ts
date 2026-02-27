import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://glitchymoon.vercel.app/sitemap.xml",
    host: "https://glitchymoon.vercel.app",
  };
}
