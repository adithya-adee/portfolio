"use client";

import projects from "@/asset/projects.json";
import Image from "next/image";

export default function ProjectSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Some of my projects</h2>
        <a
          href="/projects"
          className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
        >
          View all <span aria-hidden>↗</span>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.slug}
            href={project.preview_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-900 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-neutral-800 flex flex-col overflow-hidden group"
          >
            {/* Project image or fallback */}
            <div className="h-48 bg-neutral-800 flex items-center justify-center">
              {project.images && project.images.length > 0 ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  width={400}
                  height={192}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-gray-500 text-sm">No image</div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-1 group-hover:underline">
                {project.name}
              </h3>
              <div className="text-gray-400 text-sm mb-1">
                {project.category}
              </div>
              <div className="text-gray-500 text-xs mb-2">Tech Stack</div>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500">{project.year}</span>
                <span className="text-xl text-gray-400 group-hover:text-white transition-transform">
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
