"use client";

import { useState, useRef, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const WHATSAPP_NUMBER = "27640826855";
const MESSAGE_MAX = 1000;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface FormState {
  name: string;
  practice: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    practice: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const recaptchaToken = recaptchaRef.current?.getValue();
    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setErrorMsg("Please complete the reCAPTCHA verification.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });

      if (res.ok) {
        setStatus("success");
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "contact_form_submit",
            form_service: form.service || "unspecified",
          });
        }
        setForm({ name: "", practice: "", email: "", phone: "", service: "", message: "", website: "" });
        recaptchaRef.current?.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Please try WhatsApp instead.");
        setStatus("error");
        recaptchaRef.current?.reset();
        openWhatsApp();
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not send — opening WhatsApp as backup.");
      recaptchaRef.current?.reset();
      openWhatsApp();
    }
  };

  const openWhatsApp = () => {
    const lines = [
      `Hi REGC Digital, I'd like to enquire about your services.`,
      ``,
      `*Name:* ${form.name}`,
      form.practice && `*Practice:* ${form.practice}`,
      `*Email:* ${form.email}`,
      form.phone && `*Phone:* ${form.phone}`,
      form.service && `*Service of interest:* ${form.service}`,
      ``,
      `*Message:*`,
      form.message,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const inputCls = "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  if (status === "success") {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
        <CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-foreground mb-2">Message sent!</h3>
        <p className="text-muted-foreground mb-4">We've received your enquiry and will get back to you within one business day.</p>
        <button
          onClick={() => setStatus("idle")}
          className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-lg px-6 py-2.5 font-semibold hover:bg-secondary/90 transition-colors text-sm"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Honeypot — hidden from real users; bots will fill it */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website (leave blank)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={onChange("website")}
            name="website"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Your name *</label>
          <input required type="text" maxLength={120} value={form.name} onChange={onChange("name")} className={inputCls} placeholder="Dr Jane Smith" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Practice name</label>
          <input type="text" value={form.practice} onChange={onChange("practice")} className={inputCls} placeholder="Smith Medical Centre" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
          <input required type="email" value={form.email} onChange={onChange("email")} className={inputCls} placeholder="you@practice.co.za" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
          <input type="tel" value={form.phone} onChange={onChange("phone")} className={inputCls} placeholder="064 082 6855" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Service of interest</label>
        <select value={form.service} onChange={onChange("service")} className={inputCls}>
          <option value="">Select a service…</option>
          <option>Website Design &amp; Development</option>
          <option>SEO &amp; Local Search</option>
          <option>Google Ads &amp; PPC</option>
          <option>Social Media Management</option>
          <option>Reputation &amp; Reviews</option>
          <option>Email &amp; Patient Communication</option>
          <option>Branding &amp; Design</option>
          <option>Photography &amp; Video</option>
          <option>Analytics &amp; Reporting</option>
          <option>Strategy &amp; Consulting</option>
          <option>I'm not sure — please advise</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">How can we help? *</label>
        <textarea
          required
          rows={5}
          maxLength={MESSAGE_MAX}
          value={form.message}
          onChange={onChange("message")}
          className={inputCls}
          placeholder="Tell us about your practice and goals…"
        />
        <p className="mt-1 text-[11px] text-muted-foreground text-right">{form.message.length}/{MESSAGE_MAX}</p>
      </div>
      {RECAPTCHA_SITE_KEY && (
        <div className="flex justify-center">
          <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} theme="dark" />
        </div>
      )}
      {status === "error" && (
        <p className="text-sm text-destructive">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 w-full bg-secondary text-secondary-foreground rounded-lg px-6 py-3 font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" /> {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs text-muted-foreground text-center">We'll reply within one business day. WhatsApp is also available for instant contact.</p>
    </form>
  );
}
