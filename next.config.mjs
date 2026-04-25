/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  // X-Frame-Options only in prod — dev needs to be embeddable in the Replit preview iframe
  ...(isProd ? [{ key: "X-Frame-Options", value: "SAMEORIGIN" }] : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
  ...(isProd
    ? [{
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      }]
    : []),
];

const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  allowedDevOrigins: ["*.janeway.replit.dev", "*.replit.dev", "*.repl.co"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
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
  async redirects() {
    return [
      // Canonical domain — force www on the apex (301 permanent, not 307)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'regcdigital.co.za' }],
        destination: 'https://www.regcdigital.co.za/:path*',
        permanent: true,
      },
      // Legacy/broken service URLs referenced from older blog posts
      {
        source: '/services/website-design',
        destination: '/services/website-services/',
        permanent: true,
      },
      {
        source: '/services/website-design/',
        destination: '/services/website-services/',
        permanent: true,
      },
      {
        source: '/services/practice-photography',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/services/practice-photography/',
        destination: '/services/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
