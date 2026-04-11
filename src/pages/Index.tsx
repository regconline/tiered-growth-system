import HeroSection from "@/components/HeroSection";
import ServiceSection from "@/components/ServiceSection";
import { services } from "@/data/services";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <main className="container max-w-6xl mx-auto px-4">
        {services.map((service, i) => (
          <ServiceSection
            key={i}
            icon={service.icon}
            number={i + 1}
            title={service.title}
            tiers={service.tiers}
          />
        ))}
        <section className="py-16 text-center border-t border-border">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            🚀 Ready to Grow Your Practice?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Combine services into monthly packages starting at R5,000/mo. Upsell easily, position professionally, and close higher-value clients.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="rounded-lg border-2 tier-basic-border px-6 py-3 font-display font-bold">
              R5k/mo Starter
            </div>
            <div className="rounded-lg border-2 tier-standard-border px-6 py-3 font-display font-bold">
              R10k/mo Growth
            </div>
            <div className="rounded-lg border-2 tier-premium-border px-6 py-3 font-display font-bold">
              R20k/mo Authority
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        Healthcare Digital Marketing — Tiered Services Guide
      </footer>
    </div>
  );
};

export default Index;
