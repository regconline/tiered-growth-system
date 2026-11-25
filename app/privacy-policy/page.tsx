import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy (POPIA)",
  description: "How REGC Digital collects, uses and protects personal information in line with the Protection of Personal Information Act (POPIA).",
  path: "/privacy-policy/",
});

const updated = "25 November 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Privacy policy", path: "/privacy-policy/" }]}
        eyebrow="Legal"
        title="Privacy policy"
        subtitle={`How we handle your personal information under POPIA. Last updated ${updated}.`}
      />
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl px-4">
          <div className="prose prose-lg max-w-none">
            <p>
              {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what personal information we collect through{" "}
              <a href={SITE.url}>regcdigital.co.za</a>, why we collect it and how we protect it, in line with the Protection of Personal Information Act 4 of 2013 (POPIA).
            </p>
            <h2>Information we collect</h2>
            <ul>
              <li><strong>Information you give us</strong> — your name, practice name, email address, phone number and the details of your enquiry when you complete a form, email us or message us on WhatsApp.</li>
              <li><strong>Usage information</strong> — anonymous or pseudonymous data about how the website is used (pages visited, device and browser type, approximate location) collected through analytics and advertising tools such as Google Tag Manager, Google Analytics and Google Ads.</li>
            </ul>
            <p>We do not ask for, and you should not send us, any patient health information through this website.</p>
            <h2>How we use your information</h2>
            <ul>
              <li>To respond to your enquiry and provide quotes or proposals.</li>
              <li>To deliver services you have contracted us for.</li>
              <li>To improve our website and measure the effectiveness of our marketing.</li>
              <li>To meet legal, tax and accounting obligations.</li>
            </ul>
            <p>We will never sell your personal information.</p>
            <h2>Sharing your information</h2>
            <p>
              We share information only with trusted service providers who help us operate — for example our website host, email delivery provider and analytics tools — and only to the extent needed. Some of these providers may store data outside South Africa; where this happens we rely on providers bound by data-protection standards comparable to POPIA.
            </p>
            <h2>Cookies</h2>
            <p>Our website uses cookies and similar technologies for analytics and advertising measurement. You can block or delete cookies in your browser settings; the website will still work.</p>
            <h2>How long we keep information</h2>
            <p>We keep enquiry information for as long as needed to respond and to maintain our business relationship, and client records for the period required by law.</p>
            <h2>Security</h2>
            <p>We use reasonable technical and organisational measures — including encrypted connections (HTTPS), access controls and reputable service providers — to protect your information.</p>
            <h2>Your rights</h2>
            <p>Under POPIA you may ask us to confirm what personal information we hold about you, request a copy, ask us to correct or delete it, or object to its processing for direct marketing. You may also lodge a complaint with the Information Regulator (South Africa).</p>
            <h2>Contact us</h2>
            <p>
              For any privacy question or request, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call {SITE.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
