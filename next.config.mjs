import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/hls/index.m3u8", destination: "/api/hls/manifest" }];
  },
  env: {
    NEXT_API_TOKEN: process.env.NEXT_API_TOKEN,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  allowedDevOrigins: ["tunnel-3000.tanvish.co.in"],
  // Next.js 16 uses Turbopack by default; set root so it uses this project, not parent or home dir
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "universitywebsitbucket.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "mock-s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  webpack: (config) => {
    // Resolve modules from project root only (avoids using /Users/tanmay/package.json and parent dirs)
    config.resolve.modules = [
      path.join(__dirname, "node_modules"),
      "node_modules",
      ...(config.resolve.modules || []),
    ];
    return config;
  },
};

export default nextConfig;
