"use client";

import blogsData from "@/asset/blog.json";
import { ExternalLink } from "lucide-react";
import { Reveal, SectionTitle, SectionNavLink, MagneticButton } from "@/components/motion";
import { cn } from "@/lib/utils";

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
    ? "bg-accent-soft text-accent ring-1 ring-inset ring-accent/30"
    : "bg-surface-2 text-primary/80 ring-1 ring-inset ring-strong";
};

export default function Blogs() {
  const blogs = blogsData as Blog[];
  const highlightedBlogs = blogs.filter((blog) => blog.highlight);

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <SectionTitle
        index={4}
        meta={<SectionNavLink href="/blog">my articles</SectionNavLink>}
      >
        Recent Articles
      </SectionTitle>

      <div className="space-y-3">
        {highlightedBlogs.map((blog, i) => (
          <Reveal
            key={blog.id}
            y={12}
            delay={i * 0.06}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-soft bg-surface-1 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5",
              "shadow-elev-1 transition-shadow duration-base ease-out-soft",
              "hover:border-strong hover:shadow-elev-2"
            )}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[2px] bg-aurora opacity-0 transition-opacity duration-base group-hover:opacity-100"
            />

            <div className="space-y-2.5">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider",
                      getCategoryStyles(blog.category)
                    )}
                  >
                    {blog.category}
                  </span>
                  <h3 className="text-h2 font-semibold tracking-tight text-primary">
                    {blog.title}
                  </h3>
                </div>
                <span className="whitespace-nowrap font-mono text-label uppercase tracking-wider text-tertiary">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <MagneticButton strength={0.2}>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-label font-medium tracking-wide text-secondary transition-colors hover:text-primary"
                >
                  Read article
                  <ExternalLink aria-hidden="true" size={14} />
                </a>
              </MagneticButton>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
