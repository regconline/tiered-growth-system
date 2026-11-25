import "server-only";
import { siteBase } from "./url";
import { getPlan, BUSINESS, type SubscribePlan } from "@/data/billing";
import { db, DuplicateError, newPayToken, type Invoice, type LineItem, type InvoiceKind } from "./db";
import { createPlan, initializeTransaction, verifyTransaction, planCodeOf, metadataOf, type PaystackTransaction } from "./paystack";
import { sendInvoiceEmail, sendReceiptEmail } from "./email";
import { toCents, sumItems } from "./money";

const CALLBACK = () => `${siteBase()}/billing/complete/`;

// ───────────────────────────── Subscriptions ─────────────────────────────

/** Paystack plan code for a package, creating the plan on Paystack the first time. */
async function ensurePaystackPlan(plan: SubscribePlan): Promise<string> {
  const amount = toCents(plan.amountRand);
  const existing = await db.getPlan(plan.key);
  if (existing && existing.amount_cents === amount) return existing.plan_code;
  // new package or price changed → create a fresh Paystack plan (existing subscribers keep their old plan)
  const created = await createPlan({ name: `${plan.name} (R${plan.amountRand}/mo)`, amount, interval: "monthly" });
  await db.upsertPlan({ key: plan.key, plan_code: created.plan_code, name: plan.name, amount_cents: amount });
  return created.plan_code;
}

export async function startSubscription(input: { planKey: string; name: string; email: string; practice?: string }) {
  const plan = getPlan(input.planKey);
  if (!plan) throw new UserError("That package isn't available for online subscription. Please request a quote.");
  const planCode = await ensurePaystackPlan(plan);
  const tx = await initializeTransaction({
    email: input.email,
    amount: toCents(plan.amountRand), // Paystack uses the plan amount; must still be sent
    plan: planCode,
    callback_url: CALLBACK(),
    metadata: {
      kind: "subscription",
      plan_key: plan.key,
      client_name: input.name,
      practice: input.practice ?? "",
      custom_fields: [
        { display_name: "Package", variable_name: "package", value: plan.name },
        { display_name: "Practice", variable_name: "practice", value: input.practice ?? "" },
      ],
    },
  });
  return tx.authorization_url;
}

// ───────────────────────────── Project invoices ─────────────────────────────

export class UserError extends Error {}

function dueDate(days = BUSINESS.paymentTermsDays) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function createProjectInvoice(input: {
  template: "deposit" | "balance" | "once_off";
  clientName: string;
  clientEmail: string;
  practice?: string;
  project: string;               // e.g. "Practice website — Growth Website"
  projectTotalRand?: number;     // deposit/balance
  domainRand?: number;           // deposit only (domain + first-year hosting)
  domainLabel?: string;
  items?: { description: string; amountRand: number }[]; // once-off
  parentId?: string;
  dueDays?: number;
  send?: boolean;
}): Promise<Invoice> {
  let items: LineItem[] = [];
  let kind: InvoiceKind = input.template;
  const meta: Record<string, unknown> = {};

  if (input.template === "deposit" || input.template === "balance") {
    const total = toCents(input.projectTotalRand ?? 0);
    if (total <= 0) throw new UserError("Enter the project total.");
    const half = input.template === "deposit" ? Math.ceil(total / 2) : total - Math.ceil(total / 2);
    items.push({
      description: `${input.project} — ${input.template === "deposit" ? "50% deposit" : "final 50% balance on delivery"} (project total R${(total / 100).toLocaleString("en-US")})`,
      amount_cents: half,
    });
    if (input.template === "deposit" && (input.domainRand ?? 0) > 0) {
      items.push({ description: input.domainLabel || "Domain registration & first-year hosting (paid in full upfront)", amount_cents: toCents(input.domainRand!) });
    }
    meta.project_total_cents = total;
    meta.project = input.project;
  } else {
    items = (input.items ?? []).filter((i) => i.description.trim() && i.amountRand > 0).map((i) => ({ description: i.description.trim(), amount_cents: toCents(i.amountRand) }));
    if (!items.length) throw new UserError("Add at least one line item.");
    kind = "once_off";
  }

  const inv = await db.insertInvoice({
    kind,
    client_name: input.clientName,
    client_email: input.clientEmail.toLowerCase(),
    practice: input.practice || null,
    description: input.project,
    items,
    amount_cents: sumItems(items),
    due_date: dueDate(input.dueDays),
    pay_token: newPayToken(),
    parent_id: input.parentId ?? null,
    meta,
  });

  if (input.send !== false) {
    const sent = await sendInvoiceEmail(inv);
    if (sent) return (await db.updateInvoice(inv.id, { emailed_at: new Date().toISOString() })) ?? inv;
  }
  return inv;
}

/** Creates the final-50% invoice from a deposit invoice. */
export async function createBalanceFromDeposit(depositId: string, send = true) {
  const dep = await db.getInvoice(depositId);
  if (!dep || dep.kind !== "deposit") throw new UserError("Deposit invoice not found.");
  const total = Number(dep.meta.project_total_cents ?? 0);
  return createProjectInvoice({
    template: "balance",
    clientName: dep.client_name,
    clientEmail: dep.client_email,
    practice: dep.practice ?? undefined,
    project: String(dep.meta.project ?? dep.description ?? "Website project"),
    projectTotalRand: total / 100,
    parentId: dep.id,
    send,
  });
}

