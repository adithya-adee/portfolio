"use client";

import { useState } from "react";
import { ListTimelineMobile } from "./ListTimelineMobile";
import { SnakeTimelineDesktop } from "./SnakeTimelineDesktop";
import { getSortedExperiences, type ExperienceItem } from "./timeline-data";

/**
 * Top-level archive timeline. Owns `selectedEntry` state so both the desktop
 * snake variant and the mobile list variant can drive the same sidebar.
 *
 * Phase 4.1: clicking a tuple just stores the selected entry. The actual
 * ExperienceSidebar lands in Phase 4.2.
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
      {/* ExperienceSidebar mounts here in Phase 4.2 */}
    </>
  );
}
