import { Check } from "lucide-react";

type TierLevel = "basic" | "standard" | "premium";

interface Props {
  tier: TierLevel;
  name: string;
  price: string;
  includes: string[];
  result?: string;
}

const tierConfig = {
  basic: { label: "Basic", badgeClass: "tier-basic-badge", borderClass: "tier-basic-border", bgClass: "tier-basic-bg" },
  standard: { label: "Standard", badgeClass: "tier-standard-badge", borderClass: "tier-standard-border", bgClass: "tier-standard-bg" },
  premium: { label: "Premium", badgeClass: "tier-premium-badge", borderClass: "tier-premium-border", bgClass: "tier-premium-bg" },
} as const;

export default function TierCard({ tier, name, price, includes, result }: Props) {
  const config = tierConfig[tier];
  return (
    <div className={`rounded-xl border-2 ${config.borderClass} bg-card overflow-hidden flex flex-col h-full transition-transform hover:scale-[1.02] hover:shadow-lg`}>
      <div className={`${config.bgClass} px-5 py-4`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${config.badgeClass}`}>{config.label}</span>
        </div>
        <h4 className="font-display text-lg font-bold text-foreground">{name}</h4>
        <p className="font-display text-xl font-bold text-primary mt-1">{price}</p>
      </div>
      <div className="px-5 py-4 flex-1 flex flex-col">
        <ul className="space-y-2 flex-1">
          {includes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {result && (
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-sm font-medium text-primary">👉 {result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
