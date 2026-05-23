"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Default ±6°. */
  max?: number;
}

/**
 * Pointer-tracked 3D tilt. GPU-only transforms. Bypassed entirely (returns a
 * plain div, no framer-motion mounting cost) when:
 *   - prefers-reduced-motion is set
 *   - the pointer is coarse (touch, stylus)
 *
 * The pointer-fine probe runs once on mount; SSR + first paint render the
 * lightweight path so we never pay for framer-motion subscriptions on mobile.
 */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const reduced = useReducedMotionSafe();
  const [supportsTilt, setSupportsTilt] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setSupportsTilt(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (reduced || !supportsTilt) {
    return <div className={className}>{children}</div>;
  }

  return (
    <TiltCardActive className={className} max={max}>
      {children}
    </TiltCardActive>
  );
}

/** Active tilt path — only mounted when fine pointer + non-reduced motion. */
function TiltCardActive({ children, className, max }: Required<Pick<TiltCardProps, "max">> & TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const sx = useSpring(px, { stiffness: 220, damping: 22 });
  const sy = useSpring(py, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
