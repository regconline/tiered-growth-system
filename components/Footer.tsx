import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import { cities } from "@/data/locations";
import { SITE } from "@/data/site";

export default function Footer() {
  const featuredCities = cities.slice(0, 8);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(222_65%_10%)] text-white/80">
      {/* top glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-[hsl(168_48%_40%/0.5)] to-transparent" />

      <div className="container max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <img src="/assets/regc-logo.png" alt="REGC Digital" className="h-11 w-auto brightness-0 invert mb-5" width={220} height={56} />
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              Healthcare digital marketing specialists. We help South African medical practices attract more patients through proven digital strategies.
            </p>
            <Link href="/contact/" className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(168_48%_60%)] hover:text-[hsl(168_48%_70%)] transition-colors">
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
                <Link href="/services/" className="text-xs text-[hsl(168_48%_55%)] hover:text-[hsl(168_48%_65%)] transition-colors">All services →</Link>
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
                <Link href="/domains/" className="text-xs text-[hsl(168_48%_55%)] hover:text-[hsl(168_48%_65%)] transition-colors">All industries →</Link>
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
                <Link href="/locations/" className="text-xs text-[hsl(168_48%_55%)] hover:text-[hsl(168_48%_65%)] transition-colors">All locations →</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${SITE.phoneIntl}`} className="flex items-center gap-2 text-xs text-white/50 hover:text-white/85 transition-colors group">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-[hsl(168_48%_55%)]" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-xs text-white/50 hover:text-white/85 transition-colors group">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-[hsl(168_48%_55%)]" /> {SITE.email}
                </a>
              </li>
              <li className="mt-4">
                <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[hsl(168_48%_40%/0.2)] border border-[hsl(168_48%_40%/0.3)] text-[hsl(168_48%_60%)] text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[hsl(168_48%_40%/0.35)] transition-colors">
                  WhatsApp us
                </a>
              </li>
            </ul>
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
