"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";
import { useReducedMotionSafe } from "@/components/motion";
import { cn } from "@/lib/utils";
import {
  getYearGroups,
  isCurrentRole,
  isPrimaryRole,
  type ExperienceItem,
} from "./timeline-data";

const SKILL_CHIP =
  "rounded-md bg-surface-2 px-3 py-1 text-label tracking-wide text-primary/80 ring-1 ring-inset ring-soft";

/**
 * Desktop /archive timeline — alternating cards across a central rail.
 *
 * Layout: CSS grid with 1fr | 32px | 1fr columns. The rail is one continuous
 * absolutely-positioned hairline that runs down the centre. Each entry sits
 * on one side, with a horizontal connector linking it to a dot on the rail.
 * Index 0 (newest entry) lives on the left so the eye lands there first.
 *
 * Year chips float on the rail at year boundaries — a horizontal hairline
 * runs through the chip, which has bg-surface-0 so the rail+rule "break"
 * cleanly behind the chip.
 *
 * Type semantics:
 *   - Primary roles (Full-time, Internship) → solid accent dot
 *   - Side roles (Freelance, Open Source, Mentorship) → hollow ring,
 *     plus an inline mono-uppercase TYPE tag inside the card so recruiters
 *     can tell at a glance these are non-primary engagements
 *
 * Animations on first scroll-in (all gated by useReducedMotionSafe):
 *   1. Rail scales scaleY: 0 → 1 from the top  (1.2s, ease-out-expo)
 *   2. Year chip fades in via Reveal
 *   3. Per-row: dot pops scale: 0 → 1, connector strokes scaleX: 0 → 1
 *      from the rail toward the card, card fades up
 */
export function ArchiveTimelineDesktop() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reduced = useReducedMotionSafe();
  const groups = getYearGroups();

  // Flatten entries so we get a single running index for alternating sides.
  type FlatRow = {
    exp: ExperienceItem;
    year: number;
    isFirstOfYear: boolean;
    globalIndex: number;
  };
  const flatRows: FlatRow[] = [];
  groups.forEach((group) => {
    group.entries.forEach((exp, entryIdx) => {
      flatRows.push({
        exp,
        year: group.year,
        isFirstOfYear: entryIdx === 0,
        globalIndex: flatRows.length,
      });
    });
  });

  return (
    <div className="relative">
      {/* Central rail — vertical hairline running the full height */}
      <motion.span
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-soft"
        initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: reduced ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div>
        {flatRows.map((row) => {
          const { exp, globalIndex, isFirstOfYear, year } = row;
          const isLeft = globalIndex % 2 === 0;
          const isCurrent = isCurrentRole(exp);
          const isPrimary = isPrimaryRole(exp);
          const cardId = `d-${exp.slug}-${globalIndex}`;
          const isOpen = expandedId === cardId;
          const baseDelay = globalIndex * 0.04 + 0.1;

          return (
            <Fragment key={cardId}>
              {isFirstOfYear ? (
                <YearChipRow year={year} delay={baseDelay} reduced={reduced} />
              ) : null}

              <div className="grid grid-cols-[1fr_32px_1fr] items-start gap-x-4 py-4">
                {/* LEFT card slot */}
                {isLeft ? (
                  <CardSlot
                    side="left"
                    exp={exp}
                    isCurrent={isCurrent}
                    isPrimary={isPrimary}
                    cardId={cardId}
                    isOpen={isOpen}
                    onToggle={() => setExpandedId(isOpen ? null : cardId)}
                    baseDelay={baseDelay}
                    reduced={reduced}
                  />
                ) : null}

                {/* Centre dot */}
                <RailDot
                  isCurrent={isCurrent}
                  isPrimary={isPrimary}
                  delay={baseDelay + 0.1}
                  reduced={reduced}
                />

                {/* RIGHT card slot */}
                {!isLeft ? (
                  <CardSlot
                    side="right"
                    exp={exp}
                    isCurrent={isCurrent}
                    isPrimary={isPrimary}
                    cardId={cardId}
                    isOpen={isOpen}
                    onToggle={() => setExpandedId(isOpen ? null : cardId)}
                    baseDelay={baseDelay}
                    reduced={reduced}
                  />
                ) : null}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────────────── */

function YearChipRow({
  year,
  delay,
  reduced,
}: {
  year: number;
  delay: number;
  reduced: boolean;
}) {
  return (
    <div className="relative my-6 flex items-center justify-center py-2">
      {/* Horizontal hairline runs across; chip's bg-surface-0 punches a gap */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-soft"
      />
      <motion.span
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.16, 1, 0.3, 1], delay }}
        className="relative rounded-full border border-soft bg-surface-0 px-4 py-1.5 font-mono text-label font-semibold uppercase tracking-[0.2em] text-accent shadow-elev-1"
      >
        {year}
      </motion.span>
    </div>
  );
}

function RailDot({
  isCurrent,
  isPrimary,
  delay,
  reduced,
}: {
  isCurrent: boolean;
  isPrimary: boolean;
  delay: number;
  reduced: boolean;
}) {
  return (
    <div className="col-start-2 col-end-3 flex justify-center pt-[27px]">
      <motion.span
        aria-hidden="true"
        className="relative flex h-2.5 w-2.5"
        initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {/* Ping ring for the currently-active role */}
        {isCurrent ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        ) : null}

        {/* Solid accent dot for primary roles, hollow ring for side work.
            The ring-2 ring-surface-0 punches a clean gap through the rail
            behind the dot, regardless of fill style. */}
        {isPrimary ? (
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface-0" />
        ) : (
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-accent bg-surface-0 ring-2 ring-surface-0" />
        )}
      </motion.span>
    </div>
  );
}

function CardSlot({
  side,
  exp,
  isCurrent,
  isPrimary,
  cardId,
  isOpen,
  onToggle,
  baseDelay,
  reduced,
}: {
  side: "left" | "right";
  exp: ExperienceItem;
  isCurrent: boolean;
  isPrimary: boolean;
  cardId: string;
  isOpen: boolean;
  onToggle: () => void;
  baseDelay: number;
  reduced: boolean;
}) {
  return (
    <div className={cn("relative", side === "left" ? "col-start-1" : "col-start-3")}>
      {/* Connector — straight horizontal hairline from card edge to rail.
          Width 32px spans (gap-x-4 = 16px) + half-of-col-2 (16px) = 32px.
          Origin set to the rail end so the line "draws out" toward the card. */}
      <motion.span
        aria-hidden="true"
        className={cn(
          "absolute top-[33px] h-px w-8 bg-soft",
          side === "left"
            ? "right-0 origin-right translate-x-full"
            : "left-0 origin-left -translate-x-full"
        )}
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: reduced ? 0 : 0.5,
          ease: [0.16, 1, 0.3, 1],
          delay: reduced ? 0 : baseDelay + 0.18,
        }}
      />

      {/* Card body slides in from its respective side */}
      <motion.article
        initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: side === "left" ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: reduced ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
          delay: reduced ? 0 : baseDelay,
        }}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-soft bg-surface-1 backdrop-blur-sm",
          "shadow-elev-1 transition-shadow duration-base ease-out-soft",
          "hover:border-strong hover:shadow-elev-2"
        )}
      >
        {/* Accent left bar on card hover */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[2px] bg-accent opacity-0 transition-opacity duration-base group-hover:opacity-100"
        />

        <button
          type="button"
          onClick={onToggle}
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

            {/* Badge row — location, optional non-primary type, active pulse */}
            <div className="flex flex-wrap items-center gap-2">
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
      </motion.article>
    </div>
  );
}
