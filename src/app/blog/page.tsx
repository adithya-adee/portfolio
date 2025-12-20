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
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1
            className={`${jetbrains.className} text-4xl md:text-5xl font-bold text-white mb-4`}
          >
            Blog Posts
          </h1>
          <p className={`${inter.className} text-gray-400 text-lg`}>
            Thoughts, learnings, and experiences from my journey
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
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
              {/* Category and Platform */}
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                  {blog.category}
                </span>
                <span className="text-gray-400 text-xs">{blog.posted_in}</span>
              </div>

              {/* Title */}
              <h3
                className={`${jetbrains.className} text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors`}
              >
                {blog.title}
              </h3>

              {/* Description */}
              <p className={`${inter.className} text-gray-300 text-sm mb-4 line-clamp-3`}>
                {blog.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Calendar size={14} />
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-purple-400 text-sm group-hover:gap-2 transition-all">
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
