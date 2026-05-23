"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import projectsData from "@/asset/projects.json";
import { ChevronDown, ChevronsDown, ChevronsUp, ExternalLink, Filter } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { MagneticButton, Reveal, SectionTitle, TiltCard } from "@/components/motion";
import { cn } from "@/lib/utils";

const VISIBLE_PROJECT_COUNT = 3;

interface Project {
  name: string;
  timeline: string;
  category: string;
  short_description: string;
  detailed_description: string[];
  live_url: string;
  github_url: string;
  video_url?: string;
  skills?: string[];
}

type FilterCategory = "web3" | "full-stack" | "open-source";

const FILTER_OPTIONS: FilterCategory[] = ["web3", "full-stack", "open-source"];

const SKILL_CHIP =
  "rounded-md bg-accent-soft px-3 py-1 text-label tracking-wide text-accent ring-1 ring-inset ring-accent/25";

const getYoutubeEmbedUrl = (url: string): string => {
  if (url.includes("youtube.com/watch")) {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    } catch (e) {
      console.warn("Invalid YouTube URL", e);
    }
  }
  return url;
};

const getCategoryLabel = (category: FilterCategory): string => {
  if (category === "web3") return "Web3";
  if (category === "open-source") return "Open Source";
  return "Full Stack";
};

