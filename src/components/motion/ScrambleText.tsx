"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface ScrambleTextProps {
  /** Cycle through these strings. If only one, it stays static after the initial reveal. */
  phrases: string[];
  /** ms between phrase swaps. */
  interval?: number;
  /** ms total duration of the scramble animation. */
  duration?: number;
  className?: string;
  /** Characters used as scramble noise. */
  noise?: string;
}

const DEFAULT_NOISE = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Scramble-cycle text. Productized from the 404 page's glitch effect.
 *
 * Under reduced-motion: phrases swap with no scramble.
 */
export function ScrambleText({
  phrases,
  interval = 4200,
  duration = 750,
  className,
  noise = DEFAULT_NOISE,
}: ScrambleTextProps) {
  const reduced = useReducedMotionSafe();
  const [text, setText] = useState(phrases[0] ?? "");
  const indexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phrases.length <= 1) {
      setText(phrases[0] ?? "");
      return;
    }

    const scrambleTo = (target: string, onDone: () => void) => {
      if (reduced) {
        setText(target);
        onDone();
        return;
      }
      const current = textRef.current;
      const length = Math.max(current.length, target.length);
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / duration);
        let next = "";
        for (let i = 0; i < length; i++) {
          const revealAt = (i / length) * 0.6;
          if (progress >= revealAt + 0.4) {
            next += target[i] ?? "";
          } else if (progress >= revealAt) {
            next += noise[Math.floor(Math.random() * noise.length)];
          } else {
            next += current[i] ?? noise[Math.floor(Math.random() * noise.length)];
          }
        }
        setText(next);
        textRef.current = next;
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setText(target);
          textRef.current = target;
          onDone();
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const textRef = { current: phrases[0] ?? "" };
    setText(textRef.current);

    const cycle = () => {
      indexRef.current = (indexRef.current + 1) % phrases.length;
      scrambleTo(phrases[indexRef.current] ?? "", () => {
        timeoutRef.current = setTimeout(cycle, interval);
      });
    };

    timeoutRef.current = setTimeout(cycle, interval);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [phrases, interval, duration, noise, reduced]);

  return (
    <span
      className={cn("inline-block tabular-nums", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      {text}
    </span>
  );
}
