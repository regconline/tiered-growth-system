export const services = [
  {
    icon: "🌐",
    title: "Website Services",
    tiers: [
      {
        tier: "basic" as const,
        name: "Starter Website",
        price: "R6,500 – R9,500",
        includes: [
          "3–5 pages (Home, About, Services, Contact)",
          "Mobile-friendly design",
          "WhatsApp click-to-chat",
          "Contact form + Google Maps",
          "Basic SEO setup",
        ],
        result: "Online presence + basic patient inquiries",
      },
      {
        tier: "standard" as const,
        name: "Growth Website",
        price: "R12,000 – R20,000",
        includes: [
          "5–8 pages",
          "Online booking system (request-based)",
          "Service-specific sections",
          "Testimonials + FAQ",
          "Speed optimization",
          "Local SEO structure (rank on Google)",
        ],
        result: "Consistent patient leads",
      },
      {
        tier: "premium" as const,
        name: "Patient Engine Website",
        price: "R25,000 – R45,000+",
        includes: [
          "8–15 pages",
          "Advanced booking system",
          "Landing pages per service",
          "WhatsApp automation integration",
          "Conversion optimization (CTAs, funnels)",
          "Analytics tracking setup",
        ],
        result: "Automated patient acquisition system",
      },
    ],
  },
  {
    icon: "📱",
    title: "Social Media Management",
    tiers: [
      {
        tier: "basic" as const,
        name: "Presence",
        price: "R3,000 – R5,000/mo",
        includes: [
          "8 posts/month",
          "Basic designs (posters)",
          "Posting & scheduling",
          "Facebook + Instagram",
        ],
        result: "Active online presence",
      },
      {
        tier: "standard" as const,
        name: "Engagement",
        price: "R6,000 – R10,000/mo",
        includes: [
          "12–16 posts/month",
          "Mix of posters + carousels",
          "Content calendar",
          "Basic engagement (replying to comments)",
        ],
        result: "Audience growth + trust",
      },
      {
        tier: "premium" as const,
        name: "Authority & Growth",
        price: "R12,000 – R20,000/mo",
        includes: [
          "20+ posts/month",
          "Video content (Reels)",
          "Full content strategy",
          "Community management",
          "TikTok included",
        ],
        result: "Strong brand + patient trust",
      },
    ],
  },
  {
    icon: "🧠",
    title: "Content Marketing",
    tiers: [
      {
        tier: "basic" as const,
        name: "Content Starter",
        price: "R2,000 – R3,500/mo",
        includes: ["2 blog posts/month", "Basic SEO optimization"],
        result: "Basic content presence",
      },
      {
        tier: "standard" as const,
        name: "Content Growth",
        price: "R4,000 – R6,000/mo",
        includes: ["3–4 blog posts", "SEO optimization", "Topic research"],
        result: "Improved SEO + education",
      },
      {
        tier: "premium" as const,
        name: "Content Authority",
        price: "R7,000 – R12,000/mo",
        includes: [
          "6+ blog posts",
          "Advanced SEO strategy",
          "Content funnel (awareness → conversion)",
        ],
        result: "Authority positioning",
      },
    ],
  },
  {
    icon: "⭐",
    title: "Reputation Management",
    tiers: [
      {
        tier: "basic" as const,
        name: "Monitor",
        price: "R1,500 – R2,500/mo",
        includes: ["Review monitoring", "Basic responses"],
      },
      {
        tier: "standard" as const,
        name: "Respond & Grow",
        price: "R3,000 – R4,500/mo",
        includes: ["Review request system", "Response management", "Monthly insights"],
      },
      {
        tier: "premium" as const,
        name: "Full Management",
        price: "R5,000 – R7,000/mo",
        includes: [
          "Automated review generation",
          "Reputation strategy",
          "Full management",
        ],
        result: "High trust + strong ratings",
      },
    ],
  },
  {
    icon: "🧩",
    title: "Branding",
    tiers: [
      {
        tier: "basic" as const,
        name: "Logo Only",
        price: "R1,500 – R3,000",
        includes: ["Logo design"],
      },
      {
        tier: "standard" as const,
        name: "Brand Foundation",
        price: "R4,000 – R7,000",
        includes: ["Logo + colors + typography"],
      },
      {
        tier: "premium" as const,
        name: "Full Brand Identity",
        price: "R8,000 – R12,000",
        includes: [
          "Full brand identity",
          "Brand guidelines",
          "Templates",
        ],
      },
    ],
  },
];
