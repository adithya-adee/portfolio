"use client";

import { useState } from "react";
import { ExperienceSidebar } from "./ExperienceSidebar";
import { ListTimelineMobile } from "./ListTimelineMobile";
import { SnakeTimelineDesktop } from "./SnakeTimelineDesktop";
import { getSortedExperiences, type ExperienceItem } from "./timeline-data";

/**
 * Top-level archive timeline. Owns `selectedEntry` state so both the desktop
 * snake variant and the mobile list variant can drive the same sidebar.
 *
 * Clicking a tuple stores the entry; the sidebar opens automatically off
 * that state. Clicking a different tuple while the sidebar is already open
 * just swaps the state — ExperienceSidebar handles the content cross-fade
 * via AnimatePresence keyed by slug.
 */
export function ArchiveTimeline() {
  const [selectedEntry, setSelectedEntry] = useState<ExperienceItem | null>(null);
  const entries = getSortedExperiences();

  return (
    <>
      <div className="hidden md:block">
        <SnakeTimelineDesktop
          entries={entries}
          selectedEntry={selectedEntry}
          onSelect={setSelectedEntry}
        />
      </div>
      <div className="md:hidden">
        <ListTimelineMobile
          entries={entries}
          selectedEntry={selectedEntry}
          onSelect={setSelectedEntry}
        />
      </div>
      <ExperienceSidebar entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </>
  );
}
