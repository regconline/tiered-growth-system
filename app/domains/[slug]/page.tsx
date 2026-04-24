import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { domains } from "@/data/domains";
import { SITE } from "@/data/site";

export function generateStaticParams() {
  return domains.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);
  if (!domain) return {};
  return {
    title: domain.titleTag,
    description: domain.metaDescription,
    alternates: { canonical: `/domains/${domain.slug}/` },
    openGraph: { url: `/domains/${domain.slug}/` },
  };
}

export default async function DomainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);
  if (!domain) notFound();

  const path = `/domains/${domain.slug}/`;
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${SITE.name} — ${domain.fullName}`,
      url: new URL(path, SITE.url).toString(),
      description: domain.metaDescription,
      areaServed: "ZA",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Industries", item: new URL("/domains/", SITE.url).toString() },
        { "@type": "ListItem", position: 3, name: domain.shortName, item: new URL(path, SITE.url).toString() },
      ],
    },
  ];
  if (domain.faqs && domain.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: domain.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <nav className="text-sm text-primary-foreground/70 mb-4">
            <Link href="/domains/" className="hover:text-primary-foreground">← All Industries</Link>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{domain.emoji}</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold">{domain.h1}</h1>
          </div>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl">{domain.heroSubheading}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Why this matters for your {domain.shortName.toLowerCase()} practice</h2>
            <p className="text-muted-foreground leading-relaxed">{domain.whyItMatters}</p>
            <p className="text-xs text-muted-foreground mt-4">Regulator: <strong>{domain.regulator}</strong></p>
          </div>

          {domain.painPoints && domain.painPoints.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Common challenges we solve</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domain.painPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                    <AlertTriangle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {domain.faqs && domain.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently asked questions</h2>
              <div className="space-y-4">
                {domain.faqs.map((faq, i) => (
                  <details key={i} className="bg-card border border-border rounded-xl p-6 group">
                    <summary className="font-display font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                      <span>{faq.q}</span>
                      <span className="text-secondary group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <p className="text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to grow your {domain.shortName.toLowerCase()} practice?</h2>
          <p className="text-muted-foreground mb-6">Let's talk about your goals and how we can help.</p>
          <Link href="/contact/" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
            Book a free consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
