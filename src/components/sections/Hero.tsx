"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaReddit, FaLinkedin, FaDownload } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  function handleDownloadCV() {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Adithya_Anand_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <>
      <Card className="bg-transparent border-transparent">
        <CardContent className="p-6">
          {/* Responsive layout: column on mobile, row on desktop */}
          <div className="flex flex-col items-center md:items-start md:flex-row md:gap-6 mb-2">
            {/* Avatar - centered and larger on mobile */}
            <div className="flex justify-center mb-4 md:mb-0">
              <Avatar className="w-40 h-40 md:w-36 md:h-42 rounded-lg border border-gray-700">
                <AvatarImage src="/profile_picture.jpg" alt="Adithya Anand" />
                <AvatarFallback className="bg-neutral-700">AA</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-semibold">Adithya Anand</h1>
              <h2 className="text-xl text-gray-400 mb-1">
                Full Stack Web Developer
              </h2>
              <div className="flex items-center justify-center md:justify-start text-gray-400 mb-4">
                <IoLocationOutline className="mr-1" />
                <span>Karnataka, India</span>
              </div>

              {/* Status and Download - stack on mobile, side-by-side on desktop */}
              <div className="flex flex-col items-center space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mb-2 md:mb-0"
                >
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
                  className="w-full md:w-auto"
                >
                  <Button
                    onClick={handleDownloadCV}
                    variant="outline"
                    className="relative flex items-center justify-center gap-2 text-gray-300 border-gray-700 w-full md:w-auto
    bg-neutral-900/80
    transition-all duration-300
    overflow-hidden
    group"
                    style={{ zIndex: 1 }}
                  >
                    {/* Glowing border effect */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md border-2 border-transparent transition-all duration-300"
                    />
                    <FaDownload size={14} className="relative z-10" />
                    <span className="relative z-10">Download CV</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Links - responsive grid on mobile */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between py-4 border-t border-b border-gray-800 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.a
          href="mailto:johnsmith@gmail.com"
          className="flex items-center text-gray-400 hover:text-white transition mb-3 md:mb-0"
          whileHover={{ scale: 1.05 }}
        >
          <HiOutlineMail className="mr-2" size={18} />
          <span>johnsmith@gmail.com</span>
        </motion.a>

        <div className="flex items-center gap-6 mt-2 md:mt-0 md:gap-4">
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
