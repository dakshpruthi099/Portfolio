import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['dakshpruthi.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, // For now, we'll ignore ESLint during builds
  },
};

export default nextConfig;
