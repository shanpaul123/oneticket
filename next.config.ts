import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore TypeScript errors
  },
  reactStrictMode: false, 
};

export default nextConfig;
