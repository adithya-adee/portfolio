import type { NextConfig } from "next";
import { existsSync } from "fs";
import path from "path";

// Build-time check — when public/resume.pdf is present, the home/subpage chrome
// renders a downloadable CV chip. Drop the file in and rebuild; remove it and
// the chip disappears. No runtime cost.
const HAS_RESUME = existsSync(path.join(__dirname, "public", "resume.pdf"));

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: __dirname,
  env: {
    NEXT_PUBLIC_HAS_RESUME: HAS_RESUME ? "1" : "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ieeesoc.xyz",
      },
      {
        protocol: "https",
        hostname: "yhills.com",
      },
      {
        protocol: "https",
        hostname: "youtube.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
