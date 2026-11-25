"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X, Menu, ArrowRight, Phone } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import { SITE } from "@/data/site";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { ServiceIcon, DomainIcon } from "@/components/ServiceIcon";

type Menu = "services" | "domains" | null;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<Menu>(null);
  const [mobileSub, setMobileSub] = useState<Menu>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on navigation
  useEffect(() => {
    setMobileOpen(false);
    setMenu(null);
    setMobileSub(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(null); setMobileOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (m: Menu) => { if (closeTimer.current) window.clearTimeout(closeTimer.current); setMenu(m); };
  const scheduleClose = () => { closeTimer.current = window.setTimeout(() => setMenu(null), 140); };

  const path = pathname?.replace(/\/$/, "") || "/";
  const active = (p: string, prefix = false) => (prefix ? path === p || path.startsWith(p + "/") : path === p);
  const locActive = path.startsWith("/locations") || path.startsWith("/healthcare-marketing");

  const link = (isActive: boolean) =>
    `relative px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${
      isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
    } after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#c4317a] after:to-[#9b3fc4] after:transition-transform after:duration-300 after:origin-left ${
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 border-b ${
        scrolled ? "glass border-border shadow-[0_8px_30px_-12px_hsl(var(--shadow-color)/0.25)]" : "bg-background/80 backdrop-blur border-transparent"
      }`}
    >
      <nav aria-label="Main" className="container max-w-7xl px-4">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" aria-label="REGC Digital — home" className="shrink-0 rounded-lg">
            <Logo />
          </Link>

          {/* Desktop */}
          <ul className="hidden lg:flex items-center gap-0.5">
            <li><Link href="/" className={link(active("/"))}>Home</Link></li>
            <li><Link href="/about/" className={link(active("/about"))}>About</Link></li>

            <li className="relative" onMouseEnter={() => open("services")} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className={`${link(active("/services", true))} inline-flex items-center gap-1`}
                aria-expanded={menu === "services"}
                aria-haspopup="true"
                onClick={() => setMenu(menu === "services" ? null : "services")}
              >
                Services <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${menu === "services" ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute left-1/2 top-full pt-3 -translate-x-1/2 transition-all duration-200 ${
                  menu === "services" ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
                }`}
              >
                <div className="w-[640px] rounded-2xl border bg-popover p-3 shadow-[0_30px_60px_-20px_hsl(var(--shadow-color)/0.4)]">
                  <div className="grid grid-cols-2 gap-1">
                    {serviceDetails.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}/`}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                      >
                        <span className="icon-tile h-9 w-9 shrink-0 text-secondary transition-transform group-hover:scale-110">
                          <ServiceIcon slug={s.slug} className="h-[18px] w-[18px]" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-foreground">{s.title}</span>
                          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground line-clamp-1">{s.tagline}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/services/" className="mt-2 flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-sm font-semibold text-foreground hover:text-secondary transition-colors">
                    View all services &amp; pricing <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </li>

            <li className="relative" onMouseEnter={() => open("domains")} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className={`${link(active("/domains", true))} inline-flex items-center gap-1`}
                aria-expanded={menu === "domains"}
                aria-haspopup="true"
                onClick={() => setMenu(menu === "domains" ? null : "domains")}
              >
                Industries <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${menu === "domains" ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute left-1/2 top-full pt-3 -translate-x-1/2 transition-all duration-200 ${
                  menu === "domains" ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
                }`}
              >
                <div className="w-[600px] rounded-2xl border bg-popover p-3 shadow-[0_30px_60px_-20px_hsl(var(--shadow-color)/0.4)]">
                  <div className="grid grid-cols-2 gap-0.5">
                    {domains.map((d) => (
                      <Link key={d.slug} href={`/domains/${d.slug}/`} className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground">
                        <DomainIcon slug={d.slug} className="h-4 w-4 text-secondary" />
                        <span className="line-clamp-1">{d.shortName}</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/domains/" className="mt-2 flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-sm font-semibold text-foreground hover:text-secondary transition-colors">
                    All healthcare industries <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </li>

            <li><Link href="/locations/" className={link(locActive)}>Locations</Link></li>
            <li><Link href="/blog/" className={link(active("/blog", true))}>Blog</Link></li>
            <li><Link href="/contact/" className={link(active("/contact"))}>Contact</Link></li>
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact/" className="btn-primary hidden !py-2.5 sm:inline-flex">
              Free consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card text-foreground lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>
    </header>

      {/* Mobile sheet — sibling of the header so `position: fixed` isn't trapped by its backdrop-filter */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t bg-background transition-[opacity,transform] duration-300 ${
          mobileOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <div className="container max-w-7xl px-4 py-4">
          <ul className="space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/about/", label: "About" },
            ].map((l) => (
              <li key={l.href}><Link href={l.href} className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted">{l.label}</Link></li>
            ))}
            {(["services", "domains"] as const).map((key) => (
              <li key={key}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted"
                  aria-expanded={mobileSub === key}
                  onClick={() => setMobileSub(mobileSub === key ? null : key)}
                >
                  {key === "services" ? "Services" : "Industries"}
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileSub === key ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${mobileSub === key ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="ml-4 border-l pl-3 py-1 space-y-0.5">
                      <Link href={key === "services" ? "/services/" : "/domains/"} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-secondary">
                        {key === "services" ? "All services & pricing" : "All industries"} →
                      </Link>
                      {key === "services"
                        ? serviceDetails.map((s) => (
                            <Link key={s.slug} href={`/services/${s.slug}/`} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:bg-muted">
                              <ServiceIcon slug={s.slug} className="h-4 w-4 text-secondary" /> {s.title}
                            </Link>
                          ))
                        : domains.map((d) => (
                            <Link key={d.slug} href={`/domains/${d.slug}/`} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:bg-muted">
                              <DomainIcon slug={d.slug} className="h-4 w-4 text-secondary" /> {d.shortName}
                            </Link>
                          ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {[
              { href: "/locations/", label: "Locations" },
              { href: "/blog/", label: "Blog" },
              { href: "/contact/", label: "Contact" },
            ].map((l) => (
              <li key={l.href}><Link href={l.href} className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted">{l.label}</Link></li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3 border-t pt-6">
            <Link href="/contact/" className="btn-primary w-full">Book a free consultation <ArrowRight className="h-4 w-4" /></Link>
            <a href={`tel:${SITE.phoneIntl}`} className="btn-secondary w-full"><Phone className="h-4 w-4" /> {SITE.phone}</a>
          </div>
        </div>
      </div>
    </>
  );
}
