"use client";

import SmartNavbar from "@/components/SmartNavbar";
import ExperienceSection from "@/components/sections/Experience";

export interface ExperienceItem {
  slug: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  highlights: string[];
  url: string;
  logo: string;
}

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
