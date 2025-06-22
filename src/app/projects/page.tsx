"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import projectsData from "@/asset/projects.json";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Code,
  Folder,
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const [projectsByCategory, setProjectsByCategory] = useState<
    CategoryProjects[]
  >([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setProjectsByCategory(projectsData as CategoryProjects[]);
    const allProjectsTemp: Project[] = [];
    (projectsData as CategoryProjects[]).forEach((cat) => {
      cat.projects.forEach((p) => allProjectsTemp.push(p));
    });
    setAllProjects(allProjectsTemp);
  }, []);

  // ---------------------------
  // 3. Project card component
  // ---------------------------
  const ProjectCard = ({
    project,
    index,
  }: {
    project: Project;
    index: number;
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
        transition={{ duration: isMobile ? 0.3 : 0.5, delay: index * 0.1 }}
        className="group cursor-pointer"
        onClick={handleCardClick}
      >
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
          <CardContent className="p-0">
            {/* Project Image */}
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
                  className={`object-cover transition-transform duration-500 ${
                    !isMobile ? "group-hover:scale-110" : ""
                  }`}
                  sizes={
                    isMobile
                      ? "(max-width: 768px) 100vw"
                      : "(max-width: 1200px) 50vw, 33vw"
                  }
                  loading={index > 2 ? "lazy" : "eager"}
                  quality={isMobile ? 75 : 85}
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center text-gray-500">
                  <Code className="w-12 h-12 mb-2 opacity-50" />
                  <span className="text-sm">Project Preview</span>
                </div>
              )}

              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2">
                      {project.github_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                          onClick={(e) =>
                            handleLinkClick(e, project.github_url!)
                          }
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

            {/* Project Details */}
            <div className={`${isMobile ? "p-4" : "p-6"}`}>
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

              <p
                className={`text-gray-300 ${
                  isMobile ? "text-xs" : "text-sm"
                } leading-relaxed mb-4`}
              >
                {project.description?.slice(0, isMobile ? 80 : 120)}...
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech_stack
                  ?.slice(0, isMobile ? 3 : 4)
                  .map((tech, i) => (
                    <Badge
                      key={i}
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
                  className={`${
                    isMobile ? "text-xs" : "text-sm"
                  } text-gray-400`}
                >
                  {isMobile ? "Tap to view" : "Click to view details"}
                </span>
                <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300">
                  <span
                    className={
                      isMobile ? "text-xs font-medium" : "text-sm font-medium"
                    }
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

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Back to home + page heading */}
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft
            className={`w-4 h-4 transition-transform group-hover:-translate-x-1`}
          />
          Back to Home
        </Link>

        <div className={`${isMobile ? "text-center" : ""}`}>
          <h1
            className={`${
              isMobile ? "text-3xl" : "text-4xl"
            } font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent`}
          >
            All Projects
          </h1>
          <p
            className={`text-gray-400 ${
              isMobile ? "max-w-xs mx-auto text-sm" : "max-w-2xl mx-auto"
            }`}
          >
            Explore my portfolio of projects across different technologies and
            domains
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-auto overflow-x-auto">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gray-400 data-[state=active]:text-white text-gray-300 py-4 px-6 text-base font-medium border-0 rounded-full"
              >
                <Folder className="w-5 h-5 mr-2" />
                <span>All Projects</span>
                <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-sm">
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
            </TabsList>
          </div>

          {/* All Projects */}
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
              {allProjects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </motion.div>
          </TabsContent>

          {/* Category-specific tabs */}
          {projectsByCategory.map((catGroup, i) => (
            <TabsContent
              key={catGroup.category + i}
              value={catGroup.category}
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
                {catGroup.projects.map((project, idx) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={idx}
                  />
                ))}
              </motion.div>

              {/* Fallback if no projects */}
              {catGroup.projects.length === 0 && (
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
