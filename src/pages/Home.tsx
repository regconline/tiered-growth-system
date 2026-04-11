import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <header className="hero-gradient text-primary-foreground py-20 md:py-32">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-4">
            Healthcare Digital Marketing
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
            Grow Your Medical<br />Practice Digitally
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            We help healthcare professionals attract more patients, build trust online, and scale their practice with proven digital marketing strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-flex items-center gap-2"
            >
              Our Services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/20 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </header>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Healthcare Practices Choose Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize exclusively in healthcare digital marketing — we understand your patients, your compliance requirements, and your growth goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Healthcare Focused", desc: "100% focused on medical and healthcare practices. We understand HPCSA, POPIA, and patient privacy." },
              { title: "Results-Driven", desc: "Every service is designed to deliver measurable patient growth, not just vanity metrics." },
              { title: "Tiered Pricing", desc: "Start with what you need. Scale up as you grow. No lock-in contracts, transparent pricing." },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              10 specialized services designed for healthcare practices. Each available in Basic, Standard, and Premium tiers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceDetails.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-secondary/50 transition-all"
              >
                <span className="text-3xl mb-3 block">{service.icon}</span>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{service.tagline}</p>
                <span className="text-sm font-semibold text-secondary inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Packages CTA */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            🚀 Ready to Grow Your Practice?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Combine services into monthly packages starting at R5,000/mo.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="rounded-lg border-2 tier-basic-border px-6 py-3 font-display font-bold">R5k/mo Starter</div>
            <div className="rounded-lg border-2 tier-standard-border px-6 py-3 font-display font-bold">R10k/mo Growth</div>
            <div className="rounded-lg border-2 tier-premium-border px-6 py-3 font-display font-bold">R20k/mo Authority</div>
          </div>
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            Contact Us Today <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
