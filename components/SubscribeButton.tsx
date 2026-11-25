"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { X, Lock, Loader2, CreditCard, Landmark, RefreshCw } from "lucide-react";

interface Props {
  planKey: string;
  planName: string;
  amountRand: number;
  featured?: boolean;
}

const fmt = (n: number) => "R" + n.toLocaleString("en-US").replace(/ /g, " ");

export default function SubscribeButton({ planKey, planName, amountRand, featured }: Props) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({ name: "", email: "", practice: "", terms: false, website: "" });
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!f.terms) return setError("Please accept the terms to continue.");
    setBusy(true);
    try {
      const res = await fetch("/api/billing/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey, ...f }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "begin_checkout", plan: planKey, value: amountRand, currency: "ZAR" });
        window.location.href = data.url;
        return;
      }
      setError(data.error || "We couldn't start the checkout. Please try again.");
    } catch {
      setError("We couldn't reach the server. Please try again.");
    }
    setBusy(false);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`w-full ${featured ? "btn-primary" : "btn-secondary"}`}>
        <RefreshCw className="h-4 w-4" /> Subscribe — {fmt(amountRand)}/mo
      </button>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === dialog.current) setOpen(false); }}
        className="w-[440px] max-w-[calc(100vw-2rem)] rounded-3xl border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <form onSubmit={submit} className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Monthly subscription</p>
              <h2 className="mt-1 font-display text-xl font-bold">{planName}</h2>
              <p className="mt-1 font-display text-2xl font-extrabold">{fmt(amountRand)}<span className="text-sm font-medium text-muted-foreground"> / month</span></p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><X className="h-5 w-5" /></button>
          </div>

          <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            <input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor={`${planKey}-name`} className="field-label">Full name</label>
              <input id={`${planKey}-name`} required minLength={2} maxLength={120} autoComplete="name" className="field" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Dr Thandi Nkosi" />
            </div>
            <div>
              <label htmlFor={`${planKey}-email`} className="field-label">Email for invoices</label>
              <input id={`${planKey}-email`} required type="email" maxLength={200} autoComplete="email" className="field" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="accounts@practice.co.za" />
            </div>
            <div>
              <label htmlFor={`${planKey}-practice`} className="field-label">Practice name</label>
              <input id={`${planKey}-practice`} maxLength={160} autoComplete="organization" className="field" value={f.practice} onChange={(e) => setF({ ...f, practice: e.target.value })} placeholder="Nkosi Family Practice" />
            </div>
            <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
              <input type="checkbox" checked={f.terms} onChange={(e) => { setF({ ...f, terms: e.target.checked }); if (e.target.checked) setError(""); }} className="mt-0.5 h-4 w-4 shrink-0 accent-[#c4317a]" />
              <span>
                I agree to be billed {fmt(amountRand)} every month until I cancel, and to the{" "}
                <Link href="/terms/" target="_blank" className="font-medium text-secondary underline">terms</Link> and{" "}
                <Link href="/refund-policy/" target="_blank" className="font-medium text-secondary underline">refund policy</Link>.
              </span>
            </label>
          </div>

          {error && <p role="alert" className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}

          <button type="submit" disabled={busy} className="btn-primary mt-6 w-full !py-3.5">
            {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Opening secure checkout…</> : <><Lock className="h-4 w-4" /> Continue to secure payment</>}
          </button>
          <p className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><CreditCard className="h-3.5 w-3.5" /> Card</span>
            <span className="inline-flex items-center gap-1"><Landmark className="h-3.5 w-3.5" /> EFT</span>
            <span>Secured by Paystack</span>
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">You'll receive an invoice by email after every payment.</p>
        </form>
      </dialog>
    </>
  );
}
