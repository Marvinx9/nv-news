import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next/link": path.resolve(__dirname, "node_modules/next/link.js"),
      "next/script": path.resolve(__dirname, "node_modules/next/script.js"),
      "next/head": path.resolve(__dirname, "node_modules/next/head.js"),
      "next/image": path.resolve(__dirname, "node_modules/next/image.js"),
    };
    return config;
  },
};

export default nextConfig;
