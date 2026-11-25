import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Target, Eye, Lightbulb, Handshake, CheckCircle2 } from "lucide-react";
import { SITE } from "@/data/site";
import { abs, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import AnimateIn from "@/components/AnimateIn";
import JsonLd from "@/components/JsonLd";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = pageMetadata({
  title: "About Us — Healthcare Marketing Specialists",
  description:
    "REGC Digital is a South African digital marketing agency that works exclusively with healthcare practices. Learn about our mission, values and compliance-first approach.",
  path: "/about/",
});

const values = [
  { icon: Heart, title: "Patient-first", text: "We market your practice the way patients want to be spoken to — clearly, kindly and honestly." },
  { icon: ShieldCheck, title: "Ethical & compliant", text: "HPCSA, council and POPIA rules aren't an afterthought — they shape every page, ad and post." },
  { icon: Target, title: "Results-focused", text: "We measure what matters to a practice: enquiries, bookings and long-term patient relationships." },
  { icon: Eye, title: "Transparent", text: "Clear rand pricing, month-to-month retainers and reports written in plain English." },
  { icon: Lightbulb, title: "Practical", text: "Modern tools and AI-assisted workflows mean faster delivery without agency bloat." },
  { icon: Handshake, title: "Partnership", text: "We act like part of your team — responsive on WhatsApp, phone and email." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", name: "About REGC Digital", url: abs("/about/"), about: { "@id": SITE.url + "/#organization" } }} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about/" }]}
        eyebrow="About us"
        title={<>We help South African practices <span className="text-gradient-hero">grow ethically</span></>}
        subtitle="REGC Digital is a healthcare-only digital marketing agency. We combine modern web, search and social expertise with a deep respect for the rules and responsibilities of healthcare."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <AnimateIn>
              <span className="section-label">Our story</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-4xl text-balance">Built for healthcare, not adapted to it</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>REGC Digital was founded with one mission: to help South African healthcare practices grow through honest, transparent and effective digital marketing.</p>
                <p>Most agencies treat a medical practice like any other small business. We don&apos;t. Patients aren&apos;t customers in the usual sense — they&apos;re people looking for care they can trust. That changes how a website should read, how an ad should be written and how a review should be answered.</p>
                <p>We work with GPs, dentists, specialists, allied health professionals, pharmacies and clinics across all nine provinces — from busy metros to growing towns.</p>
              </div>
            </AnimateIn>
            <AnimateIn delay={100}>
              <div className="card relative overflow-hidden p-8">
                <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--secondary)/0.18), transparent 70%)" }} />
                <LogoMark className="mb-5 h-20 w-20 shadow-[0_12px_30px_-10px_rgba(196,49,122,0.6)]" alt="REGC Digital logo" />
                <h3 className="font-display text-xl font-bold text-foreground">A registered, accountable business</h3>
                <ul className="mt-5 space-y-3.5">
                  {["Registered with the CIPC", "B-BBEE certified", "Tax-compliant South African company", "POPIA-aligned data handling", "Healthcare-only client focus"].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-foreground/85"><CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" /> {t}</li>
                  ))}
                </ul>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6">
                  <div><p className="font-display text-3xl font-extrabold text-gradient">50+</p><p className="text-sm text-muted-foreground">Practices served</p></div>
                  <div><p className="font-display text-3xl font-extrabold text-gradient">9/9</p><p className="text-sm text-muted-foreground">Provinces covered</p></div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="section-tint py-16 md:py-24">
        <div className="container max-w-6xl px-4">
          <AnimateIn className="mx-auto mb-12 max-w-2xl text-center">
            <span className="section-label">Our values</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-4xl">What we stand for</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, text }, i) => (
              <AnimateIn key={title} delay={(i % 3) * 80} className="card card-hover p-7">
                <span className="icon-tile h-12 w-12 text-secondary"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-muted-foreground">{text}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl px-4 text-center">
          <AnimateIn>
            <h2 className="font-display text-3xl font-extrabold text-foreground md:text-4xl text-balance">Let&apos;s grow your practice together</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Book a free consultation — we&apos;ll review your online presence and suggest a clear next step.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact/" className="btn-primary">Book a free consultation <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/services/" className="btn-secondary">Explore services</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
