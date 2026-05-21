"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

/**
 * A small follower dot that scales up over interactive elements. Pointer-fine
 * devices only. Hidden under reduced-motion.
 */
export function SoftCursor() {
  const reduced = useReducedMotionSafe();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [reduced, x, y]);

  if (reduced || !enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden sm:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{
          scale: hovering ? 2.2 : 1,
          opacity: hovering ? 0.55 : 0.85,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="-ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full bg-white mix-blend-difference"
      />
    </motion.div>
  );
}
