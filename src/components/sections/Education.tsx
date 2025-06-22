import { MdLocationOn } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { School2Icon } from "lucide-react";

const education = [
  {
    location: "Suratkal, Mangalore, KN",
    degree: "Information Technology",
    institution: "NITK",
    duration: "2023-2027",
    details: "Learned Core Concepts - OOPS, CN, OS, DSA, DBMS",
  },
];

export default function EducationSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <School2Icon className="w-8 h-8 text-purple-400" />
            <div className="absolute inset-0 w-8 h-8 bg-purple-400/20 rounded-full blur-xl"></div>
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Education
            </h2>
          </div>
        </div>
      </div>
      {education.map((edu, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Card className="bg-transparent border-0 border-l-4  border-gray-300 hover:shadow-2xl hover:bg-gray-800 shadow-lg transition">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2 sm:mb-0">
                  <MdLocationOn className="inline-block" />
                  <span>{edu.location}</span>
                </div>
                <div className="text-gray-400 text-sm">{edu.duration}</div>
              </div>
              <div className="font-bold text-lg text-white">{edu.degree}</div>
              <div className="text-gray-300 text-base mb-2">
                {edu.institution}
              </div>
              <div className="text-gray-400 text-base">{edu.details}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
