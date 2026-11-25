/**
 * Billing settings — edit these to match your business.
 *
 * SUBSCRIBE PRICES: each monthly package below gets a "Subscribe" button on its
 * service page and is billed automatically every month through Paystack.
 * Amounts are in rand. They default to the starting ("from") price of each range
 * on the pricing cards — change them to the exact monthly price you want to charge,
 * or set `enabled: false` to show only "Get a quote" for that package.
 */

export const BUSINESS = {
  name: "REGC Digital",
  email: "info@regcdigital.co.za",
  phone: "064 082 6855",
  website: "www.regcdigital.co.za",
  /** optional lines shown on invoices — fill in when ready */
  registrationNumber: "", // CIPC number, e.g. "2024/123456/07"
  vatNumber: "",          // leave empty if not VAT-registered (invoice says "INVOICE", no VAT line)
  address: "",            // e.g. "Wolmaransstad, North West, South Africa"
  /** shown on unpaid invoices as an alternative to paying online (optional) */
  bankDetails: "",        // e.g. "FNB · Acc 123456789 · Branch 250655 · Ref: invoice number"
  paymentTermsDays: 7,
};

export const VAT_RATE = 0.15;

export interface SubscribePlan {
  key: string;            // `${serviceSlug}:${tier}`
  serviceSlug: string;
  tier: "basic" | "standard" | "premium";
  name: string;           // shown on checkout and invoices
  amountRand: number;     // charged monthly
  enabled: boolean;
}

const p = (serviceSlug: string, tier: SubscribePlan["tier"], name: string, amountRand: number, enabled = true): SubscribePlan => ({
  key: `${serviceSlug}:${tier}`,
  serviceSlug,
  tier,
  name,
  amountRand,
  enabled,
});

export const SUBSCRIBE_PLANS: SubscribePlan[] = [
  p("seo-services", "basic", "SEO — Local Visibility", 2500),
  p("seo-services", "standard", "SEO — Search Growth", 5000),
  p("seo-services", "premium", "SEO — Authority SEO", 10000),
  p("social-media", "basic", "Social Media — Presence", 3000),
  p("social-media", "standard", "Social Media — Engagement", 6000),
  p("social-media", "premium", "Social Media — Authority & Growth", 12000),
  p("content-marketing", "basic", "Content — Starter", 2000),
  p("content-marketing", "standard", "Content — Growth", 4000),
  p("content-marketing", "premium", "Content — Authority", 7000),
  p("reputation-management", "basic", "Reputation — Monitor", 1500),
  p("reputation-management", "standard", "Reputation — Respond & Grow", 3000),
  p("reputation-management", "premium", "Reputation — Full Management", 5000),
  p("analytics-reporting", "standard", "Analytics — Monthly Insights", 1500),
  p("analytics-reporting", "premium", "Analytics — Data-Driven", 3000),
  p("conversion-optimization", "basic", "Conversion — Quick Wins", 2000),
  p("conversion-optimization", "standard", "Conversion — Funnel Builder", 4000),
  p("conversion-optimization", "premium", "Conversion — Full Conversion Engine", 7000),
];

export function getPlan(key: string): SubscribePlan | undefined {
  return SUBSCRIBE_PLANS.find((x) => x.key === key && x.enabled);
}

export function planFor(serviceSlug: string, tier: string): SubscribePlan | undefined {
  return getPlan(`${serviceSlug}:${tier}`);
}
