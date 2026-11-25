import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { checkoutInvoice, UserError } from "@/lib/billing/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Form POST from /pay/[token] → redirects the client to Paystack checkout. */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = String(form?.get("token") ?? "").slice(0, 100);
  const back = new URL(`/pay/${encodeURIComponent(token)}/`, req.url);
  const limit = rateLimit(`pay:${getClientIp(req)}`, 15, 10 * 60 * 1000);
  if (!limit.ok) { back.searchParams.set("error", "Too many attempts — please wait a few minutes."); return NextResponse.redirect(back, 303); }
  try {
    const url = await checkoutInvoice(token);
    return NextResponse.redirect(url, 303);
  } catch (e) {
    back.searchParams.set("error", e instanceof UserError ? e.message : "We couldn't open the payment page. Please try again.");
    if (!(e instanceof UserError)) console.error("[billing] checkout failed", e);
    return NextResponse.redirect(back, 303);
  }
}
