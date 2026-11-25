import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BackToTop from "@/components/BackToTop";
import { themeInitScript } from "@/components/ThemeToggle";
import { SITE } from "@/data/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const GTM_ID = "GTM-PZ7NLPQP";
const GOOGLE_ADS_ID = "AW-18107240060";

// Self-hosted variable fonts — no render-blocking request to Google Fonts.
const display = localFont({
  src: "./fonts/PlusJakartaSans.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const body = localFont({
  src: "./fonts/Inter.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8fd" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0710" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Healthcare Digital Marketing Agency South Africa | REGC Digital",
    template: "%s | REGC Digital",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "healthcare digital marketing South Africa",
    "medical marketing agency South Africa",
    "digital marketing for doctors",
    "medical website design South Africa",
    "medical SEO South Africa",
    "dental marketing South Africa",
    "HPCSA compliant marketing",
    "Google Ads for doctors",
    "social media for medical practices",
    "healthcare web design Johannesburg",
    "healthcare web design Cape Town",
    "healthcare web design Durban",
    "healthcare web design Pretoria",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Healthcare Marketing",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "REGC Digital Blog" }] },
  },
  openGraph: {
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    url: SITE.url,
    title: "Healthcare Digital Marketing Agency South Africa | REGC Digital",
    description: SITE.description,
    images: [{ url: SITE.defaultOg, width: 1200, height: 630, alt: SITE.defaultOgAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Digital Marketing Agency South Africa | REGC Digital",
    description: SITE.description,
    images: [SITE.defaultOg],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
  other: { "geo.region": "ZA", "geo.placename": "South Africa" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" suppressHydrationWarning data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema(), websiteSchema()]) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to content
        </a>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Navbar />
        <main id="main" className="flex-1 relative">{children}</main>
        <Footer />
        <WhatsAppWidget />
        <BackToTop />

        {/* Analytics load after the page is idle so they never compete with content for bandwidth. */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <Script id="gtag-src" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
        <Script
          id="gtag-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`,
          }}
        />
      </body>
    </html>
  );
}
