import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

interface ContactBody {
  name: string;
  practice?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  website?: string;
}

const FIELD_LIMITS = {
  name: 120,
  practice: 160,
  email: 200,
  phone: 40,
  service: 120,
  message: 1000,
} as const;

function sanitize(str: unknown, max: number): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const o = new URL(origin).host;
    const host = req.headers.get("host") || "";
    if (o === host) return true;
    if (o.endsWith(".replit.dev") || o.endsWith(".replit.app")) return true;
    if (o.endsWith("regcdigital.co.za")) return true;
    if (o.endsWith(".vercel.app")) return true;
    return false;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    if (!originAllowed(req)) {
      return NextResponse.json({ error: "Forbidden origin." }, { status: 403 });
    }

    const ip = getClientIp(req);
    const limit = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!limit.ok) {
      const retryAfter = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));
      return NextResponse.json(
        { error: "Too many submissions. Please try again later or message us on WhatsApp." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }

    const body: ContactBody = await req.json();

    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const name = sanitize(body.name, FIELD_LIMITS.name);
    const practice = sanitize(body.practice, FIELD_LIMITS.practice);
    const email = sanitize(body.email, FIELD_LIMITS.email);
    const phone = sanitize(body.phone, FIELD_LIMITS.phone);
    const service = sanitize(body.service, FIELD_LIMITS.service);
    const message = sanitize(body.message, FIELD_LIMITS.message);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "Please provide a slightly longer message." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "Email service not configured. Please contact us via WhatsApp." },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const html = `
      <h2>New enquiry from REGC Digital website</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        ${practice ? `<tr><td><strong>Practice</strong></td><td>${practice}</td></tr>` : ""}
        <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ""}
        ${service ? `<tr><td><strong>Service</strong></td><td>${service}</td></tr>` : ""}
        <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        <tr><td colspan="2" style="font-size:11px;color:#888;padding-top:12px">Sent from regcdigital.co.za · IP ${ip}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: `"REGC Digital Website" <${smtpUser}>`,
      to: "info@regcdigital.co.za",
      replyTo: email,
      subject: `New enquiry from ${name}${practice ? ` — ${practice}` : ""}`,
      html,
      text: `Name: ${name}\nPractice: ${practice}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send. Please try WhatsApp." }, { status: 500 });
  }
}
