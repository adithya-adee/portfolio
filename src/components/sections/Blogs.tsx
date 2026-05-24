import blogsData from "@/asset/blog.json";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionNavLink, SectionTitle } from "@/components/motion";
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

      <div className="space-y-4 sm:space-y-5">
        {highlightedBlogs.map((blog, i) => (
          <Reveal key={blog.id} y={12} delay={i * 0.06}>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read article: ${blog.title} (opens in new tab)`}
              className={cn(
                "group/blog relative block w-full overflow-hidden rounded-xl border border-soft bg-surface-1 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5",
                "shadow-elev-1 transition-[border-color,box-shadow,transform] duration-base ease-out-soft",
                "hover:-translate-y-0.5 hover:border-strong hover:shadow-elev-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
              )}
            >
              {/* Accent left bar on hover / focus */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[2px] bg-aurora opacity-0 transition-opacity duration-base group-hover/blog:opacity-100 group-focus-visible/blog:opacity-100"
              />

              {/* Top row — category + date + arrow */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-label font-medium tracking-wide",
                    getCategoryStyles(blog.category)
                  )}
                >
                  {blog.category}
                </span>
                <div className="flex items-center gap-3">
                  <span className="whitespace-nowrap font-mono text-label uppercase tracking-wider text-tertiary">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    className="text-tertiary transition-all duration-base ease-out-soft group-hover/blog:-translate-y-0.5 group-hover/blog:translate-x-0.5 group-hover/blog:text-accent"
                  />
                </div>
              </div>

              {/* Serif italic title — matches Experience + Projects */}
              <h3 className="mt-3 font-serif text-h2 font-normal italic leading-snug tracking-tight text-primary transition-colors group-hover/blog:text-accent-bright">
                {blog.title}
              </h3>

              {/* Short description */}
              <p
                className="mt-2 text-body-2 leading-relaxed tracking-wide text-primary/70"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {blog.description}
              </p>

              {/* Posted-in source — small editorial chrome */}
              <p className="mt-3 font-mono text-label uppercase tracking-[0.18em] text-tertiary/70">
                — {blog.posted_in}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
