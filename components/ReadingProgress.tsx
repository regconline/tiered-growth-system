"use client";

import { useEffect, useRef } from "react";

/** Thin progress bar under the header while reading an article (no React re-renders on scroll). */
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden className="fixed left-0 right-0 top-[72px] z-40 h-[3px]">
      <div ref={bar} className="h-full origin-left" style={{ background: "var(--gradient-cta)", transform: "scaleX(0)" }} />
    </div>
  );
}
