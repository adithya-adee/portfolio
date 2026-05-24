"use client";

import { useEffect, useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { toast } from "sonner";

// Classic Konami sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

/**
 * Global keyboard listener that watches for the Konami code and pushes the
 * user to /uses on completion. Silent for everyone who doesn't try.
 *
 * Ignores keypresses while focus is on inputs / textareas / contenteditable so
 * we don't trigger inside form fields. Buffer only retains the last
 * KONAMI.length keys, so partial matches don't accumulate.
 */
export function KonamiCode() {
  const router = useTransitionRouter();
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }
      // Normalize letter keys to lowercase so we accept both b/B, a/A.
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const buf = [...bufferRef.current, key].slice(-KONAMI.length);
      bufferRef.current = buf;

      if (buf.length === KONAMI.length && buf.every((k, i) => k === KONAMI[i])) {
        bufferRef.current = [];
        toast.success("↑ ↑ ↓ ↓ ← → ← → B A", {
          description: "You found the bonus reel.",
          duration: 2400,
        });
        router.push("/uses");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
