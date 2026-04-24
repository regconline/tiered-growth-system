"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<"services" | "domains" | null>(null);

  const path = pathname?.replace(/\/$/, "") || "/";
  const isActive = (p: string) => path === p;
  const isServiceActive = path.startsWith("/services");
  const isDomainActive = path.startsWith("/domains");
  const isLocationActive = path.startsWith("/locations") || path.startsWith("/healthcare-marketing");

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" aria-label="REGC Digital home" className="flex items-center">
            <img src="/assets/regc-logo.png" alt="REGC Digital" className="h-12 md:h-14 w-auto" width={220} height={56} />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Home</Link>
            <Link href="/about/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/about") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>About</Link>

            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isServiceActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
                onMouseEnter={() => setServicesOpen(true)}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-72 bg-card rounded-lg border border-border shadow-xl py-2 transition-all ${servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link href="/services/" className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-muted">All Services Overview</Link>
                <div className="border-t border-border my-1" />
                {serviceDetails.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}/`} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted" onClick={() => setServicesOpen(false)}>
                    <span>{s.icon}</span><span>{s.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative">
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDomainActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
                onMouseEnter={() => setDomainsOpen(true)}
                onClick={() => setDomainsOpen(!domainsOpen)}
              >
                Industries <ChevronDown className="w-4 h-4" />
              </button>
              <div
                className={`absolute top-full right-0 mt-1 w-80 max-h-[70vh] overflow-y-auto bg-card rounded-lg border border-border shadow-xl py-2 transition-all ${domainsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
                onMouseEnter={() => setDomainsOpen(true)}
                onMouseLeave={() => setDomainsOpen(false)}
              >
                <Link href="/domains/" className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-muted">All Industries Overview</Link>
                <div className="border-t border-border my-1" />
                {domains.map((d) => (
                  <Link key={d.slug} href={`/domains/${d.slug}/`} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted" onClick={() => setDomainsOpen(false)}>
                    <span>{d.emoji}</span><span>{d.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/locations/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isLocationActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Locations</Link>
            <Link href="/blog/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${path.startsWith("/blog") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Blog</Link>
            <Link href="/contact/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/contact") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Contact</Link>
          </div>

          <Link href="/contact/" className="hidden md:inline-flex bg-secondary text-secondary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors">Get Started</Link>

          <button className="md:hidden p-2 text-foreground" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border max-h-[80vh] overflow-y-auto">
            <Link href="/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>About</Link>
            <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileSubmenu(mobileSubmenu === "services" ? null : "services")}>
              Services <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === "services" ? "rotate-180" : ""}`} />
            </button>
            {mobileSubmenu === "services" && (
              <div className="bg-muted/50 pl-6">
                <Link href="/services/" className="block px-4 py-2 text-sm font-semibold text-primary" onClick={() => setMobileOpen(false)}>All Services</Link>
                {serviceDetails.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}/`} className="block px-4 py-2 text-sm text-foreground" onClick={() => setMobileOpen(false)}>{s.icon} {s.title}</Link>
                ))}
              </div>
            )}
            <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileSubmenu(mobileSubmenu === "domains" ? null : "domains")}>
              Industries <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === "domains" ? "rotate-180" : ""}`} />
            </button>
            {mobileSubmenu === "domains" && (
              <div className="bg-muted/50 pl-6">
                <Link href="/domains/" className="block px-4 py-2 text-sm font-semibold text-primary" onClick={() => setMobileOpen(false)}>All Industries</Link>
                {domains.map((d) => (
                  <Link key={d.slug} href={`/domains/${d.slug}/`} className="block px-4 py-2 text-sm text-foreground" onClick={() => setMobileOpen(false)}>{d.emoji} {d.shortName}</Link>
                ))}
              </div>
            )}
            <Link href="/locations/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Locations</Link>
            <Link href="/blog/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/contact/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Contact</Link>
            <div className="px-4 pt-2">
              <Link href="/contact/" className="block text-center bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
