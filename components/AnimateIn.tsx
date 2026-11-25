"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  fade?: boolean;
  as?: ElementType;
}

// One shared observer for every reveal on the page (cheaper than one per element).
let observer: IntersectionObserver | null = null;
function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  return observer;
}

export default function AnimateIn({ children, className = "", delay = 0, fade = false, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("is-visible"); return; }
    const obs = getObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${fade ? "reveal-fade" : ""} ${className}`}
      style={delay ? { transitionDelay: `${Math.min(delay, 600)}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
