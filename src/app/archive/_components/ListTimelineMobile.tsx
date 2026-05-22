"use client";

import { Fragment } from "react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import { DateCapsule } from "./DateCapsule";
import {
  isCurrentRole,
  isPrimaryRole,
  type ExperienceItem,
} from "./timeline-data";

interface ListTimelineMobileProps {
  entries: ExperienceItem[];
  selectedEntry: ExperienceItem | null;
  onSelect: (entry: ExperienceItem) => void;
}

/**
 * Mobile /archive timeline — vertical list of tuples grouped by start year.
 * Snake geometry doesn't fit narrow viewports cleanly, so this falls back to
 * a clean stacked list with a small dot prefix per entry (solid vs hollow
 * still communicating primary vs side roles). Click opens the same sidebar
 * the desktop variant uses.
 */
export function ListTimelineMobile({
  entries,
  selectedEntry,
  onSelect,
}: ListTimelineMobileProps) {
  // Group entries by start year so we can render a year heading at each boundary.
  let prevYear: number | null = null;

  return (
    <div className="flex flex-col gap-8">
      {entries.map((entry, i) => {
        const isCurrent = isCurrentRole(entry);
        const isPrimary = isPrimaryRole(entry);
        const isSelected = selectedEntry?.slug === entry.slug;
        const year = parseInt(entry.startDate.split(" ").at(-1) ?? "", 10);
        const showYearHeading = year !== prevYear;
        prevYear = year;

        return (
          <Fragment key={entry.slug}>
            {showYearHeading ? (
              <Reveal y={6} delay={i * 0.03} className="flex items-center gap-3">
                <h2 className="font-serif text-h1 font-normal italic tracking-tight text-accent">
                  {year}
                </h2>
                <span aria-hidden="true" className="h-px flex-1 bg-soft" />
              </Reveal>
            ) : null}

            <Reveal y={10} delay={i * 0.04 + 0.05}>
              <button
                type="button"
                onClick={() => onSelect(entry)}
                aria-label={`Open details for ${entry.company}`}
                aria-pressed={isSelected}
                className={cn(
                  "group/entry flex w-full items-start gap-4 rounded-lg px-2 py-2 text-left transition-colors duration-base",
                  "hover:bg-surface-1",
                  isSelected && "bg-surface-1",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
                )}
              >
                {/* Dot prefix — solid for primary, hollow ring for secondary,
                    active pulse for current role. */}
                <span
                  aria-hidden="true"
                  className="relative mt-2 inline-flex h-2.5 w-2.5 shrink-0"
                >
                  {isCurrent ? (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  ) : null}
                  {isPrimary ? (
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  ) : (
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-accent bg-surface-0" />
                  )}
                </span>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <DateCapsule
                    startDate={entry.startDate}
                    endDate={entry.endDate}
                    isCurrent={isCurrent}
                  />

                  <div className="space-y-0.5">
                    <h3
                      className={cn(
                        "text-h2 font-semibold leading-tight tracking-tight transition-colors",
                        isSelected
                          ? "text-primary"
                          : "text-primary/85 group-hover/entry:text-primary"
                      )}
                    >
                      {entry.company}
                    </h3>
                    <p className="text-body-2 font-medium tracking-wide text-tertiary">
                      {entry.position}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-0.5 text-label font-medium text-secondary ring-1 ring-inset ring-soft">
                      {entry.location}
                    </span>
                    {!isPrimary ? (
                      <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-label font-semibold uppercase tracking-wider text-tertiary ring-1 ring-inset ring-soft">
                        {entry.type}
                      </span>
                    ) : null}
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-label font-medium text-accent ring-1 ring-inset ring-accent/30">
                        Active
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            </Reveal>
          </Fragment>
        );
      })}
    </div>
  );
}
