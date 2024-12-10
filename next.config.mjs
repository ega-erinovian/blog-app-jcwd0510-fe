/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mclaren.scene7.com",
      },
      {
        protocol: "https",
        hostname: "www.gameskinny.com",
      },
      {
        protocol: "https",
        hostname: "akcdn.detik.net.id",
      },
    ],
  },
};

export default nextConfig;
