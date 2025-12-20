"use client";

import { useState } from "react";
import projectsData from "@/asset/projects.json";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Github } from "lucide-react";

interface Project {
  name: string;
  timeline: string;
  short_description: string;
  detailed_description: string[];
  live_url: string;
  github_url: string;
}

export default function ProjectsMinimal() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const projects = projectsData as Project[];

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h2 className="mb-6 text-sm font-medium text-gray-400">Projects I&apos;ve Built</h2>

      <div className="space-y-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-lg border border-neutral-800/50 bg-neutral-900/30 transition-colors hover:border-neutral-700/50"
          >
            {/* Collapsed View */}
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-base font-medium text-white">{project.name}</h3>
                  <span className="text-xs text-gray-500">{project.timeline}</span>
                </div>
                <p className="mt-1 text-sm text-gray-400">{project.short_description}</p>
              </div>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4"
              >
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </motion.div>
            </button>

            {/* Expanded View */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-neutral-800/50 px-4 pb-4">
                    <ul className="mt-3 space-y-2 text-sm text-gray-300">
                      {project.detailed_description.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1.5 text-gray-600">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Links */}
                    <div className="mt-4 flex gap-4">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                        >
                          Visit → <ExternalLink size={14} />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                        >
                          GitHub <Github size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
