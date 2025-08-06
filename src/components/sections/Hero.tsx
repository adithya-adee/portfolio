"use client";

import { motion } from "framer-motion";
import {
  FaTwitter,
  FaReddit,
  FaLinkedin,
  FaDownload,
  FaGithub,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Inter, JetBrains_Mono } from "next/font/google";
import LikeButton from "@/components/LikeButton";

const montserrat = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface HeroProps {
  isMobile?: boolean;
}

export default function HeroSection({ isMobile }: HeroProps) {
  function handleDownloadCV() {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Adithya_Anand_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const socialLinks = [
    {
      icon: <FaGithub size={isMobile ? 16 : 20} />,
      link: "https://github.com/adithya-adee",
      label: "GitHub",
    },
    {
      icon: <FaTwitter size={isMobile ? 16 : 20} />,
      link: "https://x.com/AdithyaA593326",
      label: "Twitter",
    },
    {
      icon: <FaReddit size={isMobile ? 16 : 20} />,
      link: "https://www.reddit.com/user/Glithcy_moon_69/",
      label: "Reddit",
    },
    {
      icon: <FaLinkedin size={isMobile ? 16 : 20} />,
      link: "https://linkedin.com/in/adithya-a-8bb28128a",
      label: "LinkedIn",
    },
  ];

  return (
    <section
      className={`max-w-4xl mx-auto ${
        isMobile ? "px-4 py-1" : "px-6 py-2"
      } my-2`}
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl" />
          <Avatar
            className={`relative ${
              isMobile ? "w-32 h-32" : "w-48 h-48"
            } rounded-2xl border border-white/10 shadow-2xl`}
          >
            <AvatarImage
              src="/profile_picture.jpg"
              alt="Adithya Anand"
              className="object-cover"
            />
            <AvatarFallback className="bg-neutral-800 text-2xl">
              AA
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex-1"
            >
              <h1
                className={`${montserrat.className} ${
                  isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
                } font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight`}
              >
                Adithya Anand
              </h1>
              <p
                className={`${inter.className} ${
                  isMobile ? "text-lg" : "text-xl"
                } text-gray-400 mb-4 font-light`}
              >
                Full Stack Web Developer
              </p>

              <div
                className={`${inter.className} flex items-center justify-center lg:justify-start gap-2 text-gray-500 mb-6`}
              >
                <IoLocationOutline size={isMobile ? 16 : 18} />
                <span className={isMobile ? "text-sm" : "text-base"}>
                  Karnataka, India
                </span>
              </div>
            </motion.div>

            {/* Like button for desktop - positioned in the top right */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <LikeButton isMobile={isMobile} />
              </motion.div>
            )}
          </div>

          {/* Like button positioned below avatar for mobile or next to it for desktop */}
          {/* Status & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`flex flex-col ${
              isMobile ? "gap-3" : "sm:flex-row items-center gap-4"
            }`}
          >
            <Badge
              className={`bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 transition-colors ${
                isMobile ? "text-sm" : "text-base"
              } `}
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              Available for work
            </Badge>

            <Button
              onClick={handleDownloadCV}
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group hover:border-2"
              size={isMobile ? "default" : "lg"}
            >
              <FaDownload
                className={`${
                  isMobile ? "mr-1.5" : "mr-2"
                } group-hover:translate-y-0.5 transition-transform`}
              />
              Download CV
            </Button>
          </motion.div>

          {isMobile && (
            <div className="mt-4 flex justify-center">
              <LikeButton isMobile={isMobile} />
            </div>
          )}
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`${isMobile ? "pt-4" : "pt-6"} border-t border-white/5`}
          >
            <a
              href="mailto:adithya25905@gmail.com"
              className={`inline-flex items-center text-gray-400 hover:text-white transition-colors ${
                isMobile ? "mb-4 text-sm" : "mb-6"
              } group`}
            >
              <HiOutlineMail
                className="mr-2 group-hover:scale-110 transition-transform"
                size={isMobile ? 16 : 20}
              />
              adithya25905@gmail.com
            </a>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isMobile ? "p-2" : "p-3"
                  } rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300`}
                  whileHover={!isMobile ? { scale: 1.05, y: -2 } : undefined}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
