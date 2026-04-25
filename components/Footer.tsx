"use client";

import Link from "next/link";
import { Mail, Phone, ArrowRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import { cities } from "@/data/locations";
import { SITE, SOCIAL } from "@/data/site";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const socialLinks = [
  { href: SOCIAL.facebook,  label: "Facebook",  network: "facebook",  Icon: Facebook,    rel: "noopener noreferrer" },
  { href: SOCIAL.instagram, label: "Instagram", network: "instagram", Icon: Instagram,   rel: "noopener noreferrer" },
  { href: SOCIAL.tiktok,    label: "TikTok",    network: "tiktok",    Icon: TikTokIcon,  rel: "noopener noreferrer" },
  { href: SOCIAL.linkedin,  label: "LinkedIn",  network: "linkedin",  Icon: Linkedin,    rel: "nofollow noopener noreferrer" },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.5 7.4a6.5 6.5 0 0 1-3.8-1.2v8.5a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.6a3 3 0 1 0 2.1 2.9V2h2.5a4 4 0 0 0 3.9 3.4v2Z"/>
    </svg>
  );
}

function trackSocialClick(network: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "social_click", social_network: network });
}

function trackContactClick(method: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "contact_click", contact_method: method });
}

export default function Footer() {
  const featuredCities = cities.slice(0, 8);
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a080d] text-white/80 overflow-hidden">
      {/* top gradient border */}
      <div className="h-px" style={{ background: "var(--gradient-accent)" }} />
      {/* subtle blob in corner */}
      <div
        aria-hidden
        className="blob blob-soft pointer-events-none"
        style={{ bottom: "-10rem", right: "-8rem", width: "26rem", height: "26rem", opacity: 0.35 }}
      />

      <div className="container max-w-6xl mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <img src="/assets/regc-logo.png" alt="REGC Digital" className="h-12 md:h-[52px] w-auto brightness-0 invert mb-5" width={260} height={66} />
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              Healthcare digital marketing specialists. We help South African medical practices attract more patients through proven digital strategies.
            </p>
            <Link href="/contact/" className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(329_60%_65%)] hover:text-[hsl(329_60%_75%)] transition-colors">
              Book a free consultation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">Services</h4>
            <ul className="space-y-2.5">
              {serviceDetails.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="text-xs text-white/50 hover:text-white/85 transition-colors">{s.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/services/" className="text-xs text-[hsl(329_60%_60%)] hover:text-[hsl(329_60%_70%)] transition-colors">All services →</Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">Industries</h4>
            <ul className="space-y-2.5">
              {domains.slice(0, 6).map((d) => (
                <li key={d.slug}>
                  <Link href={`/domains/${d.slug}/`} className="text-xs text-white/50 hover:text-white/85 transition-colors">{d.shortName}</Link>
                </li>
              ))}
              <li>
                <Link href="/domains/" className="text-xs text-[hsl(329_60%_60%)] hover:text-[hsl(329_60%_70%)] transition-colors">All industries →</Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">Locations</h4>
            <ul className="space-y-2.5">
              {featuredCities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/healthcare-marketing-${c.slug}/`} className="text-xs text-white/50 hover:text-white/85 transition-colors">{c.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/locations/" className="text-xs text-[hsl(329_60%_60%)] hover:text-[hsl(329_60%_70%)] transition-colors">All locations →</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${SITE.phoneIntl}`} onClick={() => trackContactClick("phone")} className="flex items-center gap-2 text-xs text-white/50 hover:text-white/85 transition-colors group">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-[hsl(329_60%_60%)]" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} onClick={() => trackContactClick("email")} className="flex items-center gap-2 text-xs text-white/50 hover:text-white/85 transition-colors group">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-[hsl(329_60%_60%)]" /> {SITE.email}
                </a>
              </li>
              <li className="mt-4">
                <a href={SITE.whatsappUrl} target="_blank" rel="nofollow noopener noreferrer" onClick={() => trackContactClick("whatsapp")}
                  className="inline-flex items-center gap-1.5 bg-[hsl(329_60%_48%/0.2)] border border-[hsl(329_60%_48%/0.3)] text-[hsl(329_60%_65%)] text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[hsl(329_60%_48%/0.35)] transition-colors">
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-6">
          <p className="text-xs text-white/45 font-medium">Follow REGC Digital</p>
          <div className="flex items-center gap-2.5">
            {socialLinks.map(({ href, label, network, Icon, rel }) => (
              <a
                key={network}
                href={href}
                target="_blank"
                rel={rel}
                aria-label={label}
                onClick={() => trackSocialClick(network)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-[hsl(329_60%_48%/0.25)] hover:border-[hsl(329_60%_48%/0.5)] transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="h-px bg-white/8 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {year} REGC Digital. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about/" className="hover:text-white/60 transition-colors">About</Link>
            <Link href="/contact/" className="hover:text-white/60 transition-colors">Contact</Link>
            <Link href="/blog/" className="hover:text-white/60 transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
