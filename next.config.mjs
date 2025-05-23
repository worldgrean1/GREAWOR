/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['framer-motion'],
  webpack: (config) => {
    config.module.rules.push({
      test: /framer-motion/,
      sideEffects: false
    })
    return config
  }
}

export default nextConfig
