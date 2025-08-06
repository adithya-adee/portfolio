"use client";

import experienceData from "@/asset/experience.json";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MapPin,
  Briefcase,
  Star,
  Award,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ExperienceItem } from "../page";
import Image from "next/image";
import Link from "next/link";

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const experience = useMemo(
    () => experienceData as unknown as ExperienceItem[],
    []
  );

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentExperience = experience.find((exp) => exp.slug === params.slug);
console.log(currentExperience?.logo)
  if (!currentExperience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Experience Not Found
          </h1>
          <Button onClick={() => router.push("/experience")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experience
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`max-w-6xl mx-auto ${isMobile ? "px-4 py-6" : "px-8 py-12"}`}
    >
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center gap-4 mb-8 ${isMobile ? "mb-6" : ""}`}
      >
        <Button
          variant="ghost"
          onClick={() => router.push("/experience")}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Experience
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-lg overflow-hidden">
          <CardContent className={`${isMobile ? "p-6" : "p-10"}`}>
            {/* Company Header */}
            <div
              className={`flex ${
                isMobile ? "flex-col" : "flex-row items-start"
              } gap-6 mb-8`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  {currentExperience.logo && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/10 border border-white/20">
                      <Image
                        src={currentExperience.logo}
                        alt={`${currentExperience.company} logo`}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                  <div>
                    <h1
                      className={`${
                        isMobile ? "text-2xl" : "text-4xl"
                      } font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-2`}
                    >
                      {currentExperience.company}
                    </h1>
                    <p
                      className={`text-gray-300 ${
                        isMobile ? "text-lg" : "text-xl"
                      } font-medium`}
                    >
                      {currentExperience.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Link */}
              {currentExperience.url && (
                <Link
                  href={currentExperience.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button
                    variant="outline"
                    className="border-purple-500/50 text-purple-300 hover:text-white hover:bg-purple-500/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Company
                  </Button>
                </Link>
              )}
            </div>

            {/* Meta Information */}
            <div
              className={`grid ${
                isMobile ? "grid-cols-1 gap-4" : "grid-cols-3 gap-6"
              } mb-8`}
            >
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Duration
                  </p>
                  <p className="font-medium">
                    {currentExperience.startDate} - {currentExperience.endDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Location
                  </p>
                  <p className="font-medium">{currentExperience.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Role Type
                  </p>
                  <p className="font-medium">{currentExperience.position}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {currentExperience.description && (
              <div className="mb-8">
                <h3
                  className={`${
                    isMobile ? "text-lg" : "text-xl"
                  } font-semibold text-white mb-4 flex items-center gap-2`}
                >
                  <Star className="w-5 h-5 text-yellow-400" />
                  Overview
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  {currentExperience.description}
                </p>
              </div>
            )}

            {/* Highlights Section */}
            {currentExperience.highlights &&
              currentExperience.highlights.length > 0 && (
                <div className="mb-8">
                  <h3
                    className={`${
                      isMobile ? "text-lg" : "text-xl"
                    } font-semibold text-white mb-4 flex items-center gap-2`}
                  >
                    <Award className="w-5 h-5 text-orange-400" />
                    Key Achievements
                  </h3>
                  <div className={`grid ${isMobile ? "gap-3" : "gap-4"}`}>
                    {currentExperience.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20"
                      >
                        <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                        <p className="text-gray-200 leading-relaxed">
                          {highlight}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            {/* Responsibilities */}
            <div className="mb-8">
              <h3
                className={`${
                  isMobile ? "text-lg" : "text-xl"
                } font-semibold text-white mb-6 flex items-center gap-2`}
              >
                <Briefcase className="w-5 h-5 text-blue-400" />
                Key Responsibilities
              </h3>
              <div className={`grid ${isMobile ? "gap-3" : "gap-4"}`}>
                {currentExperience.responsibilities.map(
                  (responsibility, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {responsibility}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Skills & Technologies */}
            {currentExperience.skills &&
              currentExperience.skills.length > 0 && (
                <div>
                  <h3
                    className={`${
                      isMobile ? "text-lg" : "text-xl"
                    } font-semibold text-white mb-6`}
                  >
                    Technologies & Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {currentExperience.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border-purple-500/30 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300 px-3 py-1"
                        >
                          {skill}
                        </Badge>
{" "}                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`flex justify-center ${isMobile ? "mt-6" : "mt-10"}`}
      >
        <Button
          onClick={() => router.push("/experience")}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          View All Experience
        </Button>
      </motion.div>
    </section>
  );
}
