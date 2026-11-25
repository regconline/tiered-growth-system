import "server-only";
import { createHmac, createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/** Password-protected admin for creating invoices. Set BILLING_ADMIN_PASSWORD in Vercel. */
export const ADMIN_COOKIE = "regc_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

const secret = () => process.env.BILLING_ADMIN_PASSWORD || "";
export const adminConfigured = () => secret().length >= 12;

const sign = (v: string) => createHmac("sha256", "regc-admin-v1:" + secret()).update(v).digest("base64url");

export function checkPassword(input: string) {
  if (!adminConfigured()) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(secret()).digest();
  return timingSafeEqual(a, b);
}

export function sessionValue() {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE);
  return { value: `${exp}.${sign(exp)}`, maxAge: MAX_AGE };
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const c = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  const [exp, sig] = c.split(".");
  if (!exp || !sig || Number(exp) * 1000 < Date.now()) return false;
  const expected = Buffer.from(sign(exp));
  const got = Buffer.from(sig);
  return expected.length === got.length && timingSafeEqual(expected, got);
}
