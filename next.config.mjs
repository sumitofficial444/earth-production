/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  eslint: {
    // Don't fail Vercel build on ESLint warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't fail Vercel build on TS errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
