import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Minimal Paystack client (https://paystack.com/docs/api).
 * PAYSTACK_SECRET_KEY: sk_test_… while testing, sk_live_… when live.
 * PAYSTACK_API_BASE can point at a mock server for automated tests.
 */

const BASE = () => (process.env.PAYSTACK_API_BASE || "https://api.paystack.co").replace(/\/$/, "");

export function paystackConfigured() {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}

export function paystackMode(): "test" | "live" | "off" {
  const k = process.env.PAYSTACK_SECRET_KEY || "";
  if (!k) return "off";
  return k.startsWith("sk_live_") ? "live" : "test";
}

async function call<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
  const res = await fetch(BASE() + path, {
    method,
    cache: "no-store",
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = (await res.json().catch(() => ({}))) as { status?: boolean; message?: string; data?: T };
  if (!res.ok || json.status === false) throw new Error(`Paystack ${res.status}: ${json.message ?? "request failed"}`);
  return json.data as T;
}

export interface PaystackTransaction {
  id: number;
  status: string; // "success" | "failed" | "abandoned" | ...
  reference: string;
  amount: number; // cents
  currency: string;
  paid_at: string | null;
  channel: string;
  metadata: Record<string, unknown> | null | string;
  customer: { email: string; first_name: string | null; last_name: string | null; customer_code: string };
  plan: string | Record<string, unknown> | null;
  plan_object?: { plan_code?: string; name?: string; amount?: number } | null;
  authorization?: { last4?: string; card_type?: string; bank?: string } | null;
}

export function initializeTransaction(input: {
  email: string;
  amount: number; // cents
  reference?: string;
  plan?: string;
  callback_url: string;
  metadata: Record<string, unknown>;
  channels?: string[];
}) {
  return call<{ authorization_url: string; access_code: string; reference: string }>("POST", "/transaction/initialize", {
    ...input,
    currency: "ZAR",
  });
}

export function verifyTransaction(reference: string) {
  return call<PaystackTransaction>("GET", `/transaction/verify/${encodeURIComponent(reference)}`);
}

export function createPlan(input: { name: string; amount: number; interval: "monthly" | "annually" }) {
  return call<{ plan_code: string }>("POST", "/plan", { ...input, currency: "ZAR", send_invoices: false, send_sms: false });
}

/** True only if the webhook body was signed with our secret key (HMAC-SHA512). */
export function validSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !signature) return false;
  const expected = createHmac("sha512", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function planCodeOf(tx: PaystackTransaction): string | null {
  if (!tx.plan) return null;
  if (typeof tx.plan === "string") return tx.plan || null;
  const code = (tx.plan as { plan_code?: string }).plan_code;
  return code || tx.plan_object?.plan_code || null;
}

export function metadataOf(tx: PaystackTransaction): Record<string, unknown> {
  if (!tx.metadata) return {};
  if (typeof tx.metadata === "string") {
    try { return JSON.parse(tx.metadata); } catch { return {}; }
  }
  return tx.metadata;
}
