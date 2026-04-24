import type { Metadata } from "next";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { breadcrumbList } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | REGC Digital",
  description: "Get in touch with REGC Digital — book a free healthcare marketing consultation by WhatsApp, email or phone.",
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/" },
};

const jsonLd = [
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact/" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us | REGC Digital",
    description: "Book a free healthcare marketing consultation.",
    url: new URL("/contact/", SITE.url).toString(),
  },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Let's talk</h1>
          <p className="text-lg text-primary-foreground/85">Book a free, no-obligation consultation. We'll respond within one business day.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <aside className="space-y-4">
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 bg-card border border-border rounded-xl p-5 hover:border-secondary transition-colors">
              <MessageCircle className="w-6 h-6 text-[#25D366] mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-foreground">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Fastest way to reach us</p>
                <p className="text-sm font-semibold text-primary mt-1">{SITE.phone}</p>
              </div>
            </a>
            <a href={`tel:${SITE.phoneIntl}`} className="flex items-start gap-3 bg-card border border-border rounded-xl p-5 hover:border-secondary transition-colors">
              <Phone className="w-6 h-6 text-secondary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-foreground">Phone</h3>
                <p className="text-sm text-muted-foreground">Mon–Fri, 8:00–17:00</p>
                <p className="text-sm font-semibold text-primary mt-1">{SITE.phone}</p>
              </div>
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 bg-card border border-border rounded-xl p-5 hover:border-secondary transition-colors">
              <Mail className="w-6 h-6 text-secondary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-foreground">Email</h3>
                <p className="text-sm text-muted-foreground">We reply within 1 business day</p>
                <p className="text-sm font-semibold text-primary mt-1">{SITE.email}</p>
              </div>
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
