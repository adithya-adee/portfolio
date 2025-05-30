"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import projectsData from "@/asset/projects.json";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<typeof projectsData>([]);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  // Use Memo project cards for optimization
  const projectCards = useMemo(
    () =>
      projects.map((project, idx) => (
        <motion.div
          key={project.slug}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <Card className="bg-neutral-900 border-neutral-800 shadow-lg transition p-0">
            <CardContent className="p-0">
              <Link href={`/projects/${project.slug}`} className="block group">
                {/* Images: hidden on mobile, visible on sm+ */}
                <div className="hidden sm:flex overflow-x-auto gap-4 p-4">
                  {project.images && project.images.length > 0 ? (
                    project.images.map((img, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-[600px] h-[340px] bg-neutral-800 rounded-xl overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${i + 1}`}
                          width={1200}
                          height={680}
                          className="object-cover w-full h-full"
                          priority={idx === 0 && i === 0}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">No image</div>
                  )}
                </div>
                <div className="p-4 flex flex-col">
                  <h3 className="text-lg font-semibold mb-1 text-white">
                    {project.name}
                  </h3>
                  <div className="text-gray-400 text-sm mb-1">
                    {project.category}
                  </div>
                  <div className="text-gray-500 text-xs mb-2">Tech Stack</div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {project.year}
                    </span>
                    <span className="text-xl text-gray-400 group-hover:text-white transition-transform group-hover:rotate-[-45deg]">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )),
    [projects]
  );

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Link
          href="/"
          className="text-gray-400 hover:text-white flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Home</span>
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-8">Projects</h1>
      <div className="flex flex-col gap-8">{projectCards}</div>
    </section>
  );
}
