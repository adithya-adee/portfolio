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

      {/* Two-column timeline: a narrow rail/dot column on the left, content
          on the right. Using CSS grid means dots and rail share the same x
          origin no matter how content reflows. */}
      <div className="relative">
        {/* Animated vertical rail — sits in the center of the 24px (mobile) /
            40px (desktop) gutter column. scaleY 0→1 strokes it in from the
            top on viewport-enter, masked at the ends so it fades cleanly. */}
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
          className="pointer-events-none absolute left-[11px] top-2 bottom-2 w-px bg-accent/45 sm:left-[19px]"
        />

        <ol className="space-y-7 sm:space-y-10">
          {experience.map((exp, index) => {
            const isCurrent = isCurrentRole(exp);
            const isPrimary = isPrimaryRole(exp);

            return (
              <li
                key={exp.slug}
                className="grid grid-cols-[24px_1fr] gap-x-4 sm:grid-cols-[40px_1fr] sm:gap-x-6"
              >
                {/* Rail column — purely a spacer that gives the dot a fixed
                    track. The dot is centered within this column so it always
                    lands on the rail regardless of content width. */}
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-[22px] inline-flex h-3 w-3 -translate-x-1/2 items-center justify-center sm:top-[28px]"
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
                </div>

                {/* Content column — clickable entry, styled as a card to match
                    Projects / Blogs / TechStack while the rail keeps its
                    timeline role in the gutter to the left. */}
                <Reveal y={10} delay={index * 0.06}>
                  <button
                    type="button"
                    onClick={() => setSelectedEntry(exp)}
                    aria-label={`Open details for ${exp.company}`}
                    className={cn(
                      "group/entry relative block w-full overflow-hidden rounded-xl border border-soft bg-surface-1 px-4 py-4 text-left backdrop-blur-sm sm:px-6 sm:py-5",
                      "shadow-elev-1 transition-[border-color,box-shadow,transform] duration-base ease-out-soft",
                      "hover:-translate-y-0.5 hover:border-strong hover:shadow-elev-2",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
                    )}
                  >
                    {/* Accent left bar on hover / focus — matches Projects + Blogs cards */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[2px] bg-aurora opacity-0 transition-opacity duration-base group-hover/entry:opacity-100 group-focus-visible/entry:opacity-100"
                    />
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

                    {/* Inline highlight — the punchiest bullet rendered without
                        a click, so scanners get the value-add of the role at
                        a glance. Full highlight list still available in the
                        sidebar on click. */}
                    {exp.highlights?.[0] ? (
                      <p className="mt-3 flex gap-2.5 text-body-2 leading-relaxed text-primary/65">
                        <span aria-hidden="true" className="mt-1.5 shrink-0 text-accent/60">
                          ▸
                        </span>
                        <span>{exp.highlights[0]}</span>
                      </p>
                    ) : null}
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
