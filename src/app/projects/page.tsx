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
import { ArrowLeft, ExternalLink, Github, Calendar, Code, Folder } from "lucide-react";

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

  const [projectsByCategory, setProjectsByCategory] = useState<CategoryProjects[]>([]);
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
  const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
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
        <Card className="h-full overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
          <CardContent className="p-0">
            {/* Project Image */}
            <div
              className={`relative ${
                isMobile ? "h-40" : "h-48"
              } overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800`}
            >
              {project.images && project.images.length > 0 ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    !isMobile ? "group-hover:scale-110" : ""
                  }`}
                  sizes={isMobile ? "(max-width: 768px) 100vw" : "(max-width: 1200px) 50vw, 33vw"}
                  loading={index > 2 ? "lazy" : "eager"}
                  quality={isMobile ? 75 : 85}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-gray-500">
                  <Code className="mb-2 h-12 w-12 opacity-50" />
                  <span className="text-sm">Project Preview</span>
                </div>
              )}

              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute right-4 bottom-4 left-4">
                    <div className="flex gap-2">
                      {project.github_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                          onClick={(e) => handleLinkClick(e, project.github_url!)}
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                      {project.live_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                          onClick={(e) => handleLinkClick(e, project.live_url!)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className={`${isMobile ? "p-4" : "p-6"}`}>
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-bold text-white transition-colors group-hover:text-purple-300">
                    {project.name}
                  </h3>
                  <Badge variant="outline" className="border-blue-500/30 text-xs text-blue-400">
                    {project.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{project.year}</span>
                </div>
              </div>

              <p
                className={`text-gray-300 ${isMobile ? "text-xs" : "text-sm"} mb-4 leading-relaxed`}
              >
                {project.description?.slice(0, isMobile ? 80 : 120)}...
              </p>

              {/* Tech Stack */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech_stack?.slice(0, isMobile ? 3 : 4).map((tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="border-white/10 bg-white/5 text-xs text-gray-400"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.tech_stack?.length > (isMobile ? 3 : 4) && (
                  <Badge
                    variant="secondary"
                    className="border-purple-500/30 bg-purple-500/20 text-xs text-purple-300"
                  >
                    +{project.tech_stack.length - (isMobile ? 3 : 4)}
                  </Badge>
                )}
              </div>

              {isMobile && (
                <div className="mb-4 flex gap-2">
                  {project.github_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/20 bg-white/5 text-xs text-white"
                      onClick={(e) => handleLinkClick(e, project.github_url!)}
                    >
                      <Github className="mr-1 h-3 w-3" />
                      Code
                    </Button>
                  )}
                  {project.live_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/20 bg-white/5 text-xs text-white"
                      onClick={(e) => handleLinkClick(e, project.live_url!)}
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Live
                    </Button>
                  )}
                </div>
              )}

              {/* View Details */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className={`${isMobile ? "text-xs" : "text-sm"} text-gray-400`}>
                  {isMobile ? "Tap to view" : "Click to view details"}
                </span>
                <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300">
                  <span className={isMobile ? "text-xs font-medium" : "text-sm font-medium"}>
                    {isMobile ? "View" : "View Project"}
                  </span>
                  <ExternalLink
                    className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} transition-transform ${
                      !isMobile && "group-hover:translate-x-1 group-hover:-translate-y-1"
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
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Back to home + page heading */}
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <Link
          href="/"
          className="group mb-6 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className={`h-4 w-4 transition-transform group-hover:-translate-x-1`} />
          Back to Home
        </Link>

        <div className={`${isMobile ? "text-center" : ""}`}>
          <h1
            className={`${
              isMobile ? "text-3xl" : "text-4xl"
            } mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text font-bold text-transparent`}
          >
            All Projects
          </h1>
          <p
            className={`text-gray-400 ${
              isMobile ? "mx-auto max-w-xs text-sm" : "mx-auto max-w-2xl"
            }`}
          >
            Explore my portfolio of projects across different technologies and domains
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
          <div className="mb-8 flex justify-center">
            <TabsList className="h-auto overflow-x-auto border border-white/10 bg-white/5 p-1">
              <TabsTrigger
                value="all"
                className="rounded-full border-0 px-6 py-4 text-base font-medium text-gray-300 data-[state=active]:bg-gray-400 data-[state=active]:text-white"
              >
                <Folder className="mr-2 h-5 w-5" />
                <span>All Projects</span>
                <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-sm">
                  {allProjects.length}
                </span>
              </TabsTrigger>

              {projectsByCategory.map((category, index) => (
                <div key={category.category + index}>
                  {!isMobile ? (
                    <TabsTrigger
                      key={category.category + index}
                      value={category.category}
                      className={`text-gray-300 data-[state=active]:bg-gray-200 data-[state=active]:text-white ${
                        isMobile ? "px-4 py-2 text-sm" : "px-6 py-4 text-base"
                      } mx-1 rounded-full border-0 border-white/10 font-medium whitespace-nowrap`}
                    >
                      <span>{category.category}</span>
                      <span
                        className={`ml-2 rounded-full bg-white/10 px-2 py-0.5 ${
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
                isMobile ? "grid-cols-1 gap-6" : "grid-cols-1 gap-8 lg:grid-cols-2"
              }`}
            >
              {allProjects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </motion.div>
          </TabsContent>

          {/* Category-specific tabs */}
          {projectsByCategory.map((catGroup, i) => (
            <TabsContent key={catGroup.category + i} value={catGroup.category} className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`grid ${
                  isMobile ? "grid-cols-1 gap-6" : "grid-cols-1 gap-8 lg:grid-cols-2"
                }`}
              >
                {catGroup.projects.map((project, idx) => (
                  <ProjectCard key={project.slug} project={project} index={idx} />
                ))}
              </motion.div>

              {/* Fallback if no projects */}
              {catGroup.projects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center"
                >
                  <Code className="mx-auto mb-4 h-16 w-16 text-gray-500" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-400">No projects found</h3>
                  <p className="text-gray-500">No projects available in this category yet.</p>
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  );
}
