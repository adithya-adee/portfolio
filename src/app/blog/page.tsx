"use client";

import blogsData from "@/asset/blog.json";
import { motion } from "framer-motion";
import { ExternalLink, Calendar } from "lucide-react";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface BlogProps {
  id: number;
  title: string;
  url: string;
  category: string;
  posted_in: string;
  date: string;
  description: string;
}

export default function BlogPage() {
  const blogs = blogsData as BlogProps[];

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="mb-4 inline-block text-gray-400 transition-colors hover:text-white"
          >
            ← Back to Home
          </Link>
          <h1 className={`${jetbrains.className} mb-4 text-4xl font-bold text-white md:text-5xl`}>
            Blog Posts
          </h1>
          <p className={`${inter.className} text-lg text-gray-400`}>
            Thoughts, learnings, and experiences from my journey
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {blogs.map((blog, index) => (
            <motion.a
              key={blog.id}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              {/* Category and Platform */}
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-xs text-purple-300">
                  {blog.category}
                </span>
                <span className="text-xs text-gray-400">{blog.posted_in}</span>
              </div>

              {/* Title */}
              <h3
                className={`${jetbrains.className} mb-3 text-xl font-bold text-white transition-colors group-hover:text-purple-300`}
              >
                {blog.title}
              </h3>

              {/* Description */}
              <p className={`${inter.className} mb-4 line-clamp-3 text-sm text-gray-300`}>
                {blog.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar size={14} />
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-purple-400 transition-all group-hover:gap-2">
                  Read more <ExternalLink size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
