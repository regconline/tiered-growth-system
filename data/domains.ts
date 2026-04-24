export interface Domain {
  slug: string;
  shortName: string;
  fullName: string;
  professionals: string;
  patientTerm: string; // patients / clients / customers
  practiceTerm: string; // practice / clinic / rooms / pharmacy
  regulator: string; // HPCSA / SANC / SAPC / AHPCSA / SADTC / THPCSA
  emoji: string;
  titleTag: string;
  metaDescription: string;
  h1: string;
  heroSubheading: string;
  painPoints: string[];
  faqs: { q: string; a: string }[];
  whyItMatters: string;
  city?: string;
}

const generalFAQs = [
  {
    q: "Do I need to sign a long-term contract?",
    a: "No. All our retainer services are month-to-month with no lock-in. We earn your business every month through results, not contracts.",
  },
  {
    q: "How soon will I see results from digital marketing?",
    a: "Website launches and paid traffic deliver inquiries in days. SEO and content typically show meaningful movement at 60–90 days, with strong compounding gains from month 4 onward.",
  },
];

export const domains: Domain[] = [
  {
    slug: "medical-dental",
    shortName: "Medical & Dental",
    fullName: "Medical Practitioners & Dentists",
    professionals: "doctors, dentists and clinical associates",
    patientTerm: "patients",
    practiceTerm: "practice",
    regulator: "HPCSA",
    emoji: "🩺",
    titleTag: "Digital Marketing for Doctors & Dentists in South Africa | REGC Digital",
    metaDescription:
      "Grow your medical or dental practice with HPCSA-compliant digital marketing. Websites, SEO & patient systems built for South African doctors and dentists.",
    h1: "Digital Marketing for Medical Practitioners & Dentists in South Africa",
    heroSubheading:
      "Your patients are searching for you on Google right now. Are they finding you — or your competitors?",
    whyItMatters:
      "South African medical and dental practices face fierce local competition, strict HPCSA advertising rules, and patients who research extensively before booking. A compliant, conversion-focused digital presence is no longer optional.",
    painPoints: [
      "High competition in urban hubs (Sandton, Cape Town CBD, Durban North)",
      "Patients leaving for practices with stronger online reviews",
      "No-shows and last-minute cancellations eating into revenue",
      "Uncertainty around HPCSA advertising compliance",
      "No time between consultations to manage marketing",
    ],
    faqs: [
      { q: "Is it legal to advertise my medical practice online in South Africa?", a: "Yes. The HPCSA permits advertising as long as it is factual, verifiable, dignified and not comparative or testimonial-led. We build every asset to comply with the HPCSA Ethical Rules for advertising." },
      { q: "What HPCSA rules apply to medical website content?", a: "Practitioners may share qualifications, services, contact details and educational content. Claims of superiority, guaranteed outcomes and patient testimonials about clinical results are restricted. We audit every page against the latest HPCSA guidance." },
      { q: "How do I get more patients without violating HPCSA advertising rules?", a: "Focus on local SEO, educational content, Google Business Profile, and fast booking flows. These attract patients actively searching while staying within ethical guidelines." },
      { q: "Can I show before/after photos on my dental website?", a: "Cosmetic and dental before/after content is allowed when accompanied by appropriate disclaimers, patient consent under POPIA, and no exaggerated claims. We handle the compliance layer for you." },
      { q: "How long does it take to rank on Google as a doctor in Johannesburg?", a: "Local rankings (map pack) typically move within 30–60 days for practices in less competitive suburbs. Highly competitive areas like Sandton or Rosebank usually take 90–120 days for first-page positions." },
      ...generalFAQs,
    ],
  },
  {
    slug: "nursing",
    shortName: "Nursing",
    fullName: "Nurses & Private Nursing Practices",
    professionals: "registered nurses, midwives and auxiliary nurses",
    patientTerm: "patients",
    practiceTerm: "practice",
    regulator: "SANC",
    emoji: "👩‍⚕️",
    titleTag: "Digital Marketing for Nurses & Private Nursing Practices in South Africa | REGC Digital",
    metaDescription:
      "Build your private nursing practice online with SANC-compliant digital marketing. Websites, SEO & patient communication for South African nurses.",
    h1: "Digital Marketing for Nurses & Private Nursing Practices in South Africa",
    heroSubheading:
      "Running a private nursing practice? Your patients need to find you — and trust you — before they call.",
    whyItMatters:
      "Private nursing is one of the fastest-growing segments of South African healthcare, but most patients still don't know nurses can run independent practices. Visibility and trust are everything.",
    painPoints: [
      "Low visibility for private and home-based nursing services",
      "Patients unaware that nurses run independent practices",
      "Competing with larger clinics, hospitals and step-down facilities",
      "Building individual professional credibility online",
    ],
    faqs: [
      { q: "Can a registered nurse market a private practice in South Africa?", a: "Yes. SANC-registered nurses may market private practice services as long as content is truthful, dignified and consistent with the Nursing Act and SANC ethics. We build every page to those standards." },
      { q: "What SANC rules apply to nursing practice advertising?", a: "Adverts must reflect actual scope of practice, registered qualifications and registration number. Misleading claims, comparative statements and unsupported guarantees are not permitted." },
      { q: "How do I attract home-care nursing clients online?", a: "A combination of local SEO ('private nurse near me'), Google Business Profile, WhatsApp click-to-chat and educational social content is the highest-ROI playbook for home-care nursing." },
      ...generalFAQs,
    ],
  },
  {
    slug: "pharmacy",
    shortName: "Pharmacy",
    fullName: "Pharmacies & Pharmacists",
    professionals: "pharmacists and pharmacy assistants",
    patientTerm: "customers",
    practiceTerm: "pharmacy",
    regulator: "SAPC",
    emoji: "💊",
    titleTag: "Digital Marketing for Pharmacies & Pharmacists in South Africa | REGC Digital",
    metaDescription:
      "Grow your independent pharmacy with POPIA & SAPC-compliant digital marketing. Websites, SEO & patient communication systems for South African pharmacists.",
    h1: "Digital Marketing for Pharmacies & Pharmacists in South Africa",
    heroSubheading:
      "Independent pharmacies that invest in digital marketing grow customer retention by over 30%. Is yours?",
    whyItMatters:
      "Independent pharmacies face an uphill battle against the marketing budgets of Clicks and Dischem. Smart, hyper-local digital marketing is the great equaliser.",
    painPoints: [
      "Competing with national chains (Clicks, Dischem)",
      "Building loyalty and repeat scripts in a price-sensitive market",
      "Promoting wellness, immunisation and chronic disease management",
      "Communicating prescription and delivery services online",
    ],
    faqs: [
      { q: "What SAPC rules apply to pharmacy advertising in South Africa?", a: "The South African Pharmacy Council restricts advertising of scheduled medicines, comparative pricing claims and promotional offers on prescription products. General services, wellness clinics and OTC categories may be advertised within the SAPC Code of Conduct." },
      { q: "Can I advertise prescription medicine pricing online?", a: "No. Prescription (scheduled) medicine pricing cannot be advertised publicly. We help you market the wellness, clinic and OTC sides of your pharmacy compliantly." },
      { q: "How do independent pharmacies compete with Clicks and Dischem digitally?", a: "By owning hyper-local search ('pharmacy near me' in your suburb), running a loyal WhatsApp script-refill list, and showcasing your in-store clinic and personalised service — none of which the chains do well." },
      ...generalFAQs,
    ],
  },
  {
    slug: "physiotherapy-podiatry-biokinetics",
    shortName: "Physio, Podiatry & Biokinetics",
    fullName: "Physiotherapists, Podiatrists & Biokineticists",
    professionals: "physiotherapists, podiatrists and biokineticists",
    patientTerm: "patients",
    practiceTerm: "practice",
    regulator: "HPCSA",
    emoji: "🦴",
    titleTag: "Digital Marketing for Physiotherapists, Podiatrists & Biokineticists SA | REGC Digital",
    metaDescription:
      "Get more patients for your physio, podiatry or biokineticist practice. HPCSA-compliant websites, SEO & social media for South African rehabilitation professionals.",
    h1: "Digital Marketing for Physiotherapists, Podiatrists & Biokineticists in South Africa",
    heroSubheading:
      "Patients searching for 'physiotherapy near me' book the practice that appears first. Make sure it's yours.",
    whyItMatters:
      "Rehabilitation practices have historically relied on doctor referrals — but patients now self-refer after Googling their symptoms. Practices visible online win those bookings.",
    painPoints: [
      "Referral-dependent acquisition is unreliable and seasonal",
      "Demand fluctuations (sports injuries, winter respiratory illness)",
      "Competing with multi-disciplinary group practices",
      "Patients not understanding what biokinetics actually is",
    ],
    faqs: [
      { q: "How do I get more self-referred patients as a physiotherapist?", a: "Local SEO for symptom-based searches ('lower back pain Sandton'), educational reels on social media, and a fast online booking flow consistently produce self-referrals." },
      { q: "What social media content works for physio practices?", a: "Short demonstration reels (exercises, mobility drills), patient education on common conditions, and behind-the-scenes treatment clips drive the highest engagement and bookings." },
      { q: "How do I explain biokinetics to potential patients online?", a: "Through plain-language landing pages targeting conditions ('post-op rehab', 'chronic disease exercise'), short video explainers and case-study style content (within HPCSA limits)." },
      { q: "Can I advertise post-op rehab services?", a: "Yes — factual descriptions of post-operative rehabilitation services are HPCSA-compliant. Avoid outcome guarantees and comparative claims." },
      ...generalFAQs,
    ],
  },
  {
    slug: "psychology",
    shortName: "Psychology",
    fullName: "Psychologists & Registered Counsellors",
    professionals: "psychologists and registered counsellors",
    patientTerm: "clients",
    practiceTerm: "practice",
    regulator: "HPCSA",
    emoji: "🧠",
    titleTag: "Digital Marketing for Psychologists & Counsellors in South Africa | REGC Digital",
    metaDescription:
      "Grow your psychology practice ethically and effectively. HPCSA-compliant digital marketing, websites & content for South African psychologists and counsellors.",
    h1: "Digital Marketing for Psychologists & Registered Counsellors in South Africa",
    heroSubheading:
      "Clients looking for mental health support are searching online. Your digital presence can be the bridge that connects them to your practice.",
    whyItMatters:
      "Mental health clients research extensively, often in private and at vulnerable moments. Your website, content and tone are the first therapeutic touchpoint — they must build trust immediately.",
    painPoints: [
      "Stigma means clients research extensively before reaching out",
      "Strict HPCSA ethical rules around testimonials and claims",
      "Building trust before first contact is critical",
      "Long waiting lists at some practices, empty diaries at others",
    ],
    faqs: [
      { q: "What are the HPCSA ethics rules for psychologist advertising?", a: "Psychologists may advertise qualifications, scope, modalities and contact details. Testimonials about therapeutic outcomes, comparative claims and guarantees are prohibited under the HPCSA Ethical Rules." },
      { q: "Can I share client testimonials on my psychology website?", a: "No. Testimonials about therapy outcomes are not permitted. We use ethically sound alternatives — credentials, training, modality explanations and educational content — to build trust." },
      { q: "How do I attract clients for online therapy sessions?", a: "Dedicated landing pages for online therapy, content addressing specific concerns (anxiety, burnout, grief), and a simple WhatsApp/booking flow convert online-therapy seekers reliably." },
      { q: "What type of content builds trust for a psychology practice?", a: "Educational articles on common concerns, your training and approach, what a first session looks like, and consent/confidentiality practices. This pre-empts client questions and reduces friction." },
      ...generalFAQs,
    ],
  },
  {
    slug: "occupational-therapy-prosthetics-arts-therapy",
    shortName: "OT, Prosthetics & Arts Therapy",
    fullName: "Occupational Therapists, Prosthetists & Arts Therapists",
    professionals: "occupational therapists, prosthetists/orthotists and arts therapists",
    patientTerm: "clients",
    practiceTerm: "practice",
    regulator: "HPCSA",
    emoji: "🤲",
    titleTag: "Digital Marketing for Occupational Therapists & Prosthetists South Africa | REGC Digital",
    metaDescription:
      "Grow your OT, prosthetics or arts therapy practice online. HPCSA-compliant websites, SEO & patient communication for South African occupational therapists.",
    h1: "Digital Marketing for Occupational Therapists, Prosthetists & Arts Therapists in South Africa",
    heroSubheading:
      "Families searching for OT or prosthetic services deserve to find you quickly and trust you immediately.",
    whyItMatters:
      "These are highly specialised services where families often don't know to search by profession name. Educational content and clear service positioning are essential.",
    painPoints: [
      "Specialised services patients don't know to search for",
      "Competing for limited medical aid referrals",
      "Educating the public about OT, prosthetics and arts therapy",
      "Smaller practices with smaller marketing budgets",
    ],
    faqs: [
      { q: "How do I explain occupational therapy to patients online?", a: "Use plain-language pages built around problems (sensory processing, hand therapy, return-to-work), not jargon. Pair with short videos showing actual session activities (with consent)." },
      { q: "What digital marketing is effective for paediatric OT practices?", a: "Local SEO targeting parents, educational Instagram content, school referral landing pages, and a fast WhatsApp inquiry flow are the highest-converting combination." },
      { q: "Can I market prosthetic and orthotic services on social media?", a: "Yes, within HPCSA limits. Educational content, fitting process videos and patient-journey content (with full consent) work well without breaching ethical advertising rules." },
      ...generalFAQs,
    ],
  },
  {
    slug: "dietetics-nutrition",
    shortName: "Dietetics & Nutrition",
    fullName: "Dietitians & Nutritionists",
    professionals: "registered dietitians and nutritionists",
    patientTerm: "clients",
    practiceTerm: "practice",
    regulator: "HPCSA",
    emoji: "🥗",
    titleTag: "Digital Marketing for Dietitians & Nutritionists in South Africa | REGC Digital",
    metaDescription:
      "Grow your dietitian or nutrition practice online. HPCSA-compliant websites, content marketing & SEO for South African dietitians.",
    h1: "Digital Marketing for Dietitians & Nutritionists in South Africa",
    heroSubheading:
      "South Africans are increasingly health-conscious — and searching for expert nutrition guidance. Be the expert they find.",
    whyItMatters:
      "Registered dietitians compete in an information environment dominated by influencers and unregulated 'nutritionists'. Authority content and clear credentials are your competitive moat.",
    painPoints: [
      "Competing with unregistered nutritionists and wellness influencers",
      "Differentiating registered dietitians from informal coaches",
      "Building authority in a noisy wellness market",
      "Attracting medical-aid covered consultations",
    ],
    faqs: [
      { q: "How do I differentiate myself from unregistered nutritionists online?", a: "Lead with your HPCSA registration number, scope of practice, evidence-based positioning and educational content that gently corrects common misinformation." },
      { q: "What content attracts clients looking for weight management support?", a: "Long-form educational articles on sustainable change, myth-busting reels, practical meal-planning content and clear service pages with medical-aid information." },
      { q: "Can I advertise specific diet programmes on my website?", a: "Yes, provided programmes are evidence-based, scope-appropriate and free from outcome guarantees. We help you frame programmes compliantly." },
      ...generalFAQs,
    ],
  },
  {
    slug: "speech-language-hearing",
    shortName: "Speech & Hearing",
    fullName: "Speech Therapists & Audiologists",
    professionals: "speech-language therapists, audiologists and hearing aid acousticians",
    patientTerm: "patients",
    practiceTerm: "practice",
    regulator: "HPCSA",
    emoji: "👂",
    titleTag: "Digital Marketing for Speech Therapists & Audiologists in South Africa | REGC Digital",
    metaDescription:
      "Get more patients for your speech therapy or audiology practice. HPCSA-compliant websites, SEO & content marketing for South African speech and hearing professionals.",
    h1: "Digital Marketing for Speech Therapists & Audiologists in South Africa",
    heroSubheading:
      "Parents searching for their child's speech therapist and patients seeking hearing care are looking for you online right now.",
    whyItMatters:
      "Public sector waiting lists drive enormous private-sector demand — but only practices with strong digital visibility capture that demand.",
    painPoints: [
      "Parents desperately searching for paediatric speech therapy",
      "Long public-sector waiting lists driving private demand",
      "Low awareness of when to consider a hearing assessment",
      "Heavy reliance on school and GP referrals",
    ],
    faqs: [
      { q: "How do I attract more paediatric speech therapy referrals online?", a: "A combination of local SEO ('speech therapist for toddlers Pretoria'), Google Business Profile, parent-focused educational content and a friction-free WhatsApp inquiry flow." },
      { q: "What social media content works for audiologists?", a: "Hearing-loss myth busting, signs you need a hearing test, hearing-aid technology explainers and patient education videos consistently outperform promotional content." },
      { q: "How do I promote hearing assessments in my area?", a: "Targeted local SEO, Google Business Profile optimisation and seasonal awareness campaigns (e.g. World Hearing Day) drive bookings most reliably." },
      ...generalFAQs,
    ],
  },
  {
    slug: "radiography-clinical-technology",
    shortName: "Radiography & Clinical Tech",
    fullName: "Radiographers & Clinical Technologists",
    professionals: "radiographers and clinical technologists",
    patientTerm: "patients",
    practiceTerm: "practice",
    regulator: "HPCSA",
    emoji: "🩻",
    titleTag: "Digital Marketing for Radiographers & Clinical Technologists SA | REGC Digital",
    metaDescription:
      "Digital marketing for private radiology practices and clinical technology services. HPCSA-compliant websites & SEO for South African radiographers.",
    h1: "Digital Marketing for Radiographers & Clinical Technologists in South Africa",
    heroSubheading:
      "Private radiology and imaging practices that invest in visibility attract more direct bookings and GP referrals.",
    whyItMatters:
      "Radiology and clinical technology have historically been B2B (referral-based). Modern patients increasingly self-search and self-book — and your digital footprint determines whether they choose you or a hospital-based service.",
    painPoints: [
      "Heavy dependence on GP and specialist referrals",
      "Competing with hospital-based imaging services",
      "Patients unaware private imaging is directly bookable",
      "Building a referrer-friendly digital presence",
    ],
    faqs: [
      { q: "Can a private radiology practice attract direct patient bookings online?", a: "Yes. With clear pricing, medical-aid information and a fast booking flow, private imaging practices increasingly capture self-referred patients for routine imaging." },
      { q: "How do I increase GP referrals through digital marketing?", a: "Build a dedicated referrer portal with downloadable referral forms, turnaround times and a direct contact line. Combine with educational content GPs can share with their patients." },
      { q: "What compliance rules apply to radiology advertising?", a: "Standard HPCSA advertising rules apply. Factual service descriptions, qualifications, equipment lists and contact info are all permitted; comparative and outcome claims are not." },
      ...generalFAQs,
    ],
  },
  {
    slug: "emergency-care",
    shortName: "Emergency Care",
    fullName: "Emergency Care Practitioners & Paramedics",
    professionals: "emergency care practitioners, paramedics and private ambulance services",
    patientTerm: "patients",
    practiceTerm: "service",
    regulator: "HPCSA",
    emoji: "🚑",
    titleTag: "Digital Marketing for Emergency Care Services & Paramedics in South Africa | REGC Digital",
    metaDescription:
      "Build your emergency care or private ambulance brand online. HPCSA-compliant websites, SEO & reputation management for South African emergency care providers.",
    h1: "Digital Marketing for Emergency Care Practitioners & Private Ambulance Services in South Africa",
    heroSubheading:
      "When people need emergency care, they search fast. Make sure your service is found first.",
    whyItMatters:
      "Emergency services live and die by trust and recall. Strong brand presence, fast websites and visible reviews directly influence which number a panicked family member dials.",
    painPoints: [
      "Building brand recognition for private ambulance services",
      "Winning corporate and estate response contracts",
      "Building community trust and 24/7 awareness",
      "Communicating coverage areas and response times clearly",
    ],
    faqs: [
      { q: "How do private ambulance services attract corporate contracts online?", a: "A dedicated B2B section, downloadable capability statements, response-time data and case studies of corporate clients build the credibility needed for contract wins." },
      { q: "What digital marketing strategies work for emergency care?", a: "Strong local SEO, Google Business Profile dominance, visible 24/7 contact options, community-education content and aggressive reputation management." },
      { q: "How do I build community trust for my emergency service?", a: "Consistent education content (CPR basics, what to do in an emergency), visible team presence and active reputation management across Google, Facebook and community groups." },
      ...generalFAQs,
    ],
  },
  {
    slug: "environmental-health",
    shortName: "Environmental Health",
    fullName: "Environmental Health Practitioners",
    professionals: "environmental health practitioners",
    patientTerm: "clients",
    practiceTerm: "consultancy",
    regulator: "HPCSA",
    emoji: "🌱",
    titleTag: "Digital Marketing for Environmental Health Practitioners South Africa | REGC Digital",
    metaDescription:
      "Grow your environmental health consultancy online. HPCSA-compliant digital marketing, websites & SEO for South African environmental health practitioners.",
    h1: "Digital Marketing for Environmental Health Practitioners in South Africa",
    heroSubheading:
      "Businesses and municipalities seeking environmental health services start their search online. Be there when they look.",
    whyItMatters:
      "Environmental health is overwhelmingly B2B and tender-driven. A credible, content-rich digital presence is the gateway to corporate clients, government tenders and consultancy work.",
    painPoints: [
      "B2B marketing to businesses and municipalities is unfamiliar territory",
      "Low public awareness of environmental health services",
      "Tender and contract acquisition is opaque",
      "Building credibility and demonstrable expertise online",
    ],
    faqs: [
      { q: "How do environmental health practitioners attract business clients online?", a: "B2B-focused content (food safety audits, occupational hygiene, water quality), case studies, downloadable compliance guides and a strong LinkedIn presence." },
      { q: "What digital presence helps with government tender applications?", a: "A professional website with clear capability statements, BBBEE info, certifications, past performance and downloadable company profiles dramatically improves tender shortlisting." },
      { q: "How do I market environmental health inspection services?", a: "Targeted SEO around compliance terms ('food safety audit Johannesburg'), educational content for facility managers, and inbound lead capture forms." },
      ...generalFAQs,
    ],
  },
  {
    slug: "optometry-dispensing-opticians",
    shortName: "Optometry & Opticians",
    fullName: "Optometrists & Dispensing Opticians",
    professionals: "optometrists and dispensing opticians",
    patientTerm: "patients",
    practiceTerm: "practice",
    regulator: "HPCSA",
    emoji: "👓",
    titleTag: "Digital Marketing for Optometrists & Opticians in South Africa | REGC Digital",
    metaDescription:
      "Grow your optometry practice or optical store online. HPCSA-compliant websites, SEO & social media for South African optometrists and dispensing opticians.",
    h1: "Digital Marketing for Optometrists & Dispensing Opticians in South Africa",
    heroSubheading:
      "Patients searching for eye tests, frames or contact lenses choose the practice with the strongest online presence.",
    whyItMatters:
      "Independent optometrists are squeezed by national chains with massive marketing budgets. Hyper-local digital marketing and patient retention systems are how independents win and keep patients.",
    painPoints: [
      "Competition from retail optical chains (Spec-Savers, Torga, Execuspecs)",
      "Medical-aid billing confusion creating booking friction",
      "Showcasing frame and lens product ranges online",
      "Annual recall and patient retention",
    ],
    faqs: [
      { q: "How do independent optometrists compete with Spec-Savers online?", a: "By dominating hyper-local search, showing real personality on social media, offering frictionless online booking, and running automated annual recall systems the chains can't match." },
      { q: "Can I showcase eyewear products on my website?", a: "Absolutely. A curated frame gallery and brand pages improve SEO and pre-sell patients before they walk in. We integrate this with HPCSA-compliant copy." },
      { q: "How do I implement a patient recall system using digital tools?", a: "Automated email + WhatsApp recall sequences 11 months after each comprehensive eye exam consistently lift annual return rates by 25–40%." },
      ...generalFAQs,
    ],
  },
  {
    slug: "dental-therapy-oral-hygiene",
    shortName: "Dental Therapy & Oral Hygiene",
    fullName: "Dental Therapists & Oral Hygienists",
    professionals: "dental therapists and oral hygienists",
    patientTerm: "patients",
    practiceTerm: "practice",
    regulator: "HPCSA",
    emoji: "🦷",
    titleTag: "Digital Marketing for Dental Therapists & Oral Hygienists in South Africa | REGC Digital",
    metaDescription:
      "Grow your dental therapy or oral hygiene practice online. HPCSA-compliant websites, SEO & patient communication for South African dental therapy professionals.",
    h1: "Digital Marketing for Dental Therapists & Oral Hygienists in South Africa",
    heroSubheading:
      "Patients who prioritise preventive dental care are actively looking for oral health professionals. Make sure they find you.",
    whyItMatters:
      "Many South Africans don't realise oral hygienists and dental therapists can be visited independently. Education-led marketing unlocks an enormous untapped market.",
    painPoints: [
      "Low public awareness of dental therapists vs dentists",
      "Building an independent practice outside of a dental surgery",
      "Communicating the value of preventive care",
      "Reaching schools and corporate wellness programmes",
    ],
    faqs: [
      { q: "How do I explain the difference between a dental therapist and a dentist online?", a: "A clear scope-of-practice page, FAQ-rich content and educational reels remove confusion and pre-qualify the right patients before they book." },
      { q: "Can oral hygienists run independent practices and market them?", a: "Yes. Oral hygienists may run independent practices in South Africa and market services within HPCSA rules. We build compliant, conversion-focused websites for these practices." },
      { q: "What content attracts patients interested in preventive dental care?", a: "Educational content on gum disease, scale-and-polish benefits, kids' oral health and at-home care drives the highest-quality preventive bookings." },
      ...generalFAQs,
    ],
  },
  {
    slug: "medical-technology",
    shortName: "Medical Laboratories",
    fullName: "Medical Laboratory Scientists & Pathology Practices",
    professionals: "medical laboratory scientists and pathology practices",
    patientTerm: "patients",
    practiceTerm: "laboratory",
    regulator: "HPCSA",
    emoji: "🧪",
    titleTag: "Digital Marketing for Medical Laboratories & Pathology Practices SA | REGC Digital",
    metaDescription:
      "Build your private pathology lab or medical technology practice online. HPCSA-compliant websites & digital marketing for South African medical laboratory professionals.",
    h1: "Digital Marketing for Medical Laboratory Scientists & Pathology Practices in South Africa",
    heroSubheading:
      "Private laboratories that invest in digital presence attract more GP referrals and direct patient bookings.",
    whyItMatters:
      "Lancet and Ampath dominate pathology in South Africa, but smaller private labs win on speed, service and specialised testing — provided their digital presence communicates that clearly.",
    painPoints: [
      "Heavy dependence on GP and specialist referrals",
      "Competing with national groups (Lancet, Ampath, PathCare)",
      "Patient awareness of direct-access testing is low",
      "B2B marketing to clinics and prescribing doctors",
    ],
    faqs: [
      { q: "Can private medical labs attract direct-to-consumer patients?", a: "Yes — particularly for wellness panels, lifestyle testing and direct-pay tests. A clear consumer-facing site with pricing and easy booking captures this growing market." },
      { q: "How do I increase GP referrals to my laboratory?", a: "A dedicated GP/clinician portal, fast turnaround communication, downloadable test catalogues and active relationship marketing on LinkedIn drive sustainable referral growth." },
      { q: "What digital marketing strategies work for pathology practices?", a: "Dual-track: a B2B doctor-focused channel (LinkedIn, email, portal) and a B2C wellness-focused channel (SEO, social, easy booking)." },
      ...generalFAQs,
    ],
  },
  {
    slug: "allied-health-complementary",
    shortName: "Allied & Complementary Health",
    fullName: "Allied Health & Complementary Medicine Practitioners",
    professionals: "chiropractors, homeopaths, acupuncturists, naturopaths, osteopaths and other AHPCSA-registered practitioners",
    patientTerm: "patients",
    practiceTerm: "practice",
    regulator: "AHPCSA",
    emoji: "🌿",
    titleTag: "Digital Marketing for Chiropractors, Homeopaths & Allied Health SA | REGC Digital",
    metaDescription:
      "Grow your complementary or alternative health practice online. AHPCSA-compliant websites, SEO & social media for South African allied health practitioners.",
    h1: "Digital Marketing for Allied Health & Complementary Medicine Practitioners in South Africa",
    heroSubheading:
      "Patients exploring natural and complementary healthcare are searching online. Your expertise deserves to be found.",
    whyItMatters:
      "Complementary practitioners face skepticism from conventional medicine and stricter scrutiny from advertising regulators. Authoritative, evidence-aware content is your strongest asset.",
    painPoints: [
      "Skepticism from the conventional medicine community",
      "Building credibility and trust online",
      "Educating patients on modality benefits without overclaiming",
      "Strict AHPCSA compliance on advertising claims",
    ],
    faqs: [
      { q: "What AHPCSA rules apply to complementary medicine advertising?", a: "AHPCSA enforces honest, non-misleading advertising aligned with each modality's recognised scope. Outcome guarantees, comparative claims and treatment-of-serious-disease claims are restricted." },
      { q: "Can I make health claims about my modality on my website?", a: "Only claims supported by recognised modality scope and evidence. We help you communicate value compliantly without crossing AHPCSA lines." },
      { q: "How do I build credibility as a chiropractor or homeopath online?", a: "Show your training, registration, philosophy, conditions you treat, what to expect at a visit, and educational content. Avoid hype." },
      { q: "What social media content works for natural health practitioners?", a: "Patient-education content on common concerns, demystifying your modality, day-in-the-life clips and answering common patient questions consistently outperform promotional content." },
      ...generalFAQs,
    ],
  },
  {
    slug: "traditional-health-practitioners",
    shortName: "Traditional Health Practitioners",
    fullName: "Traditional Health Practitioners",
    professionals: "izinyanga, izangoma and registered traditional healers",
    patientTerm: "patients",
    practiceTerm: "practice",
    regulator: "Interim THPCSA",
    emoji: "🪶",
    titleTag: "Digital Marketing for Traditional Healers in South Africa | REGC Digital",
    metaDescription:
      "Build your digital presence as a registered traditional health practitioner. THPCSA-compliant websites and digital marketing for South African traditional healers.",
    h1: "Digital Marketing for Traditional Health Practitioners in South Africa",
    heroSubheading:
      "Traditional healing is being formally recognised in South Africa. A professional digital presence helps your community find and trust your practice.",
    whyItMatters:
      "With formal regulations now in motion, traditional healers who establish a credible digital presence early will lead the profession into its formalised future.",
    painPoints: [
      "Transitioning from informal to formal practice under new regulations",
      "Building trust and legitimacy in the digital space",
      "Reaching urban communities active on digital channels",
      "Differentiating registered from unregistered practitioners",
    ],
    faqs: [
      { q: "How do new traditional health regulations affect my marketing?", a: "Once registered, you may market your services as a recognised traditional health practitioner. We help you communicate your registration, practice scope and consultation process clearly." },
      { q: "Can traditional healers advertise their services online in South Africa?", a: "Yes — registered traditional health practitioners may have a professional online presence. Avoid claims of curing serious disease and ensure all content respects cultural and ethical boundaries." },
      { q: "How do I show that I am registered with the Interim Traditional Health Practitioners Council?", a: "We display your registration prominently, link to verifiable references where appropriate, and structure your site to communicate legitimacy at a glance." },
      ...generalFAQs,
    ],
  },
  {
    slug: "dental-technicians",
    shortName: "Dental Technicians",
    fullName: "Dental Technicians & Dental Laboratories",
    professionals: "dental technicians and dental technologists",
    patientTerm: "client practices",
    practiceTerm: "laboratory",
    regulator: "SADTC",
    emoji: "🦷",
    titleTag: "Digital Marketing for Dental Technicians & Dental Labs in South Africa | REGC Digital",
    metaDescription:
      "Grow your dental laboratory or dental technology practice online. SADTC-compliant websites & B2B digital marketing for South African dental technicians.",
    h1: "Digital Marketing for Dental Technicians & Dental Laboratories in South Africa",
    heroSubheading:
      "Dental practices looking for a reliable lab partner search online. Make sure your dental laboratory is found first.",
    whyItMatters:
      "Dental laboratories are pure B2B — your website, portfolio and turnaround communications are the entire sales process. Most labs are invisible online and lose work to better-marketed competitors.",
    painPoints: [
      "B2B marketing to dental practices is rarely formalised",
      "Differentiating quality, materials and turnaround time",
      "Showcasing portfolio of laboratory work professionally",
      "Communicating reliability and modern equipment",
    ],
    faqs: [
      { q: "How do dental laboratories attract new dental practice clients online?", a: "A professional B2B website with a portfolio, materials list, turnaround times, courier coverage and an easy onboarding form is the highest-leverage investment." },
      { q: "Can I show examples of my lab work on a website?", a: "Yes. A curated portfolio (with consent where patient-identifiable) is one of the most powerful sales tools for a dental laboratory." },
      { q: "What digital channels work best for B2B dental laboratory marketing?", a: "A strong website + LinkedIn presence + targeted Google search ('dental lab Pretoria'), paired with email outreach to local practices." },
      ...generalFAQs,
    ],
  },
];

export const findDomain = (slug?: string) => domains.find((d) => d.slug === slug);