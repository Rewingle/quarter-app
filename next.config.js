/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental:{
    appDir: true
  },
  images:{
    domains: ['storage.googleapis.com',
              'https://quarter-app.vercel.app',
              'quarter-app.s3.eu-central-1.amazonaws.com']
  }
}

module.exports = nextConfig
