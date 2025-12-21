"use client";

import SmartNavbar from "@/components/SmartNavbar";
import ExperienceSection, { ExperienceItem } from "@/components/sections/Experience";

export type { ExperienceItem };

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <SmartNavbar />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <ExperienceSection />
      </main>
    </div>
  );
}
