"use client";

import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { SITE } from "@/data/site";

const QUICK_REPLIES = [
  { label: "Book a free consultation", msg: "Hi REGC Digital! I'd like to book a free consultation for my practice." },
  { label: "Get pricing for a website", msg: "Hi REGC Digital! Please send me pricing for a practice website." },
  { label: "Help with branding", msg: "Hi REGC Digital! I'd like help with branding for my practice." },
  { label: "Social media management", msg: "Hi REGC Digital! I'm interested in social media management for my practice." },
];

function track(label: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "whatsapp_click", whatsapp_intent: label });
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [nudge, setNudge] = useState(false);

  // gentle one-time nudge bubble after 12s
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("wa-nudge") === "1"; } catch {}
    if (seen) return;
    const t = window.setTimeout(() => setNudge(true), 12000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dismissNudge = () => {
    setNudge(false);
    try { sessionStorage.setItem("wa-nudge", "1"); } catch {}
  };

  const send = (message: string, label: string) => {
    track(label);
    window.open(`${SITE.whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setOpen(false);
    setText("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with REGC Digital on WhatsApp"
          className="w-[340px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-3xl border bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] animate-fade-up origin-bottom-right"
        >
          <div className="relative bg-[#075E54] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <LogoMark className="w-11 h-11" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#075E54] bg-[#25D366]" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold leading-tight">REGC Digital</p>
                <p className="text-xs text-white/75">Typically replies within minutes</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="absolute right-3 top-3 rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 bg-muted/60 px-4 py-4 bg-grid">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-card px-4 py-3 text-sm shadow-sm border">
              <p className="text-foreground">Hi there 👋</p>
              <p className="mt-1 text-muted-foreground">How can we help your practice grow? Pick an option or type a message.</p>
            </div>
            <div className="flex flex-col gap-2">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.label}
                  onClick={() => send(q.msg, q.label)}
                  className="self-end rounded-full border border-[#25D366]/40 bg-card px-4 py-2 text-left text-sm font-medium text-foreground transition-colors hover:border-[#25D366] hover:bg-[#25D366]/10"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim()) send(text.trim(), "custom");
            }}
            className="flex items-center gap-2 border-t bg-card p-3"
          >
            <label htmlFor="wa-msg" className="sr-only">Your message</label>
            <input
              id="wa-msg"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message…"
              className="field !rounded-full !py-2.5"
            />
            <button
              type="submit"
              aria-label="Send on WhatsApp"
              disabled={!text.trim()}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {nudge && !open && (
        <div className="relative max-w-[240px] rounded-2xl rounded-br-sm border bg-card px-4 py-3 text-sm shadow-xl animate-fade-up">
          <button onClick={dismissNudge} aria-label="Dismiss" className="absolute -left-2 -top-2 rounded-full border bg-card p-0.5 text-muted-foreground hover:text-foreground">
            <X className="h-3 w-3" />
          </button>
          <p className="text-foreground">Questions about growing your practice? <span className="font-semibold">Chat with us on WhatsApp.</span></p>
        </div>
      )}

      <button
        type="button"
        onClick={() => { setOpen((o) => !o); dismissNudge(); }}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        aria-expanded={open}
        className="group relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.65)] transition-transform hover:scale-105 active:scale-95"
      >
        {!open && <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] animate-ping-soft" />}
        <span className="relative">
          {open ? <X className="h-7 w-7" /> : <WhatsAppIcon className="h-8 w-8" />}
        </span>
      </button>
    </div>
  );
}
