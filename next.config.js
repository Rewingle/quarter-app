/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    appDir: true
  },
  images:{
    domains: ['storage.googleapis.com',
              'https://quarter-app.vercel.app']
  }
}

module.exports = nextConfig
