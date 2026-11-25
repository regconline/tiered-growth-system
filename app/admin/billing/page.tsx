import type { Metadata } from "next";
import { Lock, LogOut, CheckCircle2, AlertCircle, FileDown, Link2, Mail, Ban, CircleDollarSign } from "lucide-react";
import { isAdmin, adminConfigured } from "@/lib/billing/admin";
import { db, billingDbConfigured, type Invoice } from "@/lib/billing/db";
import { paystackConfigured, paystackMode } from "@/lib/billing/paystack";
import { emailConfigured } from "@/lib/billing/email";
import { rand, fmtDate } from "@/lib/billing/money";
import { siteBase } from "@/lib/billing/url";
import InvoiceForm from "@/components/admin/InvoiceForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Billing admin", robots: { index: false, follow: false } };

const KIND: Record<Invoice["kind"], string> = { deposit: "Deposit", balance: "Balance", once_off: "Once-off", subscription: "Subscription" };

function Status({ ok, label, hint }: { ok: boolean; label: string; hint: string }) {
  return (
    <div className={`flex items-start gap-2 rounded-xl border p-3 text-sm ${ok ? "border-[#25D366]/30 bg-[#25D366]/5" : "border-amber-500/30 bg-amber-500/5"}`}>
      {ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1fa855]" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />}
      <span><span className="font-semibold text-foreground">{label}</span><br /><span className="text-xs text-muted-foreground">{hint}</span></span>
    </div>
  );
}

