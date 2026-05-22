"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

interface PaletteProps {
  initialOpen?: boolean;
}

/**
 * Client-only lazy mount for the command palette.
 *
 * The full cmdk + icon bundle (~50 KB tree-shaken) only loads on the first
 * `⌘/Ctrl + K` press, not on initial page load. This keeps the route bundle
 * lean for visitors who never use the palette. Once the chunk has loaded,
 * subsequent toggles are instant.
 *
 * The keyboard listener lives in this wrapper so it's active immediately
 * after hydration, even before the palette code itself has been imported.
 */
export function CommandPaletteMount() {
  const [Comp, setComp] = useState<ComponentType<PaletteProps> | null>(null);
  const [openOnLoad, setOpenOnLoad] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") return;
      if (!(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (Comp) {
        // Component already mounted — its own listener will handle toggle.
        return;
      }
      if (loadingRef.current) return;
      loadingRef.current = true;
      import("./CommandPalette").then((mod) => {
        setOpenOnLoad(true);
        setComp(() => mod.CommandPalette);
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [Comp]);

  if (!Comp) return null;
  return <Comp initialOpen={openOnLoad} />;
}
