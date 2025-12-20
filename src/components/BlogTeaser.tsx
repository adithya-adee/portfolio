"use client";

import blogsData from "@/asset/blog.json";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
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

export default function BlogTeaser() {
  const blogs = blogsData as BlogProps[];
  const recentBlogs = blogs.slice(0, 2); // Show only 2 recent posts

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className={`${jetbrains.className} text-3xl md:text-4xl font-bold text-white mb-2`}
          >
            Recent Posts
          </h2>
          <p className={`${inter.className} text-gray-400 text-sm`}>
            Thoughts and learnings from my journey
          </p>
        </div>
        <Link
          href="/blog"
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
        >
          View all <ArrowRight size={16} />
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentBlogs.map((blog, index) => (
          <motion.a
            key={blog.id}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group border border-white/10 rounded-lg p-6 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all"
          >
            {/* Category */}
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                {blog.category}
              </span>
              <span className="text-gray-400 text-xs">{blog.posted_in}</span>
            </div>

            {/* Title */}
            <h3
              className={`${jetbrains.className} text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors`}
            >
              {blog.title}
            </h3>

            {/* Description */}
            <p className={`${inter.className} text-gray-300 text-sm mb-4 line-clamp-2`}>
              {blog.description}
            </p>

            {/* Read More */}
            <div className="flex items-center gap-1 text-purple-400 text-sm group-hover:gap-2 transition-all">
              Read more <ExternalLink size={14} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
