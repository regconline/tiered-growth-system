"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  fade?: boolean;
}

export default function AnimateIn({ children, className = "", delay = 0, fade = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cls = fade ? ["animate-fade-hidden", "animate-fade-visible"]
                     : ["animate-in-hidden",   "animate-in-visible"];

    el.classList.add(cls[0]);
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.replace(cls[0], cls[1]);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, fade]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
