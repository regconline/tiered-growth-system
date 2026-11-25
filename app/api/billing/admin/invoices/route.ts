import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/billing/admin";
import { db } from "@/lib/billing/db";
import { createProjectInvoice, createBalanceFromDeposit, UserError } from "@/lib/billing/service";
import { sendInvoiceEmail, sendReceiptEmail } from "@/lib/billing/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const num = (v: FormDataEntryValue | null) => {
  const n = Number(String(v ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};
const str = (v: FormDataEntryValue | null, max = 200) => String(v ?? "").replace(/<[^>]*>/g, "").trim().slice(0, max);

/** All admin invoice actions (HTML form posts). */
export async function POST(req: Request) {
  const back = new URL("/admin/billing/", req.url);
  if (!(await isAdmin())) return NextResponse.redirect(back, 303);
  // same-origin check (forms only come from our admin page)
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(req.url).host) return new NextResponse("Forbidden", { status: 403 });

  const f = await req.formData();
  const action = str(f.get("action"), 40);
  try {
    if (action === "create") {
      const template = str(f.get("template"), 20) as "deposit" | "once_off";
      const items: { description: string; amountRand: number }[] = [];
      for (let i = 0; i < 6; i++) items.push({ description: str(f.get(`item_desc_${i}`)), amountRand: num(f.get(`item_amount_${i}`)) });
      const email = str(f.get("client_email"));
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new UserError("Enter a valid client email.");
      const inv = await createProjectInvoice({
        template: template === "once_off" ? "once_off" : "deposit",
        clientName: str(f.get("client_name"), 120) || "Client",
        clientEmail: email,
        practice: str(f.get("practice"), 160),
        project: str(f.get("project"), 160) || "Website project",
        projectTotalRand: num(f.get("project_total")),
        domainRand: num(f.get("domain_amount")),
        domainLabel: str(f.get("domain_label")) || undefined,
        items,
        dueDays: Math.min(90, Math.max(0, num(f.get("due_days")) || 7)),
        send: f.get("send") === "on",
      });
      back.searchParams.set("ok", `${inv.number} created${inv.emailed_at ? " and emailed" : ""}.`);
    } else if (action === "balance") {
      const inv = await createBalanceFromDeposit(str(f.get("id"), 60), f.get("send") !== "off");
      back.searchParams.set("ok", `Balance invoice ${inv.number} created${inv.emailed_at ? " and emailed" : ""}.`);
    } else if (action === "resend") {
      const inv = await db.getInvoice(str(f.get("id"), 60));
      if (!inv) throw new UserError("Invoice not found.");
      const sent = inv.status === "paid" ? await sendReceiptEmail(inv, { resend: true }) : await sendInvoiceEmail(inv, { resend: true });
      if (sent) await db.updateInvoice(inv.id, { emailed_at: new Date().toISOString() });
      back.searchParams.set("ok", sent ? `${inv.number} emailed to ${inv.client_email}.` : "Email isn't configured (RESEND_API_KEY).");
    } else if (action === "void") {
      const inv = await db.getInvoice(str(f.get("id"), 60));
      if (!inv || inv.status !== "unpaid") throw new UserError("Only unpaid invoices can be cancelled.");
      await db.updateInvoice(inv.id, { status: "void" });
      back.searchParams.set("ok", `${inv.number} cancelled.`);
    } else {
      throw new UserError("Unknown action.");
    }
  } catch (e) {
    back.searchParams.set("error", e instanceof UserError ? e.message : `Something went wrong: ${(e as Error).message}`);
    if (!(e instanceof UserError)) console.error("[billing] admin action failed", e);
  }
  return NextResponse.redirect(back, 303);
}
