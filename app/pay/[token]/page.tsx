import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, CheckCircle2, FileDown, AlertCircle, CreditCard, Landmark } from "lucide-react";
import { db, billingDbConfigured } from "@/lib/billing/db";
import { rand, fmtDate } from "@/lib/billing/money";
import { BUSINESS } from "@/data/billing";
import { LogoMark } from "@/components/Logo";
import { SITE } from "@/data/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Pay invoice", robots: { index: false, follow: false } };

export default async function PayPage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ error?: string }> }) {
  const { token } = await params;
  const { error } = await searchParams;
  if (!billingDbConfigured() || !/^[A-Za-z0-9_-]{20,64}$/.test(token)) notFound();
  const inv = await db.getByToken(token);
  if (!inv) notFound();
  const paid = inv.status === "paid";
  const pdfHref = `/api/billing/invoice-pdf/?t=${encodeURIComponent(token)}`;

  return (
    <section className="section-tint min-h-[70vh] py-14 md:py-20">
      <div className="container max-w-xl px-4">
        <div className="card overflow-hidden">
          <div className="hero-gradient flex items-center justify-between gap-4 px-6 py-5">
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" alt="REGC Digital" />
              <div>
                <p className="font-display font-bold text-white">REGC Digital</p>
                <p className="text-xs text-white/60">Invoice {inv.number}</p>
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${paid ? "bg-[#25D366] text-white" : inv.status === "void" ? "bg-white/20 text-white" : "bg-white text-[#c4317a]"}`}>
              {paid ? "Paid" : inv.status === "void" ? "Cancelled" : "Due"}
            </span>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-sm text-muted-foreground">Billed to</p>
            <p className="font-semibold text-foreground">{inv.client_name}{inv.practice ? ` · ${inv.practice}` : ""}</p>
            <p className="text-sm text-muted-foreground">{inv.client_email}</p>

            <ul className="mt-6 divide-y border-y">
              {inv.items.map((i, n) => (
                <li key={n} className="flex items-start justify-between gap-4 py-3 text-sm">
                  <span className="text-foreground/85">{i.description}</span>
                  <span className="whitespace-nowrap font-medium text-foreground">{rand(i.amount_cents)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-display font-bold text-foreground">{paid ? "Total paid" : "Total due"}</span>
              <span className="font-display text-3xl font-extrabold text-foreground">{rand(inv.amount_cents)}</span>
            </div>
            {!paid && inv.due_date && <p className="mt-1 text-right text-xs text-muted-foreground">Due {fmtDate(inv.due_date)}</p>}

            {error && (
              <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
              </p>
            )}

            {paid ? (
              <div className="mt-8 rounded-2xl bg-[#25D366]/10 p-5 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-[#1fa855]" />
                <p className="mt-2 font-semibold text-foreground">Paid on {fmtDate(inv.paid_at)} — thank you!</p>
              </div>
            ) : inv.status === "unpaid" ? (
              <form action="/api/billing/pay/" method="post" className="mt-8">
                <input type="hidden" name="token" value={token} />
                <button type="submit" className="btn-primary w-full !py-4 text-base">
                  <Lock className="h-4 w-4" /> Pay {rand(inv.amount_cents)} securely
                </button>
                <p className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><CreditCard className="h-3.5 w-3.5" /> Card</span>
                  <span className="inline-flex items-center gap-1"><Landmark className="h-3.5 w-3.5" /> Instant EFT</span>
                  <span>Secured by Paystack</span>
                </p>
                {BUSINESS.bankDetails && <p className="mt-4 text-center text-xs text-muted-foreground">Prefer a manual EFT? {BUSINESS.bankDetails} — reference {inv.number}.</p>}
              </form>
            ) : null}

            <div className="mt-6 flex items-center justify-between border-t pt-5 text-sm">
              <a href={pdfHref} className="inline-flex items-center gap-1.5 font-semibold text-secondary hover:underline underline-offset-4">
                <FileDown className="h-4 w-4" /> Download PDF
              </a>
              <a href={`${SITE.whatsappUrl}?text=${encodeURIComponent(`Hi REGC Digital, I have a question about invoice ${inv.number}.`)}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                Questions? WhatsApp us
              </a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By paying you agree to our <Link href="/terms/" className="underline">terms</Link> and <Link href="/refund-policy/" className="underline">refund policy</Link>.
        </p>
      </div>
    </section>
  );
}
