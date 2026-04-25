import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BackToTop from "@/components/BackToTop";
import { SITE } from "@/data/site";

const GTM_ID = "GTM-PZ7NLPQP";
const GOOGLE_ADS_ID = "AW-18107240060";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Healthcare Digital Marketing South Africa | REGC Digital",
    template: "%s | REGC Digital",
  },
  description:
    "Specialist healthcare digital marketing agency for South African medical practices, hospitals, and clinics. SEO, Google Ads, websites, and social — HPCSA & POPIA compliant.",
  keywords: [
    "healthcare digital marketing South Africa",
    "medical marketing agency South Africa",
    "digital marketing for doctors South Africa",
    "medical SEO South Africa",
    "HPCSA compliant digital marketing",
    "hospital marketing services South Africa",
    "pharmaceutical marketing agency South Africa",
    "web design Johannesburg",
    "web design Cape Town",
    "web design Durban",
    "web design Pretoria",
    "digital marketing Cape Town",
    "digital marketing Johannesburg",
    "SEO services Durban",
    "SEO services Pretoria",
    "website development Pretoria",
    "healthcare marketing Port Elizabeth",
    "healthcare marketing Gqeberha",
    "healthcare marketing Bloemfontein",
    "healthcare marketing East London",
    "healthcare marketing Polokwane",
    "healthcare marketing Nelspruit",
    "healthcare marketing Mbombela",
    "healthcare marketing Kimberley",
    "affordable web design South Africa",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    url: SITE.url,
    title: "Healthcare Digital Marketing South Africa | REGC Digital",
    description:
      "Specialist healthcare digital marketing for SA medical practices. HPCSA & POPIA compliant. Websites, SEO, Google Ads, social, reputation.",
    images: [{ url: SITE.defaultOg, alt: SITE.defaultOgAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Digital Marketing South Africa | REGC Digital",
    description:
      "Specialist healthcare digital marketing for SA medical practices.",
    images: [SITE.defaultOg],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "ZA",
    "geo.placename": "Johannesburg, South Africa",
    "geo.position": "-26.2041;28.0473",
    "ICBM": "-26.2041, 28.0473",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" data-scroll-behavior="smooth" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-body antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Navbar />
        <main className="flex-1 relative">{children}</main>
        <Footer />
        <WhatsAppWidget />
        <BackToTop />
        {/* Google Tag Manager — loaded after hydration to avoid SSR mismatch */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* Google tag (gtag.js) — Google Ads */}
        <Script
          id="gtag-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GOOGLE_ADS_ID}');`,
          }}
        />
      </body>
    </html>
  );
}
