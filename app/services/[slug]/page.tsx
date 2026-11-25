import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lightbulb, Target, Phone, Clock, ShieldCheck, MessageSquareText } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { serviceExtras } from "@/data/serviceExtras";
import { planFor } from "@/data/billing";
import { paystackConfigured } from "@/lib/billing/paystack";
import { billingDbConfigured } from "@/lib/billing/db";
import { SITE } from "@/data/site";
import { getPostBySlug } from "@/lib/blog";
import { abs, faqSchema, pageMetadata } from "@/lib/seo";
import TierCard from "@/components/TierCard";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { ServiceIcon } from "@/components/ServiceIcon";
import { WhatsAppIcon } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) return {};
  const x = serviceExtras[slug];
  return pageMetadata({
    title: x?.metaTitle ?? service.title,
    description: x?.metaDescription ?? service.tagline,
    path: `/services/${service.slug}/`,
    keywords: x?.keywords,
    ogImage: `/services/${service.slug}/opengraph-image/`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) notFound();
  const x = serviceExtras[slug];
  const path = `/services/${service.slug}/`;
  const related = (x?.related ?? []).map((s) => serviceDetails.find((d) => d.slug === s)).filter(Boolean) as typeof serviceDetails;
  const posts = (x?.relatedPosts ?? []).map((p) => getPostBySlug(p)).filter((p) => p && !p.draft);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": abs(path) + "#service",
      name: service.title,
      description: service.description,
      serviceType: service.title,
      category: "Healthcare Marketing",
      provider: { "@id": SITE.url + "/#organization" },
      areaServed: { "@type": "Country", name: "South Africa" },
      audience: { "@type": "Audience", audienceType: "Healthcare practitioners and medical practices" },
      url: abs(path),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} packages`,
        itemListElement: service.tiers.map((t) => ({
          "@type": "Offer",
          name: t.name,
          priceCurrency: "ZAR",
          description: `${t.price}. ${t.includes.join(" • ")}`,
          itemOffered: { "@type": "Service", name: `${service.title} — ${t.name}` },
        })),
      },
    },
  ];
  if (x?.faqs?.length) jsonLd.push(faqSchema(x.faqs));

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }, { name: service.title, path }]}
        eyebrow={<><ServiceIcon slug={service.slug} className="h-3.5 w-3.5" /> Service</>}
        title={service.title}
        subtitle={service.tagline}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#enquire" className="btn-primary !px-7 !py-3.5">Get a quote <ArrowRight className="h-4 w-4" /></a>
          <a href="#pricing" className="btn-ghost !px-7 !py-3.5">View packages &amp; pricing</a>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <AnimateIn>
              <span className="section-label">Overview</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-4xl text-balance">
                {service.title} built for healthcare
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-foreground/80">{service.description}</p>
              {x?.outcomes && (
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {x.outcomes.map((o) => (
                    <div key={o.title} className="card p-5">
                      <Target className="h-5 w-5 text-secondary" />
                      <p className="mt-3 font-display font-bold text-foreground">{o.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{o.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </AnimateIn>
            <AnimateIn delay={100} className="space-y-5">
              <div className="card relative overflow-hidden p-7">
                <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary/10" />
                <Lightbulb className="h-6 w-6 text-secondary" />
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">Why this matters</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{service.whyItMatters}</p>
              </div>
              {x?.idealFor && (
                <div className="card p-7">
                  <h3 className="font-display text-lg font-bold text-foreground">Ideal for</h3>
                  <ul className="mt-4 space-y-3">
                    {x.idealFor.map((i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-tint py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <AnimateIn className="mb-10 max-w-2xl">
            <span className="section-label">What&apos;s included</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-4xl">Everything you need, done properly</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((f, i) => (
              <AnimateIn key={f} delay={(i % 4) * 60} className="card card-hover flex items-start gap-3 p-5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                </span>
                <span className="text-sm font-medium text-foreground">{f}</span>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <AnimateIn className="mb-12 max-w-2xl">
            <span className="section-label">Our process</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-4xl">How we deliver {service.title.toLowerCase()}</h2>
          </AnimateIn>
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <AnimateIn as="li" key={p.step} delay={i * 90} className="card relative overflow-hidden p-6">
                <span className="font-display text-6xl font-extrabold leading-none text-gradient opacity-30">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </AnimateIn>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-tint scroll-mt-24 py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <AnimateIn className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-label">Packages &amp; pricing</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-4xl">Transparent pricing in rand</h2>
            <p className="mt-4 text-muted-foreground">Three clear options to match your stage and budget. Final quotes depend on scope — no hidden extras.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {service.tiers.map((t, i) => (
              <AnimateIn key={t.tier} delay={i * 90} className="h-full">
                <TierCard
                  {...t}
                  ctaHref="#enquire"
                  subscribe={(() => {
                    // Subscribe buttons only appear once Paystack + the billing database are set up
                    const pl = paystackConfigured() && billingDbConfigured() ? planFor(service.slug, t.tier) : undefined;
                    return pl ? { planKey: pl.key, planName: pl.name, amountRand: pl.amountRand } : undefined;
                  })()}
                />
              </AnimateIn>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">Prices exclude VAT where applicable and third-party costs such as ad spend, domains or paid software.</p>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-24 py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <AnimateIn>
              <span className="section-label"><MessageSquareText className="h-3.5 w-3.5" /> {service.title} enquiry</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-4xl text-balance">
                Get a tailored {service.title.toLowerCase()} quote
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tell us a little about your practice and goals. We&apos;ll come back within one business day with recommendations and a clear quote.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Clock, t: "Reply within 1 business day" },
                  { icon: ShieldCheck, t: "No obligation, no lock-in contracts" },
                  { icon: CheckCircle2, t: "Advice specific to your speciality and area" },
                ].map(({ icon: Icon, t }) => (
                  <li key={t} className="flex items-center gap-3 text-foreground">
                    <span className="icon-tile h-10 w-10 text-secondary"><Icon className="h-5 w-5" /></span> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`${SITE.whatsappUrl}?text=${encodeURIComponent(`Hi REGC Digital, I'm interested in ${service.title}.`)}`} target="_blank" rel="noopener noreferrer" className="btn border border-[#25D366]/40 bg-[#25D366]/10 text-foreground hover:bg-[#25D366]/20">
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp instead
                </a>
                <a href={`tel:${SITE.phoneIntl}`} className="btn-secondary"><Phone className="h-4 w-4" /> {SITE.phone}</a>
              </div>
            </AnimateIn>
            <AnimateIn delay={100}>
              <InquiryForm
                variant="service"
                source={`service-${service.slug}`}
                service={{ title: service.title, slug: service.slug, packages: service.tiers.map((t) => `${t.name} (${t.price})`) }}
              />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {x?.faqs && (
        <section className="section-tint py-16 md:py-24">
          <div className="container max-w-3xl px-4">
            <AnimateIn className="mb-10 text-center">
              <span className="section-label">FAQ</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-4xl">{service.title} questions</h2>
            </AnimateIn>
            <div className="space-y-3">
              {x.faqs.map((f, i) => (
                <details key={f.q} className="card group overflow-hidden" open={i === 0}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 md:p-6">
                    <h3 className="font-display text-base font-semibold text-foreground md:text-lg">{f.q}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg text-secondary transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-5 pb-6 leading-relaxed text-muted-foreground md:px-6">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          {posts.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl">Helpful reading</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {posts.map((p) => p && (
                  <Link key={p.slug} href={`/blog/${p.slug}/`} className="card card-hover group p-6">
                    <span className="text-3xl">{p.heroEmoji}</span>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-secondary">{p.category}</p>
                    <h3 className="mt-1.5 font-display font-bold leading-snug text-foreground group-hover:text-secondary transition-colors">{p.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl">Works well with</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}/`} className="card card-hover group flex items-start gap-4 p-6">
                <span className="icon-tile h-11 w-11 shrink-0 text-secondary"><ServiceIcon slug={r.slug} className="h-5 w-5" /></span>
                <span>
                  <span className="block font-display font-bold text-foreground group-hover:text-secondary transition-colors">{r.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{r.tagline}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
