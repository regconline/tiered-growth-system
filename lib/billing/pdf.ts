import "server-only";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { BUSINESS, VAT_RATE } from "@/data/billing";
import { LOGO_PNG_BASE64 } from "./logo";
import { rand, fmtDate } from "./money";
import type { Invoice } from "./db";

const PURPLE = rgb(0.29, 0.055, 0.43);   // #4a0e6e
const MAGENTA = rgb(0.77, 0.19, 0.48);  // #c4317a
const INK = rgb(0.1, 0.06, 0.13);
const MUTED = rgb(0.42, 0.36, 0.46);
const LINE = rgb(0.9, 0.87, 0.92);
const GREEN = rgb(0.12, 0.6, 0.33);

const KIND_LABEL: Record<Invoice["kind"], string> = {
  deposit: "Deposit (50%)",
  balance: "Final balance (50%)",
  once_off: "Once-off",
  subscription: "Monthly subscription",
};

/** WinAnsi-safe text (standard PDF fonts can't encode every Unicode character). */
function safe(s: string) {
  return s
    .replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-").replace(/…/g, "...").replace(/ /g, " ")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "");
}

function wrap(text: string, font: PDFFont, size: number, max: number): string[] {
  const words = safe(text).split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(t, size) > max && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

function right(page: PDFPage, text: string, x: number, y: number, font: PDFFont, size: number, color = INK) {
  const t = safe(text);
  page.drawText(t, { x: x - font.widthOfTextAtSize(t, size), y, size, font, color });
}

export async function invoicePdf(inv: Invoice): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`${BUSINESS.name} ${inv.number}`);
  doc.setAuthor(BUSINESS.name);
  doc.setCreator(BUSINESS.website);
  const page = doc.addPage([595.28, 841.89]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const logo = await doc.embedPng(Buffer.from(LOGO_PNG_BASE64, "base64"));
  const W = 595.28, M = 48;
  const paid = inv.status === "paid";
  const vat = Boolean(BUSINESS.vatNumber);

  // top band
  page.drawRectangle({ x: 0, y: 841.89 - 6, width: W, height: 6, color: MAGENTA });

  // header
  page.drawImage(logo, { x: M, y: 841.89 - 120, width: 72, height: 72 });
  page.drawText(BUSINESS.name, { x: M + 86, y: 841.89 - 72, size: 18, font: bold, color: PURPLE });
  page.drawText("Healthcare digital marketing", { x: M + 86, y: 841.89 - 90, size: 9.5, font, color: MUTED });
  const contact = [BUSINESS.website, BUSINESS.email, BUSINESS.phone].filter(Boolean).join("  |  ");
  page.drawText(safe(contact), { x: M + 86, y: 841.89 - 104, size: 8.5, font, color: MUTED });

  const title = vat ? "TAX INVOICE" : "INVOICE";
  right(page, title, W - M, 841.89 - 70, bold, 22, PURPLE);
  right(page, inv.number, W - M, 841.89 - 90, bold, 11);
  // status pill
  const pill = paid ? "PAID" : "DUE";
  const pw = bold.widthOfTextAtSize(pill, 9) + 18;
  page.drawRectangle({ x: W - M - pw, y: 841.89 - 116, width: pw, height: 16, color: paid ? GREEN : MAGENTA });
  page.drawText(pill, { x: W - M - pw + 9, y: 841.89 - 111.5, size: 9, font: bold, color: rgb(1, 1, 1) });

  let y = 841.89 - 150;
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.8, color: LINE });
  y -= 24;

  // bill to + details
  page.drawText("BILL TO", { x: M, y, size: 8, font: bold, color: MUTED });
  page.drawText("DETAILS", { x: 330, y, size: 8, font: bold, color: MUTED });
  y -= 16;
  const billTo = [inv.client_name, inv.practice ?? "", inv.client_email].filter(Boolean);
  billTo.forEach((l, i) => page.drawText(safe(l), { x: M, y: y - i * 14, size: i === 0 ? 11 : 10, font: i === 0 ? bold : font, color: INK }));

  const details: [string, string][] = [
    ["Invoice date", fmtDate(inv.created_at)],
    [paid ? "Paid on" : "Due date", paid ? fmtDate(inv.paid_at) : fmtDate(inv.due_date) || "On receipt"],
    ["Type", KIND_LABEL[inv.kind]],
  ];
  if (paid && inv.paystack_reference) details.push(["Payment ref", inv.paystack_reference]);
  if (BUSINESS.registrationNumber) details.push(["Reg. no.", BUSINESS.registrationNumber]);
  if (vat) details.push(["VAT no.", BUSINESS.vatNumber]);
  details.forEach(([k, v], i) => {
    page.drawText(safe(k), { x: 330, y: y - i * 14, size: 9.5, font, color: MUTED });
    right(page, v, W - M, y - i * 14, font, 9.5);
  });
  y -= Math.max(billTo.length, details.length) * 14 + 24;

  if (inv.description) {
    for (const l of wrap(inv.description, font, 10, W - 2 * M)) { page.drawText(l, { x: M, y, size: 10, font, color: INK }); y -= 14; }
    y -= 8;
  }

  // items table
  page.drawRectangle({ x: M, y: y - 8, width: W - 2 * M, height: 24, color: rgb(0.97, 0.95, 0.98) });
  page.drawText("DESCRIPTION", { x: M + 10, y, size: 8.5, font: bold, color: MUTED });
  right(page, "AMOUNT", W - M - 10, y, bold, 8.5, MUTED);
  y -= 30;
  for (const it of inv.items) {
    const lines = wrap(it.description, font, 10.5, W - 2 * M - 140);
    lines.forEach((l, i) => page.drawText(l, { x: M + 10, y: y - i * 14, size: 10.5, font, color: INK }));
    right(page, rand(it.amount_cents), W - M - 10, y, font, 10.5);
    y -= lines.length * 14 + 8;
    page.drawLine({ start: { x: M, y: y + 2 }, end: { x: W - M, y: y + 2 }, thickness: 0.5, color: LINE });
    y -= 12;
  }

  // totals
  const total = inv.amount_cents;
  const rows: [string, string][] = [];
  if (vat) {
    const excl = Math.round(total / (1 + VAT_RATE));
    rows.push(["Subtotal (excl. VAT)", rand(excl)], [`VAT (${Math.round(VAT_RATE * 100)}%)`, rand(total - excl)]);
  }
  rows.forEach(([k, v]) => { page.drawText(k, { x: 340, y, size: 10, font, color: MUTED }); right(page, v, W - M - 10, y, font, 10); y -= 16; });
  page.drawRectangle({ x: 330, y: y - 10, width: W - M - 330, height: 28, color: PURPLE });
  page.drawText(paid ? "Total paid" : "Total due", { x: 340, y: y, size: 11, font: bold, color: rgb(1, 1, 1) });
  right(page, rand(total), W - M - 10, y, bold, 12, rgb(1, 1, 1));
  y -= 48;

  // payment info
  if (!paid) {
    page.drawText("HOW TO PAY", { x: M, y, size: 8, font: bold, color: MUTED });
    y -= 15;
    const how = ["Pay securely online by card or Instant EFT using the link in your invoice email."];
    if (BUSINESS.bankDetails) how.push(`EFT: ${BUSINESS.bankDetails}. Use ${inv.number} as your reference.`);
    for (const h of how) for (const l of wrap(h, font, 10, W - 2 * M)) { page.drawText(l, { x: M, y, size: 10, font, color: INK }); y -= 14; }
  } else {
    page.drawText(safe(`Thank you - payment received${inv.paystack_reference ? ` (ref ${inv.paystack_reference})` : ""}.`), { x: M, y, size: 10, font, color: GREEN });
  }

  // footer
  const terms = inv.kind === "deposit"
    ? "Deposits secure your project slot and cover costs such as domain registration; they are non-refundable once work has started. See regcdigital.co.za/terms/."
    : inv.kind === "subscription"
      ? "Monthly services renew automatically each month until cancelled. You can cancel at any time with notice before your next billing date. See regcdigital.co.za/terms/."
      : "Thank you for your business. Terms: regcdigital.co.za/terms/";
  let fy = 70;
  for (const l of wrap(terms, font, 8.5, W - 2 * M)) { page.drawText(l, { x: M, y: fy, size: 8.5, font, color: MUTED }); fy -= 12; }
  const foot = [BUSINESS.name, BUSINESS.address, BUSINESS.registrationNumber && `Reg. ${BUSINESS.registrationNumber}`].filter(Boolean).join("  |  ");
  page.drawText(safe(foot), { x: M, y: 30, size: 8, font, color: MUTED });
  page.drawRectangle({ x: 0, y: 0, width: W, height: 4, color: PURPLE });

  return doc.save();
}
