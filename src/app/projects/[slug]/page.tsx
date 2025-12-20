"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import projectsData from "@/asset/projects.json";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, Globe, Code2 } from "lucide-react";

interface Project {
  title: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  year: number;
  tech_stack: string[];
  images: string[];
  preview_link?: string;
  github_url?: string;
  live_url?: string;
  project_details: string[];
}

interface CategoryProjects {
  category: string;
  name?: string;
  projects: Project[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";

  // Find the project in the nested structure
  let project: Project | undefined;
  const categoryData = projectsData as CategoryProjects[];

  for (const categoryGroup of categoryData) {
    const foundProject = categoryGroup.projects.find((p) => p.slug === slug);
    if (foundProject) {
      project = foundProject;
      break;
    }
  }

  if (!project) return notFound();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Project Header */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                    {project.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{project.year}</span>
                  </div>
                </div>

                <h1 className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-white">
                  {project.name}
                </h1>

                <p className="mb-6 leading-relaxed text-gray-300">{project.description}</p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-400">
                    <Code2 className="h-4 w-4" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="border-purple-500/20 bg-purple-500/10 text-purple-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {project.live_url && (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  >
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}

                {project.github_url && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                  >
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}

                {project.preview_link && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                  >
                    <a href={project.preview_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Preview
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        {project.project_details && project.project_details.length > 0 && (
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-4 text-xl font-bold text-white">Project Details</h2>
              <div className="prose prose-invert max-w-none">
                {project.project_details.map((detail, index) => (
                  <p key={index} className="mb-4 leading-relaxed text-gray-300">
                    {detail}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="mb-6 text-xl font-bold text-white">Project Gallery</h2>
              <div className="grid gap-6">
                {project.images.slice(0, 6).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-800"
                    onClick={() => window.open(img, "_blank")}
                  >
                    <Image
                      src={img}
                      alt={`${project.name} screenshot ${i + 1}`}
                      width={900}
                      height={600}
                      className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
                        <ExternalLink className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-center pt-8">
          <Button
            asChild
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
