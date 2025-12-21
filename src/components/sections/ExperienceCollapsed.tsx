"use client";

import experienceData from "@/asset/experience.json";
import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  startDate: string;
  endDate: string;
  url: string;
}

export default function ExperienceCollapsed() {
  const experience = useMemo(() => experienceData as unknown as ExperienceItem[], []);

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-400">Where I&apos;ve Worked</h2>
        <a
          href="/experience"
          className="flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-gray-200"
        >
          View All
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      <div className="space-y-2">
        {experience.map((exp) => (
          <div
            key={exp.company}
            className="flex items-center justify-between rounded-md border border-neutral-800/50 bg-neutral-900/30 px-4 py-3"
          >
            <div>
              <a href={exp.url} target="_blank" className="text-gray-201 text-sm font-medium">
                {exp.company}
              </a>
              <p className="text-xs text-gray-500">{exp.position}</p>
            </div>
            <span className="text-xs text-gray-500">{exp.duration}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
