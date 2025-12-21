"use client";

import blogsData from "@/asset/blog.json";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Blog {
  title: string;
  description: string;
  date: string;
  category: string;
  url: string;
}

export default function BlogPage() {
  const blogs = blogsData as Blog[];

  return (
    <div className="min-h-screen">
      <section className="mx-auto mt-20 max-w-2xl px-4 py-8 sm:px-6">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-sm text-gray-400">Thoughts on code, tech, and building products</p>
        </div>

        {/* Blog List */}
        <div className="space-y-3">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-lg border border-neutral-800/50 bg-neutral-900/30 p-4 transition-colors hover:border-neutral-700/50"
            >
              <div className="space-y-2">
                {/* Title and Date */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-base font-medium text-white transition-colors group-hover:text-gray-200">
                    {blog.title}
                  </h2>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    {blog.date}
                  </span>
                </div>

                {/* Category */}
                <span className="inline-block rounded bg-neutral-800/50 px-2 py-0.5 text-xs text-gray-400">
                  {blog.category}
                </span>

                {/* Description */}
                <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">
                  {blog.description}
                </p>

                {/* Read Link */}
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-white"
                >
                  Read article → <ExternalLink size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
