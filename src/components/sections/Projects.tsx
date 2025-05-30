"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import projects from "@/asset/projects.json";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProjectSection() {
  const router = useRouter();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">My projects</h2>
        <Button
          variant="ghost"
          className="border-neutral-700 text-gray-300 hover:text-white"
          onClick={() => router.push("/projects")}
        >
          View all{" "}
          <span aria-hidden className="ml-1">
            ↗
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.slug}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="cursor-pointer"
            onClick={() => router.push(`/projects/${project.slug}`)}
          >
            <Card className="bg-neutral-900 border-neutral-800 shadow-lg transition p-0">
              <CardContent className="p-0">
                {/* Only first image */}
                <div className="h-48 bg-neutral-800 flex items-center justify-center rounded-t-xl overflow-hidden">
                  {project.images &&
                  project.images.length > 0 &&
                  project.images[0] ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center text-gray-500 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-1 group-hover:underline text-white">
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