/** Starts Paystack checkout for an unpaid invoice (amount always comes from the database). */
export async function checkoutInvoice(token: string) {
  const inv = await db.getByToken(token);
  if (!inv) throw new UserError("Invoice not found.");
  if (inv.status === "paid") throw new UserError("This invoice has already been paid — thank you!");
  if (inv.status === "void") throw new UserError("This invoice has been cancelled.");
  const tx = await initializeTransaction({
    email: inv.client_email,
    amount: inv.amount_cents,
    reference: `${inv.number}-${Date.now().toString(36)}`,
    callback_url: CALLBACK(),
    metadata: {
      kind: "invoice",
      invoice_id: inv.id,
      invoice_number: inv.number,
      custom_fields: [{ display_name: "Invoice", variable_name: "invoice", value: inv.number }],
    },
  });
  return tx.authorization_url;
}

// ───────────────────────────── Payment processing ─────────────────────────────

export type ProcessResult =
  | { ok: true; invoice: Invoice; alreadyProcessed: boolean }
  | { ok: false; reason: string };

/**
 * Turns a successful Paystack charge into a paid invoice + receipt email.
 * Safe to call many times for the same reference (webhook retries, callback page):
 * the unique payment reference guarantees one invoice and one email per payment.
 */
export async function processCharge(reference: string): Promise<ProcessResult> {
  const existing = await db.getByReference(reference);
  if (existing) return { ok: true, invoice: existing, alreadyProcessed: true };

  // never trust the webhook body for money: always ask Paystack directly
  let tx: PaystackTransaction;
  try {
    tx = await verifyTransaction(reference);
  } catch (e) {
    return { ok: false, reason: `verify failed: ${(e as Error).message}` };
  }
  if (tx.status !== "success") return { ok: false, reason: `transaction ${tx.status}` };
  if (tx.currency !== "ZAR") return { ok: false, reason: `unexpected currency ${tx.currency}` };

  const meta = metadataOf(tx);
  const paidAt = tx.paid_at ?? new Date().toISOString();
  let invoice: Invoice | null = null;

  try {
    if (meta.kind === "invoice" && typeof meta.invoice_id === "string") {
      const inv = await db.getInvoice(meta.invoice_id);
      if (!inv) return { ok: false, reason: "invoice missing" };
      if (inv.status === "paid") return { ok: true, invoice: inv, alreadyProcessed: true };
      if (tx.amount !== inv.amount_cents) return { ok: false, reason: `amount mismatch: paid ${tx.amount}, due ${inv.amount_cents}` };
      invoice = await db.markPaid(inv.id, { paystack_reference: tx.reference, paid_at: paidAt });
      if (!invoice) return { ok: true, invoice: (await db.getInvoice(inv.id))!, alreadyProcessed: true };
    } else {
      // subscription (first payment or monthly renewal) — or any other payment
      const planCode = planCodeOf(tx);
      // renewals carry no metadata — recover the package and client details from earlier records
      const planRow = typeof meta.plan_key === "string" ? await db.getPlan(meta.plan_key) : planCode ? await db.getPlanByCode(planCode) : null;
      const planKey = (typeof meta.plan_key === "string" && meta.plan_key) || planRow?.key;
      const previous = planCode ? await db.lastSubscriptionInvoice(tx.customer.email, planCode) : null;
      const planName = planRow?.name || getPlan(planKey ?? "")?.name || (planCode ? "Monthly subscription" : "Payment");
      const name =
        (typeof meta.client_name === "string" && meta.client_name) ||
        previous?.client_name ||
        [tx.customer.first_name, tx.customer.last_name].filter(Boolean).join(" ") ||
        tx.customer.email;
      const month = new Date(paidAt).toLocaleDateString("en-ZA", { month: "long", year: "numeric", timeZone: "Africa/Johannesburg" });
      invoice = await db.insertInvoice({
        kind: "subscription",
        status: "paid",
        client_name: name,
        client_email: tx.customer.email.toLowerCase(),
        practice: (typeof meta.practice === "string" && meta.practice) || previous?.practice || null,
        description: planName,
        items: [{ description: `${planName} — ${month}`, amount_cents: tx.amount }],
        amount_cents: tx.amount,
        paystack_reference: tx.reference,
        paystack_plan: planCode,
        paid_at: paidAt,
        pay_token: newPayToken(), // lets the client view/download this invoice
        meta: { plan_key: planKey ?? null, customer_code: tx.customer.customer_code, channel: tx.channel },
      });
    }
  } catch (e) {
    if (e instanceof DuplicateError) {
      const inv = await db.getByReference(reference);
      if (inv) return { ok: true, invoice: inv, alreadyProcessed: true };
    }
    throw e;
  }

  try {
    const sent = await sendReceiptEmail(invoice);
    if (sent) invoice = (await db.updateInvoice(invoice.id, { emailed_at: new Date().toISOString() })) ?? invoice;
  } catch (e) {
    // payment is recorded; email can be resent from the admin page
    console.error("[billing] receipt email failed", invoice.number, e);
  }
  return { ok: true, invoice, alreadyProcessed: false };
}
