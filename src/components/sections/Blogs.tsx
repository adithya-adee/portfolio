"use client";

import blogsData from "@/asset/blog.json";
import { ExternalLink } from "lucide-react";

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

const getCategoryStyles = (category: string) => {
  return category === "Tech"
    ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
    : "bg-purple-500/10 text-purple-400 border border-purple-500/30";
};

export default function Blogs() {
  const blogs = blogsData as Blog[];
  const highlightedBlogs = blogs.filter((blog) => blog.highlight);

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <h2 className="mb-4 text-xl font-medium tracking-wide text-gray-400 sm:text-2xl">
        Recent Articles
      </h2>

      {/* Blogs List */}
      <div className="space-y-2 sm:space-y-3">
        {highlightedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="rounded-lg border border-dashed border-zinc-800 bg-neutral-900/30 px-4 py-3 transition-all duration-200 hover:border-neutral-700/50 sm:px-6 sm:py-4"
          >
            <div className="space-y-2">
              {/* Title, Category, and Date on same line */}
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-medium tracking-wide text-white sm:text-lg">
                    {blog.title}
                  </h3>
                </div>
                <div>
                  <span className="whitespace-nowrap text-xs tracking-wide text-gray-500 sm:text-sm">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Read Article Link */}
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm tracking-wide text-gray-400 transition-colors hover:text-white"
              >
                Read Article <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
