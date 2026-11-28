export interface ServiceDetail {
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  whyItMatters: string;
  features: string[];
  process: { step: string; description: string }[];
  tiers: {
    tier: "basic" | "standard" | "premium";
    name: string;
    price: string;
    /** small line under the price, e.g. how the total is made up */
    priceNote?: string;
    includes: string[];
    result?: string;
  }[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "website-services",
    icon: "🌐",
    title: "Website Services",
    tagline: "Your digital front door — built to convert patients.",
    description:
      "Your website is the first impression most patients will have of your practice. We design and build modern, mobile-responsive healthcare websites that are optimized for local search, fast loading, and patient conversions. From simple informational sites to full patient acquisition engines with booking systems and automation.",
    whyItMatters:
      "77% of patients search online before booking a healthcare appointment. A professional, fast, and conversion-optimized website is no longer optional — it's the foundation of your digital presence.",
    features: [
      "Mobile-first responsive design",
      "HPCSA & POPIA compliant",
      "WhatsApp click-to-chat integration",
      "Online booking systems",
      "Speed optimization (under 3s load time)",
      "Search-friendly structure built in",
      "WhatsApp chat widget",
      "Landing pages per service",
    ],
    process: [
      { step: "Discovery", description: "We learn about your practice, patients, and goals." },
      { step: "Design", description: "Custom wireframes and visual design tailored to healthcare." },
      { step: "Development", description: "Mobile-first build, optimised for speed and search." },
      { step: "Launch & Support", description: "Go live with ongoing support and updates." },
    ],
    tiers: [
      {
        tier: "basic",
        name: "Starter Website",
        price: "R6,500 – R9,500",
        includes: ["3–5 pages (Home, About, Services, Contact)", "Mobile-friendly design", "WhatsApp click-to-chat", "Contact form + Google Maps", "Search-friendly page structure"],
        result: "Online presence + basic patient inquiries",
      },
      {
        tier: "standard",
        name: "Growth Website",
        price: "R12,000 – R20,000",
        includes: ["5–8 pages", "Online booking system (request-based)", "Service-specific sections", "Testimonials + FAQ", "Speed optimization", "Location-focused pages for your area"],
        result: "Consistent patient leads",
      },
      {
        tier: "premium",
        name: "Patient Engine Website",
        price: "R25,000 – R45,000+",
        includes: ["8–15 pages", "Advanced booking system", "Landing pages per service", "WhatsApp chat widget", "Clear calls-to-action on every page", "Blog section set up"],
        result: "Automated patient acquisition system",
      },
    ],
  },
  {
    slug: "social-media",
    icon: "📱",
    title: "Social Media Management",
    tagline: "Build trust and grow your audience on social platforms.",
    description:
      "Social media is where patients discover, follow, and trust healthcare providers. We manage your social presence across Facebook, Instagram, and TikTok with professional content, consistent posting, and community engagement that builds your brand and drives patient inquiries.",
    whyItMatters:
      "Over 40% of consumers say information found on social media affects their health decisions. A consistent, professional social presence builds the trust patients need to choose your practice.",
    features: [
      "Content creation (posters, carousels, reels)",
      "Content calendar & scheduling",
      "Community management",
      "Facebook & Instagram management",
      "TikTok content strategy",
      "Engagement & comment management",
      "Brand voice development",
      "Paid social ads (ad budget included)",
      "Monthly performance summary",
    ],
    process: [
      { step: "Brand Audit", description: "Evaluate your current social presence and audience." },
      { step: "Content Plan", description: "Build a monthly content calendar aligned with your goals." },
      { step: "Create & Post", description: "Design, write, and publish engaging healthcare content." },
      { step: "Engage & Report", description: "Manage community interactions and track growth." },
    ],
    tiers: [
      { tier: "basic", name: "Presence", price: "R4,500 – R7,500/mo", priceNote: "R3,000 – R5,000 management + 50% ad budget (R1,500 – R2,500)", includes: ["Paid ads on Facebook & Instagram", "8 posts/month", "Basic designs (posters)", "Posting & scheduling", "Facebook + Instagram"], result: "Active online presence" },
      { tier: "standard", name: "Engagement", price: "R9,000 – R15,000/mo", priceNote: "R6,000 – R10,000 management + 50% ad budget (R3,000 – R5,000)", includes: ["Paid ads on Facebook & Instagram", "12–16 posts/month", "Mix of posters + carousels", "Content calendar", "Basic engagement (replying to comments)"], result: "Audience growth + trust" },
      { tier: "premium", name: "Authority & Growth", price: "R18,000 – R30,000/mo", priceNote: "R12,000 – R20,000 management + 50% ad budget (R6,000 – R10,000)", includes: ["Paid ads on Facebook & Instagram", "20+ posts/month", "Video content (Reels)", "Full content strategy", "Community management", "TikTok included"], result: "Strong brand + patient trust" },
    ],
  },
  {
    slug: "content-marketing",
    icon: "🧠",
    title: "Content Marketing",
    tagline: "Educate patients and establish your expertise.",
    description:
      "Content marketing builds authority and trust by providing valuable health information to your patients. We create search-friendly blog posts, articles, and educational content that positions your practice as a trusted healthcare authority while driving organic traffic to your website.",
    whyItMatters:
      "Healthcare content marketing generates 3x more leads than traditional marketing at 62% lower cost. Patients trust providers who educate them.",
    features: [
      "Search-friendly blog writing",
      "Medical topic research",
      "Content funnel strategy",
      "Patient education articles",
      "Keyword-targeted content",
      "Internal linking between articles",
      "Content calendar management",
      "Performance tracking",
    ],
    process: [
      { step: "Research", description: "Identify topics patients search for in your specialty." },
      { step: "Create", description: "Write engaging, medically-accurate, search-friendly content." },
      { step: "Publish", description: "Format, optimize, and publish on your website." },
      { step: "Measure", description: "Track rankings, traffic, and conversions from content." },
    ],
    tiers: [
      { tier: "basic", name: "Content Starter", price: "R2,000 – R3,500/mo", includes: ["2 blog posts/month", "Search-friendly formatting"], result: "Basic content presence" },
      { tier: "standard", name: "Content Growth", price: "R4,000 – R6,000/mo", includes: ["3–4 blog posts", "Keyword-focused topics", "Topic research"], result: "Patient education focus" },
      { tier: "premium", name: "Content Authority", price: "R7,000 – R12,000/mo", includes: ["6+ blog posts", "Topic strategy & planning", "Content that guides readers to book"], result: "Authority positioning" },
    ],
  },
  {
    slug: "reputation-management",
    icon: "⭐",
    title: "Reputation Management",
    tagline: "Protect and grow your online reputation.",
    description:
      "Your online reputation directly impacts patient decisions. We monitor, manage, and grow your reviews across Google, Facebook, and healthcare directories. From responding to reviews to implementing automated review generation systems, we ensure your practice maintains a strong, trustworthy online image.",
    whyItMatters:
      "84% of patients trust online reviews as much as personal recommendations. A single negative review can cost you up to 30 potential patients.",
    features: [
      "Review monitoring across platforms",
      "Professional review responses",
      "Automated review request systems",
      "Negative review management",
      "Reputation strategy development",
      "Monthly reputation reports",
      "Google review optimization",
      "Patient feedback systems",
    ],
    process: [
      { step: "Assess", description: "Audit your current online reputation across all platforms." },
      { step: "Respond", description: "Craft professional responses to existing reviews." },
      { step: "Generate", description: "Implement systems to encourage positive reviews." },
      { step: "Monitor", description: "Ongoing monitoring and management of your reputation." },
    ],
    tiers: [
      { tier: "basic", name: "Monitor", price: "R1,500 – R2,500/mo", includes: ["Review monitoring", "Basic responses"] },
      { tier: "standard", name: "Respond & Grow", price: "R3,000 – R4,500/mo", includes: ["Review request system", "Response management", "Monthly insights"] },
      { tier: "premium", name: "Full Management", price: "R5,000 – R7,000/mo", includes: ["Automated review generation", "Reputation strategy", "Full management"], result: "High trust + strong ratings" },
    ],
  },
  {
    slug: "branding",
    icon: "🧩",
    title: "Branding",
    tagline: "Create a memorable healthcare brand identity.",
    description:
      "A strong brand differentiates your practice and builds instant recognition and trust. We create complete brand identities for healthcare practices — from logos and color palettes to full brand guidelines and templates that ensure consistency across all touchpoints.",
    whyItMatters:
      "Consistent brand presentation increases revenue by up to 23%. Patients choose and stay loyal to practices with professional, recognizable brands.",
    features: [
      "Custom logo design",
      "Color palette development",
      "Typography selection",
      "Brand guidelines document",
      "Business card & letterhead design",
      "Social media templates",
      "Brand voice & messaging",
      "Stationery & collateral design",
    ],
    process: [
      { step: "Discover", description: "Understand your practice values, audience, and vision." },
      { step: "Concept", description: "Develop brand concepts and visual directions." },
      { step: "Refine", description: "Iterate on chosen direction until perfect." },
      { step: "Deliver", description: "Complete brand package with guidelines and templates." },
    ],
    tiers: [
      { tier: "basic", name: "Logo Only", price: "R1,500 – R3,000", includes: ["Logo design"] },
      { tier: "standard", name: "Brand Foundation", price: "R4,000 – R7,000", includes: ["Logo + colors + typography"] },
      { tier: "premium", name: "Full Brand Identity", price: "R8,000 – R12,000", includes: ["Full brand identity", "Brand guidelines", "Templates"] },
    ],
  },
];
