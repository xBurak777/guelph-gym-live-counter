/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint runs in dev and via `npm run lint`; skip during production build to keep deploys fast
    ignoreDuringBuilds: true,
  },
  images: {
    // Local images only; no remote patterns needed
    formats: ["image/webp"],
  },
};

export default nextConfig;
