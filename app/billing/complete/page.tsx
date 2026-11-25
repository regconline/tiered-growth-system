import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, FileDown } from "lucide-react";
import { processCharge } from "@/lib/billing/service";
import { billingDbConfigured } from "@/lib/billing/db";
import { paystackConfigured } from "@/lib/billing/paystack";
import { rand } from "@/lib/billing/money";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Payment status", robots: { index: false, follow: false } };

/** Paystack sends clients here after checkout (?reference=…). */
export default async function CompletePage({ searchParams }: { searchParams: Promise<{ reference?: string; trxref?: string }> }) {
  const sp = await searchParams;
  const reference = (sp.reference || sp.trxref || "").slice(0, 100);
  let result: Awaited<ReturnType<typeof processCharge>> | null = null;
  if (reference && paystackConfigured() && billingDbConfigured()) {
    try { result = await processCharge(reference); } catch (e) { console.error("[billing] complete page", e); }
  }
  const inv = result?.ok ? result.invoice : null;

  return (
    <section className="section-tint min-h-[70vh] py-16 md:py-24">
      <div className="container max-w-lg px-4">
        <div className="card p-8 text-center md:p-10">
          {inv ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/12">
                <CheckCircle2 className="h-9 w-9 text-[#1fa855]" />
              </div>
              <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground">
                {inv.kind === "subscription" ? "You're subscribed!" : "Payment received — thank you!"}
              </h1>
              <p className="mt-2 text-muted-foreground">
                We've received {rand(inv.amount_cents)}. Invoice <strong className="text-foreground">{inv.number}</strong> has been emailed to {inv.client_email}.
              </p>
              {inv.kind === "subscription" && <p className="mt-2 text-sm text-muted-foreground">Your package renews automatically each month — you'll get an invoice after every payment.</p>}
              {inv.pay_token && (
                <a href={`/api/billing/invoice-pdf/?t=${encodeURIComponent(inv.pay_token)}`} className="btn-secondary mt-6"><FileDown className="h-4 w-4" /> Download invoice</a>
              )}
            </>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground">We're confirming your payment</h1>
              <p className="mt-2 text-muted-foreground">
                If your payment went through, your invoice will arrive by email within a few minutes. If you cancelled, no money was taken.
              </p>
            </>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">Back to the website</Link>
            <Link href="/contact/" className="btn-secondary">Contact us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
