import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import ServiceSection from "@/components/ServiceSection";

const Services = () => {
  return (
    <div>
      {/* Hero */}
      <header className="hero-gradient text-primary-foreground py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
            Our Services
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-6">
            10 specialized digital marketing services for healthcare practices. Each with clear Basic, Standard, and Premium tiers.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="tier-basic-badge px-4 py-1.5 rounded-full text-sm font-semibold">🟢 Basic</span>
            <span className="tier-standard-badge px-4 py-1.5 rounded-full text-sm font-semibold">🟡 Standard</span>
            <span className="tier-premium-badge px-4 py-1.5 rounded-full text-sm font-semibold">🔴 Premium</span>
          </div>
        </div>
      </header>

      {/* Service Links */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {serviceDetails.map((s, i) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="text-sm px-3 py-1.5 rounded-full border border-border bg-card text-foreground hover:border-secondary hover:text-secondary transition-colors"
              >
                {s.icon} {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <main className="container max-w-6xl mx-auto px-4">
        {serviceDetails.map((service, i) => (
          <div key={service.slug}>
            <ServiceSection
              icon={service.icon}
              number={i + 1}
              title={service.title}
              tiers={service.tiers}
            />
            <div className="pb-4">
              <Link
                to={`/services/${service.slug}`}
                className="text-sm font-semibold text-secondary inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                View full details <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}

        {/* CTA */}
        <section className="py-16 text-center border-t border-border">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            🚀 Ready to Grow Your Practice?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Combine services into monthly packages starting at R5,000/mo.
          </p>
          <Link
            to="/contact"
            className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Services;
