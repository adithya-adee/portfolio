"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import projectsData from "@/asset/projects.json";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExternalLink,
  Github,
  Calendar,
  Code,
  Folder,
  Sparkles,
} from "lucide-react";

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
  projects: Project[];
}

export default function ProjectsPage() {
  const [projectsByCategory, setProjectsByCategory] =
    useState<CategoryProjects[]>(projectsData);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Use the original nested structure
    setProjectsByCategory(projectsData as CategoryProjects[]);

    // Extract all projects for the "All" tab
    const allProjectsList: Project[] = [];
    projectsData.forEach((categoryGroup: CategoryProjects) => {
      categoryGroup.projects.forEach((project) => {
        allProjectsList.push(project);
      });
    });

    setAllProjects(allProjectsList);
  }, []);

  const ProjectCard = ({
    project,
    index,
  }: {
    project: Project;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => (window.location.href = `/projects/${project.slug}`)}
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
        <CardContent className="p-0">
          {/* Project Image */}
          <div className="relative h-48 bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden">
            {project.images && project.images.length > 0 ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="transition-transform duration-500 group-hover:scale-200 group-hover:z-50 overflow-auto"
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center text-gray-500">
                <Code className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-sm">Project Preview</span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-2">
                  {project.github_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github_url, "_blank");
                      }}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                  {project.live_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.live_url, "_blank");
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
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

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {project.description?.slice(0, 120)}...
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech_stack?.slice(0, 4).map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  variant="secondary"
                  className="bg-white/5 text-gray-400 border-white/10 text-xs"
                >
                  {tech}
                </Badge>
              ))}
              {project.tech_stack?.length > 4 && (
                <Badge
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs"
                >
                  +{project.tech_stack.length - 4}
                </Badge>
              )}
            </div>

            {/* View Details */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-sm text-gray-400">
                Click to view details
              </span>
              <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300">
                <span className="text-sm font-medium">View Project</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Sparkles className="w-8 h-8 text-purple-400 relative">
            <div className="absolute inset-0 w-8 h-8 bg-purple-400/20 rounded-full blur-xl" />
          </Sparkles>
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
        backdrop-blur-sm transition-all duration-300 relative overflow-hidden"
            onClick={() => (window.location.href = "/projects")}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
          opacity-0 hover:opacity-100 transition-opacity duration-300"
            ></div>
            <span className="relative flex items-center gap-2">
              View all projects
              <ExternalLink className="w-4 h-4 transition-transform hover:translate-x-1 hover:-translate-y-1" />
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Improved Tabs with Better Separation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Enhanced TabsList with better styling */}
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-auto overflow-x-auto">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gray-200 data-[state=active]:text-white data-[state=loading]:bg-gray-600 text-gray-300 py-4 px-6 text-base font-medium  border-0 rounded-full border-white/10 whitespace-nowrap"
              >
                <Folder className="w-5 h-5 mr-2" />
                <span>All Projects</span>
                <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-sm ">
                  {allProjects.length}
                </span>
              </TabsTrigger>

              {projectsByCategory.map((category, index) => (
                <TabsTrigger
                  key={category.category + index}
                  value={category.category}
                  className="data-[state=active]:bg-gray-200 data-[state=active]:text-white text-gray-300 py-4 px-6 text-base font-medium border-0 border-white/10 rounded-full whitespace-nowrap mx-1"
                >
                  <span>{category.category}</span>
                  <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-sm">
                    {category.projects.length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* All Projects Tab */}
          <TabsContent value="all" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {allProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          </TabsContent>

          {/* Category-specific Tabs */}
          {projectsByCategory.map((categoryGroup, index) => (
            <TabsContent
              key={categoryGroup.category + index}
              value={categoryGroup.category}
              className="mt-0"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {categoryGroup.projects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* Empty state - just in case there are no projects in a category */}
              {categoryGroup.projects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <Code className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-500">
                    No projects available in this category yet.
                  </p>
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  );
}
