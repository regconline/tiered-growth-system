import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import { cities } from "@/data/locations";
import { SITE } from "@/data/site";

export default function Footer() {
  const featuredCities = cities.slice(0, 8);
  const year = new Date().getFullYear();

  return (
    <footer className="hero-gradient text-primary-foreground">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div>
            <div className="mb-4">
              <img
                src="/assets/regc-logo.png"
                alt="REGC Digital"
                className="h-14 md:h-16 w-auto brightness-0 invert"
                width={220}
                height={56}
              />
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Healthcare digital marketing specialists. We help medical practices grow their patient base through proven digital strategies.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceDetails.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Industries</h4>
            <ul className="space-y-2">
              <li><Link href="/domains/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">All Industries</Link></li>
              {domains.slice(0, 6).map((d) => (
                <li key={d.slug}>
                  <Link href={`/domains/${d.slug}/`} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{d.shortName}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Locations</h4>
            <ul className="space-y-2">
              <li><Link href="/locations/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">All Locations</Link></li>
              {featuredCities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/healthcare-marketing-${c.slug}/`} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link href="/about/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link href="/services/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">All Services</Link></li>
              <li><Link href="/domains/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Industries</Link></li>
              <li><Link href="/blog/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link href="/contact/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href={`tel:${SITE.phoneIntl}`} className="hover:text-primary-foreground transition-colors">{SITE.phone}</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-primary-foreground transition-colors">{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © {year} REGC Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
