"use client";

import { useState } from "react";
import projectsData from "@/asset/projects.json";
import { ChevronDown, ExternalLink, Github } from "lucide-react";

interface Project {
  name: string;
  timeline: string;
  short_description: string;
  detailed_description: string[];
  live_url: string;
  github_url: string;
}

export default function ProjectsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const projects = projectsData as Project[];

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <h2 className="mb-4 text-xl font-medium tracking-wide text-gray-400 sm:text-2xl">
        Projects I&apos;ve Built
      </h2>

      <div className="space-y-2 sm:space-y-3">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="overflow-hidden rounded-lg border border-dashed border-zinc-800 bg-neutral-900/30 transition-colors hover:border-neutral-700/50"
          >
            {/* Collapsed View */}
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-4 text-left sm:px-6 sm:py-5"
            >
              <div className="flex-1 space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                  <h3 className="text-base font-medium tracking-wide text-white sm:text-lg">
                    {project.name}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-gray-500 sm:text-sm">
                    {project.timeline}
                  </span>
                </div>
                <p className="text-sm leading-relaxed tracking-wide text-gray-400 sm:text-base">
                  {project.short_description}
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-4 pt-2 sm:gap-6">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm tracking-wide text-gray-400 transition-colors hover:text-white"
                    >
                      Visit <ExternalLink size={14} />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm tracking-wide text-gray-400 transition-colors hover:text-white"
                    >
                      GitHub <Github size={14} />
                    </a>
                  )}
                </div>
              </div>
              <div
                className="ml-4 transition-transform duration-200 sm:ml-6"
                style={{ transform: expandedIndex === index ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
            </button>

            {/* Expanded View */}
            {expandedIndex === index && (
              <div className="overflow-hidden">
                <div className="border-t border-neutral-800/50 px-4 pb-5 pt-4 sm:px-6">
                  <ul className="space-y-3">
                    {project.detailed_description.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 text-gray-600">•</span>
                        <span className="text-sm leading-relaxed tracking-wide text-gray-300 sm:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
