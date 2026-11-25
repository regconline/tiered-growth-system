import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { itemList, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import JsonLd from "@/components/JsonLd";
import { ServiceIcon } from "@/components/ServiceIcon";

export const metadata: Metadata = pageMetadata({
  title: "Healthcare Marketing Services & Pricing",
  description:
    "Medical websites, SEO, social media, content, reviews, patient communication, analytics, compliance, branding and conversion optimisation for South African practices — with transparent rand pricing.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={itemList(serviceDetails, (s) => ({ name: s.title, url: `/services/${s.slug}/`, description: s.tagline }))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }]}
        eyebrow="Services"
        title={<>Healthcare marketing services, <span className="text-gradient-hero">done properly</span></>}
        subtitle="Pick a single service or combine them into a complete digital partnership. Every package is built for South African practices and priced transparently in rand."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {serviceDetails.map((s, i) => {
              const from = s.tiers[0]?.price.split("–")[0].trim();
              return (
                <AnimateIn key={s.slug} delay={(i % 2) * 80} className="h-full">
                  <Link href={`/services/${s.slug}/`} className="card card-hover group flex h-full flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="icon-tile h-12 w-12 text-secondary transition-transform group-hover:scale-110"><ServiceIcon slug={s.slug} className="h-6 w-6" /></span>
                      {from && <span className="chip">From {from}</span>}
                    </div>
                    <h2 className="mt-5 font-display text-xl font-bold text-foreground group-hover:text-secondary transition-colors">{s.title}</h2>
                    <p className="mt-2 text-muted-foreground">{s.tagline}</p>
                    <ul className="mt-5 grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
                      {s.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> {f}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                      Details, pricing &amp; enquiry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </AnimateIn>
              );
            })}
          </div>

          <AnimateIn className="card mt-14 flex flex-col items-center justify-between gap-6 p-8 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Not sure where to start?</h2>
              <p className="mt-1 text-muted-foreground">Book a free consultation and we&apos;ll recommend the right mix for your practice and budget.</p>
            </div>
            <Link href="/contact/" className="btn-primary shrink-0">Get a recommendation <ArrowRight className="h-4 w-4" /></Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
