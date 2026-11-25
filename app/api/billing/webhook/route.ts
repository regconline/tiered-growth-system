import { NextResponse } from "next/server";
import { validSignature } from "@/lib/billing/paystack";
import { processCharge } from "@/lib/billing/service";

/**
 * Paystack webhook — set in Paystack: Settings → API Keys & Webhooks →
 * Webhook URL: https://www.regcdigital.co.za/api/billing/webhook/
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("x-paystack-signature"))) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let event: { event?: string; data?: { reference?: string; customer?: { email?: string }; subscription_code?: string } };
  try { event = JSON.parse(raw); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }

  try {
    switch (event.event) {
      case "charge.success": {
        const ref = event.data?.reference;
        if (ref) {
          const r = await processCharge(ref);
          if (!r.ok) console.warn("[billing] charge not processed", ref, r.reason);
        }
        break;
      }
      case "invoice.payment_failed":
      case "subscription.not_renew":
      case "subscription.disable":
        console.warn("[billing] subscription event", event.event, event.data?.customer?.email, event.data?.subscription_code);
        break;
      default:
        break;
    }
  } catch (e) {
    // 500 makes Paystack retry later; processing is idempotent so retries are safe
    console.error("[billing] webhook error", e);
    return NextResponse.json({ error: "processing failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
