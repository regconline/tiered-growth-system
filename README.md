# REGC Digital — www.regcdigital.co.za

Healthcare digital marketing agency website. Next.js 15 (App Router), Tailwind CSS, deployed on Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5000
npm run build    # production build
```

## Email for enquiry forms (Resend)

Every form (contact page, homepage, each service page and each industry page) posts to `/api/contact/`, which emails the enquiry through [Resend](https://resend.com).

Add these in **Vercel → Project → Settings → Environment Variables**, then redeploy:

| Variable | Required | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | API key from resend.com |
| `CONTACT_TO_EMAIL` | no | Inbox for enquiries — defaults to `regconline@gmail.com` |
| `RESEND_FROM_EMAIL` | no | Verified sender, e.g. `REGC Digital <hello@regcdigital.co.za>`. Until set, Resend's test sender is used, which only delivers to the email address that owns the Resend account. Setting it also turns on an automatic "we received your enquiry" reply to the visitor. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | no | Cloudflare Turnstile bot protection (free). Add both, then redeploy. |

Until `RESEND_API_KEY` is set, forms show a friendly message with a one-tap "send this enquiry on WhatsApp" fallback, so no lead is lost.

## Content

- **Blog posts:** add a Markdown file to `content/blog/` (front matter: `title`, `description`, `pubDate`, `category`, `tags`, `heroEmoji`). A `## Frequently asked questions` section with `**Question?**` lines automatically becomes FAQ rich-result schema.
- **Services & pricing:** `data/serviceDetails.ts`; per-service SEO copy, FAQs and related links: `data/serviceExtras.ts`.
- **Industries:** `data/domains.ts` · **Locations:** `data/locations.ts` · **Contact details:** `data/site.ts`.

## Built-in SEO

Per-page titles/descriptions/canonicals, generated Open Graph images, JSON-LD (Organization, WebSite, Service, BlogPosting, FAQPage, BreadcrumbList), `sitemap.xml`, `robots.txt`, `/blog/rss.xml` and a web manifest.
