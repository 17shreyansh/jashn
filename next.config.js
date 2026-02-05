/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    qualities: [75, 90, 95],
    unoptimized: false,
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig
