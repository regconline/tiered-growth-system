import TierCard from "./TierCard";

interface Tier {
  tier: "basic" | "standard" | "premium";
  name: string;
  price: string;
  includes: string[];
  result?: string;
}

interface ServiceSectionProps {
  icon: string;
  number: number;
  title: string;
  tiers: Tier[];
}

const ServiceSection = ({ icon, number, title, tiers }: ServiceSectionProps) => {
  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">{icon}</span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          <span className="text-muted-foreground mr-2">{number}.</span>
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t, i) => (
          <TierCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
