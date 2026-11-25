"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

/**
 * Cloudflare Turnstile — free, privacy-friendly bot protection.
 * Renders nothing (and loads no script) unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 * The Cloudflare script is only downloaded once a form is on screen.
 */

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type RenderOptions = {
  sitekey: string;
  action?: string;
  theme?: "auto" | "light" | "dark";
  size?: "normal" | "flexible" | "compact";
  appearance?: "always" | "execute" | "interaction-only";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: RenderOptions) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => { scriptPromise = null; reject(new Error("Turnstile failed to load")); };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export interface TurnstileHandle {
  reset: () => void;
}

interface Props {
  action?: string;
  onToken: (token: string | null) => void;
  className?: string;
}

const Turnstile = forwardRef<TurnstileHandle, Props>(function Turnstile({ action, onToken, className = "" }, ref) {
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useImperativeHandle(ref, () => ({
    reset: () => {
      cb.current(null);
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !box.current) return;
    const el = box.current;
    let cancelled = false;

    const render = () => {
      loadScript()
        .then(() => {
          if (cancelled || !window.turnstile || widgetId.current) return;
          widgetId.current = window.turnstile.render(el, {
            sitekey: TURNSTILE_SITE_KEY,
            action,
            theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
            size: "flexible",
            appearance: "interaction-only", // invisible for most visitors; shows a checkbox only if needed
            callback: (t) => cb.current(t),
            "expired-callback": () => cb.current(null),
            "error-callback": () => cb.current(null),
          });
        })
        .catch(() => cb.current(null));
    };

    // only load Cloudflare's script when the form scrolls near the viewport
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); render(); }
    }, { rootMargin: "400px" });
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [action]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={box} className={`min-h-0 ${className}`} />;
});

export default Turnstile;
