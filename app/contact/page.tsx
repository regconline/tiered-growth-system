import type { Metadata } from "next";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { SITE } from "@/data/site";
import { abs, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us — Book a Free Consultation",
  description:
    "Contact REGC Digital for a free healthcare marketing consultation. WhatsApp or call 064 082 6855, email info@regcdigital.co.za, or send an enquiry — we reply within one business day.",
  path: "/contact/",
});

const channels = [
  { icon: WhatsAppIcon, title: "WhatsApp", note: "Fastest way to reach us", value: SITE.phone, href: SITE.whatsappUrl, external: true, color: "text-[#25D366]" },
  { icon: Phone, title: "Phone", note: SITE.hours, value: SITE.phone, href: `tel:${SITE.phoneIntl}`, color: "text-secondary" },
  { icon: Mail, title: "Email", note: "Reply within 1 business day", value: SITE.email, href: `mailto:${SITE.email}`, color: "text-secondary" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact REGC Digital", url: abs("/contact/"), about: { "@id": SITE.url + "/#organization" } }} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]}
        eyebrow="Contact"
        title={<>Let&apos;s talk about <span className="text-gradient-hero">your practice</span></>}
        subtitle="Book a free, no-obligation consultation. Send an enquiry below or reach us directly — we respond within one business day."
      />
      <section className="py-16 md:py-24">
        <div className="container grid max-w-6xl grid-cols-1 gap-8 px-4 lg:grid-cols-[1.5fr_1fr]">
          <InquiryForm variant="contact" source="contact-page" heading="Send us an enquiry" subheading="Fields marked * are required." />
          <aside className="space-y-4">
            {channels.map(({ icon: Icon, title, note, value, href, external, color }) => (
              <a
                key={title}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card card-hover flex items-start gap-4 p-6"
              >
                <span className="icon-tile h-12 w-12 shrink-0"><Icon className={`h-6 w-6 ${color}`} /></span>
                <span>
                  <span className="block font-display font-bold text-foreground">{title}</span>
                  <span className="block text-sm text-muted-foreground">{note}</span>
                  <span className="mt-1 block font-semibold text-secondary">{value}</span>
                </span>
              </a>
            ))}
            <div className="card p-6">
              <p className="flex items-center gap-2 font-display font-bold text-foreground"><Clock className="h-5 w-5 text-secondary" /> Office hours</p>
              <p className="mt-2 text-sm text-muted-foreground">{SITE.hours}. WhatsApp messages outside these hours are answered the next business day.</p>
              <p className="mt-4 flex items-center gap-2 font-display font-bold text-foreground"><MapPin className="h-5 w-5 text-secondary" /> Where we work</p>
              <p className="mt-2 text-sm text-muted-foreground">We serve healthcare practices remotely across all nine provinces of South Africa.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
