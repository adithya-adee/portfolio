"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Reveal, useReducedMotionSafe } from "@/components/motion";
import { cn } from "@/lib/utils";
import { getYearGroups, isCurrentRole } from "./timeline-data";

const SKILL_CHIP =
  "rounded-md bg-surface-2 px-3 py-1 text-label tracking-wide text-primary/80 ring-1 ring-inset ring-soft";

// Layout constants — keep the rail / dot offsets coordinated.
// Rail is rendered at `left-3` (12px from container start).
// Cards sit at `pl-12` (48px padding-left), so they begin at container-x=48.
// Each card's dot is absolutely positioned at left:-38px so its 10px width
// straddles the 1px rail at container-x≈12.5.
const DOT_OFFSET_PX = -38;

/**
 * Desktop timeline view for /archive — a vertical rail with accent dots at
 * each card's title row, year markers cutting across the rail, and a cinematic
 * draw-in choreography:
 *
 *  1. Rail itself scales from scaleY:0 → 1 (top-origin, 1.2s ease-out-expo)
 *  2. Year heading bg-surface-0 punches through the rail when it lands
 *  3. Each entry's dot pops in (scale:0→1) just before the card body fades up
 *  4. Active role dot pulses indefinitely (matches the REC + visitor indicators)
 *
 * All animations are gated through useReducedMotionSafe — reduced-motion
 * users see the final state instantly with no motion.
 */
export function ArchiveTimelineDesktop() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reduced = useReducedMotionSafe();
  const groups = getYearGroups();

  return (
    <div className="relative">
      {/* Rail — vertical hairline, draws in from the top */}
      <motion.span
        aria-hidden="true"
        className="absolute left-3 top-0 h-full w-px origin-top bg-soft"
        initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: reduced ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="space-y-10 pl-12">
        {groups.map((group, groupIndex) => (
          <section
            key={group.year}
            aria-labelledby={`year-d-${group.year}`}
            className="space-y-5"
          >
            {/* Year heading — horizontal rule extends across; the year text
                punches through the rail and rule via bg-surface-0. The
                `-ml-12` cancels the parent pl-12 so the rule spans the full
                container width (rail + gap + cards). */}
            <Reveal
              y={8}
              delay={groupIndex * 0.05}
              className="relative -ml-12 flex items-center"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2 bg-soft"
              />
              <span className="bg-surface-0 px-3 font-mono text-h2 font-semibold uppercase tracking-wider text-accent">
                {group.year}
              </span>
            </Reveal>

            <div className="space-y-4">
              {group.entries.map((exp, entryIndex) => {
                const isCurrent = isCurrentRole(exp);
                const cardId = `d-${exp.slug}-${entryIndex}`;
                const isOpen = expandedId === cardId;
                const baseDelay = groupIndex * 0.05 + entryIndex * 0.06 + 0.15;

                return (
                  <Reveal
                    key={cardId}
                    y={14}
                    delay={baseDelay + 0.1}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border border-soft bg-surface-1 backdrop-blur-sm",
                      "shadow-elev-1 transition-shadow duration-base ease-out-soft",
                      "hover:border-strong hover:shadow-elev-2"
                    )}
                  >
                    {/* Accent dot on the rail aligned with the card's title row.
                        Position outside the card via negative left; ring-2
                        ring-surface-0 punches a clean gap in the rail behind
                        the dot. */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute top-[34px] z-10 flex h-2.5 w-2.5"
                      style={{ left: `${DOT_OFFSET_PX}px` }}
                      initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: reduced ? 0 : 0.5,
                        ease: [0.16, 1, 0.3, 1],
                        delay: reduced ? 0 : baseDelay,
                      }}
                    >
                      {isCurrent ? (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                      ) : null}
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface-0" />
                    </motion.span>

                    {/* Accent left bar on card hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[2px] bg-accent opacity-0 transition-opacity duration-base group-hover:opacity-100"
                    />

                    <button
                      type="button"
                      onClick={() => setExpandedId(isOpen ? null : cardId)}
                      aria-expanded={isOpen}
                      aria-controls={`archive-d-panel-${cardId}`}
                      className="flex w-full items-start justify-between px-6 py-5 text-left"
                    >
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
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
                          "ml-6 transition-transform duration-base ease-out-soft",
                          isOpen ? "rotate-180" : "rotate-0"
                        )}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-5 w-5 text-tertiary group-hover:text-primary" />
                      </div>
                    </button>

                    <div
                      id={`archive-d-panel-${cardId}`}
                      className={cn(
                        "overflow-hidden transition-all duration-slow ease-out-soft",
                        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="border-t border-soft bg-surface-2/30 px-6 pb-5 pt-4">
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
    </div>
  );
}
