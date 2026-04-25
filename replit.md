# REGC Digital — Next.js Site

Healthcare digital marketing website for South African medical practices.

## Stack

- **Next.js 15** — App Router, TypeScript, server components + API routes
- **React 18** — via Next.js 15
- **Tailwind CSS** + `@tailwindcss/typography` + `tailwindcss-animate`
- **next/font** — `Poppins` (display) + `Inter` (body), CSS-variable based
- **gray-matter + remark** — blog markdown parsing
- **nodemailer** — server-side contact form email (SMTP)
- **lucide-react** — icons

## Brand Visual System (April 2026 redesign)

Dark, premium, vibrant healthcare-tech aesthetic:

- **Background:** near-black `#0d0a0f` / dark purple-black `#1a0a1e`
- **Brand colors:** purple-deep `#4a0e6e`, purple-mid `#7b2d9e`, purple-bright `#9b3fc4`,
  magenta `#c4317a`, hot pink `#e8406a`, coral `#f05060`, white `#ffffff`
- **Gradients (CSS vars in `app/globals.css`):**
  - `--gradient-hero` — radial purple-to-black hero background
  - `--gradient-accent` — diagonal magenta→purple for CTA banners
  - `--gradient-cta` — horizontal magenta→bright-purple for buttons
  - `--gradient-card` — translucent glass card fill
  - `--gradient-blob` — soft pink/magenta/purple radial blob
- **Decorative blobs:** `<Blobs variant="hero|page|subtle" />` component (`components/Blobs.tsx`).
  Blobs are large (~24rem), `border-radius: 50%`, `filter: blur(80–100px)`, `opacity: 0.55–0.7`,
  with a 9s `blob-pulse` keyframe.
- **Typography:** Poppins headings (300/400/600/700/800), Inter body (300/400/500/600).
- **Glass cards:** `.card-premium` — semi-transparent purple gradient + 1px purple border +
  `backdrop-filter: blur(10px)`; hover lift + magenta glow.
- **Buttons:** `.btn-primary` (gradient-cta + glow) / `.btn-ghost` (white border, fills with gradient on hover).
- **Section labels:** `.section-label` — soft pink uppercase chip with magenta border.

The semantic Tailwind tokens (`bg-card`, `text-foreground`, `border-border`, `--secondary`, etc.)
were re-mapped to the new dark palette so the entire site cascades through one source.

## SEO

- `app/layout.tsx` emits global `Metadata` + `Viewport` exports: title template, description, OG, Twitter card, robots, themeColor.
- Per-page `generateMetadata()` functions override title, description, canonical, and OG url.
- `app/robots.ts` — auto-generates `/robots.txt` (allows all, blocks `/admin/`, `/private/`, throttles crawlers).
- `app/sitemap.ts` — auto-generates `/sitemap.xml` with all static + dynamic routes.
- Per-route JSON-LD schemas (injected via `<script type="application/ld+json">`):
  - Home: `Organization`, `WebSite`, `ProfessionalService`, `FAQPage`
  - `/services/`: `BreadcrumbList` + `ItemList`
  - `/services/{slug}`: `Service` + `BreadcrumbList`
  - `/domains/`: `BreadcrumbList` + `ItemList`
  - `/domains/{slug}`: `ProfessionalService` + `BreadcrumbList` + optional `FAQPage`
  - `/locations/`: `BreadcrumbList` + `ItemList`
  - `/healthcare-marketing-{loc}`: `LocalBusiness` + `BreadcrumbList`
  - `/blog/`: `BreadcrumbList` + `Blog`
  - `/blog/{slug}`: `BlogPosting` + `BreadcrumbList`
  - `/about/`, `/contact/`: `BreadcrumbList` + `AboutPage`/`ContactPage`

## URL Structure

All legacy Astro URLs preserved. The `/healthcare-marketing-[location]/` pattern uses a rewrite in `next.config.mjs`:

```
source: '/healthcare-marketing-:slug/' → destination: '/healthcare-marketing/:slug/'
source: '/healthcare-marketing-:slug'  → destination: '/healthcare-marketing/:slug'
```

Route files:
- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about/`
- `app/services/page.tsx` → `/services/`
- `app/services/[slug]/page.tsx` → `/services/{slug}/`
- `app/domains/page.tsx` → `/domains/`
- `app/domains/[slug]/page.tsx` → `/domains/{slug}/`
- `app/locations/page.tsx` → `/locations/`
- `app/healthcare-marketing/[location]/page.tsx` → `/healthcare-marketing-{location}/`
- `app/blog/page.tsx` → `/blog/`
- `app/blog/[slug]/page.tsx` → `/blog/{slug}/`
- `app/contact/page.tsx` → `/contact/`
- `app/api/contact/route.ts` → `POST /api/contact` (nodemailer email)

## Project Structure

```
app/
├── layout.tsx            # Root layout (GTM, Navbar, Footer, WhatsApp widget)
├── globals.css           # Tailwind base + design tokens (HSL vars, gradients)
├── page.tsx              # Home
├── about/page.tsx
├── contact/page.tsx
├── services/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── domains/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── locations/page.tsx
├── healthcare-marketing/
│   └── [location]/page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── api/contact/route.ts  # POST → sends email via nodemailer
├── robots.ts
├── sitemap.ts
└── not-found.tsx

components/
├── Navbar.tsx            # Mobile menu + dropdowns (React client)
├── Footer.tsx
├── ContactForm.tsx       # Email form + WhatsApp fallback (React client)
├── WhatsAppWidget.tsx    # Floating chat button (React client)
├── BackToTop.tsx         # Scroll-to-top (React client)
├── TierCard.tsx          # Pricing tier display
└── Logo.tsx

lib/
├── blog.ts               # getAllPosts(), getPostBySlug(), renderMarkdown()
└── seo.ts                # breadcrumbList(), itemList() JSON-LD helpers

data/
├── site.ts               # SITE constants (URL, phone, email, GTM ID)
├── serviceDetails.ts     # 10 services with tier pricing
├── domains.ts            # 17 healthcare specialities
└── locations.ts          # SA cities + provinces with medical context

content/
└── blog/                 # 28 markdown blog posts

public/
├── assets/regc-logo.png
├── favicon.png
└── apple-touch-icon.png
```

## Contact Form / Email

- Route: `POST /api/contact`
- Required env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- Sends to: `info@regcdigital.co.za`
- Fallback: WhatsApp redirect when SMTP is not configured

## Blog

- Posts: `content/blog/*.md` with front-matter (title, description, pubDate, author, category, tags, heroEmoji)
- Parsed with gray-matter + remark (renders to HTML)
- Adding a new post: drop a `.md` file in `content/blog/`

## Workflow

`Start application` runs `npm run dev` → `next dev -H 0.0.0.0 -p 5000`

## Build / Deploy

- Build: `npm run build` → `.next/`
- Production: `npm run start` → Next.js standalone server

## Conventions

- Design tokens in `app/globals.css` as HSL CSS vars consumed by Tailwind
- Path alias `@/*` points to project root
- All page components are async server components unless they need interactivity
- Interactive components marked with `"use client"` directive
