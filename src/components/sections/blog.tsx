"use client";

import blogsData from "@/asset/blog.json";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Paperclip } from "lucide-react";
import { useMemo } from "react";

interface BlogProps {
  id: number;
  title: string;
  url: string;
  category: string;
  posted_in: string;
  date: string;
  description: string;
}

export default function BlogSection() {
  const blogs = useMemo(() => blogsData as BlogProps[], []);

  return (
    <section className="max-w-4xl mx-auto px-4 py-2 my-2">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Paperclip className="w-8 h-8 text-purple-400" />
          <div className="absolute inset-0 w-8 h-8 bg-purple-400/20 rounded-full blur-xl" />
        </div>
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Blog Posts
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Written based on my Experience
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
        {blogs.map((blog, idx) => (
          <motion.a
            key={blog.id}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.04,
              rotate: idx % 2 === 0 ? 2 : -2,
              boxShadow: "0 0 32px 0 #a855f7",
              backgroundColor: "#232136",
            }}
            whileTap={{ scale: 0.98 }}
            initial={{
              opacity: 0,
              x: idx % 2 === 0 ? -60 : 60,
              rotate: idx % 2 === 0 ? -4 : 4,
            }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.13, type: "spring" }}
            className="block group"
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
              <CardContent className="flex-1 flex flex-col p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-purple-700/80 text-xs text-white">
                    {blog.category}
                  </Badge>
                  <span className="text-gray-400 text-xs">
                    {blog.posted_in}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {blog.title}
                </h3>
                <div className="text-gray-400 text-xs mb-2">
                  {new Date(blog.date).toLocaleDateString()}
                </div>
                <p className="text-gray-300 text-sm mb-4">{blog.description}</p>
                <span className="mt-auto flex items-center gap-1 text-purple-400 group-hover:underline">
                  Read Blog <ExternalLink size={16} />
                </span>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
