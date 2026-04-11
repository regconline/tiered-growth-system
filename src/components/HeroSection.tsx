const HeroSection = () => {
  return (
    <header className="hero-gradient text-primary-foreground py-20 md:py-28">
      <div className="container max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-4">
          Healthcare Digital Marketing
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
          Tiered Services &<br />Pricing Guide
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Clear tiers. Clear pricing. Clear outcomes. Choose Basic, Standard, or Premium for each service — and scale as your practice grows.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="tier-basic-badge px-4 py-1.5 rounded-full text-sm font-semibold">🟢 Basic</span>
          <span className="tier-standard-badge px-4 py-1.5 rounded-full text-sm font-semibold">🟡 Standard</span>
          <span className="tier-premium-badge px-4 py-1.5 rounded-full text-sm font-semibold">🔴 Premium</span>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
