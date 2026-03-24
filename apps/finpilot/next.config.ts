import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {},
  // FinPilot runs on port 3001 (see package.json scripts)
};

export default nextConfig;
