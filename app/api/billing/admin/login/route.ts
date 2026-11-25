import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { ADMIN_COOKIE, checkPassword, sessionValue } from "@/lib/billing/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const to = new URL("/admin/billing/", req.url);
  const limit = rateLimit(`admin-login:${getClientIp(req)}`, 5, 15 * 60 * 1000);
  const form = await req.formData().catch(() => null);
  const pw = String(form?.get("password") ?? "");
  if (!limit.ok || !checkPassword(pw)) {
    await new Promise((r) => setTimeout(r, 600));
    to.searchParams.set("error", limit.ok ? "Incorrect password." : "Too many attempts. Try again in 15 minutes.");
    return NextResponse.redirect(to, 303);
  }
  const res = NextResponse.redirect(to, 303);
  const s = sessionValue();
  res.cookies.set(ADMIN_COOKIE, s.value, { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: s.maxAge });
  return res;
}
