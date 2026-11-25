import { SITE } from "@/data/site";

/** Public base URL for payment links and Paystack callbacks (override for local testing). */
export const siteBase = () => (process.env.BILLING_SITE_URL || SITE.url).replace(/\/$/, "");
