export type LocationType = "city" | "province";

export interface Location {
  slug: string;
  name: string;
  type: LocationType;
  province?: string;
  region: string;
  population?: string;
  intro: string;
  areas: string[];
  medicalContext: string;
  whyLocal: string;
}

export const locations: Location[] = [
  // ── Provinces ────────────────────────────────────────────
  {
    slug: "gauteng",
    name: "Gauteng",
    type: "province",
    region: "Gauteng",
    population: "≈ 16 million residents",
    intro:
      "Gauteng is South Africa's economic engine and most densely populated province, home to Johannesburg, Pretoria, and a sprawling network of medical practices serving roughly 16 million residents.",
    areas: ["Johannesburg", "Pretoria", "Sandton", "Centurion", "Midrand", "Soweto", "Roodepoort", "Randburg", "Benoni", "Boksburg"],
    medicalContext:
      "Gauteng has the highest concentration of private hospitals (Netcare, Mediclinic, Life Healthcare) and specialist practices in the country. Patient acquisition here is highly competitive — strong digital presence is non-negotiable.",
    whyLocal:
      "We've worked with Gauteng practices from Sandton to Soweto. Each suburb has different patient demographics, search behaviour, and competitive intensity — and our campaigns are built to reflect that.",
  },
  {
    slug: "western-cape",
    name: "Western Cape",
    type: "province",
    region: "Western Cape",
    population: "≈ 7 million residents",
    intro:
      "The Western Cape — anchored by Cape Town — combines a sophisticated medical tourism market with a fast-growing local patient base across the Boland and Garden Route.",
    areas: ["Cape Town", "Stellenbosch", "Paarl", "Somerset West", "George", "Knysna", "Mossel Bay", "Hermanus"],
    medicalContext:
      "Cape Town hosts world-class hospitals like Groote Schuur and the UCT Private Academic Hospital. Cosmetic, dental, and specialist practices serve both domestic and international patients.",
    whyLocal:
      "Western Cape patients research extensively before booking. We invest more in content and reviews here, knowing it directly drives conversions.",
  },
  {
    slug: "kwazulu-natal",
    name: "KwaZulu-Natal",
    type: "province",
    region: "KwaZulu-Natal",
    population: "≈ 11 million residents",
    intro:
      "KwaZulu-Natal stretches from Durban's coastal metro through Pietermaritzburg to the Drakensberg — with a healthcare market shaped by both urban and rural patient needs.",
    areas: ["Durban", "Pietermaritzburg", "Umhlanga", "Ballito", "Hillcrest", "Newcastle", "Richards Bay"],
    medicalContext:
      "Durban's Umhlanga medical precinct rivals Sandton in specialist density. Coastal practices benefit from both local and inland referrals.",
    whyLocal:
      "We tailor messaging to KZN's diverse patient base — English, isiZulu, and Afrikaans speakers all search differently.",
  },
  {
    slug: "eastern-cape",
    name: "Eastern Cape",
    type: "province",
    region: "Eastern Cape",
    population: "≈ 7 million residents",
    intro:
      "The Eastern Cape spans Gqeberha (Port Elizabeth), East London, and rural communities — an underserved but rapidly digitising healthcare market.",
    areas: ["Gqeberha (Port Elizabeth)", "East London", "Mthatha", "Uitenhage", "Jeffrey's Bay"],
    medicalContext:
      "Specialists here often draw patients from across the province, making strong local SEO especially valuable for catchment expansion.",
    whyLocal:
      "We help Eastern Cape practices reach patients in towns where competitors haven't yet established a digital presence.",
  },
  {
    slug: "free-state",
    name: "Free State",
    type: "province",
    region: "Free State",
    population: "≈ 3 million residents",
    intro:
      "The Free State centres on Bloemfontein — the judicial capital — with a tight-knit medical community serving both urban and farming communities.",
    areas: ["Bloemfontein", "Welkom", "Bethlehem", "Kroonstad", "Sasolburg"],
    medicalContext:
      "Bloemfontein's Universitas and Pelonomi hospitals anchor a strong specialist ecosystem with referrals across the province.",
    whyLocal:
      "Free State patients respond strongly to community-based marketing — referrals, reviews, and word-of-mouth amplified digitally.",
  },
  {
    slug: "limpopo",
    name: "Limpopo",
    type: "province",
    region: "Limpopo",
    population: "≈ 6 million residents",
    intro:
      "Limpopo's healthcare market is anchored by Polokwane, with growing private practice in Tzaneen, Mokopane, and the wider Capricorn district.",
    areas: ["Polokwane", "Tzaneen", "Mokopane", "Thohoyandou", "Phalaborwa"],
    medicalContext:
      "Distance is the defining challenge — patients often travel 50–100 km to reach specialists, making clear online information critical.",
    whyLocal:
      "We design Limpopo practice websites for low-bandwidth mobile users and multilingual audiences (Sepedi, Tshivenda, Xitsonga).",
  },
  {
    slug: "mpumalanga",
    name: "Mpumalanga",
    type: "province",
    region: "Mpumalanga",
    population: "≈ 5 million residents",
    intro:
      "Mpumalanga's medical hubs in Mbombela (Nelspruit) and eMalahleni (Witbank) serve the Lowveld and Highveld with growing specialist demand.",
    areas: ["Mbombela (Nelspruit)", "eMalahleni (Witbank)", "Secunda", "Middelburg", "Ermelo"],
    medicalContext:
      "Mining and tourism economies create unique occupational health and trauma care demand patterns.",
    whyLocal:
      "We help Mpumalanga practices reach both local communities and the regional industrial workforce.",
  },
  {
    slug: "north-west",
    name: "North West",
    type: "province",
    region: "North West",
    population: "≈ 4 million residents",
    intro:
      "The North West province — centred on Rustenburg, Mahikeng, and Klerksdorp — combines mining, agriculture, and a growing specialist medical market.",
    areas: ["Rustenburg", "Mahikeng", "Klerksdorp", "Potchefstroom", "Brits"],
    medicalContext:
      "Rustenburg's mining belt drives demand for occupational, orthopaedic, and emergency care. Specialist practices here serve both medical aid and corporate patients.",
    whyLocal:
      "We position North West practices to capture mining-sector and family medicine demand, both online and through corporate referral channels.",
  },
  {
    slug: "northern-cape",
    name: "Northern Cape",
    type: "province",
    region: "Northern Cape",
    population: "≈ 1.3 million residents",
    intro:
      "South Africa's largest but least populated province — Northern Cape practices in Kimberley and Upington serve enormous catchment areas.",
    areas: ["Kimberley", "Upington", "Kuruman", "Springbok", "De Aar"],
    medicalContext:
      "Vast distances mean digital visibility is the single biggest factor in patient acquisition — patients often choose based on what they find first online.",
    whyLocal:
      "We optimise Northern Cape practices for long-tail, location-specific searches that capture rural and small-town patient demand.",
  },

  // ── Cities ────────────────────────────────────────────
  {
    slug: "johannesburg",
    name: "Johannesburg",
    type: "city",
    province: "Gauteng",
    region: "Gauteng",
    population: "≈ 6 million in metro",
    intro:
      "Johannesburg is South Africa's largest metro and most competitive private healthcare market — patients here have endless options, and your digital presence is the deciding factor.",
    areas: ["Sandton", "Rosebank", "Houghton", "Parktown", "Bryanston", "Fourways", "Northcliff", "Melrose", "Killarney", "Soweto"],
    medicalContext:
      "Johannesburg hosts Netcare Milpark, Sandton Mediclinic, Linksfield Hospital, and dozens of specialist precincts. Cosmetic, dental, dermatology, and cardiology practices face intense competition.",
    whyLocal:
      "Johannesburg patients are sophisticated online researchers who compare reviews, pricing, and consult availability before booking. We build campaigns engineered for conversion under that scrutiny.",
  },
  {
    slug: "sandton",
    name: "Sandton",
    type: "city",
    province: "Gauteng",
    region: "Gauteng",
    intro:
      "Sandton — Africa's richest square mile — is home to high-end specialist practices, executive health programmes, and the country's most demanding patient demographic.",
    areas: ["Sandton CBD", "Morningside", "Rivonia", "Bryanston", "Hyde Park", "Illovo", "Wierda Valley"],
    medicalContext:
      "Mediclinic Sandton and Netcare Sunninghill anchor the area. Patients expect concierge-level service from the first website visit through to follow-up.",
    whyLocal:
      "Sandton patients won't tolerate slow websites or unanswered enquiries. We build for speed, polish, and instant response — because anything less loses the booking.",
  },
  {
    slug: "pretoria",
    name: "Pretoria",
    type: "city",
    province: "Gauteng",
    region: "Gauteng",
    population: "≈ 2.5 million in metro",
    intro:
      "Pretoria — Tshwane — combines diplomatic, government, and academic communities into one of South Africa's most stable private healthcare markets.",
    areas: ["Brooklyn", "Waterkloof", "Menlyn", "Hatfield", "Centurion", "Lynnwood", "Faerie Glen", "Moot"],
    medicalContext:
      "Steve Biko Academic Hospital and Pretoria East Hospital anchor the medical landscape. Many specialists serve embassy and corporate patients with specific privacy and language needs.",
    whyLocal:
      "Pretoria patients value Afrikaans-friendly communication and longstanding practice reputations. We build campaigns that respect both.",
  },
  {
    slug: "centurion",
    name: "Centurion",
    type: "city",
    province: "Gauteng",
    region: "Gauteng",
    intro:
      "Centurion bridges Johannesburg and Pretoria — a fast-growing residential and corporate hub with strong demand for family-friendly medical practices.",
    areas: ["Eldoraigne", "Wierda Park", "Heuweloord", "Lyttelton", "Irene", "Highveld"],
    medicalContext:
      "Unitas Hospital and Netcare Pretoria East serve a young, family-focused population. GP, paediatric, and dental practices dominate enquiry volume.",
    whyLocal:
      "Centurion families prioritise convenience, online booking, and trusted reviews. We build practice websites that convert in under a minute on mobile.",
  },
  {
    slug: "midrand",
    name: "Midrand",
    type: "city",
    province: "Gauteng",
    region: "Gauteng",
    intro:
      "Midrand sits between Sandton and Pretoria — a corporate corridor with rapid residential expansion and rising demand for medical services.",
    areas: ["Halfway House", "Vorna Valley", "Carlswald", "Waterfall", "Kyalami"],
    medicalContext:
      "Waterfall City and Kyalami have driven a wave of new medical centre openings. Competition for early-mover SEO advantage is intense.",
    whyLocal:
      "We help newer Midrand practices outrank established competitors by focusing on hyper-local search and consistent review velocity.",
  },
  {
    slug: "soweto",
    name: "Soweto",
    type: "city",
    province: "Gauteng",
    region: "Gauteng",
    intro:
      "Soweto — Johannesburg's largest township — has a rapidly growing private medical sector serving over 1 million residents.",
    areas: ["Diepkloof", "Orlando", "Pimville", "Jabulani", "Protea Glen", "Dobsonville"],
    medicalContext:
      "Chris Hani Baragwanath remains the largest hospital, but private GPs, dentists, and clinics are growing fast as medical aid uptake increases.",
    whyLocal:
      "Soweto patients increasingly book via WhatsApp and mobile-first search. We design for that reality — fast pages, click-to-chat, and isiZulu-aware content.",
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    type: "city",
    province: "Western Cape",
    region: "Western Cape",
    population: "≈ 4.8 million in metro",
    intro:
      "Cape Town blends a sophisticated local patient base with a global medical tourism market — making it South Africa's most opportunity-rich healthcare metro.",
    areas: ["City Bowl", "Sea Point", "Claremont", "Rondebosch", "Constantia", "Bellville", "Durbanville", "Century City", "Tokai"],
    medicalContext:
      "Cape Town hosts Groote Schuur, UCT Private Academic, Mediclinic Constantiaberg, and a globally-known cosmetic and reproductive medicine sector.",
    whyLocal:
      "Cape Town patients (local and international) read reviews exhaustively. We invest heavily in reputation, content, and visual storytelling for our Cape Town clients.",
  },
  {
    slug: "stellenbosch",
    name: "Stellenbosch",
    type: "city",
    province: "Western Cape",
    region: "Western Cape",
    intro:
      "Stellenbosch combines academic, agricultural, and tourism economies — with healthcare demand from a young student population, established families, and visitors.",
    areas: ["Stellenbosch Central", "Welgevonden", "Die Boord", "Paradyskloof", "Idas Valley"],
    medicalContext:
      "Mediclinic Stellenbosch and a growing private practice network serve a quality-conscious, well-informed patient base.",
    whyLocal:
      "We build Stellenbosch practice marketing that resonates with both English and Afrikaans-speaking patients across very different life stages.",
  },
  {
    slug: "paarl",
    name: "Paarl",
    type: "city",
    province: "Western Cape",
    region: "Western Cape",
    intro:
      "Paarl serves the Cape Winelands as a regional medical hub — drawing patients from Wellington, Franschhoek, and surrounding wine farms.",
    areas: ["Paarl Central", "Northern Paarl", "Southern Paarl", "Wellington", "Franschhoek"],
    medicalContext:
      "Mediclinic Paarl anchors specialist care, while family practices serve a stable agricultural and tourism community.",
    whyLocal:
      "We focus Paarl campaigns on regional reach — capturing patients from across the Winelands who travel in for specialist care.",
  },
  {
    slug: "somerset-west",
    name: "Somerset West",
    type: "city",
    province: "Western Cape",
    region: "Western Cape",
    intro:
      "Somerset West and the Helderberg basin host a wealthy, retiree-heavy population with high private healthcare engagement.",
    areas: ["Somerset West", "Strand", "Gordon's Bay", "Sir Lowry's Pass", "Lwandle"],
    medicalContext:
      "Mediclinic Vergelegen serves a patient base with high engagement in cardiology, oncology, and orthopaedics.",
    whyLocal:
      "Helderberg patients value clarity and reassurance. We craft messaging that reads more like a trusted advisor than a marketing pitch.",
  },
  {
    slug: "george",
    name: "George",
    type: "city",
    province: "Western Cape",
    region: "Western Cape",
    intro:
      "George — the Garden Route's medical hub — serves patients from Mossel Bay to Knysna and Plettenberg Bay.",
    areas: ["George CBD", "Heatherlands", "Glentana", "Wilderness", "Mossel Bay", "Knysna"],
    medicalContext:
      "Mediclinic George and Life Bay View serve a regional catchment area with strong retiree and tourism demand.",
    whyLocal:
      "We build Garden Route campaigns that capture both resident and visitor enquiries across the regional catchment.",
  },
  {
    slug: "durban",
    name: "Durban",
    type: "city",
    province: "KwaZulu-Natal",
    region: "KwaZulu-Natal",
    population: "≈ 3.9 million in metro",
    intro:
      "Durban — eThekwini — is South Africa's east coast medical capital, with the Umhlanga precinct rivalling Sandton for specialist density.",
    areas: ["Umhlanga", "Berea", "Morningside", "Westville", "Hillcrest", "Glenwood", "Musgrave", "Ballito"],
    medicalContext:
      "Netcare Umhlanga, Life Westville, and Inkosi Albert Luthuli anchor a thriving private medical market with strong specialist concentration.",
    whyLocal:
      "Durban patients respond strongly to community trust signals — reviews, local sponsorships, and visible team presence. We build that into every campaign.",
  },
  {
    slug: "umhlanga",
    name: "Umhlanga",
    type: "city",
    province: "KwaZulu-Natal",
    region: "KwaZulu-Natal",
    intro:
      "Umhlanga has become Durban's premium medical precinct — a coastal hub where specialist practices serve both KZN residents and inland medical tourists.",
    areas: ["Umhlanga Ridge", "Umhlanga Rocks", "La Lucia", "Gateway", "uMdloti"],
    medicalContext:
      "Netcare Umhlanga and Busamed Gateway concentrate specialist care into one of the country's most modern medical precincts.",
    whyLocal:
      "Umhlanga patients expect concierge-level digital experiences — fast websites, online booking, instant WhatsApp response.",
  },
  {
    slug: "pietermaritzburg",
    name: "Pietermaritzburg",
    type: "city",
    province: "KwaZulu-Natal",
    region: "KwaZulu-Natal",
    intro:
      "Pietermaritzburg — KZN's capital — serves as the medical hub for the Midlands and inland communities.",
    areas: ["PMB Central", "Hilton", "Howick", "Scottsville", "Hayfields"],
    medicalContext:
      "Mediclinic Pietermaritzburg and Life Hilton anchor specialist care for a regional catchment that extends into the Midlands and Drakensberg.",
    whyLocal:
      "We help PMB practices capture patients from across the Midlands — many of whom drive an hour or more for trusted specialist care.",
  },
  {
    slug: "ballito",
    name: "Ballito",
    type: "city",
    province: "KwaZulu-Natal",
    region: "KwaZulu-Natal",
    intro:
      "Ballito and the North Coast have boomed — a wave of relocations from Gauteng has created sharply rising demand for established medical care.",
    areas: ["Ballito", "Salt Rock", "Sheffield Beach", "uMhlali", "Tinley Manor"],
    medicalContext:
      "Netcare Alberlito serves a growing population of young families and remote-working professionals new to the area.",
    whyLocal:
      "North Coast patients are often new to KZN — they search for practices the same way they'd search in a new city. We make sure yours is the first they find.",
  },
  {
    slug: "gqeberha",
    name: "Gqeberha (Port Elizabeth)",
    type: "city",
    province: "Eastern Cape",
    region: "Eastern Cape",
    population: "≈ 1.2 million in metro",
    intro:
      "Gqeberha (formerly Port Elizabeth) is the Eastern Cape's largest metro — a Friendly City with a stable medical community serving a wide regional catchment.",
    areas: ["Summerstrand", "Walmer", "Mill Park", "Newton Park", "Greenacres", "Despatch", "Uitenhage"],
    medicalContext:
      "Life St George's, Netcare Greenacres, and Livingstone Hospital anchor the metro's medical infrastructure, with strong specialist density around the Greenacres precinct.",
    whyLocal:
      "Gqeberha patients value local roots and community presence. We build campaigns that highlight your team's connection to the city.",
  },
  {
    slug: "east-london",
    name: "East London",
    type: "city",
    province: "Eastern Cape",
    region: "Eastern Cape",
    intro:
      "East London — Buffalo City — combines coastal lifestyle with a serious specialist medical sector serving the Eastern Cape's coastal regions.",
    areas: ["Beacon Bay", "Vincent", "Berea", "Quigney", "Gonubie", "Mdantsane"],
    medicalContext:
      "Life St Dominic's, Life Beacon Bay, and Frere Hospital anchor East London's medical landscape with strong cardiology, oncology, and orthopaedic specialists.",
    whyLocal:
      "We help East London practices serve both metro patients and referrals from rural Eastern Cape — extending reach without diluting message.",
  },
  {
    slug: "bloemfontein",
    name: "Bloemfontein",
    type: "city",
    province: "Free State",
    region: "Free State",
    intro:
      "Bloemfontein — Mangaung — is South Africa's judicial capital and the Free State's medical hub, serving patients from across central South Africa.",
    areas: ["Westdene", "Universitas", "Langenhoven Park", "Bayswater", "Brandwag", "Pellissier"],
    medicalContext:
      "Universitas Hospital, Pelonomi Hospital, and Mediclinic Bloemfontein form a strong specialist ecosystem with academic medical roots.",
    whyLocal:
      "Bloemfontein patients value relationships and continuity. We build practice marketing around long-term trust, not one-off conversions.",
  },
  {
    slug: "polokwane",
    name: "Polokwane",
    type: "city",
    province: "Limpopo",
    region: "Limpopo",
    intro:
      "Polokwane — Pietersburg — is Limpopo's capital and primary medical hub, serving patients from across the province.",
    areas: ["Polokwane Central", "Bendor", "Fauna Park", "Welgelegen", "Flora Park"],
    medicalContext:
      "Mediclinic Polokwane and Pietersburg Hospital anchor specialist care, with patients regularly travelling 100+ km from Tzaneen, Mokopane, and beyond.",
    whyLocal:
      "We optimise Polokwane practice campaigns for the entire provincial catchment — capturing rural patients who research carefully before travelling.",
  },
  {
    slug: "mbombela",
    name: "Mbombela (Nelspruit)",
    type: "city",
    province: "Mpumalanga",
    region: "Mpumalanga",
    intro:
      "Mbombela (formerly Nelspruit) is Mpumalanga's capital and the Lowveld's medical hub, serving patients from across the province and into Eswatini.",
    areas: ["Mbombela Central", "West Acres", "Sonheuwel", "Steiltes", "White River"],
    medicalContext:
      "Mediclinic Nelspruit and Rob Ferreira Hospital anchor specialist care for the entire Lowveld region.",
    whyLocal:
      "We help Mbombela practices serve both local patients and the broader Lowveld and cross-border catchment.",
  },
  {
    slug: "rustenburg",
    name: "Rustenburg",
    type: "city",
    province: "North West",
    region: "North West",
    intro:
      "Rustenburg sits at the heart of the North West's mining belt — driving distinctive demand for occupational, orthopaedic, and family medicine.",
    areas: ["Rustenburg Central", "Cashan", "Safari Gardens", "Waterfall East", "Geelhoutpark"],
    medicalContext:
      "Netcare Ferncrest and Life Peglerae serve both local residents and the regional mining workforce.",
    whyLocal:
      "We position Rustenburg practices to capture both medical aid and corporate-funded patient demand.",
  },
  {
    slug: "kimberley",
    name: "Kimberley",
    type: "city",
    province: "Northern Cape",
    region: "Northern Cape",
    intro:
      "Kimberley — the Diamond City — is the Northern Cape's largest urban centre and primary medical hub for the province.",
    areas: ["Kimberley Central", "Hadison Park", "Carters Glen", "Hillcrest", "Royldene"],
    medicalContext:
      "Mediclinic Kimberley and Robert Mangaliso Sobukwe Hospital anchor specialist care across an enormous, sparsely populated catchment.",
    whyLocal:
      "Kimberley practices win patients by being the most visible and trustworthy option in a market where digital research is the deciding factor.",
  },
];

export const cities = locations.filter((l) => l.type === "city");
export const provinces = locations.filter((l) => l.type === "province");
