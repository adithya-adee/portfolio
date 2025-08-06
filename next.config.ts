import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
    ],
  },
};

export default nextConfig;
