"use client";

import blogs from "@/asset/blog.json";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function BlogSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-white">Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            className="block"
          >
            <Card className="bg-neutral-900 border-neutral-800 shadow-lg transition group h-full flex flex-col hover:border-purple-500">
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
