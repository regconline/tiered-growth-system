import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";

interface Props {
  pathname: string;
}

export default function Navbar({ pathname }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<"services" | "domains" | null>(null);

  const path = pathname.replace(/\/$/, "") || "/";
  const isActive = (p: string) => path === p;
  const isServiceActive = path.startsWith("/services");
  const isDomainActive = path.startsWith("/domains");

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" aria-label="REGC Digital home" className="flex items-center">
            <img src="/assets/regc-logo.png" alt="REGC Digital" className="h-12 md:h-14 w-auto" width={220} height={56} />
          </a>

          <div className="hidden md:flex items-center gap-1">
            <a href="/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Home</a>
            <a href="/about/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/about") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>About</a>

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
                <a href="/services/" className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-muted">All Services Overview</a>
                <div className="border-t border-border my-1" />
                {serviceDetails.map((s) => (
                  <a key={s.slug} href={`/services/${s.slug}/`} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <span>{s.icon}</span><span>{s.title}</span>
                  </a>
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
                <a href="/domains/" className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-muted">All Industries Overview</a>
                <div className="border-t border-border my-1" />
                {domains.map((d) => (
                  <a key={d.slug} href={`/domains/${d.slug}/`} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <span>{d.emoji}</span><span>{d.shortName}</span>
                  </a>
                ))}
              </div>
            </div>

            <a href="/blog/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${path.startsWith("/blog") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Blog</a>
            <a href="/contact/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/contact") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Contact</a>
          </div>

          <a href="/contact/" className="hidden md:inline-flex bg-secondary text-secondary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors">Get Started</a>

          <button className="md:hidden p-2 text-foreground" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border max-h-[80vh] overflow-y-auto">
            <a href="/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted">Home</a>
            <a href="/about/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted">About</a>
            <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileSubmenu(mobileSubmenu === "services" ? null : "services")}>
              Services <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === "services" ? "rotate-180" : ""}`} />
            </button>
            {mobileSubmenu === "services" && (
              <div className="bg-muted/50 pl-6">
                <a href="/services/" className="block px-4 py-2 text-sm font-semibold text-primary">All Services</a>
                {serviceDetails.map((s) => (
                  <a key={s.slug} href={`/services/${s.slug}/`} className="block px-4 py-2 text-sm text-foreground">{s.icon} {s.title}</a>
                ))}
              </div>
            )}
            <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileSubmenu(mobileSubmenu === "domains" ? null : "domains")}>
              Industries <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === "domains" ? "rotate-180" : ""}`} />
            </button>
            {mobileSubmenu === "domains" && (
              <div className="bg-muted/50 pl-6">
                <a href="/domains/" className="block px-4 py-2 text-sm font-semibold text-primary">All Industries</a>
                {domains.map((d) => (
                  <a key={d.slug} href={`/domains/${d.slug}/`} className="block px-4 py-2 text-sm text-foreground">{d.emoji} {d.shortName}</a>
                ))}
              </div>
            )}
            <a href="/blog/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted">Blog</a>
            <a href="/contact/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted">Contact</a>
            <div className="px-4 pt-2">
              <a href="/contact/" className="block text-center bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold">Get Started</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
