import "server-only";
import { randomBytes, randomUUID } from "crypto";

/**
 * Billing storage. Production uses Supabase over its REST API with the
 * service-role key (server only). `BILLING_DB=memory` swaps in an in-memory
 * store for local testing — never use that in production.
 */

export type InvoiceKind = "deposit" | "balance" | "once_off" | "subscription";
export type InvoiceStatus = "unpaid" | "paid" | "void";

export interface LineItem {
  description: string;
  amount_cents: number;
}

export interface Invoice {
  id: string;
  number: string;
  kind: InvoiceKind;
  status: InvoiceStatus;
  client_name: string;
  client_email: string;
  practice: string | null;
  description: string | null;
  items: LineItem[];
  amount_cents: number;
  currency: string;
  due_date: string | null;
  pay_token: string | null;
  parent_id: string | null;
  meta: Record<string, unknown>;
  paystack_reference: string | null;
  paystack_plan: string | null;
  paid_at: string | null;
  emailed_at: string | null;
  created_at: string;
}

export type NewInvoice = Pick<Invoice, "kind" | "client_name" | "client_email" | "items" | "amount_cents"> &
  Partial<Pick<Invoice, "status" | "practice" | "description" | "due_date" | "pay_token" | "parent_id" | "meta" | "paystack_reference" | "paystack_plan" | "paid_at">>;

export interface PlanRow {
  key: string;
  plan_code: string;
  name: string;
  amount_cents: number;
}

/** thrown when a unique constraint stops a duplicate (e.g. a payment processed twice) */
export class DuplicateError extends Error {}

export function newPayToken() {
  return randomBytes(24).toString("base64url");
}

/** in-memory store: local development, or production builds explicitly forced for automated tests */
function useMemory() {
  return process.env.BILLING_DB === "memory" && (process.env.NODE_ENV !== "production" || process.env.BILLING_DB_FORCE_MEMORY === "1");
}

export function billingDbConfigured() {
  return useMemory() || Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// ───────────────────────────── Supabase (PostgREST) ─────────────────────────────

async function rest<T>(path: string, init: RequestInit & { prefer?: string } = {}): Promise<T> {
  const url = process.env.SUPABASE_URL!.replace(/\/$/, "") + "/rest/v1/" + path;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const res = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: init.prefer ?? "return=representation",
      ...(init.headers || {}),
    },
  });
  if (res.status === 409) throw new DuplicateError(await res.text());
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

const enc = encodeURIComponent;

const supabase = {
  async insertInvoice(row: NewInvoice): Promise<Invoice> {
    const [inv] = await rest<Invoice[]>("billing_invoices", { method: "POST", body: JSON.stringify(row) });
    return inv;
  },
  async updateInvoice(id: string, patch: Partial<Invoice>): Promise<Invoice | null> {
    const rows = await rest<Invoice[]>(`billing_invoices?id=eq.${enc(id)}`, { method: "PATCH", body: JSON.stringify(patch) });
    return rows[0] ?? null;
  },
  /** marks an unpaid invoice paid — only succeeds once (status filter makes it atomic) */
  async markPaid(id: string, patch: Partial<Invoice>): Promise<Invoice | null> {
    const rows = await rest<Invoice[]>(`billing_invoices?id=eq.${enc(id)}&status=eq.unpaid`, { method: "PATCH", body: JSON.stringify({ ...patch, status: "paid" }) });
    return rows[0] ?? null;
  },
  async getInvoice(id: string): Promise<Invoice | null> {
    const rows = await rest<Invoice[]>(`billing_invoices?id=eq.${enc(id)}&limit=1`);
    return rows[0] ?? null;
  },
  async getByToken(token: string): Promise<Invoice | null> {
    const rows = await rest<Invoice[]>(`billing_invoices?pay_token=eq.${enc(token)}&limit=1`);
    return rows[0] ?? null;
  },
  async getByReference(ref: string): Promise<Invoice | null> {
    const rows = await rest<Invoice[]>(`billing_invoices?paystack_reference=eq.${enc(ref)}&limit=1`);
    return rows[0] ?? null;
  },
  async listInvoices(limit = 100): Promise<Invoice[]> {
    return rest<Invoice[]>(`billing_invoices?order=created_at.desc&limit=${limit}`);
  },
  async getPlan(key: string): Promise<PlanRow | null> {
    const rows = await rest<PlanRow[]>(`billing_plans?key=eq.${enc(key)}&limit=1`);
    return rows[0] ?? null;
  },
  async getPlanByCode(code: string): Promise<PlanRow | null> {
    const rows = await rest<PlanRow[]>(`billing_plans?plan_code=eq.${enc(code)}&limit=1`);
    return rows[0] ?? null;
  },
  /** most recent subscription invoice for this customer + plan (to carry name/practice onto renewals) */
  async lastSubscriptionInvoice(email: string, planCode: string): Promise<Invoice | null> {
    const rows = await rest<Invoice[]>(`billing_invoices?client_email=eq.${enc(email.toLowerCase())}&paystack_plan=eq.${enc(planCode)}&kind=eq.subscription&order=created_at.desc&limit=1`);
    return rows[0] ?? null;
  },
  async upsertPlan(row: PlanRow): Promise<void> {
    await rest("billing_plans?on_conflict=key", { method: "POST", body: JSON.stringify(row), prefer: "resolution=merge-duplicates,return=minimal" });
  },
};

