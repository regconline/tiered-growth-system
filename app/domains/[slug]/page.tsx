import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertTriangle, ShieldCheck } from "lucide-react";
import { domains } from "@/data/domains";
import { serviceDetails } from "@/data/serviceDetails";
import { SITE } from "@/data/site";
import { abs, faqSchema } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import JsonLd from "@/components/JsonLd";
import InquiryForm from "@/components/InquiryForm";
import { DomainIcon, ServiceIcon } from "@/components/ServiceIcon";

export const dynamicParams = false;

export function generateStaticParams() {
  return domains.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);
  if (!domain) return {};
  const path = `/domains/${domain.slug}/`;
  return {
    title: { absolute: domain.titleTag },
    description: domain.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: domain.titleTag, description: domain.metaDescription, images: [{ url: SITE.defaultOg, width: 1200, height: 630, alt: domain.titleTag }] },
    twitter: { card: "summary_large_image", title: domain.titleTag, description: domain.metaDescription, images: [SITE.defaultOg] },
  };
}

export default async function DomainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);
  if (!domain) notFound();

  const path = `/domains/${domain.slug}/`;
  const others = domains.filter((d) => d.slug !== domain.slug).slice(0, 8);
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Digital marketing for ${domain.fullName}`,
      serviceType: "Healthcare digital marketing",
      url: abs(path),
      description: domain.metaDescription,
      areaServed: { "@type": "Country", name: "South Africa" },
      audience: { "@type": "Audience", audienceType: domain.professionals },
      provider: { "@id": SITE.url + "/#organization" },
    },
  ];
  if (domain.faqs?.length) jsonLd.push(faqSchema(domain.faqs));

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Industries", path: "/domains/" }, { name: domain.shortName, path }]}
        eyebrow={<><DomainIcon slug={domain.slug} className="h-3.5 w-3.5" /> {domain.shortName}</>}
        title={domain.h1}
        subtitle={domain.heroSubheading}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#enquire" className="btn-primary !px-7 !py-3.5">Free consultation <ArrowRight className="h-4 w-4" /></a>
          <Link href="/services/" className="btn-ghost !px-7 !py-3.5">See our services</Link>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl px-4">
          <AnimateIn className="card relative overflow-hidden p-8 md:p-10">
            <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary/10" />
            <span className="section-label">Why it matters</span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground md:text-3xl">
              Why this matters for your {domain.shortName.toLowerCase()} {domain.practiceTerm}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">{domain.whyItMatters}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-secondary" /> All work aligned with <strong className="text-foreground">{domain.regulator}</strong> rules and POPIA
            </p>
          </AnimateIn>

          {domain.painPoints?.length > 0 && (
            <div className="mt-16">
              <AnimateIn>
                <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl">Common challenges we solve</h2>
              </AnimateIn>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {domain.painPoints.map((p, i) => (
                  <AnimateIn key={p} delay={(i % 2) * 80} className="card flex items-start gap-3 p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10"><AlertTriangle className="h-4 w-4 text-accent" /></span>
                    <p className="text-foreground/85">{p}</p>
                  </AnimateIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section-tint py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <AnimateIn className="mb-10 max-w-2xl">
            <span className="section-label">How we help</span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground md:text-3xl">Services for {domain.professionals}</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {serviceDetails.map((s, i) => (
              <AnimateIn key={s.slug} delay={(i % 5) * 50} className="h-full">
                <Link href={`/services/${s.slug}/`} className="card card-hover group flex h-full flex-col p-5">
                  <span className="icon-tile h-10 w-10 text-secondary"><ServiceIcon slug={s.slug} className="h-5 w-5" /></span>
                  <span className="mt-3 font-display font-bold text-foreground group-hover:text-secondary transition-colors">{s.title}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{s.tagline}</span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {domain.faqs?.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl px-4">
            <AnimateIn className="mb-10 text-center">
              <span className="section-label">FAQ</span>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground md:text-3xl">Frequently asked questions</h2>
            </AnimateIn>
            <div className="space-y-3">
              {domain.faqs.map((faq, i) => (
                <details key={faq.q} className="card group overflow-hidden" open={i === 0}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 md:p-6">
                    <h3 className="font-display text-base font-semibold text-foreground md:text-lg">{faq.q}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg text-secondary transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-5 pb-6 leading-relaxed text-muted-foreground md:px-6">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="enquire" className="section-tint scroll-mt-24 py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <AnimateIn>
              <span className="section-label">Free consultation</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-4xl text-balance">
                Ready to grow your {domain.shortName.toLowerCase()} {domain.practiceTerm}?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Tell us about your goals and we&apos;ll recommend a clear, compliant plan for attracting more {domain.patientTerm}.</p>
              <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Other industries</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {others.map((d) => (
                  <Link key={d.slug} href={`/domains/${d.slug}/`} className="chip !py-1.5 hover:border-secondary/50 hover:text-foreground">{d.shortName}</Link>
                ))}
              </div>
            </AnimateIn>
            <AnimateIn delay={100}>
              <InquiryForm variant="contact" source={`industry-${domain.slug}`} heading="Request a free consultation" />
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
