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
    related: ["branding", "social-media", "content-marketing"],
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
    related: ["social-media", "website-services", "reputation-management"],
  },
  "reputation-management": {
    metaTitle: "Online Reputation Management South Africa for Practices",
    metaDescription:
      "Online reputation management for South African medical practices in Johannesburg, Randburg, Cape Town and beyond: more genuine Google reviews and professional replies. From R1,500/month.",
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
    related: ["social-media", "website-services", "content-marketing"],
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
};
