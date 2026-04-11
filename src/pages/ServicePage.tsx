import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import TierCard from "@/components/TierCard";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceDetails.find((s) => s.slug === slug);
  const currentIndex = serviceDetails.findIndex((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const prevService = currentIndex > 0 ? serviceDetails[currentIndex - 1] : null;
  const nextService = currentIndex < serviceDetails.length - 1 ? serviceDetails[currentIndex + 1] : null;

  return (
    <div>
      {/* Hero */}
      <header className="hero-gradient text-primary-foreground py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <Link to="/services" className="inline-flex items-center gap-1 text-sm text-primary-foreground/60 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{service.icon}</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold">{service.title}</h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">{service.tagline}</p>
        </div>
      </header>

      {/* Description */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">What We Do</h2>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Why It Matters</h2>
              <p className="text-muted-foreground leading-relaxed">{service.whyItMatters}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">What's Included</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-lg border border-border p-4">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-secondary font-bold text-sm">{i + 1}</span>
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Our Process</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-bold">{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{step.step}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Pricing Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.tiers.map((t, i) => (
              <TierCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background text-center">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Interested in {service.title}?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let's discuss which tier is right for your practice.
          </p>
          <Link
            to="/contact"
            className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-flex items-center gap-2"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4 flex justify-between">
          {prevService ? (
            <Link to={`/services/${prevService.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> {prevService.title}
            </Link>
          ) : <span />}
          {nextService ? (
            <Link to={`/services/${nextService.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              {nextService.title} <ArrowRight className="w-3 h-3" />
            </Link>
          ) : <span />}
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
