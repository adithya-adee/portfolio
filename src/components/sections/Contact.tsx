"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaTwitter, FaReddit, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineClock } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "lucide-react";

export default function ContactUs() {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Get local time
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSent(false);

    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setSent(true);
          form.current?.reset();
        },
        () => {
          setError("Failed to send message. Please try again.");
        }
      )
      .finally(() => setSending(false));
  };

  const socialLinks = [
    {
      icon: <FaGithub size={18} />,
      href: "https://github.com/yourusername",
      label: "GitHub",
      color: "hover:text-white",
    },
    {
      icon: <FaLinkedin size={18} />,
      href: "https://linkedin.com/in/adithya-a-8bb28128a",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaTwitter size={18} />,
      href: "https://x.com/AdithyaA593326",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaReddit size={18} />,
      href: "https://www.reddit.com/user/Glithcy_moon_69/",
      label: "Reddit",
      color: "hover:text-orange-400",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        {/* <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 w-8 h-8 bg-purple-400/20 rounded-full blur-xl"></div>
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Blog Posts
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Written based on my Experience
            </p>
          </div>
        </div> */}
        <div className="flex items-center justify-center">
          <Link className="w-8 h-8 text-purple-400 " />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Let&apos;s Connect
          </h2>
        </div>
        <p className="text-gray-400 max-w-md mx-auto">
          Have a project in mind or just want to chat? I&apos;d love to hear
          from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 font-medium">
                    Available for opportunities
                  </span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-2 rounded-lg bg-white/5">
                    <HiOutlineMail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href="mailto:adithya25905@gmail.com"
                      className="hover:text-white transition-colors"
                    >
                      adithya25905@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-2 rounded-lg bg-white/5">
                    <HiOutlinePhone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a
                      href="tel:+917676763455"
                      className="hover:text-white transition-colors"
                    >
                      +91 7676763455
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-2 rounded-lg bg-white/5">
                    <HiOutlineClock size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Local time</p>
                    <span className="font-mono">{time} IST</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-gray-500 mb-3">Connect with me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg bg-white/5 text-gray-400 ${social.color} transition-all duration-200`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <Card className="h-full pt-0 bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h4 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-3">
                Send a message
              </h4>

              <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="user_name"
                      placeholder="Your full name"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="user_email"
                      placeholder="your.email@example.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project or just say hi!"
                    required
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                {/* Status Messages */}
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                  >
                    ✅ Message sent successfully! I&apos;ll get back to you
                    soon.
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    ❌ {error}
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Badge
          variant="outline"
          className="border-purple-500/30 text-purple-300 bg-purple-500/10 px-4 py-2"
        >
          <span className="text-sm">💡 Usually respond within 24 hours</span>
        </Badge>
      </motion.div>
    </section>
  );
}
