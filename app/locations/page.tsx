import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { provinces, cities, locations } from "@/data/locations";
import { breadcrumbList, itemList } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Healthcare Marketing Locations | REGC Digital",
  description: "Specialist healthcare marketing across South Africa — from Johannesburg and Cape Town to Bloemfontein, Polokwane and beyond. Find your city or province.",
  alternates: { canonical: "/locations/" },
  openGraph: { url: "/locations/" },
};

const jsonLd = [
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations/" },
  ]),
  itemList(locations, (l) => ({
    name: l.name,
    url: `/healthcare-marketing-${l.slug}/`,
    description: l.intro,
  })),
];

export default function LocationsPage() {
  const grouped = provinces.map((p) => ({
    province: p,
    cities: cities.filter((c) => c.region === p.region),
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Healthcare Marketing Across South Africa</h1>
          <p className="text-lg text-primary-foreground/85">Specialist digital marketing for medical practices in {cities.length} cities across {provinces.length} provinces.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-4 space-y-12">
          {grouped.map(({ province, cities: provinceCities }) => (
            <div key={province.slug}>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <Link href={`/healthcare-marketing-${province.slug}/`} className="font-display text-2xl font-bold text-foreground hover:text-secondary transition-colors flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" /> {province.name}
                </Link>
                <Link href={`/healthcare-marketing-${province.slug}/`} className="text-sm text-secondary font-semibold hover:underline">View province →</Link>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{province.intro}</p>
              {provinceCities.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {provinceCities.map((c) => (
                    <Link key={c.slug} href={`/healthcare-marketing-${c.slug}/`} className="bg-card border border-border rounded-lg px-4 py-3 hover:border-secondary hover:shadow-md transition-all">
                      <p className="font-display font-semibold text-foreground text-sm">{c.name}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
