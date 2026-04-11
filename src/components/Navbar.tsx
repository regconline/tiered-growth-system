import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isServiceActive = location.pathname.startsWith("/services");

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-display text-xl font-bold text-primary">
            REGC<span className="text-secondary">Digital</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/about") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isServiceActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
                onMouseEnter={() => setServicesOpen(true)}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-72 bg-card rounded-lg border border-border shadow-xl py-2 transition-all ${
                  servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  to="/services"
                  className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-muted transition-colors"
                  onClick={() => setServicesOpen(false)}
                >
                  All Services Overview
                </Link>
                <div className="border-t border-border my-1" />
                {serviceDetails.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/contact") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-flex bg-secondary text-secondary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors"
          >
            Get Started
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link to="/" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <button
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="bg-muted/50 pl-6">
                <Link to="/services" className="block px-4 py-2 text-sm font-semibold text-primary" onClick={() => setMobileOpen(false)}>
                  All Services
                </Link>
                {serviceDetails.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="block px-4 py-2 text-sm text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.icon} {s.title}
                  </Link>
                ))}
              </div>
            )}
            <Link to="/contact" className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            <div className="px-4 pt-2">
              <Link
                to="/contact"
                className="block text-center bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
