import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Refund & Cancellation Policy",
  description: "How deposits, domain charges, final payments and monthly subscriptions are handled if you cancel a REGC Digital service.",
  path: "/refund-policy/",
});

const updated = "25 November 2026";

export default function RefundPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: "Refund policy", path: "/refund-policy/" }]} eyebrow="Legal" title="Refund & cancellation policy" subtitle={`Clear, fair rules for cancelling a project or subscription. Last updated ${updated}.`} />
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl px-4">
          <div className="prose prose-lg max-w-none">
            <h2>Website and once-off projects</h2>
            <ul>
              <li><strong>Cancel before work starts</strong> (within 7 days of paying the deposit and before we have begun): the deposit is refunded in full, less any third-party costs already paid on your behalf, such as a registered domain.</li>
              <li><strong>Cancel after work has started:</strong> the 50% deposit is non-refundable, as it covers time already committed to your project. You receive the work completed to date.</li>
              <li><strong>Domain registration and hosting</strong> charges are non-refundable once purchased, because suppliers do not refund them. The domain remains registered in your name.</li>
              <li><strong>Final 50% balance:</strong> payable on delivery. If something isn&apos;t as agreed in the quote, tell us within 7 days and we&apos;ll put it right before go-live.</li>
            </ul>

            <h2>Monthly packages</h2>
            <ul>
              <li>Cancel any time by emailing <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or WhatsApping {SITE.phone}. No cancellation fee.</li>
              <li>Cancellation takes effect at the end of the month you have already paid for, and you won&apos;t be billed again.</li>
              <li>Monthly fees already paid are not refunded for partial months, because the work for that month is scheduled in advance.</li>
              <li>If you were charged after cancelling in time, we&apos;ll refund that charge in full.</li>
            </ul>

            <h2>How refunds are paid</h2>
            <p>Approved refunds are returned to the original payment method (card or bank account) through our payment provider, usually within 5–10 business days depending on your bank.</p>

            <h2>Questions</h2>
            <p>We&apos;d always rather fix a problem than lose a client — please talk to us first. See also our <Link href="/terms/">terms of service</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
