/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    unoptimized: true
  },
  i18n: {
    locales: ['bg', 'en'],
    defaultLocale: 'bg'
  },
  output: 'standalone'
};

export default nextConfig;
