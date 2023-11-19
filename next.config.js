/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_DEV_URL: 'http://158.160.126.80/api/v1/',
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
