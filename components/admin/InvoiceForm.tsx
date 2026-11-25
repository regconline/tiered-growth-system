"use client";

import { useMemo, useState } from "react";
import { Send, Globe, Receipt } from "lucide-react";

const R = (n: number) => "R" + (Math.round(n * 100) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ /g, " ");
const n = (v: string) => { const x = Number(v.replace(/[^\d.]/g, "")); return Number.isFinite(x) ? x : 0; };

export default function InvoiceForm() {
  const [template, setTemplate] = useState<"deposit" | "once_off">("deposit");
  const [total, setTotal] = useState("12000");
  const [domain, setDomain] = useState("450");
  const [items, setItems] = useState([{ d: "", a: "" }, { d: "", a: "" }, { d: "", a: "" }]);

  const deposit = useMemo(() => Math.ceil(n(total) * 100 / 2) / 100, [total]);
  const onceTotal = items.reduce((t, i) => t + n(i.a), 0);
  const due = template === "deposit" ? deposit + n(domain) : onceTotal;

  return (
    <form action="/api/billing/admin/invoices/" method="post" className="card p-6 md:p-7">
      <input type="hidden" name="action" value="create" />
      <h2 className="font-display text-xl font-bold text-foreground">Create an invoice</h2>

      <div className="mt-5 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Invoice type">
        {([
          ["deposit", "Website project (50/50)", Globe],
          ["once_off", "Once-off invoice", Receipt],
        ] as const).map(([v, label, Icon]) => (
          <label key={v} className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm font-semibold transition-colors ${template === v ? "border-secondary bg-secondary/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <input type="radio" name="template" value={v} checked={template === v} onChange={() => setTemplate(v)} className="sr-only" />
            <Icon className="h-4 w-4 text-secondary" /> {label}
          </label>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><label className="field-label" htmlFor="client_name">Client name</label><input id="client_name" name="client_name" required className="field" placeholder="Dr Thandi Nkosi" /></div>
        <div><label className="field-label" htmlFor="client_email">Client email</label><input id="client_email" name="client_email" type="email" required className="field" placeholder="accounts@practice.co.za" /></div>
        <div><label className="field-label" htmlFor="practice">Practice</label><input id="practice" name="practice" className="field" placeholder="Nkosi Family Practice" /></div>
        <div><label className="field-label" htmlFor="project">{template === "deposit" ? "Project" : "Invoice title"}</label><input id="project" name="project" className="field" placeholder={template === "deposit" ? "Practice website — Growth Website" : "Branding — Logo design"} /></div>
      </div>

      {template === "deposit" ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="project_total">Project total (R)</label>
            <input id="project_total" name="project_total" inputMode="decimal" className="field" value={total} onChange={(e) => setTotal(e.target.value)} />
            <p className="mt-1 text-xs text-muted-foreground">Deposit now: {R(deposit)} · Balance on delivery: {R(n(total) - deposit)}</p>
          </div>
          <div>
            <label className="field-label" htmlFor="domain_amount">Domain &amp; hosting, paid upfront (R)</label>
            <input id="domain_amount" name="domain_amount" inputMode="decimal" className="field" value={domain} onChange={(e) => setDomain(e.target.value)} />
            <input name="domain_label" type="hidden" value="Domain registration & first-year hosting (paid in full upfront)" />
            <p className="mt-1 text-xs text-muted-foreground">Set to 0 if the client already has a domain.</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          <p className="field-label">Line items</p>
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-[1fr_120px] gap-2">
              <input name={`item_desc_${i}`} className="field" placeholder={i === 0 ? "Logo design — Brand Foundation" : "Description"} value={it.d} onChange={(e) => setItems(items.map((x, j) => (j === i ? { ...x, d: e.target.value } : x)))} />
              <input name={`item_amount_${i}`} inputMode="decimal" className="field" placeholder="R" value={it.a} onChange={(e) => setItems(items.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))} />
            </div>
          ))}
          {items.length < 6 && <button type="button" className="text-sm font-semibold text-secondary" onClick={() => setItems([...items, { d: "", a: "" }])}>+ Add line</button>}
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><label className="field-label" htmlFor="due_days">Payment due in (days)</label><input id="due_days" name="due_days" inputMode="numeric" defaultValue="7" className="field" /></div>
        <label className="flex items-center gap-3 self-end rounded-xl border p-3 text-sm text-foreground">
          <input type="checkbox" name="send" defaultChecked className="h-4 w-4 accent-[#c4317a]" /> Email the invoice to the client now
        </label>
      </div>

      <div className="mt-6 flex flex-col items-stretch justify-between gap-4 border-t pt-5 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">Client pays now: <span className="font-display text-xl font-extrabold text-foreground">{R(due)}</span></p>
        <button type="submit" className="btn-primary"><Send className="h-4 w-4" /> Create invoice</button>
      </div>
    </form>
  );
}