// ───────────────────────────── In-memory (tests only) ─────────────────────────────

type Mem = { invoices: Invoice[]; plans: PlanRow[]; seq: number };
const g = globalThis as unknown as { __billingMem?: Mem };
const mem = (): Mem => (g.__billingMem ??= { invoices: [], plans: [], seq: 0 });

const memory: typeof supabase = {
  async insertInvoice(row) {
    const m = mem();
    if (row.paystack_reference && m.invoices.some((i) => i.paystack_reference === row.paystack_reference)) throw new DuplicateError("reference");
    if (row.pay_token && m.invoices.some((i) => i.pay_token === row.pay_token)) throw new DuplicateError("token");
    m.seq += 1;
    const inv: Invoice = {
      id: randomUUID(), number: `INV-${String(m.seq).padStart(4, "0")}`, status: "unpaid", practice: null, description: null,
      currency: "ZAR", due_date: null, pay_token: null, parent_id: null, meta: {}, paystack_reference: null, paystack_plan: null,
      paid_at: null, emailed_at: null, created_at: new Date().toISOString(), ...row,
    } as Invoice;
    m.invoices.push(inv);
    return { ...inv };
  },
  async updateInvoice(id, patch) {
    const inv = mem().invoices.find((i) => i.id === id);
    if (!inv) return null;
    Object.assign(inv, patch);
    return { ...inv };
  },
  async markPaid(id, patch) {
    const m = mem();
    const inv = m.invoices.find((i) => i.id === id && i.status === "unpaid");
    if (!inv) return null;
    if (patch.paystack_reference && m.invoices.some((i) => i.paystack_reference === patch.paystack_reference)) throw new DuplicateError("reference");
    Object.assign(inv, patch, { status: "paid" });
    return { ...inv };
  },
  async getInvoice(id) { const i = mem().invoices.find((x) => x.id === id); return i ? { ...i } : null; },
  async getByToken(t) { const i = mem().invoices.find((x) => x.pay_token === t); return i ? { ...i } : null; },
  async getByReference(r) { const i = mem().invoices.find((x) => x.paystack_reference === r); return i ? { ...i } : null; },
  async listInvoices(limit = 100) { return [...mem().invoices].reverse().slice(0, limit); },
  async getPlan(key) { return mem().plans.find((p) => p.key === key) ?? null; },
  async getPlanByCode(code) { return mem().plans.find((p) => p.plan_code === code) ?? null; },
  async lastSubscriptionInvoice(email, planCode) {
    const hit = [...mem().invoices].reverse().find((i) => i.kind === "subscription" && i.client_email === email.toLowerCase() && i.paystack_plan === planCode);
    return hit ? { ...hit } : null;
  },
  async upsertPlan(row) { const m = mem(); m.plans = m.plans.filter((p) => p.key !== row.key); m.plans.push(row); },
};

export const db = new Proxy({} as typeof supabase, {
  get(_t, prop: keyof typeof supabase) {
    const impl = useMemory() ? memory : supabase;
    return impl[prop];
  },
});
