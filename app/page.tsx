import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Star, Users, TrendingUp, Shield, Phone } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
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

const stats = [
  { icon: Users,      value: "50+",  label: "Practices served" },
  { icon: TrendingUp, value: "3×",   label: "Avg. enquiry growth" },
  { icon: Star,       value: "4.9",  label: "Client rating" },
  { icon: Shield,     value: "100%", label: "HPCSA compliant" },
];

const trustPoints = [
  "HPCSA & POPIA compliant campaigns",
  "Month-to-month, no lock-in",
  "Dedicated South African team",
  "Results within 30 days",
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero-gradient hero-grid text-primary-foreground relative overflow-hidden">
        {/* decorative ring */}
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border border-white/5 animate-spin-slow" aria-hidden />
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/8" aria-hidden />

        <div className="container max-w-6xl mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label mb-5 inline-flex !bg-white/10 !text-white/80">
                <Sparkles className="w-3.5 h-3.5" /> Specialist healthcare marketing
              </span>
              <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.08] mb-6">
                Help more patients{" "}
                <span className="text-gradient-hero">find your practice.</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed max-w-lg">
                REGC Digital builds websites, runs ads, and grows reviews for South African medical practices — so the right patients can find you and book.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href="/contact/" className="btn-primary">
                  Book a free consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/services/" className="btn-ghost text-white">
                  See services
                </Link>
              </div>
              <ul className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2">
                {trustPoints.map((p) => (
                  <li key={p} className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats floating cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-6 text-center animate-float"
                  style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${4 + i * 0.5}s` }}
                >
                  <Icon className="w-6 h-6 mx-auto mb-3 text-secondary" />
                  <p className="font-display text-3xl font-bold text-white mb-1">{value}</p>
                  <p className="text-sm text-primary-foreground/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
      </section>

      {/* ── Stats bar (mobile) ─────────────────────────────── */}
      <section className="lg:hidden py-10 bg-card border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 text-center">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <Icon className="w-6 h-6 mx-auto text-secondary mb-1.5" />
                <p className="font-display text-3xl font-bold text-primary">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <AnimateIn className="text-center mb-14 max-w-2xl mx-auto">
            <span className="section-label mb-4">What we do</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Everything your practice needs to grow online
            </h2>
            <p className="text-muted-foreground">
              Choose what you need — from a single service to a complete digital partnership.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceDetails.map((s, i) => (
              <AnimateIn key={s.slug} delay={i * 60}>
                <Link href={`/services/${s.slug}/`} className="card-premium group block p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-secondary/20 transition-colors">
                    {s.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{s.tagline}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-glow mx-auto max-w-4xl" />

      {/* ── Why REGC ──────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-transparent">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <span className="section-label mb-4">Why us</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Marketing that understands healthcare
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Generic digital agencies treat your practice like a plumber or a restaurant. We don't. Every campaign we run is built around patient psychology, HPCSA ethical guidelines, and the competitive local search landscape in South Africa.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "HPCSA, SANC & SAPC compliant advertising",
                  "POPIA-compliant data collection",
                  "Local SA teams — no overseas call centres",
                  "Transparent monthly reporting",
                  "No long-term lock-in contracts",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/about/" className="btn-primary inline-flex">
                About REGC Digital <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimateIn>
            <AnimateIn delay={120}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "🏥", title: "Healthcare-first", desc: "Built for clinics, practices, and healthcare businesses" },
                  { emoji: "🇿🇦", title: "South African", desc: "Local market knowledge, local team, local results" },
                  { emoji: "📊", title: "Data-driven", desc: "Every decision is backed by real SA patient search data" },
                  { emoji: "🔒", title: "Compliant", desc: "HPCSA, POPIA, and council advertising rules by default" },
                ].map((c) => (
                  <div key={c.title} className="bg-card border border-border rounded-2xl p-5 hover:border-secondary/50 transition-colors">
                    <div className="text-3xl mb-3">{c.emoji}</div>
                    <h4 className="font-display font-bold text-sm text-foreground mb-1">{c.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="divider-glow mx-auto max-w-4xl" />

      {/* ── Industries ────────────────────────────────────── */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <AnimateIn className="text-center mb-14 max-w-2xl mx-auto">
            <span className="section-label mb-4">Specialities</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Built for healthcare specialities
            </h2>
            <p className="text-muted-foreground">
              We tailor strategies to the unique patient journey and ethical guidelines of each speciality.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {domains.map((d, i) => (
              <AnimateIn key={d.slug} delay={i * 30}>
                <Link href={`/domains/${d.slug}/`}
                  className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-md hover:border-secondary/60 hover:-translate-y-0.5 transition-all duration-200 block">
                  <div className="text-3xl mb-2">{d.emoji}</div>
                  <p className="font-display font-semibold text-xs text-foreground leading-tight">{d.shortName}</p>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-glow mx-auto max-w-4xl" />

      {/* ── Locations ─────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-transparent">
        <div className="container max-w-6xl mx-auto px-4">
          <AnimateIn className="text-center mb-14 max-w-2xl mx-auto">
            <span className="section-label mb-4">Coverage</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Healthcare marketing across South Africa
            </h2>
            <p className="text-muted-foreground">
              Local strategies for {cities.length} cities across all {provinces.length} provinces.
            </p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto mb-8">
              {cities.slice(0, 15).map((c) => (
                <Link key={c.slug} href={`/healthcare-marketing-${c.slug}/`}
                  className="bg-card border border-border rounded-xl px-4 py-3 text-center hover:border-secondary/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <p className="font-display font-semibold text-sm text-foreground">{c.name}</p>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/locations/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline">
                See all {cities.length + provinces.length} locations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 hero-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent pointer-events-none" />
        <div className="container max-w-3xl mx-auto px-4 text-center relative z-10">
          <AnimateIn>
            <span className="section-label mb-5 !bg-white/10 !text-white/80">Free consultation</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 mt-4">
              Ready to grow your practice?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed">
              Book a free, no-obligation consultation. We'll review your current digital presence and recommend a clear next step — no sales pressure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact/" className="btn-primary">
                Book a free consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={`tel:${SITE.phoneIntl}`} className="btn-ghost text-white inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
