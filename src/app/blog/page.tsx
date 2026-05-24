import { Metadata } from "next";
import blogsData from "@/asset/blog.json";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "next-view-transitions";
import { Reveal, SectionTitle } from "@/components/motion";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Adithya Anand's writing on backend engineering, zero-knowledge proofs, Rust, and shipping privacy-preserving systems.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Adithya Anand",
    description:
      "Writing on backend engineering, zero-knowledge proofs, Rust, and shipping privacy-preserving systems.",
    url: "/blog",
    type: "website",
  },
};

interface Blog {
  title: string;
  description: string;
  date: string;
  category: string;
  url: string;
  posted_in: string;
}

const getCategoryStyles = (category: string) =>
  category === "Tech"
    ? "bg-accent-soft text-accent ring-1 ring-inset ring-accent/30"
    : "bg-surface-2 text-primary/80 ring-1 ring-inset ring-strong";

export default function BlogPage() {
  const blogs = blogsData as Blog[];

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
      {/* Back link */}
      <Reveal y={8}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.18em] text-tertiary transition-colors duration-base ease-out-soft hover:text-primary"
        >
          <ArrowLeft aria-hidden="true" size={14} />
          Back to home
        </Link>
      </Reveal>

      {/* Header */}
      <header className="mt-10 space-y-4">
        <p className="font-mono text-label uppercase tracking-[0.25em] text-tertiary">
          Field notes · {blogs.length} {blogs.length === 1 ? "post" : "posts"}
        </p>
        <h1 className="font-serif text-display-2 font-normal italic leading-[1.05] tracking-tight text-primary">
          Writing
        </h1>
        <p className="max-w-2xl text-body-1 leading-relaxed text-primary/80">
          Notes on backend engineering, zero-knowledge proofs, Rust, and the things I learn while
          shipping privacy-preserving systems.
        </p>
      </header>

      <div className="my-10 h-px bg-accent/30" />

      {/* Blog list */}
      <SectionTitle meta="cross-posted to dev.to">All posts</SectionTitle>

      <div className="space-y-4 sm:space-y-5">
        {blogs.map((blog, i) => (
          <Reveal key={blog.title} y={12} delay={0.08 + i * 0.05}>
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
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[2px] bg-aurora opacity-0 transition-opacity duration-base group-hover/blog:opacity-100 group-focus-visible/blog:opacity-100"
              />

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

              <h2 className="mt-3 font-serif text-h2 font-normal italic leading-snug tracking-tight text-primary transition-colors group-hover/blog:text-accent-bright">
                {blog.title}
              </h2>

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

              {blog.posted_in ? (
                <p className="mt-3 font-mono text-label uppercase tracking-[0.18em] text-tertiary/70">
                  — {blog.posted_in}
                </p>
              ) : null}
            </a>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
