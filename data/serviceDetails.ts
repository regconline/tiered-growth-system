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
      "Local SEO structure built-in",
      "Analytics & conversion tracking",
      "Landing pages per service",
    ],
    process: [
      { step: "Discovery", description: "We learn about your practice, patients, and goals." },
      { step: "Design", description: "Custom wireframes and visual design tailored to healthcare." },
      { step: "Development", description: "Mobile-first build with SEO and speed optimization." },
      { step: "Launch & Support", description: "Go live with ongoing support and updates." },
    ],
    tiers: [
      {
        tier: "basic",
        name: "Starter Website",
        price: "R6,500 – R9,500",
        includes: ["3–5 pages (Home, About, Services, Contact)", "Mobile-friendly design", "WhatsApp click-to-chat", "Contact form + Google Maps", "Basic SEO setup"],
        result: "Online presence + basic patient inquiries",
      },
      {
        tier: "standard",
        name: "Growth Website",
        price: "R12,000 – R20,000",
        includes: ["5–8 pages", "Online booking system (request-based)", "Service-specific sections", "Testimonials + FAQ", "Speed optimization", "Local SEO structure (rank on Google)"],
        result: "Consistent patient leads",
      },
      {
        tier: "premium",
        name: "Patient Engine Website",
        price: "R25,000 – R45,000+",
        includes: ["8–15 pages", "Advanced booking system", "Landing pages per service", "WhatsApp automation integration", "Conversion optimization (CTAs, funnels)", "Analytics tracking setup"],
        result: "Automated patient acquisition system",
      },
    ],
  },
  {
    slug: "seo-services",
    icon: "🔍",
    title: "SEO Services",
    tagline: "Get found by patients searching for your services.",
    description:
      "Search Engine Optimization (SEO) ensures your practice appears when patients search for healthcare services in your area. We specialize in local SEO for medical practices, helping you rank for terms like 'doctor near me', 'dentist in Johannesburg', or 'physiotherapy Cape Town'.",
    whyItMatters:
      "93% of online experiences begin with a search engine. If your practice doesn't appear on the first page of Google, you're losing patients to competitors who do.",
    features: [
      "Google Business Profile optimization",
      "Local keyword targeting",
      "On-page SEO (titles, meta, content)",
      "Technical SEO audits & fixes",
      "Competitor analysis",
      "Content strategy & blog posts",
      "Internal linking optimization",
      "Monthly performance reports",
    ],
    process: [
      { step: "Audit", description: "Full technical and content SEO audit of your current site." },
      { step: "Strategy", description: "Keyword research and competitive analysis for your area." },
      { step: "Optimize", description: "On-page, technical, and content optimizations." },
      { step: "Monitor & Grow", description: "Ongoing optimization with monthly reporting." },
    ],
    tiers: [
      { tier: "basic", name: "Local Visibility", price: "R2,500 – R4,000/mo", includes: ["Google Business Profile optimization", "Local keywords (e.g. \"doctor near me\")", "Basic on-page SEO", "Monthly report"], result: "Appear in local searches" },
      { tier: "standard", name: "Search Growth", price: "R5,000 – R8,000/mo", includes: ["Everything in Basic PLUS:", "On-page optimization (titles, content)", "Technical SEO fixes", "Competitor analysis", "1–2 blog posts/month"], result: "Higher rankings + more traffic" },
      { tier: "premium", name: "Authority SEO", price: "R10,000 – R15,000+/mo", includes: ["Everything in Standard PLUS:", "Advanced keyword strategy", "4+ blog posts/month", "Internal linking strategy", "Continuous optimization"], result: "Dominates local healthcare search" },
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
      "Monthly analytics reports",
    ],
    process: [
      { step: "Brand Audit", description: "Evaluate your current social presence and audience." },
      { step: "Content Plan", description: "Build a monthly content calendar aligned with your goals." },
      { step: "Create & Post", description: "Design, write, and publish engaging healthcare content." },
      { step: "Engage & Report", description: "Manage community interactions and track growth." },
    ],
    tiers: [
      { tier: "basic", name: "Presence", price: "R3,000 – R5,000/mo", includes: ["8 posts/month", "Basic designs (posters)", "Posting & scheduling", "Facebook + Instagram"], result: "Active online presence" },
      { tier: "standard", name: "Engagement", price: "R6,000 – R10,000/mo", includes: ["12–16 posts/month", "Mix of posters + carousels", "Content calendar", "Basic engagement (replying to comments)"], result: "Audience growth + trust" },
      { tier: "premium", name: "Authority & Growth", price: "R12,000 – R20,000/mo", includes: ["20+ posts/month", "Video content (Reels)", "Full content strategy", "Community management", "TikTok included"], result: "Strong brand + patient trust" },
    ],
  },
  {
    slug: "content-marketing",
    icon: "🧠",
    title: "Content Marketing",
    tagline: "Educate patients and establish your expertise.",
    description:
      "Content marketing builds authority and trust by providing valuable health information to your patients. We create SEO-optimized blog posts, articles, and educational content that positions your practice as a trusted healthcare authority while driving organic traffic to your website.",
    whyItMatters:
      "Healthcare content marketing generates 3x more leads than traditional marketing at 62% lower cost. Patients trust providers who educate them.",
    features: [
      "SEO-optimized blog writing",
      "Medical topic research",
      "Content funnel strategy",
      "Patient education articles",
      "Keyword-targeted content",
      "Internal linking for SEO",
      "Content calendar management",
      "Performance tracking",
    ],
    process: [
      { step: "Research", description: "Identify topics patients search for in your specialty." },
      { step: "Create", description: "Write engaging, medically-accurate, SEO-optimized content." },
      { step: "Publish", description: "Format, optimize, and publish on your website." },
      { step: "Measure", description: "Track rankings, traffic, and conversions from content." },
    ],
    tiers: [
      { tier: "basic", name: "Content Starter", price: "R2,000 – R3,500/mo", includes: ["2 blog posts/month", "Basic SEO optimization"], result: "Basic content presence" },
      { tier: "standard", name: "Content Growth", price: "R4,000 – R6,000/mo", includes: ["3–4 blog posts", "SEO optimization", "Topic research"], result: "Improved SEO + education" },
      { tier: "premium", name: "Content Authority", price: "R7,000 – R12,000/mo", includes: ["6+ blog posts", "Advanced SEO strategy", "Content funnel (awareness → conversion)"], result: "Authority positioning" },
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
    slug: "patient-communication",
    icon: "💬",
    title: "Patient Communication Systems",
    tagline: "Automate patient touchpoints and reduce no-shows.",
    description:
      "Effective patient communication reduces no-shows, improves satisfaction, and increases retention. We set up and manage WhatsApp Business, automated appointment reminders, follow-up sequences, and full patient journey automation systems tailored to healthcare practices.",
    whyItMatters:
      "Automated appointment reminders alone can reduce no-shows by up to 38%. Consistent follow-up communication increases patient retention by 25%.",
    features: [
      "WhatsApp Business setup & automation",
      "Appointment reminder systems",
      "Lead capture & follow-up forms",
      "Email & SMS integration",
      "Patient journey automation",
      "Auto-reply configuration",
      "Multi-channel communication",
      "Performance tracking",
    ],
    process: [
      { step: "Assess", description: "Map your current patient communication touchpoints." },
      { step: "Design", description: "Create communication workflows for each patient stage." },
      { step: "Implement", description: "Set up tools, automations, and integrations." },
      { step: "Optimize", description: "Monitor and refine communication performance." },
    ],
    tiers: [
      { tier: "basic", name: "Quick Setup", price: "R1,000 – R2,000 (setup)", includes: ["WhatsApp Business setup", "Basic auto-replies"] },
      { tier: "standard", name: "Smart Comms", price: "R2,500 – R4,000 setup + R500/mo", includes: ["Appointment reminders", "Lead capture forms", "Follow-ups"] },
      { tier: "premium", name: "Full Automation", price: "R5,000+ setup + R1,000 – R3,000/mo", includes: ["Full automation system", "Email + SMS integration", "Patient journey automation"], result: "Better retention + fewer missed bookings" },
    ],
  },
  {
    slug: "analytics-reporting",
    icon: "📊",
    title: "Analytics & Reporting",
    tagline: "Make data-driven decisions for your practice.",
    description:
      "Understanding your digital performance is essential for growth. We set up comprehensive analytics tracking, provide monthly performance reports, and deliver actionable insights that help you understand where your patients come from and how to get more of them.",
    whyItMatters:
      "Practices that track and act on their digital analytics grow 2.5x faster than those that don't. Data removes guesswork from marketing decisions.",
    features: [
      "Google Analytics 4 setup",
      "Conversion tracking",
      "Patient acquisition funnels",
      "Monthly performance reports",
      "Traffic source analysis",
      "ROI measurement",
      "Strategy recommendations",
      "Custom dashboards",
    ],
    process: [
      { step: "Setup", description: "Install and configure analytics across all digital channels." },
      { step: "Track", description: "Set up conversion goals and patient acquisition tracking." },
      { step: "Report", description: "Deliver clear, actionable monthly reports." },
      { step: "Recommend", description: "Provide strategic recommendations based on data." },
    ],
    tiers: [
      { tier: "basic", name: "Tracking Setup", price: "R1,000 (setup)", includes: ["Google Analytics setup"] },
      { tier: "standard", name: "Monthly Insights", price: "R1,500 – R2,500/mo", includes: ["Monthly reports", "Traffic insights"] },
      { tier: "premium", name: "Data-Driven", price: "R3,000/mo", includes: ["Conversion tracking", "Patient acquisition insights", "Strategy recommendations"], result: "Data-driven decisions" },
    ],
  },
  {
    slug: "compliance",
    icon: "⚖️",
    title: "Compliance",
    tagline: "Stay compliant with HPCSA and POPIA regulations.",
    description:
      "Healthcare marketing in South Africa must comply with strict regulations from the Health Professions Council (HPCSA) and the Protection of Personal Information Act (POPIA). We ensure your digital presence meets all legal requirements, protecting your practice from penalties and building patient trust.",
    whyItMatters:
      "Non-compliance with HPCSA advertising rules can result in disciplinary action. POPIA violations carry fines of up to R10 million. Compliance isn't optional — it's essential.",
    features: [
      "HPCSA advertising compliance audits",
      "POPIA compliance implementation",
      "Privacy policy creation",
      "Terms & conditions drafting",
      "Disclaimer implementation",
      "Consent management systems",
      "Cross-platform compliance",
      "Ongoing compliance monitoring",
    ],
    process: [
      { step: "Audit", description: "Review all digital assets for compliance issues." },
      { step: "Remediate", description: "Fix non-compliant content, forms, and processes." },
      { step: "Implement", description: "Add required policies, disclaimers, and consent systems." },
      { step: "Monitor", description: "Ongoing monitoring for continued compliance." },
    ],
    tiers: [
      { tier: "basic", name: "HPCSA Check", price: "R1,500", includes: ["Basic HPCSA compliance check"] },
      { tier: "standard", name: "POPIA Ready", price: "R2,500 – R3,500", includes: ["POPIA compliance", "Privacy policy", "Disclaimers"] },
      { tier: "premium", name: "Full Compliance", price: "R4,000 – R5,000", includes: ["Full compliance audit", "Implementation across platforms"] },
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
  {
    slug: "conversion-optimization",
    icon: "📈",
    title: "Conversion Optimization",
    tagline: "Turn more website visitors into booked patients.",
    description:
      "Getting traffic is only half the battle — converting visitors into patients is where the real value lies. We optimize your website's calls-to-action, landing pages, and patient funnels to maximize the number of inquiries and bookings you get from your existing traffic.",
    whyItMatters:
      "A 1% increase in conversion rate can mean 10+ additional patients per month. Conversion optimization delivers ROI from traffic you're already paying for.",
    features: [
      "CTA optimization & A/B testing",
      "Landing page design & optimization",
      "Patient funnel development",
      "Form optimization",
      "Booking flow improvements",
      "Heat mapping & user behavior analysis",
      "Continuous testing & iteration",
      "Conversion rate reporting",
    ],
    process: [
      { step: "Analyze", description: "Identify conversion bottlenecks and drop-off points." },
      { step: "Hypothesize", description: "Develop data-driven improvement hypotheses." },
      { step: "Test", description: "Implement and A/B test changes." },
      { step: "Scale", description: "Roll out winning variations and continue optimizing." },
    ],
    tiers: [
      { tier: "basic", name: "Quick Wins", price: "R2,000/mo", includes: ["CTA improvements"] },
      { tier: "standard", name: "Funnel Builder", price: "R4,000 – R6,000/mo", includes: ["Landing page optimization", "Funnel improvements"] },
      { tier: "premium", name: "Full Conversion Engine", price: "R7,000 – R10,000/mo", includes: ["Full conversion strategy", "Continuous optimization"], result: "More patients from same traffic" },
    ],
  },
];
