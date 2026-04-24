/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
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
