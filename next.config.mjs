/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Frame-Options",        value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
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
