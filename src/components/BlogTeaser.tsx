"use client";

import { useState } from "react";
import blogsData from "@/asset/blog.json";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Calendar } from "lucide-react";

interface Blog {
  title: string;
  description: string;
  date: string;
  category: string;
  url: string;
}

export default function BlogTeaser() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const blogs = blogsData as Blog[];
  const recentBlogs = blogs.slice(0, 2); // Show only 2 most recent

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-400">Recent Posts</h2>
        <a
          href="/blog"
          className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-white"
        >
          View all →
        </a>
      </div>

      <div className="space-y-3">
        {recentBlogs.map((blog, index) => (
          <motion.div
            key={blog.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-lg border border-neutral-800/50 bg-neutral-900/30 transition-colors hover:border-neutral-700/50"
          >
            {/* Collapsed View */}
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-base font-medium text-white">{blog.title}</h3>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    {blog.date}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{blog.category}</p>
              </div>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4"
              >
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </motion.div>
            </button>

            {/* Expanded View */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-neutral-800/50 px-4 pb-4">
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">{blog.description}</p>

                    {/* Read Link */}
                    <div className="mt-4">
                      <a
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                      >
                        Read article → <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
