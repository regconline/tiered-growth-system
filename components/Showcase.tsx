"use client";

import { useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import { SHOWCASE, type ShowcaseSite } from "@/data/showcase";

function Preview({ site }: { site: ShowcaseSite }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
      {/* Shown while the screenshot loads, or if it can't be generated */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary/15 via-muted to-primary/10 text-center">
        <Globe className="h-7 w-7 text-secondary" />
        <span className="font-display text-lg font-bold text-foreground">{site.domain}</span>
        {!failed && !loaded && <span className="text-xs text-muted-foreground">Loading preview…</span>}
      </div>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/api/showcase/${site.slug}/`}
          alt={`Homepage of ${site.domain}, designed by REGC Digital`}
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-700 group-hover:scale-[1.03] ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

export default function Showcase({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${className}`}>
      {SHOWCASE.map((site) => (
        <a
          key={site.slug}
          href={site.url}
          target="_blank"
          rel="noopener"
          className="group card card-hover block overflow-hidden p-0"
          aria-label={`Visit ${site.domain} (opens in a new tab)`}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </span>
            <span className="ml-2 flex-1 truncate rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">{site.domain}</span>
          </div>
          <Preview site={site} />
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <h3 className="font-display text-base font-bold text-foreground">{site.name}</h3>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">{site.practice}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-secondary">
              Visit site <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
