"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Default ±6°. */
  max?: number;
}

/**
 * Pointer-tracked 3D tilt. GPU-only transforms. Disabled when:
 *   - prefers-reduced-motion is set
 *   - the pointer is coarse (touch)
 */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotionSafe();

  // Raw 0..1 pointer position inside the element.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Springs smooth the snap-back.
  const sx = useSpring(px, { stiffness: 220, damping: 22 });
  const sy = useSpring(py, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

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
