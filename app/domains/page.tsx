import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { domains } from "@/data/domains";
import { breadcrumbList, itemList } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Healthcare Specialities We Serve | REGC Digital",
  description: "Specialised digital marketing for GPs, dentists, dermatologists, paediatricians, physiotherapists and more across South Africa.",
  alternates: { canonical: "/domains/" },
  openGraph: { url: "/domains/" },
};

const jsonLd = [
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/domains/" },
  ]),
  itemList(domains, (d) => ({
    name: d.fullName,
    url: `/domains/${d.slug}/`,
    description: d.heroSubheading,
  })),
];

export default function DomainsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Healthcare Specialities</h1>
          <p className="text-lg text-primary-foreground/85">Tailored marketing strategies for {domains.length} medical specialities.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((d) => (
              <Link key={d.slug} href={`/domains/${d.slug}/`} className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-secondary transition-all flex flex-col">
                <div className="text-4xl mb-3">{d.emoji}</div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">{d.fullName}</h2>
                <p className="text-sm text-muted-foreground flex-1">{d.heroSubheading}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
