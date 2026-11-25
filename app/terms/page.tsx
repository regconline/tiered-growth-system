import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms for REGC Digital's website, branding, SEO, social media and other healthcare marketing services — quotes, deposits, payments, subscriptions and ownership.",
  path: "/terms/",
});

const updated = "25 November 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms/" }]} eyebrow="Legal" title="Terms of service" subtitle={`The terms that apply when you work with REGC Digital. Last updated ${updated}.`} />
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl px-4">
          <div className="prose prose-lg max-w-none">
            <p>These terms apply to all services provided by {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) to you (&ldquo;the client&rdquo;). By accepting a quote, paying an invoice or subscribing to a package on our website, you agree to these terms. Our <Link href="/refund-policy/">refund and cancellation policy</Link> and <Link href="/privacy-policy/">privacy policy</Link> form part of them.</p>

            <h2>1. Quotes and scope</h2>
            <p>Quotes are valid for 30 days and describe the agreed scope of work. Work outside that scope — such as extra pages, additional revision rounds or new features — is quoted separately before it starts.</p>

            <h2>2. Website and once-off projects: 50% deposit, 50% on delivery</h2>
            <ul>
              <li>A <strong>50% deposit</strong> is payable before work begins. It secures your place in our schedule.</li>
              <li><strong>Third-party costs</strong> such as domain registration and the first year of hosting are payable <strong>in full upfront</strong> with the deposit, because we pay suppliers for them immediately.</li>
              <li>The <strong>remaining 50%</strong> is invoiced when the project is delivered for final review, and is payable before the website goes live or final files are handed over.</li>
              <li>Invoices are payable within the period stated on the invoice (7 days unless otherwise agreed).</li>
              <li>If a project is paused by the client for more than 60 days, we may invoice for work completed to date.</li>
            </ul>

            <h2>3. Monthly packages (subscriptions)</h2>
            <ul>
              <li>Monthly services — such as SEO, social media, content, reputation, analytics and hosting — are billed in advance every month on the date you subscribed, automatically by card or as agreed.</li>
              <li>There is no long-term contract. You may cancel at any time; cancellation takes effect at the end of the current paid month.</li>
              <li>We will give at least 30 days&apos; notice of any price change to a monthly package.</li>
              <li>If a payment fails and is not resolved within 14 days, we may pause the service until the account is up to date.</li>
            </ul>

            <h2>4. Payments</h2>
            <p>Online payments are processed securely by our payment provider (Paystack). We never see or store your full card details. An invoice is emailed automatically after every successful payment. All amounts are in South African rand.</p>

            <h2>5. Your responsibilities</h2>
            <ul>
              <li>Provide content, approvals, logins and feedback promptly — delays on your side may move delivery dates.</li>
              <li>Confirm that content you supply (text, photos, logos) is accurate and that you have the right to use it.</li>
              <li>Review clinical content for accuracy. You remain responsible for compliance with the ethical rules of your professional council (for example the HPCSA). We align our work with these rules, but this is not legal or regulatory advice.</li>
            </ul>

            <h2>6. Ownership</h2>
            <p>Once a project is paid in full, you own the final website content, designs and brand assets created specifically for you. We retain ownership of our underlying tools, templates and code libraries, and you receive a perpetual licence to use them as part of your website. We may show non-confidential work in our portfolio unless you ask us not to.</p>

            <h2>7. Hosting, domains and third-party services</h2>
            <p>Domains are registered in your name where possible. Hosting, email, booking systems and other third-party services are subject to those providers&apos; own terms and availability; we are not liable for their outages.</p>

            <h2>8. Results</h2>
            <p>We work hard to grow your practice, but no one can guarantee specific rankings, enquiries or revenue, because these depend on search engines, platforms and market factors outside our control.</p>

            <h2>9. Limitation of liability</h2>
            <p>To the extent allowed by law, our total liability for any claim is limited to the amount you paid us for the service concerned in the three months before the claim. Nothing in these terms limits rights you have under the Consumer Protection Act where it applies.</p>

            <h2>10. Contact</h2>
            <p>Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or {SITE.phone}. These terms are governed by the laws of the Republic of South Africa.</p>
          </div>
        </div>
      </section>
    </>
  );
}
