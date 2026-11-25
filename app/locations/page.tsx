import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { provinces, cities, locations } from "@/data/locations";
import { itemList, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Healthcare Marketing Locations Across South Africa",
  description:
    "Specialist healthcare marketing in all nine provinces — Johannesburg, Pretoria, Cape Town, Durban, Gqeberha, Bloemfontein, Polokwane, Mbombela and more. Find your city.",
  path: "/locations/",
});

export default function LocationsPage() {
  const grouped = provinces.map((p) => ({ province: p, cities: cities.filter((c) => c.region === p.region) }));

  return (
    <>
      <JsonLd data={itemList(locations, (l) => ({ name: l.name, url: `/healthcare-marketing-${l.slug}/`, description: l.intro }))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }]}
        eyebrow={<><MapPin className="h-3.5 w-3.5" /> Locations</>}
        title={<>Healthcare marketing <span className="text-gradient-hero">across South Africa</span></>}
        subtitle={`Local strategies for medical practices in ${cities.length} cities and towns across all ${provinces.length} provinces.`}
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <nav aria-label="Jump to province" className="mb-12 flex flex-wrap gap-2">
            {provinces.map((p) => (
              <a key={p.slug} href={`#${p.slug}`} className="chip !px-4 !py-2 text-sm hover:border-secondary/50 hover:text-foreground">{p.name}</a>
            ))}
          </nav>
          <div className="space-y-6">
            {grouped.map(({ province, cities: list }) => (
              <AnimateIn key={province.slug}>
                <div id={province.slug} className="card scroll-mt-28 p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-2xl">
                      <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
                        <MapPin className="h-5 w-5 text-secondary" /> {province.name}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">{province.intro}</p>
                    </div>
                    <Link href={`/healthcare-marketing-${province.slug}/`} className="btn-secondary !py-2.5">
                      {province.name} hub <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  {list.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
                      {list.map((c) => (
                        <Link key={c.slug} href={`/healthcare-marketing-${c.slug}/`} className="group flex items-center justify-between rounded-xl border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-secondary/50 hover:text-secondary">
                          {c.name} <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
