"use client";

import { motion } from "framer-motion";

interface TimelineDotProps {
  cx: number;
  cy: number;
  isPrimary: boolean;
  isCurrent: boolean;
  isSelected: boolean;
  reduced: boolean;
  delay: number;
}

const DOT_RADIUS = 7;

/**
 * SVG dot for the snake timeline. Solid (filled) for primary roles (full-time
 * / internship); hollow ring for secondary (freelance / open source /
 * mentorship). When the role is currently active, a separate pulsing ring is
 * rendered behind it.
 *
 * The dot itself pops in scale: 0 → 1 with a stagger delay so the dots
 * appear sequentially along the snake as it draws in.
 *
 * Selected state (sidebar open against this entry) bumps scale and switches
 * the fill to the brighter accent variant.
 */
export function TimelineDot({
  cx,
  cy,
  isPrimary,
  isCurrent,
  isSelected,
  reduced,
  delay,
}: TimelineDotProps) {
  return (
    <g style={{ pointerEvents: "none" }}>
      {/* Active-role pulse — runs only when the role is current AND not
          currently selected. The selected-state pulse below takes over so
          two infinite animations don't stack on the same dot. */}
      {isCurrent && !isSelected ? (
        <motion.circle
          cx={cx}
          cy={cy}
          r={DOT_RADIUS}
          fill="var(--accent)"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={reduced ? { scale: 1, opacity: 0 } : { scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 1.8, repeat: Infinity, ease: "easeOut" }
          }
        />
      ) : null}

      {/* Selected-state pulse — only on while the sidebar is open for this entry */}
      {isSelected ? (
        <motion.circle
          cx={cx}
          cy={cy}
          r={DOT_RADIUS}
          fill="var(--accent-bright)"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={reduced ? { scale: 1, opacity: 0 } : { scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 1.6, repeat: Infinity, ease: "easeOut" }
          }
        />
      ) : null}

      {/* The actual dot — solid for primary roles, hollow ring for secondary */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={DOT_RADIUS}
        fill={isPrimary ? "var(--accent)" : "var(--surface-0)"}
        stroke="var(--accent)"
        strokeWidth={isPrimary ? 0 : 2}
        initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={{
          scale: isSelected ? 1.25 : 1,
          opacity: 1,
        }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }
        }
        style={
          isSelected
            ? { filter: "drop-shadow(0 0 10px var(--accent-glow))" }
            : undefined
        }
      />
    </g>
  );
}
