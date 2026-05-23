"use client";

import { useMemo, useState, useEffect } from "react";
import projectsData from "@/asset/projects.json";
import { ArrowUpRight, ChevronsDown, ChevronsUp, Filter } from "lucide-react";
import { MagneticButton, Reveal, SectionTitle, TiltCard } from "@/components/motion";
import {
  CaseStudyOverlay,
  type CaseStudyData,
  type CaseStudyProject,
} from "@/components/CaseStudyOverlay";
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
  case_study?: CaseStudyData;
}

type FilterCategory = "web3" | "full-stack" | "open-source";

const FILTER_OPTIONS: FilterCategory[] = ["web3", "full-stack", "open-source"];

const SKILL_CHIP =
  "rounded-md bg-surface-2 px-2.5 py-0.5 text-label tracking-wide text-secondary ring-1 ring-inset ring-soft";

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
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("web3");
  const [showAll, setShowAll] = useState(false);
  const [dossierProject, setDossierProject] = useState<CaseStudyProject | null>(null);

  // Reset pagination when the filter changes.
  useEffect(() => {
    setShowAll(false);
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

      {/* Project grid — each card is the trigger, no accordion, no nested buttons */}
      <div className="space-y-4 sm:space-y-5">
        {visibleProjects.map((project) => (
          <TiltCard key={project.name} max={3}>
            <button
              type="button"
              onClick={() => setDossierProject(project as CaseStudyProject)}
              aria-label={`Open dossier for ${project.name}`}
              className={cn(
                "group/card relative block w-full overflow-hidden rounded-xl border border-soft bg-surface-1 px-4 py-4 text-left backdrop-blur-sm sm:px-6 sm:py-5",
                "shadow-elev-1 transition-[border-color,box-shadow,transform] duration-base ease-out-soft",
                "hover:-translate-y-0.5 hover:border-strong hover:shadow-elev-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
              )}
            >
              {/* Accent left bar — visible on hover + focus */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[2px] bg-aurora opacity-0 transition-opacity duration-base group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
              />

              {/* Top row — category + timeline + arrow hint */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-label font-medium tracking-wide",
                    getCategoryBadgeStyles(project.category)
                  )}
                >
                  {getCategoryLabel(project.category as FilterCategory)}
                </span>
                <div className="flex items-center gap-3">
                  <span className="whitespace-nowrap font-mono text-label uppercase tracking-wider text-tertiary">
                    {project.timeline}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    className="text-tertiary transition-all duration-base ease-out-soft group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent"
                  />
                </div>
              </div>

              {/* Project name + short description */}
              <div className="mt-3 space-y-2">
                <h3 className="font-serif text-h2 font-normal italic tracking-tight text-primary">
                  {project.name}
                </h3>
                <p className="text-body-2 leading-relaxed tracking-wide text-primary/75">
                  {project.short_description}
                </p>
              </div>

              {/* Skill chips (max 4 visible; "+N more" if exceeded) */}
              {project.skills?.length ? (
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {project.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className={SKILL_CHIP}>
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 4 ? (
                    <span className="font-mono text-label text-tertiary">
                      +{project.skills.length - 4} more
                    </span>
                  ) : null}
                </div>
              ) : null}
            </button>
          </TiltCard>
        ))}
      </div>

      {/* Case-study overlay — opened by clicking any project card */}
      <CaseStudyOverlay project={dossierProject} onClose={() => setDossierProject(null)} />

      {/* Show all / show less */}
      {hasMore ? (
        <div className="mt-6 flex justify-center">
          <MagneticButton strength={0.2}>
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
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
