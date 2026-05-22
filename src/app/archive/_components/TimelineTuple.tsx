"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DateCapsule } from "./DateCapsule";
import { isCurrentRole, isPrimaryRole, type ExperienceItem } from "./timeline-data";

interface TimelineTupleProps {
  entry: ExperienceItem;
  side: "left" | "right";
  /** Dot X coordinate inside the SVG viewBox. */
  dotX: number;
  /** Dot Y coordinate inside the SVG viewBox. */
  dotY: number;
  /** Width of the surrounding SVG viewBox — used to anchor right-side tuples. */
  containerWidth: number;
  /** Selected = the sidebar is open against this entry. */
  isSelected: boolean;
  onClick: () => void;
  delay: number;
  reduced: boolean;
}

const TUPLE_MAX_WIDTH = 290;
const DOT_TO_TUPLE_GAP = 32;

/**
 * Clickable text block beside each dot — date capsule, company name, role
 * title, and an optional type badge for secondary roles. Acts as the primary
 * affordance for opening the sidebar.
 *
 * Positioned absolutely against the snake container so its anchor sits at
 * the dot's coordinates; the body then extends outward (right for right-side
 * dots, left for left-side dots).
 */
export function TimelineTuple({
  entry,
  side,
  dotX,
  dotY,
  containerWidth,
  isSelected,
  onClick,
  delay,
  reduced,
}: TimelineTupleProps) {
  const isCurrent = isCurrentRole(entry);
  const isPrimary = isPrimaryRole(entry);

  // Position anchored to the dot. Right-side tuples set `left`, left-side set
  // `right` so the layout extends outward away from the snake.
  const positionStyle =
    side === "right"
      ? { left: dotX + DOT_TO_TUPLE_GAP, top: dotY }
      : { right: containerWidth - dotX + DOT_TO_TUPLE_GAP, top: dotY };

  // Slide direction for entrance animation matches the layout side.
  const initialX = reduced ? 0 : side === "right" ? -16 : 16;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Open details for ${entry.company}`}
      aria-pressed={isSelected}
      className={cn(
        "group/tuple absolute z-10 flex -translate-y-1/2 cursor-pointer flex-col gap-2 outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
        side === "left" && "items-end text-right"
      )}
      style={{ ...positionStyle, maxWidth: TUPLE_MAX_WIDTH }}
      initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: reduced ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : delay,
      }}
    >
      <DateCapsule
        startDate={entry.startDate}
        endDate={entry.endDate}
        isCurrent={isCurrent}
      />

      <div className={cn("flex flex-col gap-1", side === "left" && "items-end")}>
        <h3
          className={cn(
            "text-h2 font-semibold leading-tight tracking-tight transition-colors duration-base",
            isSelected
              ? "text-primary"
              : "text-primary/85 group-hover/tuple:text-primary"
          )}
        >
          {entry.company}
        </h3>
        <p
          className={cn(
            "text-body-2 font-medium tracking-wide transition-colors duration-base",
            isSelected ? "text-secondary" : "text-tertiary group-hover/tuple:text-secondary"
          )}
        >
          {entry.position}
        </p>
      </div>

      {/* Badge row — location, optional type, active pulse */}
      <div
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          side === "left" && "justify-end"
        )}
      >
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
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Active
          </span>
        ) : null}
      </div>
    </motion.button>
  );
}
