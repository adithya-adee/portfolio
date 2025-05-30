"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaTwitter, FaReddit, FaLinkedin } from "react-icons/fa";
import { MdOutlineMail, MdPhone } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-semibold mb-8">Let&apos;s Connect!!</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <div className="mb-4 text-gray-400">
                <span>Time for me: </span>
                <span className="font-semibold text-white">{time}</span>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-white mb-1">Email:</div>
                <div className="flex items-center gap-2 text-gray-300 break-all">
                  <MdOutlineMail />
                  adithya25905@gmail.com
                </div>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-white mb-1">Phone:</div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MdPhone />
                  +91 7676763455
                </div>
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Socials:</div>
                <div className="flex flex-col gap-2 text-gray-300">
                  <a
                    href="https://x.com/AdithyaA593326"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                  >
                    <FaTwitter /> Twitter
                  </a>
                  <a
                    href="https://www.reddit.com/user/Glithcy_moon_69/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                  >
                    <FaReddit /> Reddit
                  </a>
                  <a
                    href="https://linkedin.com/in/adithya-a-8bb28128a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-300 transition-colors"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Contact Form */}
        <motion.form
          ref={form}
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="font-semibold text-white mb-2">
                Reach out to me:
              </div>
              <Input
                type="text"
                name="user_name"
                placeholder="Your name"
                required
                className="bg-neutral-800 border-neutral-700 text-white"
              />
              <Input
                type="email"
                name="user_email"
                placeholder="Your Email address"
                required
                className="bg-neutral-800 border-neutral-700 text-white"
              />
              <Textarea
                name="message"
                placeholder="Message"
                required
                rows={5}
                className="bg-neutral-800 border-neutral-700 text-white resize-none"
              />
              <Button
                type="submit"
                disabled={sending}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mt-2 transition-colors disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </Button>
              {sent && <div className="text-green-400 mt-2">Message sent!</div>}
              {error && <div className="text-red-400 mt-2">{error}</div>}
            </CardContent>
          </Card>
        </motion.form>
      </div>
    </motion.section>
  );
}
