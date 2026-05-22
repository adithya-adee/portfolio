"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion";
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

const YEAR_COL_WIDTH = 150;
const YEAR_TO_SNAKE_GAP = 24;
const TOTAL_TIMELINE_WIDTH = YEAR_COL_WIDTH + YEAR_TO_SNAKE_GAP + SNAKE_WIDTH;

/**
 * Desktop /archive timeline. Two-column CSS grid:
 *   [year column 150px]  [snake column 760px]
 *
 * Year markers live in their own column, always right-aligned against the
 * snake column's left edge. Unambiguous: years are *always* on the left,
 * outside the snake, never competing with alternating tuples.
 *
 * The snake column hosts the SVG path + dots + tuples. Index 0 (newest)
 * bows right, alternates. Tuples extend outward from their dot but stay
 * within the snake column's bounds.
 *
 * Cinematic intro on first scroll-in:
 *   1. Year markers fade up (opacity 0 → 0.3, y: +12 → 0)
 *   2. Snake path strokes itself in (pathLength 0 → 1 over 1.6s)
 *   3. Dots pop in with stagger
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

  // Year boundaries — first entry of each year. Years always render on the
  // left now (in their own grid column), so no side calculation needed.
  let prevYear: number | null = null;
  const yearMarkers: { year: number; y: number; index: number }[] = [];
  entries.forEach((entry, i) => {
    const year = parseInt(entry.startDate.split(" ").at(-1) ?? "", 10);
    if (year !== prevYear) {
      yearMarkers.push({ year, y: positions[i].y, index: i });
      prevYear = year;
    }
  });

  return (
    <div
      className="mx-auto grid items-start"
      style={{
        gridTemplateColumns: `${YEAR_COL_WIDTH}px ${SNAKE_WIDTH}px`,
        columnGap: YEAR_TO_SNAKE_GAP,
        width: TOTAL_TIMELINE_WIDTH,
      }}
    >
      {/* ─── Year column ─────────────────────────────────────── */}
      <div className="relative" style={{ height: totalHeight }}>
        {yearMarkers.map(({ year, y, index }) => (
          <motion.div
            key={year}
            aria-hidden="true"
            className="pointer-events-none absolute right-0 font-serif italic leading-none text-tertiary/35"
            style={{
              top: y - 38,
              fontSize: "clamp(2.75rem, 4.5vw, 4.25rem)",
            }}
            initial={reduced ? { opacity: 0.35, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 0.35, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: reduced ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: reduced ? 0 : 0.2 + index * 0.05,
            }}
          >
            {year}
          </motion.div>
        ))}
      </div>

      {/* ─── Snake column ─────────────────────────────────────── */}
      <div className="relative" style={{ width: SNAKE_WIDTH, height: totalHeight }}>
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
            strokeOpacity={0.6}
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

        {/* HTML tuples — positioned absolutely beside each dot */}
        {entries.map((entry, i) => {
          const pos = positions[i];
          const side = getSnakeSide(i);
          return (
            <TimelineTuple
              key={entry.slug}
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
          );
        })}
      </div>
    </div>
  );
}
