import { Link } from "react-router-dom";
import { domains } from "@/data/domains";
import SEO from "@/components/SEO";

const Domains = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Healthcare Industries We Serve",
    description:
      "Digital marketing for every regulated South African health profession — medical, nursing, pharmacy, allied health, traditional and more.",
    url: "https://regcdigital.co.za/domains/",
    hasPart: domains.map((d) => ({
      "@type": "WebPage",
      name: d.fullName,
      url: `https://regcdigital.co.za/domains/${d.slug}/`,
    })),
  };

  return (
    <>
      <SEO
        title="Healthcare Industries We Serve | REGC Digital South Africa"
        description="Specialist digital marketing for every regulated South African health profession — HPCSA, SANC, SAPC, AHPCSA, SADTC and Traditional Health Practitioners."
        path="/domains"
        jsonLd={jsonLd}
      />

      <header className="hero-gradient text-primary-foreground py-20">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-4">
            Industries We Serve
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Digital Marketing for Every South African Health Profession
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
            We build compliant, conversion-focused digital marketing for practitioners regulated by the
            HPCSA, SANC, SAPC, AHPCSA, SADTC and the Interim Traditional Health Practitioners Council.
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((d) => (
              <Link
                key={d.slug}
                to={`/domains/${d.slug}`}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl mb-4">{d.emoji}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                  {d.regulator}
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {d.shortName}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-3">{d.fullName}</p>
                <p className="mt-4 text-sm font-semibold text-primary">View industry page →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Domains;