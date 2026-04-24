import type { Metadata } from "next";
import { CheckCircle2, Heart, Target } from "lucide-react";
import { SITE } from "@/data/site";
import { breadcrumbList } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us | REGC Digital",
  description: "We're a team of healthcare marketing specialists in South Africa. Learn how REGC Digital helps medical practices grow ethically and sustainably.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/" },
};

const jsonLd = [
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "About", path: "/about/" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us | REGC Digital",
    description: "Healthcare marketing specialists in South Africa.",
    url: new URL("/about/", SITE.url).toString(),
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About REGC Digital</h1>
          <p className="text-lg text-primary-foreground/85">Healthcare marketing specialists serving South African practices.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4 prose prose-lg">
          <p>REGC Digital was founded with one mission: to help South African healthcare practices grow ethically through proven, transparent digital marketing.</p>
          <p>We understand healthcare. We understand the HPCSA's advertising rules. We understand that patients are not customers — they are people seeking trusted care. Every campaign we build, every word we write, and every page we design respects that.</p>
          <h2>Why we exist</h2>
          <p>Most marketing agencies treat medical practices like any other small business. We don't. We've spent years working with GPs, dentists, specialists, and allied health professionals — learning what works, what doesn't, and what's compliant.</p>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Our values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Heart className="w-10 h-10 text-secondary mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg mb-2">Patient-first</h3>
              <p className="text-sm text-muted-foreground">We market your practice the way patients want to be spoken to — clearly, kindly, and honestly.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-secondary mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg mb-2">Ethical &amp; compliant</h3>
              <p className="text-sm text-muted-foreground">All work follows HPCSA, POPIA, and platform advertising guidelines.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Target className="w-10 h-10 text-secondary mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg mb-2">Results-focused</h3>
              <p className="text-sm text-muted-foreground">We measure what matters: enquiries, bookings, and patient lifetime value.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
