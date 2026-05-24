import type { NextConfig } from "next";
import { existsSync } from "fs";
import path from "path";

// Build-time check — when public/resume.pdf is present, the home/subpage chrome
// renders a downloadable CV chip. Drop the file in and rebuild; remove it and
// the chip disappears. No runtime cost.
const HAS_RESUME = existsSync(path.join(__dirname, "public", "resume.pdf"));

// Baseline security headers applied to every route. CSP is intentionally
// omitted — strict CSP requires hashing inline JSON-LD scripts and breaks the
// Vercel speed-insights inline boot. Add it later via middleware once we have
// hashing in place.
const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: __dirname,
  env: {
    NEXT_PUBLIC_HAS_RESUME: HAS_RESUME ? "1" : "",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
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
