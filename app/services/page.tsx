import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { breadcrumbList, itemList } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Healthcare Marketing Services | REGC Digital",
  description: "Full-service healthcare digital marketing: websites, SEO, Google Ads, social media, reputation, photography and more — built for South African medical practices.",
  alternates: { canonical: "/services/" },
  openGraph: { url: "/services/" },
};

const jsonLd = [
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
  ]),
  itemList(serviceDetails, (s) => ({
    name: s.title,
    url: `/services/${s.slug}/`,
    description: s.tagline,
  })),
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-primary-foreground/85">Pick a single service or combine them into a complete digital partnership.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceDetails.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-secondary transition-all flex flex-col">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">{s.title}</h2>
                <p className="text-sm text-muted-foreground flex-1">{s.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                  View packages <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
