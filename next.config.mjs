/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["*.janeway.replit.dev", "*.replit.dev", "*.repl.co"],
  async rewrites() {
    return [
      {
        source: '/healthcare-marketing-:slug/',
        destination: '/healthcare-marketing/:slug/',
      },
      {
        source: '/healthcare-marketing-:slug',
        destination: '/healthcare-marketing/:slug/',
      },
    ];
  },
};

export default nextConfig;
