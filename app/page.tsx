import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Star, Users, TrendingUp } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import { cities, provinces } from "@/data/locations";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "REGC Digital — Healthcare Marketing in South Africa",
  description: "Specialist healthcare marketing for South African medical practices. Websites, SEO, ads, social, reputation — done by people who understand healthcare.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", type: "website" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE.url + "#organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: new URL("/assets/regc-logo.png", SITE.url).toString() },
    email: SITE.email,
    telephone: SITE.phoneIntl,
    areaServed: { "@type": "Country", name: SITE.region },
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: SITE.phoneIntl,
      email: SITE.email,
      contactType: "customer service",
      areaServed: SITE.countryCode,
      availableLanguage: ["English", "Afrikaans"],
    }],
    address: { "@type": "PostalAddress", addressCountry: SITE.countryCode },
    sameAs: SITE.sameAs,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE.url + "#website",
    url: SITE.url,
    name: SITE.name,
    inLanguage: "en-ZA",
    publisher: { "@id": SITE.url + "#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SITE.url + "#service",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phoneIntl,
    email: SITE.email,
    areaServed: { "@type": "Country", name: "South Africa" },
    serviceType: "Healthcare Digital Marketing",
    description: "Specialist healthcare marketing for South African medical practices.",
    priceRange: "$$",
    provider: { "@id": SITE.url + "#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you only work with healthcare practices in South Africa?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. We focus exclusively on healthcare practices across South Africa — doctors, dentists, allied health, pharmacies, psychology, nursing and more — because compliance, patient psychology and the local search market all behave differently from generic small-business marketing." },
      },
      {
        "@type": "Question",
        name: "Are your campaigns HPCSA and POPIA compliant?",
        acceptedAnswer: { "@type": "Answer", text: "Every website, ad, landing page and social asset we produce is built against HPCSA, SANC, SAPC or relevant council advertising rules and POPIA data-handling requirements. We refuse work that would put your registration at risk." },
      },
      {
        "@type": "Question",
        name: "How quickly can I expect results?",
        acceptedAnswer: { "@type": "Answer", text: "Website launches and Google Ads can generate enquiries within days. Local SEO typically shows movement at 30–60 days, with strong compounding gains from month 4 onward." },
      },
      {
        "@type": "Question",
        name: "Do you require long-term contracts?",
        acceptedAnswer: { "@type": "Answer", text: "No. All retainer services are month-to-month with no lock-in. We earn your business each month through results." },
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground">
        <div className="container max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4" /> Specialist healthcare marketing
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Help more patients find your practice.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 leading-relaxed">
              REGC Digital builds websites, runs ads, and grows reviews for South African medical practices — so the right patients can find you and book.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact/" className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                Book a free consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services/" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                See services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><Users className="w-8 h-8 mx-auto text-secondary mb-2" /><p className="font-display text-3xl font-bold text-primary">50+</p><p className="text-sm text-muted-foreground">Practices served</p></div>
            <div><TrendingUp className="w-8 h-8 mx-auto text-secondary mb-2" /><p className="font-display text-3xl font-bold text-primary">3×</p><p className="text-sm text-muted-foreground">Avg. enquiry growth</p></div>
            <div><Star className="w-8 h-8 mx-auto text-secondary mb-2" /><p className="font-display text-3xl font-bold text-primary">4.9</p><p className="text-sm text-muted-foreground">Client rating</p></div>
            <div><CheckCircle2 className="w-8 h-8 mx-auto text-secondary mb-2" /><p className="font-display text-3xl font-bold text-primary">17</p><p className="text-sm text-muted-foreground">Specialities served</p></div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Everything your practice needs to grow online</h2>
            <p className="text-muted-foreground">Choose what you need — from a single service to a complete digital partnership.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceDetails.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-secondary transition-all">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{s.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Built for healthcare specialities</h2>
            <p className="text-muted-foreground">We tailor strategies to the unique patient journey and ethical guidelines of each speciality.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {domains.map((d) => (
              <Link key={d.slug} href={`/domains/${d.slug}/`} className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md hover:border-secondary transition-all">
                <div className="text-3xl mb-2">{d.emoji}</div>
                <p className="font-display font-semibold text-sm text-foreground">{d.shortName}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Healthcare marketing across South Africa</h2>
            <p className="text-muted-foreground">Local strategies for {cities.length} cities across all {provinces.length} provinces.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto mb-6">
            {cities.slice(0, 15).map((c) => (
              <Link key={c.slug} href={`/healthcare-marketing-${c.slug}/`} className="bg-card border border-border rounded-lg px-4 py-3 text-center hover:border-secondary hover:shadow-md transition-all">
                <p className="font-display font-semibold text-sm text-foreground">{c.name}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/locations/" className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:underline">
              See all locations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to grow your practice?</h2>
          <p className="text-primary-foreground/85 mb-8 text-lg">Book a free, no-obligation consultation. We'll review your current digital presence and recommend a clear next step.</p>
          <Link href="/contact/" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
            Get started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
