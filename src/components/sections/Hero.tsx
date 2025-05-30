"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaReddit, FaLinkedin, FaDownload } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <>
      <Card className="bg-neutral-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-start gap-6 mb-6">
            <Avatar className="w-28 h-28 rounded-lg border border-gray-700">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Adithya Anand" />
              <AvatarFallback className="bg-neutral-700">AA</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-semibold">Adithya Anand</h1>
              <h2 className="text-xl text-gray-400 mb-1">
                Full Stack Web Developer
              </h2>
              <div className="flex items-center text-gray-400 mb-4">
                <IoLocationOutline className="mr-1" />
                <span>Karnataka, India</span>
              </div>
              <div className="flex items-center justify-between">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge
                    variant="outline"
                    className="flex items-center bg-transparent text-gray-400 border-gray-700"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Available for work</span>
                  </Badge>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-gray-300 border-gray-700 hover:bg-neutral-700"
                  >
                    <FaDownload size={14} />
                    <span>Download CV</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Links */}
      <motion.div
        className="flex items-center justify-between py-4 border-t border-b border-gray-800 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.a
          href="mailto:johnsmith@gmail.com"
          className="flex items-center text-gray-400 hover:text-white transition"
          whileHover={{ scale: 1.05 }}
        >
          <HiOutlineMail className="mr-2" size={18} />
          <span>johnsmith@gmail.com</span>
        </motion.a>
        <div className="flex items-center gap-4">
          {[
            { icon: <FaTwitter size={18} />, link: "#" },
            { icon: <FaReddit size={18} />, link: "#" },
            { icon: <FaLinkedin size={18} />, link: "#" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              className="text-gray-400 hover:text-white transition"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
