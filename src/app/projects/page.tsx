"use client";

import projects from "@/asset/projects.json";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
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
      <div className="flex flex-col gap-8">
        {projects.map((project, idx) => (
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
            <Card className="bg-neutral-900 border-neutral-800 shadow-lg transition">
              <CardContent className="p-0">
                <Link
                  href={`/projects/${project.slug}`}
                  className="block group"
                >
                  {/* Only first image */}
                  <div className="h-64 sm:h-80 bg-neutral-800 flex items-center justify-center rounded-t-xl overflow-hidden">
                    {project.images &&
                    project.images.length > 0 &&
                    project.images[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        width={800}
                        height={400}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        priority={idx === 0}
                      />
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
                      <span className="text-xl text-gray-400 group-hover:text-white transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
