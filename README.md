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
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` | no | Optional Google reCAPTCHA v2 |

Until `RESEND_API_KEY` is set, forms show a friendly message with a one-tap "send this enquiry on WhatsApp" fallback, so no lead is lost.

## Content

- **Blog posts:** add a Markdown file to `content/blog/` (front matter: `title`, `description`, `pubDate`, `category`, `tags`, `heroEmoji`). A `## Frequently asked questions` section with `**Question?**` lines automatically becomes FAQ rich-result schema.
- **Services & pricing:** `data/serviceDetails.ts`; per-service SEO copy, FAQs and related links: `data/serviceExtras.ts`.
- **Industries:** `data/domains.ts` · **Locations:** `data/locations.ts` · **Contact details:** `data/site.ts`.

## Built-in SEO

Per-page titles/descriptions/canonicals, generated Open Graph images, JSON-LD (Organization, WebSite, Service, BlogPosting, FAQPage, BreadcrumbList), `sitemap.xml`, `robots.txt`, `/blog/rss.xml` and a web manifest.

## Payments, subscriptions and automatic invoices (Paystack)

- **Monthly packages** get a *Subscribe* button on their service page. Prices live in `data/billing.ts` (`SUBSCRIBE_PLANS`) — edit amounts there or set `enabled: false`.
- **Website projects (50/50)** and **once-off work** are invoiced from the private admin page **`/admin/billing/`**: a deposit invoice (50% + domain/hosting upfront), then one click sends the final 50% balance invoice on delivery.
- Every successful payment (including monthly renewals) automatically creates a numbered PDF invoice (INV-0001…) and emails it to the client, with a copy to you.
- Business details printed on invoices (CIPC number, VAT number, address, bank details) are in `data/billing.ts` → `BUSINESS`.

### Setup

1. **Database:** create a Supabase project (or use an existing one), open *SQL editor* and run `supabase/billing.sql`.
2. **Vercel → Environment Variables:**

| Variable | Value |
| --- | --- |
| `PAYSTACK_SECRET_KEY` | Paystack → Settings → API Keys (`sk_test_…` first, `sk_live_…` when going live) |
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` key (server only — never share) |
| `BILLING_ADMIN_PASSWORD` | A strong password (12+ characters) for `/admin/billing/` |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` | Needed to email invoices. Clients can only receive email once your domain is verified in Resend and `RESEND_FROM_EMAIL` is e.g. `REGC Digital <billing@regcdigital.co.za>`. |

3. **Paystack → Settings → API Keys & Webhooks → Webhook URL:** `https://www.regcdigital.co.za/api/billing/webhook/`
4. Redeploy. Test with Paystack's test card `4084 0840 8408 4081` (any future expiry, CVV `408`).

Security: card details are only ever entered on Paystack's checkout; webhooks are verified by HMAC signature and every payment is re-confirmed with Paystack before an invoice is marked paid; amounts always come from the server; each payment reference can only produce one invoice.