const getCategoryBadgeStyles = (category: string) => {
  if (category === "web3")
    return "bg-accent-soft text-accent ring-1 ring-inset ring-accent/30";
  if (category === "open-source")
    return "bg-surface-2 text-primary/80 ring-1 ring-inset ring-strong";
  return "bg-surface-2 text-secondary ring-1 ring-inset ring-soft";
};

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("web3");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Collapse + reset expanded card whenever the filter changes.
  useEffect(() => {
    setShowAll(false);
    setExpandedIndex(null);
  }, [activeFilter]);

  const projects = projectsData as Project[];
  const projectCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      web3: 0,
      "full-stack": 0,
      "open-source": 0,
    };
    for (const project of projects) {
      if (project.category in counts) {
        counts[project.category as FilterCategory] += 1;
      }
    }
    return counts;
  }, [projects]);
  const filteredProjects = useMemo(
    () => projects.filter((project) => project.category === activeFilter),
    [activeFilter, projects]
  );
  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, VISIBLE_PROJECT_COUNT);
  const hasMore = filteredProjects.length > VISIBLE_PROJECT_COUNT;
  const hiddenCount = filteredProjects.length - VISIBLE_PROJECT_COUNT;

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <SectionTitle
        index={2}
        meta={`${filteredProjects.length} ${filteredProjects.length === 1 ? "project" : "projects"}`}
      >
        Projects I&apos;ve Built
      </SectionTitle>

      {/* Filter row */}
      <Reveal y={10} className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-label text-tertiary">
          <Filter aria-hidden="true" size={14} />
          <span className="hidden sm:inline uppercase tracking-wider">Filter</span>
        </div>

        {FILTER_OPTIONS.map((category) => {
          const isActive = activeFilter === category;
          return (
            <MagneticButton key={category} strength={0.25}>
              <button
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "relative overflow-hidden rounded-lg border px-4 py-2 text-label font-medium tracking-wide transition-colors duration-base ease-out-soft",
                  isActive
                    ? "border-strong bg-surface-2 text-primary shadow-elev-2"
                    : "border-soft bg-surface-1 text-secondary hover:border-strong hover:text-primary"
                )}
              >
                <span className="relative z-10 inline-flex items-baseline gap-1.5">
                  {getCategoryLabel(category)}
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-normal",
                      isActive ? "text-accent" : "text-tertiary"
                    )}
                  >
                    ({projectCounts[category]})
                  </span>
                </span>
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-aurora-soft opacity-100"
                  />
                ) : null}
              </button>
            </MagneticButton>
          );
        })}
      </Reveal>

      {/* Projects list */}
      <div className="space-y-4 sm:space-y-5">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => {
            const isOpen = expandedIndex === index;
            return (
              <motion.div
                key={project.name}
                layout={!isMobile}
                initial={!isMobile ? { opacity: 0, y: 14 } : undefined}
                animate={!isMobile ? { opacity: 1, y: 0 } : undefined}
                exit={!isMobile ? { opacity: 0, y: -10 } : undefined}
                transition={{ duration: isMobile ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard max={4}>
                  <div
                    className={cn(
                      "group relative overflow-hidden rounded-xl border border-soft bg-surface-1 backdrop-blur-sm",
                      "shadow-elev-1 transition-shadow duration-base ease-out-soft",
                      "hover:border-strong hover:shadow-elev-2"
                    )}
                  >
                    {/* Aurora bar on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[2px] bg-aurora opacity-0 transition-opacity duration-base group-hover:opacity-100"
                    />

                    <button
                      onClick={() => setExpandedIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`project-panel-${index}`}
                      className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <div className="flex-1 space-y-2.5">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-h2 font-semibold tracking-tight text-primary">
                              {project.name}
                            </h3>
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-label font-medium tracking-wide",
                                getCategoryBadgeStyles(project.category)
                              )}
                            >
                              {getCategoryLabel(project.category as FilterCategory)}
                            </span>
                          </div>
                          <span className="whitespace-nowrap font-mono text-label uppercase tracking-wider text-tertiary">
                            {project.timeline}
                          </span>
                        </div>
                        <p className="text-body-2 leading-relaxed tracking-wide text-primary/80">
                          {project.short_description}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-1 sm:gap-6">
                          {project.live_url ? (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-label font-medium tracking-wide text-secondary transition-colors hover:text-primary"
                            >
                              Visit <ExternalLink aria-hidden="true" size={14} />
                            </a>
                          ) : null}
                          {project.github_url ? (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-label font-medium tracking-wide text-secondary transition-colors hover:text-primary"
                            >
                              GitHub <SiGithub aria-hidden="true" size={14} />
                            </a>
                          ) : null}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "ml-4 transition-transform duration-base ease-out-soft sm:ml-6",
                          isOpen ? "rotate-180" : "rotate-0"
                        )}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-5 w-5 text-tertiary group-hover:text-primary" />
                      </div>
                    </button>

                    {/* Expanded — grid-rows trick animates the true content height. */}
                    <div
                      id={`project-panel-${index}`}
                      className={cn(
                        "grid overflow-hidden transition-[grid-template-rows,opacity] duration-slow ease-out-soft",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="min-h-0 border-t border-soft bg-surface-2/30 px-4 pb-5 pt-4 sm:px-6">
                        <ul className="space-y-2">
                          {project.detailed_description.map((point, i) => (
                            <li
                              key={i}
                              className={cn(
                                "flex gap-3 transition-all duration-base ease-out-soft",
                                isOpen
                                  ? "translate-x-0 opacity-100"
                                  : "-translate-x-3 opacity-0"
                              )}
                              style={{
                                transitionDelay:
                                  isMobile || !isOpen ? "0ms" : `${i * 40}ms`,
                              }}
                            >
                              <span aria-hidden="true" className="mt-2 text-accent/70">
                                ▸
                              </span>
                              <span className="text-body-2 leading-relaxed tracking-wide text-primary/85">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {project.skills?.length ? (
                          <div className="mt-5 space-y-3 border-t border-soft pt-4">
                            <p className="text-label font-medium uppercase tracking-[0.15em] text-tertiary">
                              Skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.skills.map((skill, i) => (
                                <span key={i} className={SKILL_CHIP}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>

                      {isOpen && project.video_url ? (
                        <div className="border-t border-soft bg-surface-2/40 p-4 sm:p-6">
                          <div className="aspect-video w-full overflow-hidden rounded-lg border border-soft shadow-elev-2">
                            <iframe
                              src={getYoutubeEmbedUrl(project.video_url)}
                              title={`${project.name} video overview`}
                              className="h-full w-full"
                              allow="autoplay; encrypted-media; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Show all / show less */}
      {hasMore ? (
        <div className="mt-6 flex justify-center">
          <MagneticButton strength={0.2}>
            <button
              type="button"
              onClick={() => {
                setShowAll((prev) => !prev);
                setExpandedIndex(null);
              }}
              className="group/expand inline-flex items-center gap-2 rounded-full border border-soft bg-surface-1 px-5 py-2.5 font-mono text-label uppercase tracking-[0.18em] text-secondary shadow-elev-1 transition-colors duration-base ease-out-soft hover:border-strong hover:bg-surface-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
            >
              {showAll ? (
                <>
                  <ChevronsUp
                    aria-hidden="true"
                    size={14}
                    className="text-accent transition-transform group-hover/expand:-translate-y-0.5"
                  />
                  Show less
                </>
              ) : (
                <>
                  <ChevronsDown
                    aria-hidden="true"
                    size={14}
                    className="text-accent transition-transform group-hover/expand:translate-y-0.5"
                  />
                  Show {hiddenCount} more
                </>
              )}
            </button>
          </MagneticButton>
        </div>
      ) : null}
    </section>
  );
}
