/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    appDir: true
  },
  images:{
    domains: ['storage.googleapis.com']
  }
}

module.exports = nextConfig
