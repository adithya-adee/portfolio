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
    const lazyOpen = () => {
      if (Comp) return; // Already mounted; its own listener handles toggle.
      if (loadingRef.current) return;
      loadingRef.current = true;
      import("./CommandPalette").then((mod) => {
        setOpenOnLoad(true);
        setComp(() => mod.CommandPalette);
      });
    };

    const keyHandler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") return;
      if (!(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      lazyOpen();
    };

    // The CommandPaletteHint chip and any other UI affordance dispatches this
    // custom event to open the palette without simulating a keystroke.
    const customHandler = () => lazyOpen();

    window.addEventListener("keydown", keyHandler);
    window.addEventListener("portfolio:open-palette", customHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("portfolio:open-palette", customHandler);
    };
  }, [Comp]);

  if (!Comp) return null;
  return <Comp initialOpen={openOnLoad} />;
}
