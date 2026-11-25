/**
 * SEO + conversion extras for each service page.
 * Kept separate from serviceDetails.ts so pricing/features stay easy to edit.
 */
export interface ServiceExtra {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  idealFor: string[];
  outcomes: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  relatedPosts?: string[]; // blog slugs
  related: string[]; // other service slugs
}

export const serviceExtras: Record<string, ServiceExtra> = {
  "website-services": {
    metaTitle: "Medical Website Design South Africa — Doctor & Dental Websites",
    metaDescription:
      "Fast, mobile-first websites for South African doctors, dentists and clinics. Online booking, WhatsApp, local SEO and POPIA-compliant forms. Packages from R6,500.",
    keywords: ["medical website design South Africa", "doctor website design", "dental website design", "healthcare web design", "website for medical practice"],
    idealFor: [
      "New practices that need a professional online presence fast",
      "Practices with an outdated, slow or non-mobile website",
      "Specialists who want to rank for specific procedures",
      "Clinics that want online booking requests and WhatsApp enquiries",
    ],
    outcomes: [
      { title: "Loads fast on mobile", text: "Built for South African mobile networks and data costs." },
      { title: "Turns visitors into bookings", text: "Clear calls-to-action, click-to-call, WhatsApp and booking requests." },
      { title: "Found on Google", text: "Local SEO structure, schema and service pages from day one." },
    ],
    faqs: [
      { q: "How long does a practice website take to build?", a: "A Starter Website typically launches in 1–2 weeks once we have your content. Growth and Patient Engine websites usually take 3–6 weeks depending on pages, booking features and integrations." },
      { q: "Do I own my website?", a: "Yes. Once the project is paid in full, the website, content and domain are yours. We can host and maintain it for you, or hand it over." },
      { q: "Can you write the content for me?", a: "Yes. We write compliant, patient-friendly copy for every page — you simply review and approve it. We avoid superlatives, guarantees and anything that breaches HPCSA advertising rules." },
      { q: "Will my website work with online booking?", a: "Yes. We can add a request-based booking form, WhatsApp booking, or integrate the booking tool you already use." },
    ],
    relatedPosts: ["healthcare-website-must-haves", "fast-website-doubles-sales", "custom-vs-template-website-south-africa"],
    related: ["seo-services", "conversion-optimization", "branding"],
  },
  "seo-services": {
    metaTitle: "Medical SEO South Africa — Rank Your Practice on Google",
    metaDescription:
      "Local SEO for South African medical and dental practices. Google Business Profile optimisation, on-page and technical SEO, and content that brings patients. From R2,500/month.",
    keywords: ["medical SEO South Africa", "SEO for doctors", "dental SEO", "local SEO for medical practice", "Google Business Profile for doctors"],
    idealFor: [
      "Practices that don't appear when patients search “near me”",
      "Specialists competing in busy metros like Johannesburg or Cape Town",
      "Practices that rely on medical-aid patients searching online",
      "Anyone tired of paying for every click with ads",
    ],
    outcomes: [
      { title: "Map-pack visibility", text: "Show up in Google Maps results for your suburb and services." },
      { title: "Compounding traffic", text: "Rankings keep sending patients without paying per click." },
      { title: "Clear reporting", text: "Monthly rankings, traffic and enquiry reports in plain English." },
    ],
    faqs: [
      { q: "How long does medical SEO take to work?", a: "Google Business Profile improvements can show results within weeks. Competitive keywords typically take 3–6 months of consistent work, with results compounding over time." },
      { q: "Do you guarantee a #1 ranking?", a: "No honest agency can guarantee rankings — Google controls the results. We guarantee the work: a clear plan, best-practice execution and transparent monthly reporting." },
      { q: "What is local SEO?", a: "Local SEO helps your practice appear for location-based searches such as “dentist in Sandton” or “GP near me”, mainly through your Google Business Profile, reviews, citations and location-specific website content." },
      { q: "Do I need a new website for SEO?", a: "Not always. We start with an audit; if your current site is technically sound we optimise it. If it's slow or poorly structured, a rebuild is often the faster route to rankings." },
    ],
    relatedPosts: ["local-seo-medical-practice", "google-business-profile-doctors-guide", "why-website-not-ranking-fix"],
    related: ["content-marketing", "website-services", "reputation-management"],
  },
  "social-media": {
    metaTitle: "Social Media Management for Medical Practices South Africa",
    metaDescription:
      "Professional, HPCSA-aligned social media for doctors, dentists and clinics. Content creation, scheduling and community management on Facebook, Instagram and TikTok.",
    keywords: ["social media for doctors", "healthcare social media management", "medical practice Instagram", "dental social media marketing South Africa"],
    idealFor: [
      "Practices posting inconsistently or not at all",
      "Clinics that want to educate their community",
      "New practices building awareness in their area",
      "Doctors who don't have time to create content",
    ],
    outcomes: [
      { title: "Consistent presence", text: "A planned monthly calendar of professional, on-brand posts." },
      { title: "Patient trust", text: "Educational content that shows your expertise and personality." },
      { title: "Compliant by design", text: "No testimonials, before-and-afters or claims that breach council rules." },
    ],
    faqs: [
      { q: "Which platforms should my practice be on?", a: "For most South African practices, Facebook and Instagram deliver the best reach. TikTok works well for practices that are comfortable on video. We recommend platforms based on your patient demographic." },
      { q: "Can you post before-and-after photos or patient testimonials?", a: "Generally no. HPCSA rules restrict testimonials and before-and-after imagery used to promote services. We create educational and practice-culture content that builds trust compliantly." },
      { q: "Do I need to approve posts?", a: "Yes. You receive the monthly content calendar for approval before anything is published." },
      { q: "Do you reply to comments and messages?", a: "On our Engagement and Authority packages, we manage comments and route booking enquiries to your team — we never give medical advice on your behalf." },
    ],
    relatedPosts: ["healthcare-social-media-content-ideas", "hpcsa-advertising-rules-marketing-guide", "biggest-social-media-mistakes-businesses"],
    related: ["content-marketing", "branding", "reputation-management"],
  },
  "content-marketing": {
    metaTitle: "Healthcare Content Marketing & Medical Blog Writing",
    metaDescription:
      "SEO blog posts and patient education articles for South African practices. Medically careful, compliant and written to rank on Google. From R2,000/month.",
    keywords: ["healthcare content marketing", "medical blog writing", "patient education content", "SEO content for doctors"],
    idealFor: [
      "Practices that want to rank for symptom and treatment searches",
      "Specialists who want to demonstrate expertise",
      "Practices with a website but very little traffic",
      "Clinics launching new services",
    ],
    outcomes: [
      { title: "Search traffic", text: "Articles targeted at the exact questions patients type into Google." },
      { title: "Authority", text: "Content that positions you as the trusted local expert." },
      { title: "Shareable assets", text: "Articles that fuel your social media and newsletters." },
    ],
    faqs: [
      { q: "Who writes the content?", a: "Our healthcare copywriters research and draft each article; you or your clinical team review it for accuracy before publishing." },
      { q: "How many blog posts does a practice need?", a: "Two quality posts a month is a solid start. Competitive specialities benefit from four or more, supported by internal linking." },
      { q: "Is the content original?", a: "Yes. Every piece is written for your practice and checked for originality — no spun or copied content." },
      { q: "Can content be repurposed for social media?", a: "Absolutely. We can turn each article into social posts, carousels or short video scripts." },
    ],
    relatedPosts: ["content-marketing-backbone-online-success", "seo-content-writing-rank-and-convert", "evergreen-vs-trending-content"],
    related: ["seo-services", "social-media", "website-services"],
  },
  "reputation-management": {
    metaTitle: "Online Reputation & Google Review Management for Practices",
    metaDescription:
      "Grow and protect your practice's Google reviews. Ethical review requests, professional responses and monitoring — POPIA and HPCSA aware. From R1,500/month.",
    keywords: ["Google reviews for doctors", "medical reputation management", "online reviews dental practice", "review management South Africa"],
    idealFor: [
      "Practices with few or outdated Google reviews",
      "Practices dealing with an unfair negative review",
      "Multi-doctor clinics that need consistent responses",
      "Anyone whose competitors out-rate them on Google",
    ],
    outcomes: [
      { title: "More genuine reviews", text: "A simple, ethical system that asks happy patients to share feedback." },
      { title: "Professional responses", text: "Replies that protect patient confidentiality and your reputation." },
      { title: "Early warning", text: "Monitoring so you hear about problems before they escalate." },
    ],
    faqs: [
      { q: "Can you remove negative reviews?", a: "We can't delete genuine reviews, but we can report reviews that break Google's policies and craft calm, confidential responses that show prospective patients how you handle concerns." },
      { q: "Is asking patients for reviews allowed?", a: "Asking for honest feedback is fine. Offering incentives, writing reviews on patients' behalf or selectively soliciting only positive reviews is not — and we never do it." },
      { q: "How do you respond without breaching confidentiality?", a: "Responses never confirm that someone is a patient or discuss their care. We use approved, empathetic templates that move the conversation offline." },
      { q: "How quickly will my rating improve?", a: "Most practices see a steady flow of new reviews within the first month of implementing a review request system." },
    ],
    relatedPosts: ["get-more-google-reviews-medical-practice", "how-patients-choose-a-doctor-online", "local-seo-medical-practice"],
    related: ["seo-services", "patient-communication", "social-media"],
  },
  "patient-communication": {
    metaTitle: "WhatsApp Business & Appointment Reminders for Practices",
    metaDescription:
      "WhatsApp Business setup, automated appointment reminders and patient follow-ups that reduce no-shows. POPIA-compliant patient communication for SA practices.",
    keywords: ["WhatsApp Business for doctors", "appointment reminder system South Africa", "reduce patient no-shows", "patient communication automation"],
    idealFor: [
      "Practices losing income to missed appointments",
      "Busy receptions overwhelmed by calls and WhatsApps",
      "Practices that want recall and follow-up reminders",
      "Clinics without after-hours enquiry handling",
    ],
    outcomes: [
      { title: "Fewer no-shows", text: "Automated reminders patients actually read — on WhatsApp." },
      { title: "Faster replies", text: "Smart auto-replies and quick answers for common questions." },
      { title: "Better retention", text: "Follow-ups and recalls that bring patients back." },
    ],
    faqs: [
      { q: "Is WhatsApp POPIA compliant for patient communication?", a: "It can be, when patients opt in, messages are kept to administrative content, and access to the business account is controlled. We set it up with consent and data-minimisation in mind." },
      { q: "Will this work with my practice management software?", a: "Many systems can integrate. We review your current software and recommend the simplest reliable setup." },
      { q: "Can patients book through WhatsApp?", a: "Yes. We can set up booking-request flows that your reception confirms." },
      { q: "Is there a monthly fee?", a: "The Quick Setup is once-off. Smart Comms and Full Automation include a small monthly fee for messaging tools and support." },
    ],
    relatedPosts: ["whatsapp-business-medical-practice", "reduce-patient-no-shows", "popia-compliance-medical-practice-website"],
    related: ["reputation-management", "conversion-optimization", "website-services"],
  },
  "analytics-reporting": {
    metaTitle: "Marketing Analytics & Reporting for Medical Practices",
    metaDescription:
      "Google Analytics 4, call and WhatsApp tracking, and clear monthly reports that show where your patients come from. Make data-driven marketing decisions.",
    keywords: ["Google Analytics for medical practice", "healthcare marketing reporting", "conversion tracking doctors"],
    idealFor: [
      "Practices spending on marketing without knowing what works",
      "Practices running Google Ads without conversion tracking",
      "Multi-location clinics comparing performance",
      "Owners who want simple, monthly numbers",
    ],
    outcomes: [
      { title: "Know your sources", text: "See which channels bring enquiries and bookings." },
      { title: "Stop wasted spend", text: "Cut what doesn't work and double down on what does." },
      { title: "Plain-English reports", text: "Monthly reports focused on outcomes, not vanity metrics." },
    ],
    faqs: [
      { q: "What do you track?", a: "Website visits, enquiry form submissions, calls, WhatsApp clicks, booking requests and campaign performance — without collecting any patient health information." },
      { q: "Is tracking POPIA compliant?", a: "We configure analytics to avoid personal health information and recommend appropriate privacy notices and consent." },
      { q: "Can I see a live dashboard?", a: "Yes, on our Data-Driven plan you receive a live dashboard plus a monthly summary with recommendations." },
      { q: "Do I need GA4 if I already have Universal Analytics?", a: "Universal Analytics stopped processing data in 2023, so GA4 is now required for website analytics." },
    ],
    relatedPosts: ["how-patients-choose-a-doctor-online", "google-ads-medical-practice"],
    related: ["conversion-optimization", "seo-services", "website-services"],
  },
  compliance: {
    metaTitle: "HPCSA Advertising & POPIA Compliance for Practice Marketing",
    metaDescription:
      "Make sure your website, ads and social media meet HPCSA advertising rules and POPIA. Compliance audits, privacy policies, consent and disclaimers for SA practices.",
    keywords: ["HPCSA advertising rules", "POPIA compliance medical practice", "healthcare marketing compliance South Africa", "privacy policy for doctors"],
    idealFor: [
      "Practices unsure whether their website breaks HPCSA rules",
      "Practices collecting patient details through online forms",
      "Clinics running ads or social media campaigns",
      "Anyone preparing for a POPIA review",
    ],
    outcomes: [
      { title: "Peace of mind", text: "A clear audit of what's compliant and what needs to change." },
      { title: "Fixed, not just flagged", text: "We update content, forms, policies and consent flows." },
      { title: "Ongoing protection", text: "New campaigns reviewed before they go live." },
    ],
    faqs: [
      { q: "What does HPCSA say about advertising?", a: "In short, advertising must be factual and not misleading. Practitioners should avoid testimonials, comparisons with colleagues, guaranteed results and claims of superiority. Always refer to the current HPCSA ethical rules for your profession." },
      { q: "Does my website need a privacy policy?", a: "Yes. If your website collects any personal information — even a name and phone number — POPIA requires you to explain how it's used, stored and protected." },
      { q: "Is this legal advice?", a: "No. We implement marketing best practice aligned with HPCSA and POPIA guidance. For legal opinions, consult a qualified attorney." },
      { q: "Do you check other councils' rules?", a: "Yes — we align work with SANC, SAPC, AHPCSA and other councils depending on your profession." },
    ],
    relatedPosts: ["hpcsa-advertising-rules-marketing-guide", "popia-compliance-medical-practice-website", "healthcare-social-media-content-ideas"],
    related: ["website-services", "social-media", "patient-communication"],
  },
  branding: {
    metaTitle: "Healthcare Branding & Logo Design for Medical Practices",
    metaDescription:
      "Professional logos, colour palettes, brand guidelines and stationery for South African doctors, dentists and clinics. Build a brand patients trust. From R1,500.",
    keywords: ["medical practice logo design", "healthcare branding South Africa", "dental practice branding", "doctor letterhead design"],
    idealFor: [
      "New practices launching their identity",
      "Established practices with a dated look",
      "Partnerships and group practices merging brands",
      "Practices that need consistent stationery and templates",
    ],
    outcomes: [
      { title: "Instant credibility", text: "A polished, professional identity across every touchpoint." },
      { title: "Consistency", text: "Guidelines and templates your team can use with confidence." },
      { title: "Memorability", text: "A brand patients recognise and recommend." },
    ],
    faqs: [
      { q: "How many logo concepts will I receive?", a: "Our branding packages include multiple initial concepts and refinement rounds until you're happy with the direction." },
      { q: "What files do I get?", a: "Print and web-ready files (SVG, PDF, PNG) in full colour, single colour and reversed versions, plus your colour and typography specifications." },
      { q: "Can you design letterheads, scripts and invoices?", a: "Yes — practice stationery such as letterheads, prescription pads, forms and invoice templates are part of our Full Brand Identity package." },
      { q: "Do I own the copyright?", a: "Yes. On final payment, full ownership of your brand assets transfers to you." },
    ],
    relatedPosts: ["marketing-new-medical-practice-launch", "dental-practice-marketing-south-africa"],
    related: ["website-services", "social-media", "content-marketing"],
  },
  "conversion-optimization": {
    metaTitle: "Conversion Optimisation — Turn Website Visitors into Patients",
    metaDescription:
      "Get more bookings from the traffic you already have. Landing pages, clearer calls-to-action, faster forms and booking flows for medical practices in South Africa.",
    keywords: ["conversion rate optimisation healthcare", "medical landing page design", "increase patient bookings online"],
    idealFor: [
      "Practices with traffic but few enquiries",
      "Practices running Google or Meta ads",
      "Specialists launching a new procedure or service",
      "Clinics with complicated booking processes",
    ],
    outcomes: [
      { title: "More enquiries", text: "Remove friction so more visitors call, WhatsApp or book." },
      { title: "Lower ad costs", text: "Better landing pages mean cheaper patient acquisition." },
      { title: "Evidence-based", text: "Changes are tested and measured, not guessed." },
    ],
    faqs: [
      { q: "What is a good conversion rate for a medical website?", a: "It varies by speciality and traffic source, but many practice websites convert only a small percentage of visitors. Even modest improvements can mean several extra patients every month." },
      { q: "Do I need a lot of traffic for A/B testing?", a: "Formal A/B tests need meaningful traffic. For smaller practices we use best-practice improvements, user recordings and before-and-after measurement instead." },
      { q: "Will you change my whole website?", a: "Not necessarily. We prioritise the highest-impact pages and elements first — often the homepage, service pages and contact flow." },
      { q: "How do you measure success?", a: "By tracked enquiries: form submissions, calls, WhatsApp clicks and booking requests." },
    ],
    relatedPosts: ["high-converting-website-breakdown", "top-10-website-mistakes-costing-customers"],
    related: ["analytics-reporting", "website-services", "seo-services"],
  },
};
