/** Rand formatting helpers (amounts are stored in cents). */
export const toCents = (rand: number) => Math.round(rand * 100);

export function rand(cents: number, opts: { decimals?: boolean } = {}) {
  const decimals = opts.decimals ?? true;
  const value = cents / 100;
  return "R" + value.toLocaleString("en-US", {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  }).replace(/ /g, " ");
}

export function sumItems(items: { amount_cents: number }[]) {
  return items.reduce((t, i) => t + i.amount_cents, 0);
}

export function fmtDate(d: string | Date | null | undefined) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Johannesburg" });
}
