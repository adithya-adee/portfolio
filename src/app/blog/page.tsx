import { Metadata } from "next";
import blogsData from "@/asset/blog.json";
import { ExternalLink, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";
import { MagneticButton, Reveal, SectionTitle } from "@/components/motion";
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
}

const getCategoryStyles = (category: string) =>
  category === "Tech"
    ? "bg-accent-soft text-accent ring-1 ring-inset ring-accent/30"
    : "bg-surface-2 text-primary/80 ring-1 ring-inset ring-strong";

export default function BlogPage() {
  const blogs = blogsData as Blog[];

  return (
    <div className="min-h-screen">
      <section className="mx-auto mt-10 max-w-3xl px-4 py-6 sm:mt-16 sm:px-6 sm:py-8">
        {/* Back link */}
        <Reveal y={8} className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-label font-medium tracking-wide text-tertiary transition-colors hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" size={14} />
            Back to home
          </Link>
        </Reveal>

        <SectionTitle meta={`${blogs.length} ${blogs.length === 1 ? "post" : "posts"}`}>
          Blog Posts
        </SectionTitle>

        <Reveal y={10} delay={0.05}>
          <p className="mb-6 text-body-2 leading-relaxed tracking-wide text-secondary">
            Thoughts on backend engineering, zero-knowledge proofs, Rust, and shipping
            privacy-preserving systems.
          </p>
        </Reveal>

        {/* Blog list */}
        <div className="space-y-3">
          {blogs.map((blog, i) => (
            <Reveal
              key={blog.title}
              y={12}
              delay={0.08 + i * 0.05}
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

              <div className="space-y-3">
                {/* Header row: title + date */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <h2 className="text-h2 font-semibold leading-snug tracking-tight text-primary transition-colors">
                    {blog.title}
                  </h2>
                  <span className="flex shrink-0 items-center gap-2 font-mono text-label uppercase tracking-wider text-tertiary">
                    <Calendar aria-hidden="true" size={13} />
                    {blog.date}
                  </span>
                </div>

                {/* Category badge */}
                <span
                  className={cn(
                    "inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
                    getCategoryStyles(blog.category)
                  )}
                >
                  {blog.category}
                </span>

                {/* Description */}
                <p className="line-clamp-2 text-body-2 leading-relaxed tracking-wide text-secondary">
                  {blog.description}
                </p>

                {/* Read link */}
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
    </div>
  );
}
