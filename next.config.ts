import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for @react-three/fiber and three.js ESM modules
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
