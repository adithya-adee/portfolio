"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { useReducedMotionSafe } from "@/components/motion";
import { cn } from "@/lib/utils";
import { TimelineDot } from "./TimelineDot";
import { TimelineTuple } from "./TimelineTuple";
import {
  buildSnakePath,
  getDotPositions,
  getSnakeSide,
  getTotalHeight,
  SNAKE_WIDTH,
} from "./snake-path";
import { type ExperienceItem } from "./timeline-data";

interface SnakeTimelineDesktopProps {
  entries: ExperienceItem[];
  selectedEntry: ExperienceItem | null;
  onSelect: (entry: ExperienceItem) => void;
}

/**
 * Desktop /archive timeline — vertical snake curve with alternating tuples
 * and big-serif year markers on the opposite side of each year's first entry.
 *
 * Geometry & sizing comes from snake-path.ts so the SVG path and HTML tuple
 * positions reference the same constants and stay in sync.
 *
 * Cinematic intro choreography (gated by useReducedMotionSafe):
 *   1. Snake path strokes itself in via pathLength: 0 → 1 over 1.6s
 *   2. Year markers fade in as each year boundary scrolls into view
 *   3. Dots pop in scale: 0 → 1 with stagger keyed off their index
 *   4. Tuples slide in from their outside (right tuples from -16x, left from +16x)
 */
export function SnakeTimelineDesktop({
  entries,
  selectedEntry,
  onSelect,
}: SnakeTimelineDesktopProps) {
  const reduced = useReducedMotionSafe();
  const positions = getDotPositions(entries.length);
  const pathD = buildSnakePath(positions);
  const totalHeight = getTotalHeight(entries.length);

  // Year boundaries — keep track of where new years start so we can render
  // serif year labels on the side opposite the first entry of that year.
  let prevYear: number | null = null;
  const yearMarkers: { year: number; index: number; side: "left" | "right" }[] = [];
  entries.forEach((entry, i) => {
    const year = parseInt(entry.startDate.split(" ").at(-1) ?? "", 10);
    if (year !== prevYear) {
      // First entry of this year — year marker on the OPPOSITE side of the entry's tuple
      const entrySide = getSnakeSide(i);
      const yearSide: "left" | "right" = entrySide === "right" ? "left" : "right";
      yearMarkers.push({ year, index: i, side: yearSide });
      prevYear = year;
    }
  });

  return (
    <div
      className="relative mx-auto"
      style={{ width: SNAKE_WIDTH, height: totalHeight }}
    >
      {/* SVG snake — path + dots */}
      <svg
        viewBox={`0 0 ${SNAKE_WIDTH} ${totalHeight}`}
        width={SNAKE_WIDTH}
        height={totalHeight}
        className="absolute inset-0 overflow-visible"
        aria-hidden="true"
      >
        <motion.path
          d={pathD}
          stroke="var(--accent)"
          strokeOpacity={0.55}
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: reduced ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        />

        {positions.map((pos, i) => {
          const entry = entries[i];
          const isPrimary = entry.type === "Full-time" || entry.type === "Internship";
          const isCurrent = entry.endDate.toLowerCase() === "present";
          const isSelected = selectedEntry?.slug === entry.slug;
          return (
            <TimelineDot
              key={entry.slug}
              cx={pos.x}
              cy={pos.y}
              isPrimary={isPrimary}
              isCurrent={isCurrent}
              isSelected={isSelected}
              reduced={reduced}
              delay={reduced ? 0 : 0.3 + i * 0.12}
            />
          );
        })}
      </svg>

      {/* Year markers — big serif text on the opposite side of each year's first entry */}
      {yearMarkers.map(({ year, index, side }) => {
        const pos = positions[index];
        return (
          <motion.div
            key={year}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute z-0 font-serif italic leading-none text-tertiary/30",
              side === "left" ? "left-4 text-left" : "right-4 text-right"
            )}
            style={{
              top: pos.y - 32,
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
            }}
            initial={reduced ? { opacity: 0.3, y: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.3, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: reduced ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: reduced ? 0 : 0.2 + index * 0.05,
            }}
          >
            {year}
          </motion.div>
        );
      })}

      {/* HTML tuples — positioned absolutely beside each dot */}
      {entries.map((entry, i) => {
        const pos = positions[i];
        const side = getSnakeSide(i);
        return (
          <Fragment key={entry.slug}>
            <TimelineTuple
              entry={entry}
              side={side}
              dotX={pos.x}
              dotY={pos.y}
              containerWidth={SNAKE_WIDTH}
              isSelected={selectedEntry?.slug === entry.slug}
              onClick={() => onSelect(entry)}
              delay={reduced ? 0 : 0.4 + i * 0.12}
              reduced={reduced}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
