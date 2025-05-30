"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";

import projects from "@/asset/projects.json";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
      ? params.slug[0]
      : "";

  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Link
          href="/projects"
          className="text-gray-400 hover:text-white flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Projects</span>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-gray-700 text-xs text-gray-400"
              >
                {project.category}
              </Badge>
              <span className="text-xs text-gray-500">{project.year}</span>
            </div>
          </div>
          {/* Preview Link */}
          {project.preview_link && (
            <Button
              asChild
              variant="outline"
              className="w-fit border-gray-700 text-gray-300 hover:text-white gap-2"
            >
              <a
                href={project.preview_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview <ExternalLink size={16} />
              </a>
            </Button>
          )}
          {/* Project Details */}
          <div className="prose prose-invert max-w-none text-gray-300 text-base whitespace-pre-line">
            {project.project_details}
          </div>
        </div>
        <Card className="bg-neutral-900 border-neutral-800 shadow-lg transition">
          <CardContent className="p-0">
            {/* Project Images: each in a separate row */}
            {project.images && project.images.length > 0 ? (
              <div className="flex flex-col gap-4 p-4">
                {project.images.slice(0, 6).map((img, i) => (
                  <div
                    key={i}
                    className="w-full bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    <Image
                      src={img}
                      alt={`${project.name} screenshot ${i + 1}`}
                      width={900}
                      height={0} // Height is not restricted
                      className="object-contain w-full h-auto"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-56 sm:h-80 bg-neutral-800 flex items-center justify-center rounded-t-xl overflow-hidden">
                <div className="text-gray-500 text-sm">No images</div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
