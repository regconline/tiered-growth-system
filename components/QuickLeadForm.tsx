"use client";

import { useState, useRef, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const WHATSAPP_NUMBER = "27640826855";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface QuickLeadState {
  name: string;
  practice: string;
  email: string;
  phone: string;
  message: string;
  website: string;
}

export default function QuickLeadForm() {
  const [form, setForm] = useState<QuickLeadState>({
    name: "",
    practice: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onChange = (k: keyof QuickLeadState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
        body: JSON.stringify({
          ...form,
          service: "Free consultation (homepage)",
          recaptchaToken,
        }),
      });

      if (res.ok) {
        setStatus("success");
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "quick_lead_submit",
            form_location: "homepage_cta",
          });
        }
        setForm({ name: "", practice: "", email: "", phone: "", message: "", website: "" });
        recaptchaRef.current?.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Please try WhatsApp instead.");
        setStatus("error");
        recaptchaRef.current?.reset();
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not send. Please try WhatsApp instead.");
      recaptchaRef.current?.reset();
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-white mb-2">Thanks — message sent!</h3>
        <p className="text-white/80 mb-4">
          We'll be in touch within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white rounded-lg px-5 py-2 font-semibold text-sm transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm text-white placeholder:text-white/55 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40";

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-7 space-y-4 shadow-xl"
    >
      <div className="text-left">
        <h3 className="font-display text-xl font-bold text-white mb-1">Get started in 30 seconds</h3>
        <p className="text-sm text-white/75">
          Tell us about your practice — we'll reply within one business day.
        </p>
      </div>

      {/* Honeypot */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
      >
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          required
          type="text"
          maxLength={120}
          value={form.name}
          onChange={onChange("name")}
          className={inputCls}
          placeholder="Your name *"
          aria-label="Your name"
        />
        <input
          type="text"
          maxLength={160}
          value={form.practice}
          onChange={onChange("practice")}
          className={inputCls}
          placeholder="Practice name"
          aria-label="Practice name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          required
          type="email"
          value={form.email}
          onChange={onChange("email")}
          className={inputCls}
          placeholder="Email *"
          aria-label="Email"
        />
        <input
          type="tel"
          value={form.phone}
          onChange={onChange("phone")}
          className={inputCls}
          placeholder="Phone (optional)"
          aria-label="Phone"
        />
      </div>

      <textarea
        rows={3}
        maxLength={500}
        value={form.message}
        onChange={onChange("message")}
        className={inputCls}
        placeholder="What would you like help with? (optional)"
        aria-label="Message"
      />

      {RECAPTCHA_SITE_KEY && (
        <div className="flex justify-center">
          <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} theme="dark" />
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-pink-200 text-center">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 w-full bg-white text-purple-900 hover:bg-white/90 rounded-lg px-6 py-3 font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {status === "submitting" ? "Sending…" : "Request my free consultation"}
      </button>

      <p className="text-[11px] text-white/60 text-center">
        Prefer WhatsApp?{" "}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Message us instantly
        </a>
        .
      </p>
    </form>
  );
}
