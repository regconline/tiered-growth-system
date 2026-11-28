"use client";

import { useState, useCallback, useEffect, type FormEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons";

// reCAPTCHA is only downloaded when a site key is configured.
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const MESSAGE_MAX = 1500;

export const SERVICE_OPTIONS = [
  "Website Services",
  "Social Media Management",
  "Content Marketing",
  "Reputation Management",
  "Branding",
  "Complete digital partnership",
  "Not sure — please advise",
];

const PRACTICE_TYPES = [
  "GP / Family practice",
  "Dentist / Dental practice",
  "Specialist (surgeon, physician, etc.)",
  "Physio / Biokinetics / Podiatry",
  "Psychology / Counselling",
  "Pharmacy",
  "Nursing / Home-based care",
  "Optometry",
  "Allied or complementary health",
  "Clinic / Medical centre / Hospital",
  "Other",
];

const TIMELINES = ["As soon as possible", "Within 1 month", "1–3 months", "Just researching"];

export interface InquiryFormProps {
  variant?: "contact" | "quick" | "service";
  /** service page context */
  service?: { title: string; slug: string; packages: string[] };
  /** analytics / email label for where the form lives */
  source?: string;
  heading?: string;
  subheading?: string;
  className?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function InquiryForm({
  variant = "contact",
  service,
  source = "contact-page",
  heading,
  subheading,
  className = "",
}: InquiryFormProps) {
  const isService = variant === "service";
  const isQuick = variant === "quick";

  const [form, setForm] = useState({
    name: "",
    practice: "",
    email: "",
    phone: "",
    service: service?.title ?? "",
    pkg: "",
    practiceType: "",
    timeline: "",
    message: "",
    consent: false,
    website: "", // honeypot
  });
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState(false);

  // Clicking "Enquire about <package>" on a pricing card pre-selects that package.
  useEffect(() => {
    if (!isService || !service) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-package]") as HTMLElement | null;
      if (!el) return;
      const name = el.dataset.package ?? "";
      const match = service.packages.find((p) => p.startsWith(name));
      if (match) setForm((f) => ({ ...f, pkg: match }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isService, service]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const whatsappHref = useCallback(() => {
    const lines = [
      `Hi REGC Digital, I'd like to enquire${form.service ? ` about ${form.service}` : ""}.`,
      "",
      `*Name:* ${form.name}`,
      form.practice ? `*Practice:* ${form.practice}` : null,
      form.email ? `*Email:* ${form.email}` : null,
      form.phone ? `*Phone:* ${form.phone}` : null,
      form.pkg ? `*Package:* ${form.pkg}` : null,
      form.practiceType ? `*Practice type:* ${form.practiceType}` : null,
      form.timeline ? `*Timeline:* ${form.timeline}` : null,
      "",
      form.message,
    ].filter((l): l is string => l !== null);
    return `${SITE.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [form]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setFallback(false);
    if (!form.consent) {
      setError("Please confirm we may contact you about your enquiry.");
      setStatus("error");
      return;
    }
    if (RECAPTCHA_SITE_KEY && !token) {
      setError("Please complete the reCAPTCHA check.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          practice: form.practice,
          email: form.email,
          phone: form.phone,
          service: form.service,
          package: form.pkg,
          practiceType: form.practiceType,
          timeline: form.timeline,
          message: form.message,
          website: form.website,
          consent: form.consent,
          source,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          recaptchaToken: token,
        }),
      });
      if (res.ok) {
        setStatus("success");
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "generate_lead", form_source: source, form_service: form.service || "unspecified" });
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "We couldn't send your message right now.");
      setFallback(true);
      setStatus("error");
    } catch {
      setError("We couldn't reach the server.");
      setFallback(true);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`card p-8 text-center md:p-10 animate-fade-up ${className}`} role="status" aria-live="polite">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/12">
          <CheckCircle2 className="h-9 w-9 text-[#1fa855]" />
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground">Thank you, {form.name.split(" ")[0] || "we've got it"}!</h3>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Your {isService ? `${service?.title} ` : ""}enquiry has been received. We&apos;ll be in touch within one business day.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn border border-[#25D366]/40 bg-[#25D366]/10 text-foreground hover:bg-[#25D366]/20">
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Need it faster? WhatsApp us
          </a>
          <Link href="/blog/" className="btn-secondary">Read our guides</Link>
        </div>
      </div>
    );
  }

  const field = "field";
  const label = "field-label";

  return (
    <form onSubmit={onSubmit} noValidate={false} className={`card relative p-6 md:p-8 ${className}`}>
      {(heading || subheading) && (
        <div className="mb-6">
          {heading && <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">{heading}</h3>}
          {subheading && <p className="mt-1.5 text-sm text-muted-foreground">{subheading}</p>}
        </div>
      )}

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} /></label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${source}-name`} className={label}>Full name <span className="text-secondary">*</span></label>
          <input id={`${source}-name`} required minLength={2} maxLength={120} autoComplete="name" value={form.name} onChange={set("name")} className={field} placeholder="Dr Thandi Nkosi" />
        </div>
        <div>
          <label htmlFor={`${source}-practice`} className={label}>Practice name</label>
          <input id={`${source}-practice`} maxLength={160} autoComplete="organization" value={form.practice} onChange={set("practice")} className={field} placeholder="Nkosi Family Practice" />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className={label}>Email <span className="text-secondary">*</span></label>
          <input id={`${source}-email`} required type="email" maxLength={200} autoComplete="email" value={form.email} onChange={set("email")} className={field} placeholder="you@practice.co.za" />
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className={label}>Phone / WhatsApp {isQuick ? "" : <span className="text-secondary">*</span>}</label>
          <input id={`${source}-phone`} required={!isQuick} type="tel" maxLength={40} autoComplete="tel" value={form.phone} onChange={set("phone")} className={field} placeholder="082 000 0000" />
        </div>

        {variant === "contact" && (
          <div className="sm:col-span-2">
            <label htmlFor={`${source}-service`} className={label}>Service of interest</label>
            <select id={`${source}-service`} value={form.service} onChange={set("service")} className={field}>
              <option value="">Select a service…</option>
              {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        )}

        {isService && service && (
          <>
            <div>
              <label htmlFor={`${source}-pkg`} className={label}>Package of interest</label>
              <select id={`${source}-pkg`} value={form.pkg} onChange={set("pkg")} className={field}>
                <option value="">Select a package…</option>
                {service.packages.map((p) => <option key={p}>{p}</option>)}
                <option>Not sure — recommend one</option>
              </select>
            </div>
            <div>
              <label htmlFor={`${source}-timeline`} className={label}>When would you like to start?</label>
              <select id={`${source}-timeline`} value={form.timeline} onChange={set("timeline")} className={field}>
                <option value="">Select a timeline…</option>
                {TIMELINES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </>
        )}

        {!isQuick && (
          <div className={isService ? "sm:col-span-2" : "sm:col-span-2"}>
            <label htmlFor={`${source}-type`} className={label}>Type of practice</label>
            <select id={`${source}-type`} value={form.practiceType} onChange={set("practiceType")} className={field}>
              <option value="">Select your practice type…</option>
              {PRACTICE_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        )}

        <div className="sm:col-span-2">
          <label htmlFor={`${source}-message`} className={label}>
            {isService ? `Tell us about your ${service?.title.toLowerCase()} goals` : "How can we help?"} <span className="text-secondary">*</span>
          </label>
          <textarea
            id={`${source}-message`}
            required
            minLength={10}
            rows={isQuick ? 3 : 5}
            maxLength={MESSAGE_MAX}
            value={form.message}
            onChange={set("message")}
            className={`${field} resize-y`}
            placeholder={isService ? "e.g. current situation, what you'd like to achieve, any deadlines…" : "Tell us about your practice and what you'd like to achieve…"}
          />
          {!isQuick && <p className="mt-1 text-right text-[11px] text-muted-foreground">{form.message.length}/{MESSAGE_MAX}</p>}
        </div>
      </div>

      <label className="mt-4 flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
        <input type="checkbox" required checked={form.consent} onChange={set("consent")} className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#c4317a]" />
        <span>
          I agree that REGC Digital may contact me about this enquiry. My details are handled according to the{" "}
          <Link href="/privacy-policy/" className="font-medium text-secondary underline-offset-2 hover:underline">privacy policy</Link> (POPIA).
        </span>
      </label>

      {RECAPTCHA_SITE_KEY && (
        <div className="mt-4 flex justify-center">
          <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={(t: string | null) => setToken(t)} />
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          <p className="flex items-start gap-2 text-destructive"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>
          {fallback && (
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 font-semibold text-foreground hover:text-[#1fa855]">
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Send this enquiry on WhatsApp instead →
            </a>
          )}
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary mt-6 w-full !py-3.5 text-[15px]">
        {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> {isService ? `Send ${service?.title} enquiry` : isQuick ? "Request my free consultation" : "Send enquiry"}</>}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">We reply within one business day · No spam, ever.</p>
    </form>
  );
}
