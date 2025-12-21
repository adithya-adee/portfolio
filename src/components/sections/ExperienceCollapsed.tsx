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
    <section className="mx-auto max-w-2xl px-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-400">Where I&apos;ve Worked</h2>
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
            className="flex items-center justify-between rounded-md border border-dashed border-zinc-800 bg-neutral-900/30 px-4 py-3 transition-all duration-200 hover:border-neutral-700/50"
          >
            <div>
              <a href={exp.url} target="_blank" className="text-base font-medium text-white">
                <h3 className="font-mono text-base font-medium text-white">{exp.company}</h3>
              </a>
              <p className="text-xs text-gray-500">{exp.position}</p>
            </div>
            <span className="text-xs text-gray-500">
              {exp.startDate} - {exp.endDate}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
