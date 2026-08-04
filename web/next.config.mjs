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
  async redirects() {
    return [
      // Original-site paths → our replica paths (bookmarks and external links keep working)
      { source: "/kids-camps", destination: "/kids", permanent: false },
      { source: "/kids-camps/:path*", destination: "/kids/:path*", permanent: false },
      { source: "/how-to-register", destination: "/membership/register", permanent: false },
      { source: "/fitness-wellness", destination: "/fitness/wellness", permanent: false },
      { source: "/fitness-wellness/:path*", destination: "/fitness/:path*", permanent: false },
      { source: "/skill-development", destination: "/skills", permanent: false },
      { source: "/skill-development/:path*", destination: "/skills/:path*", permanent: false },
      { source: "/sports-clubs", destination: "/sports", permanent: false },
      { source: "/sports-clubs/:path*", destination: "/sports/:path*", permanent: false },
      { source: "/membership-services", destination: "/membership", permanent: false },
      { source: "/membership-services/:path*", destination: "/membership/:path*", permanent: false },
      { source: "/about-us", destination: "/about", permanent: false },
      { source: "/about-us/facilities", destination: "/facilities", permanent: false },
      { source: "/about-us/facilities/:path*", destination: "/facilities/:path*", permanent: false },
      { source: "/about-us/info/what%27s-new", destination: "/about/news", permanent: false },
      { source: "/about-us/info/whats-new", destination: "/about/news", permanent: false },
      { source: "/about-us/info/events", destination: "/about/events", permanent: false },
      { source: "/about-us/info/frequently-asked-questions", destination: "/about/faq", permanent: false },
      { source: "/about-us/info/iedi", destination: "/about/iedi", permanent: false },
      { source: "/about-us/info/job-opportunities", destination: "/about/jobs", permanent: false },
      { source: "/about-us/info/hours-of-operation", destination: "/hours", permanent: false },
      { source: "/about-us/info/policies", destination: "/about/policies", permanent: false },
      { source: "/about-us/info/valued-members-staff", destination: "/about/valued-members", permanent: false },
      { source: "/about-us/contact-us", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
