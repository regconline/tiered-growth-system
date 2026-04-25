import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { locations, cities, provinces, getLocationKeywords } from "@/data/locations";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import { SITE } from "@/data/site";

export function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const loc = locations.find((l) => l.slug === location);
  if (!loc) return {};

  const keywords = getLocationKeywords(loc.slug);
  const isProvince = loc.type === "province";
  const provinceName = isProvince ? loc.name : (loc.province ?? loc.region);
  const description = isProvince
    ? `Specialist healthcare digital marketing across ${loc.name} — HPCSA-aligned websites, SEO, Google Ads, social media and reputation management for doctors, dentists, physios and allied health professionals.`
    : `Healthcare digital marketing for medical practices in ${loc.name}, ${provinceName} — HPCSA-aligned websites, SEO, Google Ads and patient acquisition campaigns built for ${loc.name} doctors and specialists.`;

  const pageTitle = `Healthcare Marketing in ${loc.name}`;
  return {
    title: pageTitle,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: `/healthcare-marketing-${loc.slug}/` },
    openGraph: {
      title: `${pageTitle} | REGC Digital`,
      description,
      url: `/healthcare-marketing-${loc.slug}/`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const loc = locations.find((l) => l.slug === location);
  if (!loc) notFound();

  const path = `/healthcare-marketing-${loc.slug}/`;
  const featuredServices = serviceDetails.slice(0, 6);
  const sameRegion = cities.filter((c) => c.region === loc.region && c.slug !== loc.slug).slice(0, 6);
  const otherProvinces = provinces.filter((p) => p.slug !== loc.slug).slice(0, 5);
  const isProvince = loc.type === "province";

  // areaServed lists the province + the relevant city/cities so Google can
  // associate this page with the correct local market.
  const areaServed = isProvince
    ? [
        { "@type": "AdministrativeArea", name: loc.name },
        ...cities
          .filter((c) => c.region === loc.region)
          .map((c) => ({ "@type": "City", name: c.name })),
      ]
    : [
        { "@type": "AdministrativeArea", name: loc.province ?? loc.region },
        { "@type": "City", name: loc.name },
      ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": new URL(path, SITE.url).toString() + "#localbusiness",
      name: `${SITE.name} — ${loc.name}`,
      url: new URL(path, SITE.url).toString(),
      telephone: SITE.phoneIntl,
      email: SITE.email,
      priceRange: "$$",
      description: isProvince
        ? `Healthcare digital marketing agency serving doctors, dentists, physios and allied health professionals across ${loc.name}, South Africa.`
        : `Healthcare digital marketing agency serving ${loc.name} and the wider ${loc.province ?? loc.region} province.`,
      areaServed,
      serviceType: [
        "Healthcare Marketing",
        "Medical SEO",
        "Healthcare Website Design",
        "Patient Acquisition",
        "Google Ads for Doctors",
        "Healthcare Content Marketing",
      ],
      address: { "@type": "PostalAddress", addressRegion: loc.region, addressCountry: "ZA" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Locations", item: new URL("/locations/", SITE.url).toString() },
        { "@type": "ListItem", position: 3, name: loc.name, item: new URL(path, SITE.url).toString() },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <nav className="text-sm text-primary-foreground/70 mb-4">
            <Link href="/locations/" className="hover:text-primary-foreground">← All Locations</Link>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-secondary" />
            <span className="text-sm uppercase tracking-wider text-primary-foreground/70">{loc.type === "province" ? "Province" : "City"} · {loc.region}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">Healthcare Marketing in {loc.name}</h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl">{loc.intro}</p>
          {loc.population && <p className="text-sm text-primary-foreground/60 mt-3">{loc.population}</p>}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">The {loc.name} medical landscape</h2>
              <p className="text-foreground leading-relaxed mb-4">{loc.medicalContext}</p>
              <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Why local matters in {loc.name}</h3>
              <p className="text-foreground leading-relaxed">{loc.whyLocal}</p>
            </div>
            <aside className="bg-card border border-border rounded-2xl p-6 h-fit">
              <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" /> Areas we serve
              </h3>
              <ul className="space-y-2">
                {loc.areas.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-secondary" /><span>{a}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Our services for {loc.name} practices</h2>
            <p className="text-muted-foreground mb-6">Every service below is delivered with {loc.name}-specific local SEO, geo-targeted ads, and patient demographics in mind.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}/`} className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-secondary transition-all">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <h3 className="font-display font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{s.tagline}</p>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-sm">
              <Link href="/services/" className="text-secondary font-semibold hover:underline inline-flex items-center gap-1">
                See all services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Specialities we serve in {loc.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {domains.slice(0, 8).map((d) => (
                <Link key={d.slug} href={`/domains/${d.slug}/`} className="bg-card border border-border rounded-lg p-3 text-center hover:border-secondary transition-colors">
                  <div className="text-2xl mb-1">{d.emoji}</div>
                  <p className="text-xs font-semibold text-foreground">{d.shortName}</p>
                </Link>
              ))}
            </div>
          </div>

          {sameRegion.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">Other {loc.region} locations</h2>
              <div className="flex flex-wrap gap-2">
                {sameRegion.map((c) => (
                  <Link key={c.slug} href={`/healthcare-marketing-${c.slug}/`} className="text-sm bg-card border border-border rounded-full px-4 py-1.5 hover:border-secondary transition-colors">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {loc.type === "city" && (
            <div className="mb-12">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">Browse by province</h2>
              <div className="flex flex-wrap gap-2">
                {otherProvinces.map((p) => (
                  <Link key={p.slug} href={`/healthcare-marketing-${p.slug}/`} className="text-sm bg-card border border-border rounded-full px-4 py-1.5 hover:border-secondary transition-colors">
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 hero-gradient text-primary-foreground">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Grow your {loc.name} practice with REGC Digital</h2>
          <p className="text-primary-foreground/85 mb-6">Book a free, no-obligation consultation tailored to {loc.name}'s patient market.</p>
          <Link href="/contact/" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
            Book a free consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
