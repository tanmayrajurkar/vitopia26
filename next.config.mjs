/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_API_TOKEN: process.env.NEXT_API_TOKEN,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  allowedDevOrigins: ["tunnel-3000.tanvish.co.in"],
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
    ],
  },
};

export default nextConfig;
