"use client";

import experienceData from "@/asset/experience.json";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const SKILL_CHIP =
  "rounded-md bg-surface-2 px-3 py-1 text-label tracking-wide text-primary/80 ring-1 ring-inset ring-soft";

export interface ExperienceItem {
  slug: string;
  company: string;
  position: string;
  description: string;
  responsibilities: string[];
  highlights: string[];
  skills: string[];
  location: string;
  startDate: string;
  endDate: string;
  url: string;
  logo: string;
}

interface YearGroup {
  year: number;
  entries: ExperienceItem[];
}

function parseStartYear(startDate: string): number {
  // "APR 2026" → 2026, "AUG 2025" → 2025
  const year = parseInt(startDate.split(" ").at(-1) ?? "", 10);
  return Number.isFinite(year) ? year : 0;
}

function groupByYear(experiences: ExperienceItem[]): YearGroup[] {
  // Sort newest-first by start year, preserving order within the same year.
  const sorted = [...experiences].sort(
    (a, b) => parseStartYear(b.startDate) - parseStartYear(a.startDate)
  );
  const groups: YearGroup[] = [];
  let current: YearGroup | null = null;
  for (const exp of sorted) {
    const year = parseStartYear(exp.startDate);
    if (!current || current.year !== year) {
      current = { year, entries: [] };
      groups.push(current);
    }
    current.entries.push(exp);
  }
  return groups;
}

/**
 * Mobile-first timeline view for /archive. Renders experiences grouped under
 * year headings with a horizontal rule, each entry as the standard noir card.
 * The bullet dot to the left of the company name pulses for the currently-
 * active role (endDate === "Present").
 *
 * Phase 1 of the timeline build — Phase 2 will add a desktop-specific
 * `ArchiveTimelineDesktop` with a rail + dots layout; this component will
 * then be gated to `< md` viewports.
 */
export function ArchiveTimelineMobile() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const groups = groupByYear(experienceData as ExperienceItem[]);

  return (
    <div className="space-y-10">
      {groups.map((group, groupIndex) => (
        <section
          key={group.year}
          aria-labelledby={`year-${group.year}`}
          className="space-y-4"
        >
          {/* Year heading — accent year + hairline rule extending across */}
          <Reveal
            y={10}
            delay={groupIndex * 0.04}
            className="flex items-center gap-3"
          >
            <h2
              id={`year-${group.year}`}
              className="font-mono text-h2 font-semibold tracking-tight text-accent"
            >
              {group.year}
            </h2>
            <span aria-hidden="true" className="h-px flex-1 bg-soft" />
          </Reveal>

          {/* Cards under this year */}
          <div className="space-y-3 sm:space-y-4">
            {group.entries.map((exp, entryIndex) => {
              const isCurrent = exp.endDate.toLowerCase() === "present";
              const cardId = `${exp.slug}-${entryIndex}`;
              const isOpen = expandedId === cardId;

              return (
                <Reveal
                  key={cardId}
                  y={12}
                  delay={groupIndex * 0.04 + entryIndex * 0.05 + 0.08}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-soft bg-surface-1 backdrop-blur-sm",
                    "shadow-elev-1 transition-shadow duration-base ease-out-soft",
                    "hover:border-strong hover:shadow-elev-2"
                  )}
                >
                  {/* Accent left bar on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[2px] bg-accent opacity-0 transition-opacity duration-base group-hover:opacity-100"
                  />

                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : cardId)}
                    aria-expanded={isOpen}
                    aria-controls={`archive-panel-${cardId}`}
                    className="flex w-full items-start justify-between px-4 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <div className="flex-1 space-y-3">
                      {/* Title row */}
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                          {/* Bullet dot — accent, pulses if current role */}
                          <span
                            aria-hidden="true"
                            className="relative inline-flex h-2 w-2 shrink-0 self-center"
                          >
                            {isCurrent ? (
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                            ) : null}
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                          </span>

                          {exp.url ? (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="transition-opacity hover:opacity-80"
                            >
                              <h3 className="text-h2 font-semibold tracking-tight text-primary">
                                {exp.company}
                              </h3>
                            </a>
                          ) : (
                            <h3 className="text-h2 font-semibold tracking-tight text-primary">
                              {exp.company}
                            </h3>
                          )}
                          <span aria-hidden="true" className="text-tertiary">
                            ·
                          </span>
                          <span className="text-body-2 font-medium tracking-wide text-secondary">
                            {exp.position}
                          </span>
                        </div>
                        <span className="whitespace-nowrap font-mono text-label uppercase tracking-wider text-tertiary">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>

                      {/* Location + active badge */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-0.5 text-label font-medium text-secondary ring-1 ring-inset ring-soft">
                          {exp.location}
                        </span>
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-label font-medium text-accent ring-1 ring-inset ring-accent/30">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                            </span>
                            Active
                          </span>
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

                  {/* Expand panel */}
                  <div
                    id={`archive-panel-${cardId}`}
                    className={cn(
                      "overflow-hidden transition-all duration-slow ease-out-soft",
                      isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="border-t border-soft bg-surface-2/30 px-4 pb-5 pt-4 sm:px-6">
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className={cn(
                              "flex gap-3 transition-all duration-base ease-out-soft",
                              isOpen
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-3 opacity-0"
                            )}
                            style={{ transitionDelay: isOpen ? `${i * 40}ms` : "0ms" }}
                          >
                            <span aria-hidden="true" className="mt-2 text-accent/70">
                              ▸
                            </span>
                            <span className="text-body-2 leading-relaxed tracking-wide text-primary/85">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {exp.skills?.length ? (
                        <div className="mt-5 space-y-3 border-t border-soft pt-4">
                          <p className="text-label font-medium uppercase tracking-[0.15em] text-tertiary">
                            Skills
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, i) => (
                              <span key={i} className={SKILL_CHIP}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
