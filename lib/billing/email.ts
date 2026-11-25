import "server-only";
import { SITE } from "@/data/site";
import { BUSINESS } from "@/data/billing";
import { rand, fmtDate } from "./money";
import { invoicePdf } from "./pdf";
import { siteBase } from "./url";
import type { Invoice } from "./db";

const OWNER = () => process.env.CONTACT_TO_EMAIL || "regconline@gmail.com";
const FROM = () => process.env.RESEND_FROM_EMAIL || "REGC Digital <onboarding@resend.dev>";
const API = () => (process.env.RESEND_API_BASE || "https://api.resend.com").replace(/\/$/, "");

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function payUrl(inv: Pick<Invoice, "pay_token">) {
  return `${siteBase()}/pay/${inv.pay_token}/`;
}

async function send(payload: Record<string, unknown>, idempotencyKey?: string) {
  if (!emailConfigured()) {
    console.warn("[billing] RESEND_API_KEY not set — email not sent", payload.subject);
    return false;
  }
  const res = await fetch(`${API()}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return true;
}

function shell(title: string, bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f2f8;font-family:-apple-system,Segoe UI,Arial,sans-serif;color:#1a0f22">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eadff0">
<tr><td style="background:#2a0b3d;padding:22px 26px">
  <img src="${SITE.url}/assets/regc-logo.png" width="44" height="44" alt="REGC Digital" style="vertical-align:middle;border-radius:50%"/>
  <span style="color:#fff;font-size:18px;font-weight:700;vertical-align:middle;margin-left:10px">REGC <span style="color:#ff86ab">Digital</span></span>
</td></tr>
<tr><td style="padding:26px">
  <h1 style="margin:0 0 14px;font-size:20px;color:#2a0b3d">${esc(title)}</h1>
  ${bodyHtml}
</td></tr>
<tr><td style="padding:16px 26px 22px;color:#8a7a93;font-size:12px;border-top:1px solid #f0e8f4">
  ${esc(BUSINESS.name)} · <a href="${SITE.url}" style="color:#c4317a">${esc(BUSINESS.website)}</a> · ${esc(BUSINESS.phone)}<br/>
  Questions about this invoice? Reply to this email or WhatsApp us on ${esc(BUSINESS.phone)}.
</td></tr></table></td></tr></table></body></html>`;
}

function itemsTable(inv: Invoice) {
  const rows = inv.items
    .map((i) => `<tr><td style="padding:8px 0;border-bottom:1px solid #f0e8f4;font-size:14px">${esc(i.description)}</td><td style="padding:8px 0;border-bottom:1px solid #f0e8f4;font-size:14px;text-align:right;white-space:nowrap">${rand(i.amount_cents)}</td></tr>`)
    .join("");
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0">${rows}
<tr><td style="padding:10px 0;font-weight:700">Total</td><td style="padding:10px 0;font-weight:700;text-align:right">${rand(inv.amount_cents)}</td></tr></table>`;
}

/** Invoice with a "Pay now" button (deposit, balance or once-off). */
export async function sendInvoiceEmail(inv: Invoice, opts: { resend?: boolean } = {}) {
  const pdf = Buffer.from(await invoicePdf(inv)).toString("base64");
  const first = inv.client_name.split(" ")[0] || inv.client_name;
  const html = shell(`Invoice ${inv.number} — ${rand(inv.amount_cents)} due`, `
  <p style="margin:0 0 10px;font-size:15px;line-height:1.6">Hi ${esc(first)},</p>
  <p style="margin:0 0 6px;font-size:15px;line-height:1.6">Please find your invoice from REGC Digital${inv.description ? ` for <strong>${esc(inv.description)}</strong>` : ""}. ${inv.due_date ? `Payment is due by <strong>${esc(fmtDate(inv.due_date))}</strong>.` : ""}</p>
  ${itemsTable(inv)}
  <p style="text-align:center;margin:22px 0"><a href="${payUrl(inv)}" style="background:#c4317a;color:#fff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:12px;display:inline-block">Pay ${rand(inv.amount_cents)} securely</a></p>
  <p style="margin:0;font-size:13px;color:#6b5a75;line-height:1.6">Pay by card or Instant EFT through Paystack. Your invoice is attached as a PDF.</p>`);
  return send(
    {
      from: FROM(),
      to: [inv.client_email],
      bcc: [OWNER()],
      reply_to: BUSINESS.email,
      subject: `Invoice ${inv.number} from REGC Digital — ${rand(inv.amount_cents)}`,
      html,
      attachments: [{ filename: `${inv.number}.pdf`, content: pdf }],
    },
    opts.resend ? undefined : `invoice-issued-${inv.id}`,
  );
}

/** Paid invoice / receipt — sent automatically after every successful payment. */
export async function sendReceiptEmail(inv: Invoice, opts: { resend?: boolean } = {}) {
  const pdf = Buffer.from(await invoicePdf(inv)).toString("base64");
  const first = inv.client_name.split(" ")[0] || inv.client_name;
  const sub = inv.kind === "subscription";
  const html = shell(`Payment received — ${inv.number}`, `
  <p style="margin:0 0 10px;font-size:15px;line-height:1.6">Hi ${esc(first)},</p>
  <p style="margin:0 0 6px;font-size:15px;line-height:1.6">Thank you — we've received your payment of <strong>${rand(inv.amount_cents)}</strong>. Your paid invoice is attached.</p>
  ${itemsTable(inv)}
  ${sub ? `<p style="margin:0;font-size:13px;color:#6b5a75;line-height:1.6">Your subscription renews automatically each month and you'll receive an invoice after every payment. To change or cancel, simply reply to this email.</p>` : ""}
  ${inv.kind === "deposit" ? `<p style="margin:0;font-size:13px;color:#6b5a75;line-height:1.6">Your project is now booked in. We'll be in touch shortly with next steps.</p>` : ""}`);
  return send(
    {
      from: FROM(),
      to: [inv.client_email],
      bcc: [OWNER()],
      reply_to: BUSINESS.email,
      subject: `Payment received — ${inv.number} (${rand(inv.amount_cents)})`,
      html,
      attachments: [{ filename: `${inv.number}-paid.pdf`, content: pdf }],
    },
    opts.resend ? undefined : `invoice-paid-${inv.id}`,
  );
}
