import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="hero-gradient text-primary-foreground">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo className="h-10 w-auto" inverted />
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Healthcare digital marketing specialists. We help medical practices grow their patient base through proven digital strategies.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceDetails.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-display font-bold mb-4">Industries</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/domains" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  All Industries
                </Link>
              </li>
              {domains.slice(0, 6).map((d) => (
                <li key={d.slug}>
                  <Link to={`/domains/${d.slug}`} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {d.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">All Services</Link></li>
              <li><Link to="/domains" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Industries</Link></li>
              <li><Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="tel:+27640826855" className="hover:text-primary-foreground transition-colors">064 082 6855</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <a href="mailto:info@regcdigital.co.za" className="block hover:text-primary-foreground transition-colors">info@regcdigital.co.za</a>
                  <a href="mailto:sales@regcdigital.co.za" className="block hover:text-primary-foreground transition-colors">sales@regcdigital.co.za</a>
                  <a href="mailto:support@regcdigital.co.za" className="block hover:text-primary-foreground transition-colors">support@regcdigital.co.za</a>
                  <a href="mailto:finance@regcdigital.co.za" className="block hover:text-primary-foreground transition-colors">finance@regcdigital.co.za</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} REGC Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
