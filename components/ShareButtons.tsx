"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { WhatsAppIcon, FacebookIcon, LinkedInIcon } from "@/components/icons";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn = "inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-secondary/50 hover:text-foreground";
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-medium text-muted-foreground">Share</span>
      <a className={btn} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><WhatsAppIcon className="h-4 w-4" /></a>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><LinkedInIcon /></a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><FacebookIcon /></a>
      <button
        type="button"
        className={btn}
        aria-label="Copy link"
        onClick={async () => {
          try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
        }}
      >
        {copied ? <Check className="h-4 w-4 text-[#1fa855]" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
