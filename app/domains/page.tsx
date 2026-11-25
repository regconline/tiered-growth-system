import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { domains } from "@/data/domains";
import { itemList, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import JsonLd from "@/components/JsonLd";
import { DomainIcon } from "@/components/ServiceIcon";

export const metadata: Metadata = pageMetadata({
  title: "Healthcare Industries & Specialities We Market",
  description:
    "Specialised digital marketing for doctors, dentists, nurses, pharmacies, physiotherapists, psychologists, optometrists and more across South Africa — aligned with each council's rules.",
  path: "/domains/",
});

export default function DomainsPage() {
  return (
    <>
      <JsonLd data={itemList(domains, (d) => ({ name: d.fullName, url: `/domains/${d.slug}/`, description: d.heroSubheading }))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Industries", path: "/domains/" }]}
        eyebrow="Industries"
        title={<>Marketing for every <span className="text-gradient-hero">healthcare speciality</span></>}
        subtitle={`Tailored strategies for ${domains.length} healthcare professions — each aligned with its regulator's advertising rules and patient journey.`}
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {domains.map((d, i) => (
              <AnimateIn key={d.slug} delay={(i % 3) * 70} className="h-full">
                <Link href={`/domains/${d.slug}/`} className="card card-hover group flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="icon-tile h-12 w-12 text-secondary transition-transform group-hover:scale-110"><DomainIcon slug={d.slug} className="h-6 w-6" /></span>
                    <span className="chip">{d.regulator}</span>
                  </div>
                  <h2 className="mt-5 font-display text-lg font-bold text-foreground group-hover:text-secondary transition-colors">{d.fullName}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{d.heroSubheading}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
