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
  }
};

export default nextConfig;