export default async function BillingAdmin({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const sp = await searchParams;

  if (!(await isAdmin())) {
    return (
      <section className="section-tint min-h-[70vh] py-20">
        <div className="container max-w-sm px-4">
          <form action="/api/billing/admin/login/" method="post" className="card p-7">
            <Lock className="h-6 w-6 text-secondary" />
            <h1 className="mt-3 font-display text-xl font-bold text-foreground">Billing admin</h1>
            {!adminConfigured() ? (
              <p className="mt-3 text-sm text-muted-foreground">Set <code>BILLING_ADMIN_PASSWORD</code> (12+ characters) in Vercel to enable this page.</p>
            ) : (
              <>
                <label htmlFor="password" className="field-label mt-5">Password</label>
                <input id="password" name="password" type="password" required autoComplete="current-password" className="field" />
                {sp.error && <p role="alert" className="mt-3 text-sm text-destructive">{sp.error}</p>}
                <button className="btn-primary mt-5 w-full">Sign in</button>
              </>
            )}
          </form>
        </div>
      </section>
    );
  }

  const dbOk = billingDbConfigured();
  let invoices: Invoice[] = [];
  let dbError = "";
  if (dbOk) {
    try { invoices = await db.listInvoices(150); } catch (e) { dbError = (e as Error).message; }
  }
  const mode = paystackMode();
  const paidThisMonth = invoices
    .filter((i) => i.status === "paid" && i.paid_at && new Date(i.paid_at).getMonth() === new Date().getMonth() && new Date(i.paid_at).getFullYear() === new Date().getFullYear())
    .reduce((t, i) => t + i.amount_cents, 0);
  const outstanding = invoices.filter((i) => i.status === "unpaid").reduce((t, i) => t + i.amount_cents, 0);
  const balanceFor = new Set(invoices.filter((i) => i.kind === "balance" && i.parent_id).map((i) => i.parent_id));

  return (
    <section className="section-tint min-h-screen py-10 md:py-14">
      <div className="container max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-foreground">Billing</h1>
            <p className="text-sm text-muted-foreground">Invoices, deposits and subscriptions · Paystack {mode === "live" ? "LIVE" : mode === "test" ? "TEST MODE" : "not connected"}</p>
          </div>
          <form action="/api/billing/admin/logout/" method="post"><button className="btn-secondary !py-2"><LogOut className="h-4 w-4" /> Sign out</button></form>
        </div>

        {mode === "test" && <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-foreground"><strong>Test mode:</strong> no real money moves. Use Paystack test card 4084 0840 8408 4081, any future expiry, CVV 408.</p>}
        {sp.ok && <p role="status" className="mt-4 flex items-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-3 text-sm text-foreground"><CheckCircle2 className="h-4 w-4 text-[#1fa855]" /> {sp.ok}</p>}
        {(sp.error || dbError) && <p role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"><AlertCircle className="h-4 w-4" /> {sp.error || dbError}</p>}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Status ok={paystackConfigured()} label="Paystack" hint={paystackConfigured() ? `Connected (${mode})` : "Add PAYSTACK_SECRET_KEY"} />
          <Status ok={dbOk && !dbError} label="Database" hint={dbOk ? (dbError ? "Connection error" : "Connected") : "Add SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY"} />
          <Status ok={emailConfigured()} label="Invoice emails" hint={emailConfigured() ? (process.env.RESEND_FROM_EMAIL ? "Sending from your domain" : "Verify your domain in Resend to email clients") : "Add RESEND_API_KEY"} />
          <Status ok={paystackConfigured()} label="Webhook URL (paste in Paystack)" hint={`${siteBase()}/api/billing/webhook/`} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          <div className="card p-5"><p className="text-xs text-muted-foreground">Paid this month</p><p className="mt-1 font-display text-2xl font-extrabold text-foreground">{rand(paidThisMonth, { decimals: false })}</p></div>
          <div className="card p-5"><p className="text-xs text-muted-foreground">Outstanding</p><p className="mt-1 font-display text-2xl font-extrabold text-foreground">{rand(outstanding, { decimals: false })}</p></div>
          <div className="card col-span-2 p-5 md:col-span-1"><p className="text-xs text-muted-foreground">Invoices</p><p className="mt-1 font-display text-2xl font-extrabold text-foreground">{invoices.length}</p></div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr]">
          <InvoiceForm />

          <div className="card overflow-hidden">
            <div className="border-b px-6 py-4"><h2 className="font-display text-xl font-bold text-foreground">Recent invoices</h2></div>
            {invoices.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">No invoices yet. Create one, or subscribe to a package on a service page (in test mode) to see automatic invoices appear here.</p>
            ) : (
              <ul className="divide-y">
                {invoices.map((inv) => (
                  <li key={inv.id} className="px-6 py-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">{inv.number} <span className="ml-1 chip !py-0.5 !text-[11px]">{KIND[inv.kind]}</span></p>
                        <p className="truncate text-sm text-muted-foreground">{inv.client_name}{inv.practice ? ` · ${inv.practice}` : ""} · {inv.client_email}</p>
                        <p className="text-xs text-muted-foreground">{inv.description} · {fmtDate(inv.created_at)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-foreground">{rand(inv.amount_cents)}</p>
                        <span className={`text-xs font-bold ${inv.status === "paid" ? "text-[#1fa855]" : inv.status === "void" ? "text-muted-foreground" : "text-secondary"}`}>
                          {inv.status === "paid" ? `Paid ${fmtDate(inv.paid_at)}` : inv.status === "void" ? "Cancelled" : `Due ${fmtDate(inv.due_date)}`}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <a className="chip hover:text-foreground" href={`/api/billing/invoice-pdf/?id=${inv.id}`} target="_blank"><FileDown className="mr-1 h-3.5 w-3.5" /> PDF</a>
                      {inv.pay_token && <a className="chip hover:text-foreground" href={`/pay/${inv.pay_token}/`} target="_blank"><Link2 className="mr-1 h-3.5 w-3.5" /> {inv.status === "unpaid" ? "Pay link" : "View"}</a>}
                      <form action="/api/billing/admin/invoices/" method="post"><input type="hidden" name="action" value="resend" /><input type="hidden" name="id" value={inv.id} /><button className="chip hover:text-foreground"><Mail className="mr-1 h-3.5 w-3.5" /> Email again</button></form>
                      {inv.kind === "deposit" && !balanceFor.has(inv.id) && (
                        <form action="/api/billing/admin/invoices/" method="post"><input type="hidden" name="action" value="balance" /><input type="hidden" name="id" value={inv.id} /><button className="chip !border-secondary/40 font-semibold text-secondary"><CircleDollarSign className="mr-1 h-3.5 w-3.5" /> Send 50% balance invoice</button></form>
                      )}
                      {inv.status === "unpaid" && (
                        <form action="/api/billing/admin/invoices/" method="post"><input type="hidden" name="action" value="void" /><input type="hidden" name="id" value={inv.id} /><button className="chip hover:text-destructive"><Ban className="mr-1 h-3.5 w-3.5" /> Cancel</button></form>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
