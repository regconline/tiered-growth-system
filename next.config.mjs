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
  // Headless Chromium for the client-website previews must stay out of the bundler
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  outputFileTracingIncludes: { "/api/showcase/[slug]": ["./node_modules/@sparticuz/chromium/bin/**"] },
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
      // The internal route behind the city pages must not be reachable as a second URL
      {
        source: '/healthcare-marketing/:slug',
        destination: '/healthcare-marketing-:slug/',
        permanent: true,
      },
      {
        source: '/healthcare-marketing/:slug/',
        destination: '/healthcare-marketing-:slug/',
        permanent: true,
      },
      // Services and articles removed in Nov 2026
      { source: '/services/seo-services/:rest*', destination: '/services/', permanent: true },
      { source: '/services/seo-services', destination: '/services/', permanent: true },
      { source: '/services/patient-communication/:rest*', destination: '/services/', permanent: true },
      { source: '/services/patient-communication', destination: '/services/', permanent: true },
      { source: '/services/analytics-reporting/:rest*', destination: '/services/', permanent: true },
      { source: '/services/analytics-reporting', destination: '/services/', permanent: true },
      { source: '/services/compliance/:rest*', destination: '/services/', permanent: true },
      { source: '/services/compliance', destination: '/services/', permanent: true },
      { source: '/services/conversion-optimization/:rest*', destination: '/services/website-services/', permanent: true },
      { source: '/services/conversion-optimization', destination: '/services/website-services/', permanent: true },
      { source: '/blog/google-business-profile-doctors-guide/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/google-business-profile-doctors-guide', destination: '/blog/', permanent: true },
      { source: '/blog/how-to-rank-1-google-south-africa/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/how-to-rank-1-google-south-africa', destination: '/blog/', permanent: true },
      { source: '/blog/local-seo-medical-practice/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/local-seo-medical-practice', destination: '/blog/', permanent: true },
      { source: '/blog/local-seo-south-africa-guide/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/local-seo-south-africa-guide', destination: '/blog/', permanent: true },
      { source: '/blog/on-page-vs-technical-seo/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/on-page-vs-technical-seo', destination: '/blog/', permanent: true },
      { source: '/blog/what-is-seo-business-survival/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/what-is-seo-business-survival', destination: '/blog/', permanent: true },
      { source: '/blog/why-website-not-ranking-fix/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/why-website-not-ranking-fix', destination: '/blog/', permanent: true },
      { source: '/blog/hpcsa-advertising-rules-marketing-guide/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/hpcsa-advertising-rules-marketing-guide', destination: '/blog/', permanent: true },
      { source: '/blog/popia-compliance-medical-practice-website/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/popia-compliance-medical-practice-website', destination: '/blog/', permanent: true },
      { source: '/blog/reduce-patient-no-shows/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/reduce-patient-no-shows', destination: '/blog/', permanent: true },
      { source: '/blog/whatsapp-business-medical-practice/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/whatsapp-business-medical-practice', destination: '/blog/', permanent: true },
      { source: '/blog/high-converting-website-breakdown/:rest*', destination: '/blog/healthcare-website-must-haves/', permanent: true },
      { source: '/blog/high-converting-website-breakdown', destination: '/blog/healthcare-website-must-haves/', permanent: true },
      { source: '/blog/seo-content-writing-rank-and-convert/:rest*', destination: '/blog/', permanent: true },
      { source: '/blog/seo-content-writing-rank-and-convert', destination: '/blog/', permanent: true },
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
