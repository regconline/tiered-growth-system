import type { Metadata } from "next";
import { SITE } from "@/data/site";

export type Crumb = { name: string; path: string };

export const abs = (path: string) => new URL(path, SITE.url).toString();

/** Consistent per-page metadata: title, description, canonical, OG & Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  ogImage,
  publishedTime,
  modifiedTime,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: ogImage ?? SITE.defaultOg, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage ?? SITE.defaultOg],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": SITE.url + "/#organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url + "/",
    logo: { "@type": "ImageObject", url: abs(SITE.logo), width: 512, height: 512 },
    image: abs(SITE.defaultOg),
    description: SITE.description,
    slogan: SITE.tagline,
    email: SITE.email,
    telephone: SITE.phoneIntl,
    priceRange: "R2,500 – R45,000",
    currenciesAccepted: "ZAR",
    address: { "@type": "PostalAddress", addressCountry: SITE.countryCode },
    areaServed: { "@type": "Country", name: SITE.region },
    knowsAbout: [
      "Healthcare marketing", "Medical website design", "Medical SEO", "Local SEO",
      "Google Ads for healthcare", "Social media marketing", "Online reputation management",
      "HPCSA advertising guidelines", "POPIA compliance",
    ],
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    }],
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: SITE.phoneIntl,
      email: SITE.email,
      contactType: "sales",
      areaServed: SITE.countryCode,
      availableLanguage: ["English", "Afrikaans"],
    }],
    sameAs: SITE.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE.url + "/#website",
    url: SITE.url + "/",
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en-ZA",
    publisher: { "@id": SITE.url + "/#organization" },
  };
}

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemList<T>(
  items: T[],
  toEntry: (item: T, i: number) => { name: string; url: string; description?: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => {
      const e = toEntry(item, i);
      return {
        "@type": "ListItem",
        position: i + 1,
        name: e.name,
        url: abs(e.url),
        ...(e.description ? { description: e.description } : {}),
      };
    }),
  };
}
