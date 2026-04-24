import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { SITE } from "@/data/site";
import TierCard from "@/components/TierCard";

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | REGC Digital`,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: { url: `/services/${service.slug}/` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      serviceType: service.title,
      category: "Healthcare Marketing",
      provider: { "@id": SITE.url + "#organization" },
      areaServed: { "@type": "Country", name: "South Africa" },
      url: new URL(path, SITE.url).toString(),
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "ZAR",
        offerCount: service.tiers.length,
        offers: service.tiers.map((t) => ({
          "@type": "Offer",
          name: t.name,
          priceCurrency: "ZAR",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "ZAR", price: t.price },
          description: (t.includes ?? []).join(" • "),
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Services", item: new URL("/services/", SITE.url).toString() },
        { "@type": "ListItem", position: 3, name: service.title, item: new URL(path, SITE.url).toString() },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <nav className="text-sm text-primary-foreground/70 mb-4">
            <Link href="/services/" className="hover:text-primary-foreground">← All Services</Link>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{service.icon}</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold">{service.title}</h1>
          </div>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl">{service.tagline}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed">{service.description}</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-3">Why this matters</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.whyItMatters}</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">What's included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {service.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Our process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {service.process.map((p, idx) => (
                <div key={idx} className="bg-card border border-border rounded-xl p-5">
                  <div className="text-xs font-bold text-secondary mb-1">STEP {idx + 1}</div>
                  <h3 className="font-display font-bold text-foreground mb-2">{p.step}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Pricing &amp; tiers</h2>
            <p className="text-muted-foreground mb-6">Three transparent options to match your stage and budget.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.tiers.map((t) => <TierCard key={t.tier} {...t} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Not sure which tier is right?</h2>
          <p className="text-muted-foreground mb-6">Book a free consultation and we'll recommend the best fit for your practice.</p>
          <Link href="/contact/" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
            Talk to us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
