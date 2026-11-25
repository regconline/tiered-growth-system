import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Sparkles, Star, Users, TrendingUp, ShieldCheck, Phone, MapPin, Search,
  CalendarCheck, Compass, PenTool, Rocket, LineChart, HeartHandshake, Lock, BadgeCheck, Clock,
} from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { ServiceIcon, DomainIcon } from "@/components/ServiceIcon";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import { cities, provinces } from "@/data/locations";
import { getAllPosts, readingTime } from "@/lib/blog";
import { SITE } from "@/data/site";
import { faqSchema, itemList } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Healthcare & Medical Marketing Services | REGC Digital" },
  description:
    "South Africa's healthcare digital marketing agency. Medical marketing services for doctors, dentists and clinics: websites, medical SEO, Google Ads, social media and reviews. HPCSA & POPIA aligned.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", type: "website", images: [{ url: SITE.defaultOg, width: 1200, height: 630, alt: SITE.defaultOgAlt }] },
};

const faqs = [
  {
    q: "Do you only work with healthcare practices?",
    a: "Healthcare is our focus. We work with doctors, dentists, specialists, allied health professionals, pharmacies, psychologists, nursing services and clinics across South Africa, because compliance, patient psychology and local search all behave differently from generic small-business marketing.",
  },
  {
    q: "Is your marketing HPCSA and POPIA compliant?",
    a: "Every website, ad, landing page and social post we produce is checked against HPCSA (or the relevant council's) advertising rules and POPIA data-handling requirements. We won't publish anything that could put your registration at risk — no fake testimonials, no guaranteed outcomes, no misleading claims.",
  },
  {
    q: "How quickly will I see results?",
    a: "A new website or a Google Ads campaign can generate enquiries within days of launch. Local SEO usually shows movement within 30–60 days, with stronger, compounding gains from month four onward.",
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. Monthly services are month-to-month with no lock-in. Once-off projects such as websites and branding are quoted upfront with a fixed scope.",
  },
  {
    q: "How much does a medical practice website cost?",
    a: "Our Starter Website begins at R6,500, our Growth Website from R12,000, and our Patient Engine Website from R25,000, depending on pages, booking features and integrations. Every package is mobile-first, fast and built for local search.",
  },
  {
    q: "Which areas do you serve?",
    a: `We work with practices in all nine provinces — including Johannesburg, Pretoria, Cape Town, Durban, Gqeberha, Bloemfontein and ${cities.length - 6}+ other towns — and work remotely with practices anywhere in South Africa.`,
  },
];

const stats = [
  { icon: Users, value: "50+", label: "Practices served" },
  { icon: TrendingUp, value: "3×", label: "Average enquiry growth" },
  { icon: Star, value: "4.9", label: "Client rating" },
  { icon: ShieldCheck, value: "100%", label: "HPCSA-aligned work" },
];

const steps = [
  { icon: Compass, title: "Discover", text: "A free consultation and audit of your website, Google profile, reviews and competitors." },
  { icon: PenTool, title: "Plan & design", text: "A clear, compliant plan matched to your speciality, area and budget — no jargon." },
  { icon: Rocket, title: "Launch", text: "We build, write and launch — website, campaigns and profiles — fast and properly." },
  { icon: LineChart, title: "Grow", text: "Monthly reporting on enquiries and bookings, and continuous improvement." },
];

