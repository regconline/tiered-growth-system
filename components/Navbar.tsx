"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<"services" | "domains" | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const path = pathname?.replace(/\/$/, "") || "/";
  const isActive = (p: string) => path === p;
  const isServiceActive  = path.startsWith("/services");
  const isDomainActive   = path.startsWith("/domains");
  const isLocationActive = path.startsWith("/locations") || path.startsWith("/healthcare-marketing");

  const linkBase = "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150";
  const linkActive   = `${linkBase} bg-primary text-primary-foreground`;
  const linkInactive = `${linkBase} text-foreground/75 hover:text-foreground hover:bg-muted`;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/96 backdrop-blur-lg shadow-[0_1px_24px_hsl(220_60%_10%/0.1)] border-b border-border"
          : "bg-card/90 backdrop-blur-md border-b border-border/60"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link href="/" aria-label="REGC Digital home" className="flex items-center shrink-0">
            <img
              src="/assets/regc-logo.png"
              alt="REGC Digital"
              className="h-12 md:h-[52px] w-auto"
              width={260}
              height={66}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            <Link href="/"         className={isActive("/")       ? linkActive : linkInactive}>Home</Link>
            <Link href="/about/"   className={isActive("/about")  ? linkActive : linkInactive}>About</Link>

            {/* Services dropdown */}
            <div className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={`${isServiceActive ? linkActive : linkInactive} flex items-center gap-1`}
                onClick={() => setServicesOpen(!servicesOpen)}>
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-72 bg-card rounded-2xl border border-border shadow-2xl py-2 transition-all duration-200 origin-top ${
                servicesOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}>
                <Link href="/services/" className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-muted rounded-lg mx-1"
                  onClick={() => setServicesOpen(false)}>All Services Overview →</Link>
                <div className="h-px bg-border mx-3 my-1.5" />
                {serviceDetails.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}/`}
                    className="flex items-center gap-2.5 px-4 py-2 mx-1 text-sm text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setServicesOpen(false)}>
                    <span className="text-base">{s.icon}</span><span>{s.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Industries dropdown */}
            <div className="relative"
              onMouseEnter={() => setDomainsOpen(true)}
              onMouseLeave={() => setDomainsOpen(false)}
            >
              <button className={`${isDomainActive ? linkActive : linkInactive} flex items-center gap-1`}
                onClick={() => setDomainsOpen(!domainsOpen)}>
                Industries
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${domainsOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full right-0 mt-2 w-80 max-h-[72vh] overflow-y-auto bg-card rounded-2xl border border-border shadow-2xl py-2 transition-all duration-200 origin-top ${
                domainsOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}>
                <Link href="/domains/" className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-muted rounded-lg mx-1"
                  onClick={() => setDomainsOpen(false)}>All Industries Overview →</Link>
                <div className="h-px bg-border mx-3 my-1.5" />
                {domains.map((d) => (
                  <Link key={d.slug} href={`/domains/${d.slug}/`}
                    className="flex items-center gap-2.5 px-4 py-2 mx-1 text-sm text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setDomainsOpen(false)}>
                    <span className="text-base">{d.emoji}</span><span>{d.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/locations/" className={isLocationActive ? linkActive : linkInactive}>Locations</Link>
            <Link href="/blog/"      className={path.startsWith("/blog") ? linkActive : linkInactive}>Blog</Link>
            <Link href="/contact/"   className={isActive("/contact") ? linkActive : linkInactive}>Contact</Link>
          </div>

          <Link href="/contact/"
            className="hidden md:inline-flex btn-primary text-sm">
            Get Started
          </Link>

          <button className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <line x1="4" y1="9"  x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${mobileOpen ? "max-h-[80vh]" : "max-h-0"}`}>
          <div className="pb-4 pt-1 border-t border-border overflow-y-auto max-h-[calc(80vh-4rem)]">
            <Link href="/"       className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg mx-1" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about/" className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg mx-1" onClick={() => setMobileOpen(false)}>About</Link>

            <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg mx-1"
              onClick={() => setMobileSubmenu(mobileSubmenu === "services" ? null : "services")}>
              Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === "services" ? "rotate-180" : ""}`} />
            </button>
            {mobileSubmenu === "services" && (
              <div className="bg-muted/40 rounded-xl mx-2 mb-1 py-1 pl-3">
                <Link href="/services/" className="block px-4 py-2 text-sm font-semibold text-primary" onClick={() => setMobileOpen(false)}>All Services</Link>
                {serviceDetails.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}/`} className="block px-4 py-2 text-sm text-foreground/75" onClick={() => setMobileOpen(false)}>{s.icon} {s.title}</Link>
                ))}
              </div>
            )}

            <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg mx-1"
              onClick={() => setMobileSubmenu(mobileSubmenu === "domains" ? null : "domains")}>
              Industries <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === "domains" ? "rotate-180" : ""}`} />
            </button>
            {mobileSubmenu === "domains" && (
              <div className="bg-muted/40 rounded-xl mx-2 mb-1 py-1 pl-3">
                <Link href="/domains/" className="block px-4 py-2 text-sm font-semibold text-primary" onClick={() => setMobileOpen(false)}>All Industries</Link>
                {domains.map((d) => (
                  <Link key={d.slug} href={`/domains/${d.slug}/`} className="block px-4 py-2 text-sm text-foreground/75" onClick={() => setMobileOpen(false)}>{d.emoji} {d.shortName}</Link>
                ))}
              </div>
            )}

            <Link href="/locations/" className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg mx-1" onClick={() => setMobileOpen(false)}>Locations</Link>
            <Link href="/blog/"      className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg mx-1" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/contact/"   className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg mx-1" onClick={() => setMobileOpen(false)}>Contact</Link>
            <div className="px-3 pt-2">
              <Link href="/contact/" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
