import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the multi-stage Docker build (copies only needed files)
  output: 'standalone',
};

export default nextConfig;
