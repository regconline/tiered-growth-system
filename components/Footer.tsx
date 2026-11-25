"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import { cities } from "@/data/locations";
import { SITE, SOCIAL } from "@/data/site";
import Logo from "@/components/Logo";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, TikTokIcon, LinkedInIcon } from "@/components/icons";

const socialLinks = [
  { href: SOCIAL.facebook, label: "Facebook", network: "facebook", Icon: FacebookIcon },
  { href: SOCIAL.instagram, label: "Instagram", network: "instagram", Icon: InstagramIcon },
  { href: SOCIAL.tiktok, label: "TikTok", network: "tiktok", Icon: TikTokIcon },
  { href: SOCIAL.linkedin, label: "LinkedIn", network: "linkedin", Icon: LinkedInIcon },
];

function track(event: string, data: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

const colLink = "text-sm text-white/55 transition-colors hover:text-white";
const colHead = "mb-4 font-display text-sm font-semibold tracking-wide text-white";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname() || "/";
  // pages that already end with a strong CTA don't need a second one
  const showCta = !(pathname === "/" || pathname.startsWith("/contact") || pathname.startsWith("/services/") || pathname.startsWith("/domains/") || pathname.startsWith("/admin") || pathname.startsWith("/pay/") || pathname.startsWith("/billing/"));

  return (
    <footer className="relative overflow-hidden bg-[#0b0710] text-white/80 print:hidden">
      <div className="h-px" style={{ background: "var(--gradient-cta)" }} />
      <div aria-hidden className="orb orb-purple" style={{ width: 560, height: 560, bottom: -320, right: -180, opacity: 0.6 }} />

      {/* CTA strip */}
      {showCta && (
      <div className="container relative max-w-7xl px-4 pt-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-display text-2xl font-bold text-white md:text-3xl">Ready for more patient bookings?</p>
            <p className="mt-2 text-white/60">Get a free, no-obligation review of your practice&apos;s online presence.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact/" className="btn-primary">Book a free consultation <ArrowRight className="h-4 w-4" /></Link>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("contact_click", { contact_method: "whatsapp" })}
              className="btn border border-[#25D366]/40 bg-[#25D366]/10 text-white hover:bg-[#25D366]/20"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
      )}

      <div className="container relative max-w-7xl px-4 pb-8 pt-14">
        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            <Link href="/" aria-label="REGC Digital — home"><Logo onDark size="lg" /></Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Specialist healthcare digital marketing. We help South African doctors, dentists and clinics attract more of the right patients — ethically and measurably.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`tel:${SITE.phoneIntl}`} onClick={() => track("contact_click", { contact_method: "phone" })} className="inline-flex items-center gap-2.5 text-white/70 hover:text-white">
                  <Phone className="h-4 w-4 text-[#ff7aa8]" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} onClick={() => track("contact_click", { contact_method: "email" })} className="inline-flex items-center gap-2.5 text-white/70 hover:text-white">
                  <Mail className="h-4 w-4 text-[#ff7aa8]" /> {SITE.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/55"><Clock className="h-4 w-4 text-[#ff7aa8]" /> {SITE.hours}</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className={colHead}>Services</p>
            <ul className="space-y-2.5">
              {serviceDetails.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}/`} className={colLink}>{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className={colHead}>Industries</p>
            <ul className="space-y-2.5">
              {domains.slice(0, 9).map((d) => (
                <li key={d.slug}><Link href={`/domains/${d.slug}/`} className={colLink}>{d.shortName}</Link></li>
              ))}
              <li><Link href="/domains/" className="text-sm font-medium text-[#ff7aa8] hover:text-white">All industries →</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={colHead}>Locations</p>
            <ul className="space-y-2.5">
              {cities.slice(0, 8).map((c) => (
                <li key={c.slug}><Link href={`/healthcare-marketing-${c.slug}/`} className={colLink}>{c.name}</Link></li>
              ))}
              <li><Link href="/locations/" className="text-sm font-medium text-[#ff7aa8] hover:text-white">All locations →</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex items-center gap-2 text-xs text-white/45">
            <ShieldCheck className="h-4 w-4 text-[#25D366]" /> HPCSA advertising &amp; POPIA aligned · CIPC registered · B-BBEE certified
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, network, Icon }) => (
              <a
                key={network}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`REGC Digital on ${label}`}
                onClick={() => track("social_click", { social_network: network })}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-[#c4317a]/60 hover:bg-[#c4317a]/20 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>© {year} REGC Digital. All rights reserved.</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/about/" className="hover:text-white/80">About</Link>
            <Link href="/services/" className="hover:text-white/80">Services</Link>
            <Link href="/blog/" className="hover:text-white/80">Blog</Link>
            <Link href="/contact/" className="hover:text-white/80">Contact</Link>
            <Link href="/terms/" className="hover:text-white/80">Terms</Link>
            <Link href="/refund-policy/" className="hover:text-white/80">Refunds</Link>
            <Link href="/privacy-policy/" className="hover:text-white/80">Privacy policy</Link>
            <Link href="/sitemap.xml" prefetch={false} className="hover:text-white/80">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
