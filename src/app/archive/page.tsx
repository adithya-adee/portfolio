"use client";

import experienceData from "@/asset/experience.json";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "next-view-transitions";
import { Reveal, SectionTitle } from "@/components/motion";
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

export default function ArchivePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const experience = experienceData as ExperienceItem[];

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

        <SectionTitle meta={`${experience.length} roles`}>Work Experience</SectionTitle>

        <Reveal y={10} delay={0.05}>
          <p className="mb-6 text-body-2 leading-relaxed tracking-wide text-secondary">
            My professional journey — current work at Umbra Privacy, plus prior backend and Web3
            engagements.
          </p>
        </Reveal>

        {/* Experience list */}
        <div className="space-y-4 sm:space-y-5">
          {experience.map((exp, index) => {
            const isCurrent = exp.endDate.toLowerCase() === "present";
            const isOpen = expandedIndex === index;
            return (
              <Reveal
                key={exp.company}
                y={14}
                delay={0.08 + index * 0.05}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-soft bg-surface-1 backdrop-blur-sm",
                  "shadow-elev-1 transition-shadow duration-base ease-out-soft",
                  "hover:border-strong hover:shadow-elev-2"
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[2px] bg-aurora opacity-0 transition-opacity duration-base group-hover:opacity-100"
                />

                {/* Collapsed */}
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`archive-panel-${index}`}
                  className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-6 sm:py-5"
                >
                  <div className="flex-1 space-y-2.5">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-serif text-h2 font-normal tracking-tight text-primary">
                          {exp.position}
                        </h3>
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
                      <span className="whitespace-nowrap font-mono text-label uppercase tracking-wider text-tertiary">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>

                    {exp.url ? (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-body-2 font-medium tracking-wide text-accent transition-opacity hover:opacity-80"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <p className="text-body-2 tracking-wide text-primary/80">{exp.company}</p>
                    )}
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

                {/* Expanded */}
                <div
                  id={`archive-panel-${index}`}
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
                            isOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
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
    </div>
  );
}
