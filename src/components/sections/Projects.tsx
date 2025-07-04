"use client";

import { useState, useMemo, useCallback } from "react";
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
  star: string;
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

const ProjectCard = ({
  project,
  index,
  isMobile,
}: {
  project: Project;
  index: number;
  isMobile: boolean;
}) => {
  const handleCardClick = useCallback(() => {
    window.location.href = `/projects/${project.slug}`;
  }, [project.slug]);

  const handleLinkClick = useCallback((e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: isMobile ? 0.3 : 0.5,
        delay: isMobile ? index * 0.05 : index * 0.1,
      }}
      className="group cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
        <CardContent className="p-0">
          {/* Project Image - Optimized for mobile */}
          <div
            className={`relative ${
              isMobile ? "h-40" : "h-48"
            } bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden`}
          >
            {project.images && project.images.length > 0 ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes={
                  isMobile
                    ? "(max-width: 768px) 100vw"
                    : "(max-width: 1200px) 50vw, 33vw"
                }
                className={`transition-transform duration-500 object-cover ${
                  !isMobile && "group-hover:scale-105"
                }`}
                loading={index > 2 ? "lazy" : "eager"}
                quality={isMobile ? 75 : 85}
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center text-gray-500">
                <Code
                  className={`${
                    isMobile ? "w-8 h-8" : "w-12 h-12"
                  } mb-2 opacity-50`}
                />
                <span className={`${isMobile ? "text-xs" : "text-sm"}`}>
                  Project Preview
                </span>
              </div>
            )}

            {/* Overlay - Simplified for mobile */}
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2">
                    {project.github_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                        onClick={(e) => handleLinkClick(e, project.github_url!)}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                    {project.live_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                        onClick={(e) => handleLinkClick(e, project.live_url!)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Project Details - Optimized spacing for mobile */}
          <div className={`${isMobile ? "p-4" : "p-6"}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3
                  className={`${
                    isMobile ? "text-lg" : "text-xl"
                  } font-bold text-white mb-1 group-hover:text-purple-300 transition-colors truncate`}
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
              <div className="flex items-center gap-2 text-gray-400 ml-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{project.year}</span>
              </div>
            </div>

            <p
              className={`text-gray-300 ${
                isMobile ? "text-xs" : "text-sm"
              } leading-relaxed mb-4 line-clamp-3`}
            >
              {project.description?.slice(0, isMobile ? 80 : 120)}...
            </p>

            {/* Tech Stack - Reduced for mobile */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech_stack
                ?.slice(0, isMobile ? 3 : 4)
                .map((tech, techIndex) => (
                  <Badge
                    key={techIndex}
                    variant="secondary"
                    className="bg-white/5 text-gray-400 border-white/10 text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              {project.tech_stack?.length > (isMobile ? 3 : 4) && (
                <Badge
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs"
                >
                  +{project.tech_stack.length - (isMobile ? 3 : 4)}
                </Badge>
              )}
            </div>

            {/* Mobile action buttons */}
            {isMobile && (
              <div className="flex gap-2 mb-4">
                {project.github_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-white/5 border-white/20 text-white text-xs"
                    onClick={(e) => handleLinkClick(e, project.github_url!)}
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Code
                  </Button>
                )}
                {project.live_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-white/5 border-white/20 text-white text-xs"
                    onClick={(e) => handleLinkClick(e, project.live_url!)}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Live
                  </Button>
                )}
              </div>
            )}

            {/* View Details */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span
                className={`${isMobile ? "text-xs" : "text-sm"} text-gray-400`}
              >
                {isMobile ? "Tap to view" : "Click to view details"}
              </span>
              <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300">
                <span
                  className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}
                >
                  {isMobile ? "View" : "View Project"}
                </span>
                <ExternalLink
                  className={`${
                    isMobile ? "w-3 h-3" : "w-4 h-4"
                  } transition-transform ${
                    !isMobile &&
                    "group-hover:translate-x-1 group-hover:-translate-y-1"
                  }`}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function ProjectsPage({ isMobile }: { isMobile: boolean }) {
  const [activeTab, setActiveTab] = useState("all");

  // Memoized data processing
  const { projectsByCategory, allProjects } = useMemo(() => {
    const categoryData = projectsData as CategoryProjects[];
    const allProjectsList: Project[] = [];

    categoryData.forEach((categoryGroup) => {
      categoryGroup.projects.forEach((project) => {
        allProjectsList.push(project);
      });
    });

    return {
      projectsByCategory: categoryData,
      allProjects: allProjectsList,
    };
  }, []);

  const handleViewAllProjects = useCallback(() => {
    window.location.href = "/projects";
  }, []);

  return (
    <section
      className={`max-w-6xl mx-auto ${isMobile ? "px-4 py-12" : "px-6 py-16"}`}
    >
      {/* Header - Optimized for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`mb-12 ${
          isMobile ? "text-center" : "flex items-center justify-between"
        }`}
      >
        <div
          className={`flex items-center ${
            isMobile ? "justify-center" : ""
          } gap-4 ${isMobile ? "mb-6" : ""}`}
        >
          <div className="relative">
            <Sparkles
              className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} text-purple-400`}
            />
            <div
              className={`absolute inset-0 ${
                isMobile ? "w-6 h-6" : "w-8 h-8"
              } bg-purple-400/20 rounded-full blur-xl`}
            />
          </div>
          <div>
            <h2
              className={`${
                isMobile ? "text-2xl" : "text-4xl"
              } font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent`}
            >
              Featured Projects
            </h2>
            <p
              className={`text-gray-400 ${
                isMobile ? "text-xs" : "text-sm"
              } mt-1`}
            >
              Crafted with passion and precision
            </p>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:text-white hover:bg-purple-500/10 backdrop-blur-sm transition-all duration-300 relative overflow-hidden"
            onClick={handleViewAllProjects}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              View all projects
              <ExternalLink className="w-4 h-4 transition-transform hover:translate-x-1 hover:-translate-y-1" />
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Tabs - Optimized for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile-optimized TabsList */}
          <div className="flex justify-center mb-8">
            <TabsList
              className={`bg-white/5 border border-white/10 p-1 h-auto ${
                isMobile ? "w-full overflow-x-auto" : ""
              }`}
            >
              <div className={`flex ${isMobile ? "min-w-max" : ""}`}>
                <TabsTrigger
                  value="all"
                  className={`data-[state=active]:bg-gray-200 data-[state=active]:text-white text-gray-300 ${
                    isMobile ? "py-2 px-4 text-sm" : "py-4 px-6 text-base"
                  } font-medium border-0 rounded-full border-white/10 whitespace-nowrap`}
                >
                  <Folder
                    className={`${isMobile ? "w-4 h-4 mr-1" : "w-5 h-5 mr-2"}`}
                  />
                  <span>{isMobile ? "All" : "All Projects"}</span>
                  <span
                    className={`ml-2 px-2 py-0.5 bg-white/10 rounded-full ${
                      isMobile ? "text-xs" : "text-sm"
                    }`}
                  >
                    {allProjects.length}
                  </span>
                </TabsTrigger>

                {projectsByCategory.map((category, index) => (
                  <div key={category.category + index}>
                    {!isMobile ? (
                      <TabsTrigger
                        key={category.category + index}
                        value={category.category}
                        className={`data-[state=active]:bg-gray-200 data-[state=active]:text-white text-gray-300 ${
                          isMobile ? "py-2 px-4 text-sm" : "py-4 px-6 text-base"
                        } font-medium border-0 border-white/10 rounded-full whitespace-nowrap mx-1`}
                      >
                        <span>{category.category}</span>
                        <span
                          className={`ml-2 px-2 py-0.5 bg-white/10 rounded-full ${
                            isMobile ? "text-xs" : "text-sm"
                          }`}
                        >
                          {category.projects.length}
                        </span>
                      </TabsTrigger>
                    ) : null}
                  </div>
                ))}
              </div>
            </TabsList>
          </div>

          {/* All Projects Tab */}
          <TabsContent value="all" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`grid ${
                isMobile
                  ? "grid-cols-1 gap-6"
                  : "grid-cols-1 lg:grid-cols-2 gap-8"
              }`}
            >
              {allProjects
                .slice(0, 4)
                .filter((project) => project.star == "true")
                .map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    isMobile={isMobile}
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
                className={`grid ${
                  isMobile
                    ? "grid-cols-1 gap-6"
                    : "grid-cols-1 lg:grid-cols-2 gap-8"
                }`}
              >
                {categoryGroup.projects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    isMobile={isMobile}
                  />
                ))}
              </motion.div>

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

      {/* Mobile View All Button */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            variant="outline"
            className="w-full border-purple-500/50 text-purple-300 hover:text-white hover:bg-purple-500/10 backdrop-blur-sm transition-all duration-300"
            onClick={handleViewAllProjects}
          >
            View all projects
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      )}
    </section>
  );
}
