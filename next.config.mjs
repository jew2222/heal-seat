/** @type {import('next').NextConfig} */
const nextConfig = {
  source: "/(.*)",
  headers: [
    {
      key: "Cache-Control",
      value: "no-cache, no-store, must-revalidate",
    },
  ],
  images: {
    remotePatterns: [
      { hostname: "i.ytimg.com" },
      { hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
