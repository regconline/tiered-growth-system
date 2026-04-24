import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  name: string;
  practice?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").trim().slice(0, 2000);
}

export async function POST(req: Request) {
  try {
    const body: ContactBody = await req.json();

    const name = sanitize(body.name);
    const practice = sanitize(body.practice);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const service = sanitize(body.service);
    const message = sanitize(body.message);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
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
        { status: 503 }
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