const pillars = [
  { icon: HeartHandshake, title: "Healthcare-only focus", text: "We speak patient, not just marketing — and understand how people choose a doctor." },
  { icon: Lock, title: "Compliance by default", text: "HPCSA, SANC, SAPC and POPIA rules are built into every page, ad and post." },
  { icon: BadgeCheck, title: "Transparent pricing", text: "Clear packages in rand, month-to-month retainers and no hidden extras." },
  { icon: Clock, title: "Fast, local support", text: "A South African team on WhatsApp, phone and email — replies within one business day." },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          itemList(serviceDetails, (s) => ({ name: s.title, url: `/services/${s.slug}/`, description: s.tagline })),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero-gradient">
        <div aria-hidden className="orb orb-drift" style={{ width: 640, height: 640, top: -260, right: -180 }} />
        <div aria-hidden className="orb orb-purple" style={{ width: 520, height: 520, bottom: -300, left: -200 }} />

        <div className="container relative max-w-7xl px-4 pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="hero-label enter enter-1"><Sparkles className="h-3.5 w-3.5" /> Healthcare marketing specialists · South Africa</span>
              <h1 className="enter enter-2 mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] text-white sm:text-5xl lg:text-[4rem] text-balance">
                More patients. <br className="hidden sm:block" />
                <span className="text-gradient-hero">Fully booked diaries.</span>
              </h1>
              <p className="enter enter-3 mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
                REGC Digital builds fast medical websites, ranks practices on Google and runs compliant ads and social media — so the right patients find you, trust you and book.
              </p>
              <div className="enter enter-4 mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact/" className="btn-primary !px-7 !py-3.5 text-[15px]">
                  Book a free consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/services/" className="btn-ghost !px-7 !py-3.5 text-[15px]">Explore services</Link>
              </div>
              <ul className="enter enter-4 mt-9 grid max-w-lg grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {["HPCSA & POPIA aligned", "Month-to-month, no lock-in", "South African team", "Reply within 1 business day"].map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ff7aa8]" /> {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual: growth dashboard */}
            <div className="enter enter-3 relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden>
              <div className="relative rounded-3xl border border-white/12 bg-white/[0.06] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10"><CalendarCheck className="h-5 w-5 text-[#ff9ab8]" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">Patient enquiries</p>
                      <p className="text-xs text-white/50">Last 6 months</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#25D366]/15 px-2.5 py-1 text-xs font-semibold text-[#5ee08f]">▲ Growing</span>
                </div>
                <div className="mt-7 flex h-40 items-end gap-3">
                  {[28, 36, 44, 52, 70, 92].map((h, i) => (
                    <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <div
                        className="w-full origin-bottom rounded-t-lg bg-gradient-to-t from-[#7b2d9e] via-[#c4317a] to-[#ff7a8a] enter"
                        style={{ height: `${h}%`, animationDelay: `${0.4 + i * 0.08}s` }}
                      />
                      <span className="text-[10px] text-white/40">{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-float absolute -left-10 top-[46%] hidden rounded-2xl border border-white/15 bg-[#1b1022]/90 px-4 py-3 shadow-2xl backdrop-blur sm:block">
                <div className="flex items-center gap-2.5">
                  <Search className="h-4 w-4 text-[#ff9ab8]" />
                  <div>
                    <p className="text-[11px] text-white/50">Google · &ldquo;dentist near me&rdquo;</p>
                    <p className="text-sm font-semibold text-white">Top 3 map pack</p>
                  </div>
                </div>
              </div>
              <div className="animate-float absolute -bottom-6 -right-3 hidden sm:block rounded-2xl border border-white/15 bg-[#1b1022]/90 px-4 py-3 shadow-2xl backdrop-blur" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-1 text-[#ffc861]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="mt-1 text-sm font-semibold text-white">More 5-star reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Speciality marquee ───────────────────────────── */}
      <section className="border-b bg-card py-5" aria-label="Healthcare specialities we market">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-10 pr-10">
            {[...domains, ...domains].map((d, i) => (
              <Link key={`${d.slug}-${i}`} href={`/domains/${d.slug}/`} tabIndex={i >= domains.length ? -1 : undefined} className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <DomainIcon slug={d.slug} className="h-4 w-4 text-secondary" /> {d.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <AnimateIn key={label} delay={i * 80} className="card p-6 text-center">
                <span className="icon-tile mx-auto mb-3 h-11 w-11 text-secondary"><Icon className="h-5 w-5" /></span>
                <p className="font-display text-4xl font-extrabold text-gradient">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="section-tint py-20 md:py-28" id="services">
        <div className="container max-w-7xl px-4">
          <AnimateIn className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-label">What we do</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-[2.6rem] md:leading-tight text-balance">
              Everything your practice needs to grow online
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">Choose a single service or combine them into a complete digital partnership.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {serviceDetails.map((s, i) => (
              <AnimateIn key={s.slug} delay={(i % 5) * 60} className="h-full">
                <Link href={`/services/${s.slug}/`} className="card card-hover group flex h-full flex-col p-6">
                  <span className="icon-tile h-12 w-12 text-secondary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <ServiceIcon slug={s.slug} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl px-4">
          <AnimateIn className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-label">How it works</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-[2.6rem] md:leading-tight">A simple, proven process</h2>
          </AnimateIn>
          <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-4">
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
            {steps.map(({ icon: Icon, title, text }, i) => (
              <AnimateIn as="li" key={title} delay={i * 100} className="relative text-center">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg" style={{ background: "var(--gradient-cta)" }}>
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-card text-xs font-bold text-foreground">{i + 1}</span>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{title}</h3>
                <p className="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-muted-foreground">{text}</p>
              </AnimateIn>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Why REGC ─────────────────────────────────────── */}
      <section className="section-tint py-20 md:py-28">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <AnimateIn>
              <span className="section-label">Why REGC Digital</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-[2.6rem] md:leading-tight text-balance">
                Marketing that understands healthcare
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Generic agencies market your practice like a restaurant. We don&apos;t. Every campaign is built around how patients choose care, the ethical rules of your council, and how South Africans actually search.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "No fake reviews, testimonials or guaranteed-outcome claims",
                  "POPIA-compliant forms, tracking and patient data handling",
                  "Plain-English monthly reports focused on enquiries and bookings",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/about/" className="btn-primary">About REGC Digital <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/services/compliance/" className="btn-secondary">Our compliance approach</Link>
              </div>
            </AnimateIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map(({ icon: Icon, title, text }, i) => (
                <AnimateIn key={title} delay={i * 90} className={`card card-hover p-6 ${i % 2 === 1 ? "sm:translate-y-6" : ""}`}>
                  <span className="icon-tile h-11 w-11 text-secondary"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 font-display font-bold text-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-7xl px-4">
          <AnimateIn className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-label">Specialities</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-[2.6rem] md:leading-tight">Built for every healthcare speciality</h2>
            <p className="mt-4 text-lg text-muted-foreground">Strategies tailored to the patient journey and advertising rules of {domains.length} professions.</p>
          </AnimateIn>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {domains.map((d, i) => (
              <AnimateIn key={d.slug} delay={(i % 6) * 40}>
                <Link href={`/domains/${d.slug}/`} className="card card-hover group flex h-full flex-col items-center gap-3 p-5 text-center">
                  <span className="icon-tile h-11 w-11 text-secondary transition-transform group-hover:scale-110"><DomainIcon slug={d.slug} className="h-5 w-5" /></span>
                  <span className="text-[13px] font-semibold leading-tight text-foreground">{d.shortName}</span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations ────────────────────────────────────── */}
      <section className="section-tint py-20 md:py-28">
        <div className="container max-w-6xl px-4">
          <AnimateIn className="mx-auto mb-12 max-w-2xl text-center">
            <span className="section-label"><MapPin className="h-3.5 w-3.5" /> Coverage</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-[2.6rem] md:leading-tight">Healthcare marketing across South Africa</h2>
            <p className="mt-4 text-lg text-muted-foreground">Local strategies for {cities.length} cities and towns in all {provinces.length} provinces.</p>
          </AnimateIn>
          <AnimateIn className="flex flex-wrap justify-center gap-2.5">
            {cities.slice(0, 18).map((c) => (
              <Link key={c.slug} href={`/healthcare-marketing-${c.slug}/`} className="chip !px-4 !py-2 text-sm transition-colors hover:border-secondary/50 hover:text-foreground">
                <MapPin className="mr-1.5 h-3.5 w-3.5 text-secondary" /> {c.name}
              </Link>
            ))}
          </AnimateIn>
          <div className="mt-8 text-center">
            <Link href="/locations/" className="inline-flex items-center gap-1.5 font-semibold text-secondary hover:underline underline-offset-4">
              View all {cities.length + provinces.length} locations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest insights ──────────────────────────────── */}
      {posts.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container max-w-6xl px-4">
            <AnimateIn className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="section-label">Insights</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-[2.6rem] md:leading-tight">Latest from the blog</h2>
              </div>
              <Link href="/blog/" className="btn-secondary">All articles <ArrowRight className="h-4 w-4" /></Link>
            </AnimateIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {posts.map((p, i) => (
                <AnimateIn key={p.slug} delay={i * 90} className="h-full">
                  <Link href={`/blog/${p.slug}/`} className="card card-hover group flex h-full flex-col overflow-hidden">
                    <div className="relative flex h-36 items-center justify-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
                      <span className="text-5xl transition-transform duration-500 group-hover:scale-110">{p.heroEmoji}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{p.category}</span>
                      <h3 className="mt-2 font-display text-lg font-bold leading-snug text-foreground group-hover:text-secondary transition-colors">{p.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                      <p className="mt-4 text-xs text-muted-foreground">{readingTime(p.content)} min read</p>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section-tint py-20 md:py-28">
        <div className="container max-w-3xl px-4">
          <AnimateIn className="mb-12 text-center">
            <span className="section-label">FAQ</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-[2.6rem] md:leading-tight">Questions practices ask us</h2>
          </AnimateIn>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <AnimateIn key={f.q} delay={i * 50}>
                <details className="card group overflow-hidden" open={i === 0}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 md:p-6">
                    <h3 className="font-display text-base font-semibold text-foreground md:text-lg">{f.q}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg text-secondary transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-5 pb-6 text-muted-foreground leading-relaxed md:px-6">{f.a}</p>
                </details>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + form ───────────────────────────────────── */}
      <section className="hero-gradient py-20 md:py-28" id="consultation">
        <div aria-hidden className="orb orb-drift" style={{ width: 520, height: 520, top: -200, left: -160 }} />
        <div className="container relative max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <AnimateIn className="text-center lg:text-left">
              <span className="hero-label">Free consultation</span>
              <h2 className="mt-5 font-display text-3xl font-extrabold text-white md:text-5xl md:leading-tight text-balance">Ready to grow your practice?</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                Book a free, no-obligation consultation. We&apos;ll review your website, Google profile and reviews, then recommend a clear next step — no pressure.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center">
                <a href={`tel:${SITE.phoneIntl}`} className="btn-ghost"><Phone className="h-4 w-4" /> {SITE.phone}</a>
                <Link href="/contact/" className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">Prefer the full enquiry form →</Link>
              </div>
            </AnimateIn>
            <AnimateIn delay={120}>
              <InquiryForm variant="quick" source="homepage-cta" heading="Request your free consultation" subheading="Takes less than a minute." />
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
