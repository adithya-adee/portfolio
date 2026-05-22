/**
 * Pure utilities for the snake-curve timeline geometry. Kept side-effect-free
 * so it can be unit-tested or rendered server-side if needed.
 *
 * Layout model:
 *   - Each entry occupies a row of ROW_HEIGHT pixels.
 *   - Within each row, the dot sits at the row's vertical centre.
 *   - The dot's X position alternates between left and right, offset from the
 *     container centre by SNAKE_AMPLITUDE * width.
 *   - Index 0 (newest entry) lives on the right per the design spec.
 */

export interface SnakePoint {
  x: number;
  y: number;
}

export const SNAKE_WIDTH = 760;
export const ROW_HEIGHT = 200;
export const SNAKE_AMPLITUDE = 0.18; // fraction of width
export const EXIT_PADDING = 100; // extra space after the last dot

export function getSnakeSide(index: number): "left" | "right" {
  // Index 0 → right; alternates.
  return index % 2 === 0 ? "right" : "left";
}

export function getDotPositions(count: number, width = SNAKE_WIDTH): SnakePoint[] {
  const centerX = width / 2;
  const offset = width * SNAKE_AMPLITUDE;
  return Array.from({ length: count }, (_, i) => ({
    x: getSnakeSide(i) === "right" ? centerX + offset : centerX - offset,
    y: i * ROW_HEIGHT + ROW_HEIGHT / 2,
  }));
}

export function getTotalHeight(count: number): number {
  return count * ROW_HEIGHT + EXIT_PADDING;
}

/**
 * Generates a smooth cubic-bezier path through the given dot positions.
 * Each segment uses control points at the mid-Y so transitions between
 * alternating sides look like organic S-curves rather than sharp kinks.
 */
export function buildSnakePath(positions: SnakePoint[]): string {
  if (positions.length === 0) return "";

  // Enter from the top edge with the same X as the first dot, then curve in.
  let d = `M ${positions[0].x} 0`;
  d += ` C ${positions[0].x} ${positions[0].y * 0.35}, ${positions[0].x} ${positions[0].y * 0.75}, ${positions[0].x} ${positions[0].y}`;

  // S-curves between consecutive dots.
  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }

  // Exit from last dot to the bottom edge so the curve fades out gracefully.
  const last = positions[positions.length - 1];
  const exitY = last.y + EXIT_PADDING;
  d += ` C ${last.x} ${last.y + EXIT_PADDING * 0.5}, ${last.x} ${exitY}, ${last.x} ${exitY}`;

  return d;
}
