"use client";

import { useMemo, useState } from "react";
import projectsData from "@/asset/projects.json";
import { ChevronDown, ExternalLink, Filter } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface Project {
  name: string;
  timeline: string;
  category: string;
  short_description: string;
  detailed_description: string[];
  live_url: string;
  github_url: string;
}

type FilterCategory = "web3" | "full-stack";

const FILTER_OPTIONS: FilterCategory[] = ["full-stack", "web3"];

const getCategoryLabel = (category: FilterCategory): string => {
  return category === "web3" ? "Web3" : "Full Stack";
};

const getCategoryStyles = (category: string) => {
  return category === "web3"
    ? "bg-red-500/10 text-red-200 border border-red-500/30"
    : "bg-sky-500/10 text-sky-400 border border-sky-500/30";
};

export default function ProjectsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("full-stack");

  const projects = projectsData as Project[];

  // Use useMemo to avoid unnecessary recalculations
  const filteredProjects = useMemo(
    () => projects.filter((project) => project.category === activeFilter),
    [activeFilter, projects]
  );

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <h2 className="mb-6 text-xl font-medium tracking-wide text-gray-400 sm:text-2xl">
        Projects I&apos;ve Built
      </h2>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Filter size={16} />
          <span className="hidden sm:inline">Filter:</span>
        </div>

        {FILTER_OPTIONS.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`relative overflow-hidden rounded-lg px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ease-out ${
              activeFilter === category
                ? "border border-neutral-600/50 bg-gradient-to-r from-neutral-700/60 to-neutral-800/60 text-white shadow-lg shadow-neutral-900/50"
                : "border border-neutral-800/50 bg-neutral-900/30 text-gray-400 hover:border-neutral-700/50 hover:bg-neutral-800/40 hover:text-gray-300"
            } `}
          >
            <span className="relative z-10">{getCategoryLabel(category)}</span>
            {activeFilter === category && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-600/20 to-transparent" />
            )}
          </button>
        ))}

        <span className="ml-auto hidden text-xs text-gray-600 sm:block">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {/* Projects List */}
      <div className="space-y-4 sm:space-y-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.name}
            className="group overflow-hidden rounded-lg border border-dashed border-zinc-700/40 bg-neutral-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:border-neutral-700/50 hover:shadow-xl hover:shadow-neutral-900/30"
            style={{
              animationDelay: `${index * 50}ms`,
              animation: "fadeIn 0.5s ease-out forwards",
            }}
          >
            {/* Collapsed View */}
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-4 py-4 text-left transition-all duration-200 sm:px-6 sm:py-5"
            >
              <div className="flex-1 space-y-3">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-medium tracking-wide text-white transition-colors duration-200 group-hover:text-gray-100 sm:text-lg">
                      {project.name}
                    </h3>
                    {/* Category Badge */}
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 text-xs font-medium tracking-wide ${getCategoryStyles(
                        project.category
                      )}`}
                    >
                      {getCategoryLabel(project.category as FilterCategory)}
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-xs uppercase tracking-wider text-gray-500 sm:text-sm">
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
                      className="inline-flex items-center gap-2 text-sm tracking-wide text-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline hover:underline-offset-4"
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
                      className="inline-flex items-center gap-2 text-sm tracking-wide text-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline hover:underline-offset-4"
                    >
                      GitHub <SiGithub size={14} />
                    </a>
                  )}
                </div>
              </div>
              <div
                className={`ml-4 transition-all duration-300 ease-in-out sm:ml-6 ${
                  expandedIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                <ChevronDown className="h-5 w-5 text-gray-500 transition-colors duration-200 group-hover:text-gray-300" />
              </div>
            </button>

            {/* Expanded View */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedIndex === index ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border-t border-neutral-800/50 bg-neutral-900/20 px-4 pb-5 pt-4 sm:px-6">
                <ul className="space-y-3">
                  {project.detailed_description.map((point, i) => (
                    <li
                      key={i}
                      className={`flex gap-3 transition-all duration-300 ${
                        expandedIndex === index
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-4 opacity-0"
                      }`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <span className="mt-2 text-gray-600">•</span>
                      <span className="text-sm leading-relaxed tracking-wide text-gray-300 sm:text-base">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
