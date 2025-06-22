"use client";

import projects from "@/asset/projects.json";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NeonGradientCard } from "../magicui/neon-gradient-card";
import { ExternalLink, Github, Calendar, Code, Sparkles } from "lucide-react";

interface Project {
  title: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  year: number;
  tech_stack: string[]; // Changed from techStack to match your JSON
  images: string[];
  preview_link?: string; // Made optional with ?
  github_url?: string; // Added to match your JSON structure
  live_url?: string; // Added to match your JSON structure
  project_details: string[];
}

export default function ProjectSection() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16">
      <motion.div
        className="flex items-center justify-between mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <div className="absolute inset-0 w-8 h-8 bg-purple-400/20 rounded-full blur-xl"></div>
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Crafted with passion and precision
            </p>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:text-white hover:bg-purple-500/10 
                     backdrop-blur-sm transition-all duration-300 group relative overflow-hidden"
            onClick={() => router.push("/projects")}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <span className="relative flex items-center gap-2">
              View all projects
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projects.slice(0, 4).map((project: Project, index: number) => (
          <motion.div
            key={project.slug}
            variants={itemVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.2 },
            }}
            className="cursor-pointer group"
            onClick={() => router.push(`/projects/${project.slug}`)}
          >
            <Card className="relative h-full overflow-hidden p-0">
              <CardContent className="p-0 h-full flex flex-col relative z-10">
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 group-hover:opacity-75 transition-opacity duration-500" />
                  {project.images && project.images.length > 0 ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 "
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center text-gray-500">
                      <Code className="w-12 h-12 mb-2 opacity-50" />
                      <span className="text-sm">Project Preview</span>
                    </div>
                  )}

                  {/* Overlay with tech stack */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                                opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack
                          ?.slice(0, 3)
                          .map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="bg-white/10 text-white border-white/20 text-xs backdrop-blur-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        {project.tech_stack &&
                          project.tech_stack.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs"
                            >
                              +{project.tech_stack.length - 3}
                            </Badge>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 
                                 transition-colors duration-300"
                      >
                        {project.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="border-blue-500/30 text-blue-400 text-xs"
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{project.year}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                    {project.description?.slice(0, 120)}...
                  </p>

                  {/* Action Area */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800/50">
                    <div className="flex items-center gap-4 text-gray-400">
                      {project.github_url && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="p-2 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 
                                 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.github_url, "_blank");
                          }}
                        >
                          <Github className="w-4 h-4 hover:text-white transition-colors" />
                        </motion.div>
                      )}
                      {project.live_url && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="p-2 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 
                                 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.live_url, "_blank");
                          }}
                        >
                          <ExternalLink className="w-4 h-4 hover:text-white transition-colors" />
                        </motion.div>
                      )}
                    </div>

                    <motion.div
                      className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">View Details</span>
                      <div
                        className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center 
                                  group-hover:bg-purple-500/30 transition-colors duration-200"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Featured Highlight */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 
                       backdrop-blur-sm relative overflow-hidden"
        >
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-white text-lg">
                More Projects Coming Soon
              </span>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              I'm constantly working on new projects and exploring innovative
              technologies. Stay tuned for more exciting developments in{" "}
              <span className="text-blue-400 font-semibold">
                full-stack development
              </span>
              ,{" "}
              <span className="text-purple-400 font-semibold">
                AI integration
              </span>
              , and{" "}
              <span className="text-green-400 font-semibold">
                modern web solutions
              </span>
              .
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
