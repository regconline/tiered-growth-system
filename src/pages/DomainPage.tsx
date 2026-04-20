import { Link, useParams, Navigate } from "react-router-dom";
import { findDomain, domains, Domain } from "@/data/domains";
import { serviceDetails } from "@/data/serviceDetails";
import SEO from "@/components/SEO";
import TierCard from "@/components/TierCard";
import { Check, ChevronRight } from "lucide-react";

const SITE = "https://regcdigital.co.za";

const buildSchema = (d: Domain) => {
  const url = `${SITE}/domains/${d.slug}/`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "REGC Digital",
      description: `Healthcare digital marketing agency specializing in ${d.fullName.toLowerCase()} in South Africa`,
      areaServed: "South Africa",
      serviceType: "Digital Marketing",
      url,
      priceRange: "R1,000 – R45,000",
      telephone: "+27640826855",
      email: "info@regcdigital.co.za",
      address: { "@type": "PostalAddress", addressCountry: "ZA" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE}/domains/` },
        { "@type": "ListItem", position: 3, name: d.shortName, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: d.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    ...serviceDetails.map((s) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.title,
      description: s.description,
      provider: { "@type": "Organization", name: "REGC Digital" },
      areaServed: "South Africa",
      audience: { "@type": "Audience", audienceType: d.fullName },
    })),
  ];
};

const DomainPage = () => {
  const { slug } = useParams();
  const d = findDomain(slug);

  if (!d) return <Navigate to="/domains" replace />;

  const related = domains.filter((x) => x.slug !== d.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={d.titleTag}
        description={d.metaDescription}
        path={`/domains/${d.slug}`}
        jsonLd={buildSchema(d)}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-muted/50 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to="/domains" className="hover:text-primary">Industries</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">{d.shortName}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero-gradient text-primary-foreground py-20">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">{d.emoji}</div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-4">
            {d.regulator} • South Africa
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6">
            {d.h1}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8">
            {d.heroSubheading}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
            >
              Get a Free Practice Audit
            </Link>
            <a
              href="#services"
              className="border border-primary-foreground/40 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              See Our Services
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
            <span>✅ {d.regulator} Compliant</span>
            <span>✅ POPIA Ready</span>
            <span>✅ South African Healthcare Specialists</span>
            <span>✅ No Lock-in Contracts</span>
          </div>
        </div>
      </header>

      {/* Why It Matters */}
      <section className="py-16 bg-card">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Why {d.fullName} Need Digital Marketing
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{d.whyItMatters}</p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
            Challenges Facing {d.shortName} Practices Today
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {d.painPoints.map((pp, i) => (
              <div
                key={i}
                className="flex gap-3 p-5 bg-card border border-border rounded-lg"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-foreground">{pp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services + Pricing */}
      <section id="services" className="py-16 bg-muted/40">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-3">
              Our Services for {d.shortName}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              10 Services. 3 Tiers Each. Built for {d.shortName}.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Every service below is designed for {d.professionals} — and stays compliant with {d.regulator} requirements.
            </p>
          </div>

          <div className="space-y-16">
            {serviceDetails.map((s, idx) => (
              <div key={s.slug} id={s.slug}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-3xl">{s.icon}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    <span className="text-muted-foreground mr-2">{idx + 1}.</span>
                    {s.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6 max-w-3xl">
                  {s.tagline} For {d.professionals}, this means winning more {d.patientTerm} for your {d.practiceTerm}.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {s.tiers.map((t, i) => (
                    <TierCard key={i} {...t} />
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Full {s.title} details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why REGC */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why {d.shortName} Practices Choose REGC Digital
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { t: `${d.regulator} & POPIA-aware from day one`, d: `Every page, form and ad we build respects ${d.regulator} ethical advertising rules and South African data privacy law.` },
              { t: "Healthcare-only specialists", d: "We don't serve restaurants and gyms. Healthcare is our entire focus, which means faster results and zero compliance learning curve." },
              { t: "Tiered pricing — no surprises", d: "Pick Basic, Standard or Premium for each service. Scale up or down as your practice grows. No lock-in contracts." },
              { t: "Built for South African practices", d: "We understand medical aid friction, local search behaviour, and how South African patients actually book appointments." },
            ].map((b, i) => (
              <div key={i} className="p-6 bg-card border border-border rounded-xl">
                <Check className="w-6 h-6 text-secondary mb-3" />
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{b.t}</h3>
                <p className="text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {d.faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-background border border-border rounded-lg p-5 open:shadow-md transition-shadow"
              >
                <summary className="flex justify-between items-start cursor-pointer font-display font-semibold text-foreground list-none">
                  <span>{f.q}</span>
                  <ChevronRight className="w-5 h-5 shrink-0 text-secondary transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
            Related Healthcare Industries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/domains/${r.slug}`}
                className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:-translate-y-0.5 transition-all"
              >
                <div className="text-2xl mb-2">{r.emoji}</div>
                <h3 className="font-display font-bold text-foreground">{r.shortName}</h3>
                <p className="text-xs text-muted-foreground mt-1">{r.regulator}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/domains" className="text-primary font-semibold hover:underline">
              View all 17 industries →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Your {d.shortName} Practice?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Book a free 30-minute digital audit. We'll show you exactly where your practice stands online and what it will take to reach the top.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
          >
            Book My Free Audit →
          </Link>
          <p className="mt-4 text-sm text-primary-foreground/60">
            No obligation. No pushy sales. Just honest insights.
          </p>
        </div>
      </section>
    </>
  );
};

export default DomainPage;