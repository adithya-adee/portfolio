"use client";

import blogsData from "@/asset/blog.json";
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
      <section className="mx-auto mt-8 max-w-3xl px-4 py-6 sm:mt-12 sm:px-6 sm:py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm tracking-wide text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Blog Posts
          </h1>
          <p className="text-sm tracking-wide text-gray-400 sm:text-base">
            Thoughts on code, tech, and building products
          </p>
        </div>

        {/* Blog List */}
        <div className="space-y-2 sm:space-y-3">
          {blogs.map((blog) => (
            <article
              key={blog.title}
              className="group rounded-lg border border-neutral-700/40 bg-neutral-900/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-600/60 hover:bg-neutral-800/50 hover:shadow-lg sm:p-5"
            >
              <div className="space-y-3">
                {/* Title and Date */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <h2 className="text-base font-medium leading-snug tracking-wide text-white transition-colors group-hover:text-gray-200 sm:text-lg">
                    {blog.title}
                  </h2>
                  <span className="flex shrink-0 items-center gap-2 text-sm tracking-wide text-gray-500">
                    <Calendar size={14} />
                    {blog.date}
                  </span>
                </div>

                {/* Category */}
                <span className="inline-block rounded bg-neutral-800/50 px-3 py-1.5 text-xs uppercase tracking-wider text-gray-400">
                  {blog.category}
                </span>

                {/* Description */}
                <p className="line-clamp-2 text-sm leading-relaxed tracking-wide text-gray-400 sm:text-base">
                  {blog.description}
                </p>

                {/* Read Link */}
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm tracking-wide text-gray-500 transition-colors hover:text-white"
                >
                  Read article
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
