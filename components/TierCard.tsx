import { Check, ArrowRight } from "lucide-react";
import SubscribeButton from "@/components/SubscribeButton";

type TierLevel = "basic" | "standard" | "premium";

interface Props {
  tier: TierLevel;
  name: string;
  price: string;
  includes: string[];
  result?: string;
  /** anchor for the enquiry CTA (e.g. "#enquire") */
  ctaHref?: string;
  /** fixed-price monthly packages can be bought online */
  subscribe?: { planKey: string; planName: string; amountRand: number };
}

const config = {
  basic: { label: "Essential", badge: "tier-basic-badge", border: "tier-basic-border", bg: "tier-basic-bg" },
  standard: { label: "Most popular", badge: "tier-standard-badge", border: "tier-standard-border", bg: "tier-standard-bg" },
  premium: { label: "Premium", badge: "tier-premium-badge", border: "tier-premium-border", bg: "tier-premium-bg" },
} as const;

export default function TierCard({ tier, name, price, includes, result, ctaHref, subscribe }: Props) {
  const c = config[tier];
  const featured = tier === "standard";
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border-2 bg-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 ${c.border} ${
        featured ? "shadow-[0_30px_60px_-30px_hsl(var(--secondary)/0.55)] md:-translate-y-2 md:hover:-translate-y-3.5" : "hover:shadow-xl"
      }`}
    >
      <div className={`${c.bg} px-6 pb-5 pt-6`}>
        <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${c.badge}`}>{c.label}</span>
        <h3 className="mt-4 font-display text-xl font-bold text-foreground">{name}</h3>
        <p className="mt-2 font-display text-2xl font-extrabold text-foreground">{price}</p>
      </div>
      <div className="flex flex-1 flex-col px-6 py-6">
        <ul className="flex-1 space-y-3">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                <Check className="h-3.5 w-3.5 text-secondary" strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {result && (
          <p className="mt-6 rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground">
            <span className="text-secondary">Outcome:</span> {result}
          </p>
        )}
        {subscribe && <div className="mt-6"><SubscribeButton {...subscribe} featured={featured} /></div>}
        {ctaHref && (
          <a href={ctaHref} data-package={name} className={`w-full ${subscribe ? "mt-3 btn-secondary" : `mt-6 ${featured ? "btn-primary" : "btn-secondary"}`}`}>
            {subscribe ? "Get a custom quote" : <>Enquire about {name}</>} <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
