import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

/**
 * Enquiry endpoint used by every form on the site.
 *
 * Email delivery uses Resend (https://resend.com) over its REST API — no SDK needed.
 * Environment variables (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY       required to send email
 *   CONTACT_TO_EMAIL     inbox that receives enquiries (default: regconline@gmail.com)
 *   RESEND_FROM_EMAIL    verified sender, e.g. "REGC Digital <hello@regcdigital.co.za>"
 *                        (default: Resend's test sender onboarding@resend.dev, which can
 *                        only deliver to the email address that owns the Resend account)
 *   TURNSTILE_SECRET_KEY optional; enables Cloudflare Turnstile bot verification
 *                        (pair with NEXT_PUBLIC_TURNSTILE_SITE_KEY for the widget)
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "regconline@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "REGC Digital Website <onboarding@resend.dev>";
const HAS_CUSTOM_SENDER = Boolean(process.env.RESEND_FROM_EMAIL);

const LIMITS = {
  name: 120, practice: 160, email: 200, phone: 40, service: 120, package: 120,
  practiceType: 120, timeline: 60, message: 1500, source: 60, page: 200,
} as const;
type Field = keyof typeof LIMITS;

function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/<[^>]*>/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const o = new URL(origin).host;
    const host = req.headers.get("host") || "";
    return o === host || o.endsWith("regcdigital.co.za") || o.endsWith(".vercel.app") || o.startsWith("localhost");
  } catch {
    return false;
  }
}

async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }).toString(),
    });
    const data: { success?: boolean; "error-codes"?: string[] } = await r.json();
    if (!data.success) console.warn("[contact] turnstile rejected", data["error-codes"]);
    return data.success === true;
  } catch (e) {
    console.error("[contact] turnstile verify error", e);
    return false;
  }
}

async function sendWithResend(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:10px 14px;border-bottom:1px solid #eee;color:#6b5a75;font-size:13px;width:150px;vertical-align:top">${label}</td><td style="padding:10px 14px;border-bottom:1px solid #eee;color:#1a0f22;font-size:14px;white-space:pre-wrap">${value}</td></tr>`;
}

export async function POST(req: Request) {
  try {
    if (!originAllowed(req)) return NextResponse.json({ error: "Forbidden origin." }, { status: 403 });

    const ip = getClientIp(req);
    const limit = rateLimit(`contact:${ip}`, 6, 10 * 60 * 1000);
    if (!limit.ok) {
      const retryAfter = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));
      return NextResponse.json(
        { error: "Too many submissions. Please try again later or message us on WhatsApp." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }

    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

    // honeypot — pretend success for bots
    if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ success: true });

    if (!(await verifyTurnstile(body.turnstileToken, ip))) {
      return NextResponse.json({ error: "Security check failed. Please try again, or send your enquiry on WhatsApp." }, { status: 400 });
    }

    const d = Object.fromEntries(
      (Object.keys(LIMITS) as Field[]).map((k) => [k, clean(body[k], LIMITS[k])]),
    ) as Record<Field, string>;

    if (!d.name || d.name.length < 2) return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (!d.message || d.message.length < 10) return NextResponse.json({ error: "Please tell us a little more (at least 10 characters)." }, { status: 400 });
    if (body.consent !== true) return NextResponse.json({ error: "Please confirm we may contact you." }, { status: 400 });

    if (!process.env.RESEND_API_KEY) {
      console.warn("[contact] RESEND_API_KEY not set — enquiry not emailed", { source: d.source, service: d.service });
      return NextResponse.json(
        { error: "Our email form is being set up. Please send your enquiry on WhatsApp — it only takes a second.", code: "email_not_configured" },
        { status: 503 },
      );
    }

    const subjectService = d.service ? ` · ${d.service}` : "";
    const subject = `New enquiry${subjectService} — ${d.name}${d.practice ? ` (${d.practice})` : ""}`;
    const submitted = new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" });
    const waNumber = d.phone.replace(/[^\d]/g, "").replace(/^0/, "27");

    const html = `<!doctype html><html><body style="margin:0;background:#f6f2f8;font-family:-apple-system,Segoe UI,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eadff0">
      <tr><td style="background:linear-gradient(100deg,#c4317a,#7b2d9e);padding:22px 24px;color:#fff">
        <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.85">REGC Digital · Website enquiry</div>
        <div style="font-size:20px;font-weight:700;margin-top:6px">${esc(d.service || "General enquiry")}</div>
      </td></tr>
      <tr><td style="padding:8px 10px 0">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row("Name", esc(d.name))}
          ${row("Practice", esc(d.practice))}
          ${row("Email", `<a href="mailto:${esc(d.email)}" style="color:#c4317a">${esc(d.email)}</a>`)}
          ${row("Phone", d.phone ? `${esc(d.phone)}${waNumber.length >= 10 ? ` · <a href="https://wa.me/${waNumber}" style="color:#1fa855">WhatsApp</a>` : ""}` : "")}
          ${row("Service", esc(d.service))}
          ${row("Package", esc(d.package))}
          ${row("Practice type", esc(d.practiceType))}
          ${row("Timeline", esc(d.timeline))}
          ${row("Message", esc(d.message))}
        </table>
      </td></tr>
      <tr><td style="padding:16px 24px 22px;color:#8a7a93;font-size:12px">
        Submitted ${esc(submitted)} from ${esc(d.page || "/")} (${esc(d.source || "website")}). Reply to this email to respond directly.
      </td></tr>
    </table>
  </td></tr></table></body></html>`;

    const text = [
      `New enquiry — ${d.service || "General"}`,
      `Name: ${d.name}`, `Practice: ${d.practice}`, `Email: ${d.email}`, `Phone: ${d.phone}`,
      `Package: ${d.package}`, `Practice type: ${d.practiceType}`, `Timeline: ${d.timeline}`,
      "", d.message, "", `Page: ${d.page} · Source: ${d.source} · ${submitted}`,
    ].join("\n");

    await sendWithResend({ from: FROM_EMAIL, to: [TO_EMAIL], reply_to: d.email, subject, html, text });

    // Auto-reply to the enquirer only once a verified sending domain is configured.
    if (HAS_CUSTOM_SENDER) {
      const first = esc(d.name.split(" ")[0] || d.name);
      await sendWithResend({
        from: FROM_EMAIL,
        to: [d.email],
        reply_to: TO_EMAIL,
        subject: "We've received your enquiry — REGC Digital",
        html: `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:560px;margin:auto;color:#1a0f22;line-height:1.6">
          <p>Hi ${first},</p>
          <p>Thank you for contacting REGC Digital${d.service ? ` about <strong>${esc(d.service)}</strong>` : ""}. We've received your enquiry and a member of our team will get back to you within one business day.</p>
          <p>Need us sooner? WhatsApp us on <a href="https://wa.me/27640826855">064 082 6855</a>.</p>
          <p>Kind regards,<br/>REGC Digital<br/><a href="https://www.regcdigital.co.za">www.regcdigital.co.za</a></p></div>`,
      }).catch((e) => console.error("[contact] auto-reply failed", e));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ error: "We couldn't send your message just now." }, { status: 500 });
  }
}
