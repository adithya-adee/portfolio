"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import experienceData from "@/asset/experience.json";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionNavLink, SectionTitle, useReducedMotionSafe } from "@/components/motion";
import { ExperienceSidebar } from "@/app/archive/_components/ExperienceSidebar";
import {
  isCurrentRole,
  isPrimaryRole,
  type ExperienceItem,
} from "@/app/archive/_components/timeline-data";
import { cn } from "@/lib/utils";

// experience.json has a `display` field that controls home visibility.
// Strip mentorship-style entries from the home view but keep them on /archive.
type HomeExperience = ExperienceItem & { display?: boolean };

/**
 * Home Experience section — narrow vertical-rail timeline.
 *
 * Aesthetic borrowed from /archive's snake timeline:
 *   - Animated rail that strokes in on scroll (CSS scaleY transform, masked at
 *     top/bottom so it fades rather than starts/ends abruptly).
 *   - Solid dot for primary roles (Full-time / Internship), hollow ring for
 *     secondary (Freelance / Open Source / Mentorship). Active role pulses.
 *   - Each entry is a single clickable button; click opens the same
 *     ExperienceSidebar /archive uses, so the deep-view lives in one place.
 *
 * Distinct from /archive's snake-curve so the home page doesn't duplicate the
 * archive — same vocabulary (rail + dots + sidebar), different choreography.
 */
export default function ExperienceCollapsed() {
  const reduced = useReducedMotionSafe();
  const [selectedEntry, setSelectedEntry] = useState<ExperienceItem | null>(null);

  const experience = (experienceData as HomeExperience[]).filter(
    (exp) => exp.display !== false
  );

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <SectionTitle
        index={1}
        meta={<SectionNavLink href="/archive">my timeline</SectionNavLink>}
      >
        Where I&apos;ve Worked
      </SectionTitle>

      <div className="relative pl-7 sm:pl-12">
        {/* Animated vertical rail. transformOrigin: top + scaleY 0→1 strokes
            the rail in from the top as it enters the viewport. Mask fades the
            ends so it doesn't look chopped against the section padding. */}
        <motion.div
          aria-hidden="true"
          initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduced ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: "top",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)",
          }}
          className="absolute left-[7px] top-2 bottom-2 w-px bg-accent/45 sm:left-[19px]"
        />

        <ol className="space-y-6 sm:space-y-8">
          {experience.map((exp, index) => {
            const isCurrent = isCurrentRole(exp);
            const isPrimary = isPrimaryRole(exp);

            return (
              <li key={exp.slug} className="relative">
                {/* Dot — anchored to the rail, vertically aligned with the
                    company-name baseline. Solid for primary roles, hollow ring
                    for secondary. Active role gets a slow ping behind it. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-[18px] inline-flex h-3 w-3 -translate-x-1/2 items-center justify-center sm:top-[22px]",
                    "left-[7px] sm:left-[19px]"
                  )}
                >
                  {isCurrent ? (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  ) : null}
                  <span
                    className={cn(
                      "relative inline-flex h-3 w-3 rounded-full",
                      isPrimary
                        ? "bg-accent ring-2 ring-surface-0"
                        : "border-[1.5px] border-accent bg-surface-0"
                    )}
                  />
                </span>

                <Reveal y={10} delay={index * 0.06}>
                  <button
                    type="button"
                    onClick={() => setSelectedEntry(exp)}
                    aria-label={`Open details for ${exp.company}`}
                    className={cn(
                      "group/entry block w-full rounded-lg px-3 py-2 text-left transition-colors duration-base ease-out-soft -ml-3 sm:-ml-4 sm:px-4 sm:py-3",
                      "hover:bg-surface-1/70",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
                    )}
                  >
                    {/* Top row — company + role | dates + arrow */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <h3 className="font-serif text-h2 font-normal italic tracking-tight text-primary transition-colors group-hover/entry:text-accent-bright">
                          {exp.company}
                        </h3>
                        <span aria-hidden="true" className="text-tertiary">
                          ·
                        </span>
                        <span className="text-body-2 font-medium tracking-wide text-secondary">
                          {exp.position}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="whitespace-nowrap font-mono text-label uppercase tracking-wider text-tertiary">
                          {exp.startDate} – {exp.endDate}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          size={16}
                          className="text-tertiary transition-all duration-base ease-out-soft group-hover/entry:-translate-y-0.5 group-hover/entry:translate-x-0.5 group-hover/entry:text-accent"
                        />
                      </div>
                    </div>

                    {/* Badge row — location, type (non-primary), active pulse */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-0.5 text-label font-medium text-secondary ring-1 ring-inset ring-soft">
                        {exp.location}
                      </span>
                      {!isPrimary ? (
                        <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-label font-semibold uppercase tracking-wider text-tertiary ring-1 ring-inset ring-soft">
                          {exp.type}
                        </span>
                      ) : null}
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
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Sidebar — same component /archive uses, deep view in one place */}
      <ExperienceSidebar entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </section>
  );
}
