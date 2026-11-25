import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { startSubscription, UserError } from "@/lib/billing/service";
import { paystackConfigured } from "@/lib/billing/paystack";
import { billingDbConfigured } from "@/lib/billing/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/<[^>]*>/g, "").trim().slice(0, max) : "");

export async function POST(req: Request) {
  if (!paystackConfigured() || !billingDbConfigured()) {
    return NextResponse.json({ error: "Online sign-up isn't available yet. Please request a quote or WhatsApp us." }, { status: 503 });
  }
  const limit = rateLimit(`subscribe:${getClientIp(req)}`, 8, 10 * 60 * 1000);
  if (!limit.ok) return NextResponse.json({ error: "Too many attempts. Please try again shortly." }, { status: 429 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (typeof body.website === "string" && body.website) return NextResponse.json({ error: "Invalid request." }, { status: 400 }); // honeypot

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const practice = clean(body.practice, 160);
  const planKey = clean(body.planKey, 80);
  if (name.length < 2) return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (body.terms !== true) return NextResponse.json({ error: "Please accept the terms to continue." }, { status: 400 });

  try {
    const url = await startSubscription({ planKey, name, email, practice });
    return NextResponse.json({ url });
  } catch (e) {
    if (e instanceof UserError) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error("[billing] subscribe failed", e);
    return NextResponse.json({ error: "We couldn't start the checkout. Please try again or WhatsApp us." }, { status: 502 });
  }
}
