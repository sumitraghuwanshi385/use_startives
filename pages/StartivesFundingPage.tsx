import React, { useMemo, useState, useRef, useEffect } from "react";

type FundingItem = {
  id: string;
  name: string;
  provider: string;
  region: string;
  type: string;
  stage: string[];
  funding: string;
  url: string;
  domain: string;
  description: string;
  verified: string;
};

const FUNDING: FundingItem[] = [
  {
    id: "1",
    name: "Startup India Seed Fund Scheme",
    provider: "DPIIT",
    region: "India",
    type: "Government",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "Up to ₹20L grant + up to ₹50L convertible/debt support",
    url: "https://seedfund.startupindia.gov.in/",
    domain: "startupindia.gov.in",
    description: "Flagship DPIIT seed scheme for early-stage startups. Provides grant for PoC/prototype and convertible debt for market entry through approved incubators.",
    verified: "Sep 2026"
  },
  {
    id: "2",
    name: "Credit Guarantee Scheme for Startups",
    provider: "DPIIT / NCGTC",
    region: "India",
    type: "Government",
    stage: ["MVP", "Early Stage", "Growth"],
    funding: "Credit guarantee up to ₹20 Cr per borrower",
    url: "https://www.startupindia.gov.in/content/sih/en/credit-guarantee-scheme-for-startups.html",
    domain: "startupindia.gov.in",
    description: "Collateral-free credit guarantee for DPIIT-recognised startups. Banks and NBFCs extend loans backed by NCGTC cover up to ₹20 crore.",
    verified: "Sep 2026"
  },
  {
    id: "3",
    name: "Startup India Investor Connect",
    provider: "Startup India",
    region: "India",
    type: "Investor Platform",
    stage: ["MVP", "Early Stage", "Growth"],
    funding: "Investor discovery / investment opportunities",
    url: "https://www.startupindia.gov.in/",
    domain: "startupindia.gov.in",
    description: "Official platform connecting DPIIT-recognised startups with investors, VCs and angel networks for fundraising and visibility.",
    verified: "Sep 2026"
  },
  {
    id: "4",
    name: "Fund of Funds for Startups",
    provider: "Government of India / SIDBI",
    region: "India",
    type: "Government",
    stage: ["Early Stage", "Growth"],
    funding: "Indirect VC funding through eligible AIFs",
    url: "https://www.startupindia.gov.in/",
    domain: "startupindia.gov.in",
    description: "Government corpus that invests in SEBI-registered AIFs, which in turn fund startups across stages and sectors.",
    verified: "Sep 2026"
  },
  {
    id: "5",
    name: "Fund of Funds 2.0",
    provider: "Government of India",
    region: "India",
    type: "Government",
    stage: ["Early Stage", "Growth"],
    funding: "₹10,000 Cr corpus for deep-tech & manufacturing",
    url: "https://www.startupindia.gov.in/",
    domain: "startupindia.gov.in",
    description: "₹10,000 crore FoF focused on deep-tech, manufacturing and long-term patient capital for Indian startups via AIFs.",
    verified: "Sep 2026"
  },
  {
    id: "6",
    name: "GeM Startup / Public Procurement",
    provider: "Government e Marketplace",
    region: "India",
    type: "Government",
    stage: ["MVP", "Early Stage", "Growth"],
    funding: "Government procurement opportunity",
    url: "https://gem.gov.in/",
    domain: "gem.gov.in",
    description: "Priority access for startups on the Government e-Marketplace. Enables selling products and services to central and state departments.",
    verified: "Sep 2026"
  },
  {
    id: "7",
    name: "Bihar Startup Policy",
    provider: "Department of Industries, Bihar",
    region: "Bihar, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "Up to ₹10L seed support listed in policy",
    url: "https://www.startupindia.gov.in/content/sih/en/state-startup-policies/Bihar-state-policy.html",
    domain: "startupindia.gov.in",
    description: "State policy offering seed support, incentives and ecosystem benefits for startups registered in Bihar.",
    verified: "Sep 2026"
  },
  {
    id: "8",
    name: "Kerala Startup Mission",
    provider: "KSUM",
    region: "Kerala, India",
    type: "State / Incubator",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "Program-specific grants and support",
    url: "https://startupmission.kerala.gov.in/",
    domain: "startupmission.kerala.gov.in",
    description: "Kerala’s nodal agency for startups. Offers grants, incubation, mentorship and sector-focused programs across stages.",
    verified: "Sep 2026"
  },
  {
    id: "9",
    name: "Karnataka Startup Cell",
    provider: "Government of Karnataka",
    region: "Karnataka, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "Elevate seed funding up to ₹50L / ₹1 Cr deep-tech",
    url: "https://startup.karnataka.gov.in/",
    domain: "startup.karnataka.gov.in",
    description: "State startup cell with Elevate and Elevate NxT programs providing significant seed support, especially for deep-tech.",
    verified: "Sep 2026"
  },
  {
    id: "10",
    name: "StartupTN",
    provider: "Government of Tamil Nadu",
    region: "Tamil Nadu, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "Program-specific support",
    url: "https://startuptn.in/",
    domain: "startuptn.in",
    description: "Tamil Nadu’s startup mission offering grants, incubation, patent support and market linkages for local founders.",
    verified: "Sep 2026"
  },
  {
    id: "11",
    name: "Maharashtra Startup Ecosystem",
    provider: "Government of Maharashtra",
    region: "Maharashtra, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "Program-specific support + CM MahaFund",
    url: "https://startup.maharashtra.gov.in/",
    domain: "startup.maharashtra.gov.in",
    description: "State ecosystem with seed support, tax benefits and the CM MahaFund for high-potential startups.",
    verified: "Sep 2026"
  },
  {
    id: "12",
    name: "Gujarat Startup Ecosystem",
    provider: "Government of Gujarat",
    region: "Gujarat, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "Program-specific support",
    url: "https://startup.gujarat.gov.in/",
    domain: "startup.gujarat.gov.in",
    description: "Gujarat startup policy providing financial assistance, land benefits and R&D support across key sectors.",
    verified: "Sep 2026"
  },
  {
    id: "13",
    name: "Startup Telangana",
    provider: "Government of Telangana",
    region: "Telangana, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "₹1,000 Cr Startup Fund + T-Hub support",
    url: "https://startup.telangana.gov.in/",
    domain: "startup.telangana.gov.in",
    description: "Telangana’s startup framework with a large fund-of-funds, T-Hub incubation and strong AI/spacetech focus.",
    verified: "Sep 2026"
  },
  {
    id: "14",
    name: "NIDHI-PRAYAS",
    provider: "Department of Science & Technology",
    region: "India",
    type: "Grant / Incubation",
    stage: ["Idea", "Prototype"],
    funding: "Prototype support up to ₹20L–₹40L via centres",
    url: "https://nidhi.dst.gov.in/",
    domain: "nidhi.dst.gov.in",
    description: "DST scheme that funds innovators to convert ideas into working prototypes through PRAYAS Centres across India.",
    verified: "Sep 2026"
  },
  {
    id: "15",
    name: "NIDHI Seed Support System",
    provider: "Department of Science & Technology",
    region: "India",
    type: "Grant / Seed",
    stage: ["Prototype", "MVP", "Early Stage"],
    funding: "Program-specific seed support via TBIs",
    url: "https://nidhi.dst.gov.in/",
    domain: "nidhi.dst.gov.in",
    description: "Seed capital for startups incubated in DST-supported Technology Business Incubators to bridge prototype to market.",
    verified: "Sep 2026"
  },
  {
    id: "16",
    name: "MeitY TIDE 2.0",
    provider: "MeitY",
    region: "India",
    type: "Government / Incubation",
    stage: ["Idea", "Prototype", "MVP"],
    funding: "Program-specific support",
    url: "https://www.meity.gov.in/",
    domain: "meity.gov.in",
    description: "MeitY program supporting technology startups through incubators with grants and mentoring for early product development.",
    verified: "Sep 2026"
  },
  {
    id: "17",
    name: "MeitY GENESIS",
    provider: "MeitY",
    region: "India",
    type: "Government / Accelerator",
    stage: ["MVP", "Early Stage"],
    funding: "₹10L to ₹1 Cr for Tier-II/III tech startups",
    url: "https://www.meity.gov.in/",
    domain: "meity.gov.in",
    description: "Focused scheme for technology startups in Tier-II and Tier-III cities with pilot funding and growth support.",
    verified: "Sep 2026"
  },
  {
    id: "18",
    name: "Y Combinator",
    provider: "Y Combinator",
    region: "Global",
    type: "Accelerator",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "$500K standard deal",
    url: "https://www.ycombinator.com/apply",
    domain: "ycombinator.com",
    description: "World’s most well-known accelerator. Standard deal is $500K for \~7% equity plus unmatched network and Demo Day access.",
    verified: "Sep 2026"
  },
  {
    id: "19",
    name: "Techstars",
    provider: "Techstars",
    region: "Global",
    type: "Accelerator",
    stage: ["MVP", "Early Stage"],
    funding: "$220K current standard offer",
    url: "https://www.techstars.com/accelerators",
    domain: "techstars.com",
    description: "Global accelerator network with programs in multiple cities. Offers capital, mentorship and corporate connections.",
    verified: "Sep 2026"
  },
  {
    id: "20",
    name: "Antler India",
    provider: "Antler",
    region: "India",
    type: "VC / Accelerator",
    stage: ["Idea", "Pre-Seed", "Early Stage"],
    funding: "Program-specific investment",
    url: "https://www.antler.co/location/india",
    domain: "antler.co",
    description: "Day-zero investor and company builder. Helps founders form teams and backs them with early capital in India.",
    verified: "Sep 2026"
  },
  {
    id: "21",
    name: "100X.VC",
    provider: "100X.VC",
    region: "India",
    type: "VC",
    stage: ["Pre-Seed", "Seed"],
    funding: "Investment-specific",
    url: "https://www.100x.vc/",
    domain: "100x.vc",
    description: "India-focused early-stage VC writing first cheques and supporting founders through the seed stage.",
    verified: "Sep 2026"
  },
  {
    id: "22",
    name: "India Accelerator",
    provider: "India Accelerator",
    region: "India",
    type: "Accelerator",
    stage: ["Pre-Seed", "Seed"],
    funding: "Program-specific investment",
    url: "https://www.indiaaccelerator.co/",
    domain: "indiaaccelerator.co",
    description: "Indian accelerator providing capital, mentorship and go-to-market support for pre-seed and seed startups.",
    verified: "Sep 2026"
  },
  {
    id: "23",
    name: "Venture Catalysts",
    provider: "Venture Catalysts",
    region: "India",
    type: "Incubator / VC",
    stage: ["Pre-Seed", "Seed", "Early Stage"],
    funding: "Investment-specific",
    url: "https://venturecatalysts.in/",
    domain: "venturecatalysts.in",
    description: "Hybrid incubator and early-stage fund helping Indian startups raise capital and scale operations.",
    verified: "Sep 2026"
  },
  {
    id: "24",
    name: "Peak XV Partners",
    provider: "Peak XV Partners",
    region: "India / Global",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://www.peakxv.com/",
    domain: "peakxv.com",
    description: "Leading India-focused growth and early-stage VC (formerly Sequoia India & SEA) backing category-defining companies.",
    verified: "Sep 2026"
  },
  {
    id: "25",
    name: "Blume Ventures",
    provider: "Blume Ventures",
    region: "India",
    type: "VC",
    stage: ["Pre-Seed", "Seed", "Series A"],
    funding: "Investment-specific",
    url: "https://blume.vc/",
    domain: "blume.vc",
    description: "Early-stage Indian VC known for backing tech startups from pre-seed through Series A with active support.",
    verified: "Sep 2026"
  },
  {
    id: "26",
    name: "Elevation Capital",
    provider: "Elevation Capital",
    region: "India",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://www.elevationcapital.com/",
    domain: "elevationcapital.com",
    description: "India-focused venture firm investing across seed to growth stages in consumer and enterprise tech.",
    verified: "Sep 2026"
  },
  {
    id: "27",
    name: "Accel India",
    provider: "Accel",
    region: "India",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://www.accel.com/",
    domain: "accel.com",
    description: "Global VC with a strong India practice, backing high-growth startups from seed through later stages.",
    verified: "Sep 2026"
  },
  {
    id: "28",
    name: "Z47",
    provider: "Z47",
    region: "India",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://www.z47.com/",
    domain: "z47.com",
    description: "India-focused VC (formerly Matrix Partners India) investing in ambitious early and growth-stage companies.",
    verified: "Sep 2026"
  },
  {
    id: "29",
    name: "pi Ventures",
    provider: "pi Ventures",
    region: "India",
    type: "VC",
    stage: ["Seed", "Series A"],
    funding: "Investment-specific",
    url: "https://piventures.in/",
    domain: "piventures.in",
    description: "Early-stage fund focused on AI, deep-tech and enterprise startups in India.",
    verified: "Sep 2026"
  },
  {
    id: "30",
    name: "3one4 Capital",
    provider: "3one4 Capital",
    region: "India",
    type: "VC",
    stage: ["Seed", "Series A", "Series B"],
    funding: "Investment-specific",
    url: "https://www.3one4capital.com/",
    domain: "3one4capital.com",
    description: "India-centric VC investing across seed to Series B in technology and consumer businesses.",
    verified: "Sep 2026"
  },
  {
    id: "31",
    name: "Good Capital",
    provider: "Good Capital",
    region: "India",
    type: "VC",
    stage: ["Pre-Seed", "Seed"],
    funding: "Investment-specific",
    url: "https://www.goodcapital.vc/",
    domain: "goodcapital.vc",
    description: "Pre-seed and seed fund supporting early Indian founders with capital and hands-on guidance.",
    verified: "Sep 2026"
  },
  {
    id: "32",
    name: "Inflection Point Ventures",
    provider: "IPV",
    region: "India",
    type: "Angel Network",
    stage: ["Pre-Seed", "Seed", "Early Stage"],
    funding: "Investment-specific",
    url: "https://www.ipventures.in/",
    domain: "ipventures.in",
    description: "Active angel network in India that syndicates early-stage investments for promising startups.",
    verified: "Sep 2026"
  },
  {
    id: "33",
    name: "LetsVenture",
    provider: "LetsVenture",
    region: "India",
    type: "Angel / Investment Platform",
    stage: ["Pre-Seed", "Seed", "Early Stage"],
    funding: "Investment-specific",
    url: "https://letsventure.com/",
    domain: "letsventure.com",
    description: "Online platform connecting Indian startups with angels and early-stage investors for fundraising.",
    verified: "Sep 2026"
  },
  {
    id: "34",
    name: "500 Global",
    provider: "500 Global",
    region: "Global",
    type: "VC / Accelerator",
    stage: ["Pre-Seed", "Seed"],
    funding: "Program / investment-specific",
    url: "https://500.co/",
    domain: "500.co",
    description: "Global venture firm and accelerator with strong presence across emerging markets and multiple continents.",
    verified: "Sep 2026"
  },
  {
    id: "35",
    name: "Andreessen Horowitz",
    provider: "a16z",
    region: "Global",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://a16z.com/",
    domain: "a16z.com",
    description: "Leading Silicon Valley firm investing across stages with deep platform support in crypto, AI, bio and consumer.",
    verified: "Sep 2026"
  },
  {
    id: "36",
    name: "Founders Fund",
    provider: "Founders Fund",
    region: "Global",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://foundersfund.com/",
    domain: "foundersfund.com",
    description: "Peter Thiel-backed fund known for bold bets on transformative technology companies.",
    verified: "Sep 2026"
  },
  {
    id: "37",
    name: "Sequoia Capital",
    provider: "Sequoia Capital",
    region: "Global",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://www.sequoiacap.com/",
    domain: "sequoiacap.com",
    description: "Iconic global VC partnering with founders from seed through growth and public markets.",
    verified: "Sep 2026"
  },
  {
    id: "38",
    name: "Lightspeed",
    provider: "Lightspeed",
    region: "Global",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://lsvp.com/",
    domain: "lsvp.com",
    description: "Multi-stage global firm investing in enterprise, consumer and fintech startups worldwide.",
    verified: "Sep 2026"
  },
  {
    id: "39",
    name: "General Catalyst",
    provider: "General Catalyst",
    region: "Global",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://www.generalcatalyst.com/",
    domain: "generalcatalyst.com",
    description: "Global venture firm focused on resilient, transformative companies across stages.",
    verified: "Sep 2026"
  },
  {
    id: "40",
    name: "Index Ventures",
    provider: "Index Ventures",
    region: "Global",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://www.indexventures.com/",
    domain: "indexventures.com",
    description: "European-rooted global VC backing ambitious technology companies from early stage onward.",
    verified: "Sep 2026"
  },
  {
    id: "41",
    name: "Benchmark",
    provider: "Benchmark",
    region: "Global",
    type: "VC",
    stage: ["Seed", "Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://www.benchmark.com/",
    domain: "benchmark.com",
    description: "Selective early-stage firm known for concentrated partnerships with category-defining startups.",
    verified: "Sep 2026"
  },
  {
    id: "42",
    name: "General Atlantic",
    provider: "General Atlantic",
    region: "Global",
    type: "Growth VC",
    stage: ["Series A", "Growth"],
    funding: "Investment-specific",
    url: "https://www.generalatlantic.com/",
    domain: "generalatlantic.com",
    description: "Global growth equity firm providing capital and strategic support to scaling technology companies.",
    verified: "Sep 2026"
  },
  {
    id: "43",
    name: "YC Startup School",
    provider: "Y Combinator",
    region: "Global",
    type: "Founder Program",
    stage: ["Idea", "MVP"],
    funding: "Free founder education / network",
    url: "https://www.startupschool.org/",
    domain: "startupschool.org",
    description: "Free online program from Y Combinator teaching founders how to start and grow a startup with peer support.",
    verified: "Sep 2026"
  },
  {
    id: "44",
    name: "AWS Activate",
    provider: "Amazon Web Services",
    region: "Global",
    type: "Credits / Startup Program",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "AWS credits; eligibility-based",
    url: "https://aws.amazon.com/activate/",
    domain: "aws.amazon.com",
    description: "Startup program offering AWS credits, technical support and training to help early teams build on the cloud.",
    verified: "Sep 2026"
  },
  {
    id: "45",
    name: "Microsoft for Startups Founders Hub",
    provider: "Microsoft",
    region: "Global",
    type: "Credits / Startup Program",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "Credits and benefits; eligibility-based",
    url: "https://www.microsoft.com/en-us/startups",
    domain: "microsoft.com",
    description: "Founders Hub provides Azure credits, GitHub, OpenAI and developer tools to eligible early-stage startups.",
    verified: "Sep 2026"
  },
  {
    id: "46",
    name: "Google for Startups Cloud Program",
    provider: "Google",
    region: "Global",
    type: "Credits / Startup Program",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "Cloud credits; eligibility-based",
    url: "https://cloud.google.com/startup",
    domain: "cloud.google.com",
    description: "Google Cloud credits and technical support for startups building and scaling on Google Cloud Platform.",
    verified: "Sep 2026"
  },
  {
    id: "47",
    name: "NVIDIA Inception",
    provider: "NVIDIA",
    region: "Global",
    type: "Startup Program",
    stage: ["MVP", "Early Stage", "Growth"],
    funding: "Program benefits / credits vary",
    url: "https://www.nvidia.com/en-us/startups/",
    domain: "nvidia.com",
    description: "Free program for AI, data science and HPC startups offering hardware access, training and go-to-market support.",
    verified: "Sep 2026"
  },
  {
    id: "48",
    name: "Hugging Face",
    provider: "Hugging Face",
    region: "Global",
    type: "Startup Program",
    stage: ["MVP", "Early Stage", "Growth"],
    funding: "Program-specific benefits",
    url: "https://huggingface.co/",
    domain: "huggingface.co",
    description: "Platform and community support for AI startups building with open-source models and infrastructure.",
    verified: "Sep 2026"
  },
  {
    id: "49",
    name: "Oracle for Startups",
    provider: "Oracle",
    region: "Global",
    type: "Startup Program",
    stage: ["MVP", "Early Stage", "Growth"],
    funding: "Cloud / program benefits vary",
    url: "https://www.oracle.com/startup/",
    domain: "oracle.com",
    description: "Cloud credits, technical resources and go-to-market support for startups building on Oracle Cloud.",
    verified: "Sep 2026"
  },
  {
    id: "50",
    name: "GitHub for Startups",
    provider: "GitHub",
    region: "Global",
    type: "Startup Program",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "Product benefits / credits",
    url: "https://github.com/enterprise/startups",
    domain: "github.com",
    description: "Free or discounted GitHub Enterprise and developer tools for early-stage startups and open-source teams.",
    verified: "Sep 2026"
  },
  {
    id: "51",
    name: "OpenAI for Startups",
    provider: "OpenAI",
    region: "Global",
    type: "Startup Program",
    stage: ["MVP", "Early Stage", "Growth"],
    funding: "Program-specific benefits",
    url: "https://openai.com/startups/",
    domain: "openai.com",
    description: "Credits, technical guidance and early access opportunities for startups building with OpenAI models and APIs.",
    verified: "Sep 2026"
  },
  {
    id: "52",
    name: "Alchemist Accelerator",
    provider: "Alchemist",
    region: "Global",
    type: "Accelerator",
    stage: ["MVP", "Early Stage"],
    funding: "Program-specific investment",
    url: "https://www.alchemistaccelerator.com/",
    domain: "alchemistaccelerator.com",
    description: "Enterprise-focused accelerator providing capital, mentorship and customer introductions for B2B startups.",
    verified: "Sep 2026"
  },
  {
    id: "53",
    name: "Plug and Play",
    provider: "Plug and Play",
    region: "Global",
    type: "Accelerator / Corporate Innovation",
    stage: ["MVP", "Early Stage", "Growth"],
    funding: "Program-specific",
    url: "https://www.plugandplaytechcenter.com/",
    domain: "plugandplaytechcenter.com",
    description: "Global innovation platform connecting startups with corporate partners across multiple verticals and regions.",
    verified: "Sep 2026"
  },
  {
    id: "54",
    name: "MassChallenge",
    provider: "MassChallenge",
    region: "Global",
    type: "Accelerator",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "Program-specific (equity-free options)",
    url: "https://masschallenge.org/",
    domain: "masschallenge.org",
    description: "Equity-free accelerator and competition supporting high-impact startups with mentorship and prizes.",
    verified: "Sep 2026"
  },
  {
    id: "55",
    name: "StartX",
    provider: "StartX",
    region: "Global",
    type: "Accelerator",
    stage: ["MVP", "Early Stage"],
    funding: "No-equity accelerator program",
    url: "https://startx.com/",
    domain: "startx.com",
    description: "Stanford-affiliated non-profit accelerator offering equity-free support, mentorship and network access.",
    verified: "Sep 2026"
  },
  {
    id: "56",
    name: "BIRAC BIG",
    provider: "BIRAC / DBT",
    region: "India",
    type: "Grant",
    stage: ["Idea", "Prototype", "MVP"],
    funding: "Up to ₹50L over 18 months for biotech",
    url: "https://birac.nic.in/",
    domain: "birac.nic.in",
    description: "Flagship equity-free grant for biotech innovators. Up to ₹50 lakh over 18 months to establish proof of concept.",
    verified: "Sep 2026"
  },
  {
    id: "57",
    name: "iDEX / DISC",
    provider: "Ministry of Defence / DIO",
    region: "India",
    type: "Grant",
    stage: ["Prototype", "MVP", "Early Stage"],
    funding: "₹1.5 Cr to ₹10 Cr defence innovation grants",
    url: "https://idex.gov.in/",
    domain: "idex.gov.in",
    description: "Defence innovation challenges offering milestone-based grants up to ₹1.5 Cr (and higher under Prime/ADITI) for dual-use tech.",
    verified: "Sep 2026"
  },
  {
    id: "58",
    name: "SAMRIDH",
    provider: "MeitY",
    region: "India",
    type: "Government / Accelerator",
    stage: ["MVP", "Early Stage"],
    funding: "Matched investment up to ₹40L",
    url: "https://www.meity.gov.in/",
    domain: "meity.gov.in",
    description: "MeitY scheme providing matched investment and acceleration support for software product startups.",
    verified: "Sep 2026"
  },
  {
    id: "59",
    name: "Uttar Pradesh Startup Policy 2026",
    provider: "Government of Uttar Pradesh",
    region: "Uttar Pradesh, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "₹1,000 Cr fund; seed up to ₹15–50L; deep-tech patient capital",
    url: "https://www.startupindia.gov.in/",
    domain: "startupindia.gov.in",
    description: "New state policy with a ₹1,000 crore fund, enhanced seed grants and dedicated support for deep-tech startups.",
    verified: "Sep 2026"
  },
  {
    id: "60",
    name: "NIDHI-EIR",
    provider: "DST / NIDHI",
    region: "India",
    type: "Grant / Fellowship",
    stage: ["Idea", "Prototype"],
    funding: "₹30,000/month fellowship for 18 months",
    url: "https://nidhi.dst.gov.in/",
    domain: "nidhi.dst.gov.in",
    description: "Entrepreneur-in-Residence fellowship providing monthly stipend so innovators can focus full-time on building a startup.",
    verified: "Sep 2026"
  },
  {
    id: "61",
    name: "SIPP – Startup IP Protection",
    provider: "DPIIT / CGPDTM",
    region: "India",
    type: "Government",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "Facilitated patent, trademark & design protection",
    url: "https://www.startupindia.gov.in/",
    domain: "startupindia.gov.in",
    description: "Government facilitation scheme that helps startups protect patents, trademarks and designs at reduced cost.",
    verified: "Sep 2026"
  },
  {
    id: "62",
    name: "STPI Next Gen Incubation (NGIS)",
    provider: "MeitY / STPI",
    region: "India",
    type: "Incubator",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "Up to ₹25L seed + incubation for Tier-II/III",
    url: "https://www.stpi.in/",
    domain: "stpi.in",
    description: "STPI incubation and seed support aimed at software and technology startups outside major metros.",
    verified: "Sep 2026"
  },
  {
    id: "63",
    name: "Atal New India Challenge (ANIC)",
    provider: "Atal Innovation Mission / NITI Aayog",
    region: "India",
    type: "Grant",
    stage: ["Prototype", "MVP", "Early Stage"],
    funding: "Grant up to ₹1 Cr in tranches",
    url: "https://aim.gov.in/",
    domain: "aim.gov.in",
    description: "Challenge-based grants from AIM for startups solving national priority problems with commercialisation potential.",
    verified: "Sep 2026"
  },
  {
    id: "64",
    name: "Rajasthan Startup Policy",
    provider: "Government of Rajasthan",
    region: "Rajasthan, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage", "Growth"],
    funding: "Program-specific seed & ecosystem support",
    url: "https://startup.rajasthan.gov.in/",
    domain: "startup.rajasthan.gov.in",
    description: "State policy offering seed funding, incentives and incubation support for startups based in Rajasthan.",
    verified: "Sep 2026"
  },
  {
    id: "65",
    name: "Odisha Startup Policy",
    provider: "Government of Odisha",
    region: "Odisha, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "Program-specific grants and incubation",
    url: "https://startupodisha.gov.in/",
    domain: "startupodisha.gov.in",
    description: "Odisha’s startup policy providing grants, incubation and ecosystem benefits for local founders.",
    verified: "Sep 2026"
  },
  {
    id: "66",
    name: "Assam Startup",
    provider: "Government of Assam",
    region: "Assam, India",
    type: "State Government",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "Program-specific support for NE startups",
    url: "https://startup.assam.gov.in/",
    domain: "startup.assam.gov.in",
    description: "State initiative supporting startups in Assam and the North-East with funding and incubation access.",
    verified: "Sep 2026"
  },
  {
    id: "67",
    name: "AgriSURE",
    provider: "MoA&FW / NABARD",
    region: "India",
    type: "Government / Fund",
    stage: ["Early Stage", "Growth"],
    funding: "Agri & rural enterprise focused AIF investments",
    url: "https://www.startupindia.gov.in/",
    domain: "startupindia.gov.in",
    description: "Fund supporting agriculture and rural startups through AIFs and direct investments in the agri value chain.",
    verified: "Sep 2026"
  },
  {
    id: "68",
    name: "Entrepreneur First",
    provider: "Entrepreneur First",
    region: "Global",
    type: "Accelerator",
    stage: ["Idea", "Pre-Seed"],
    funding: "Up to $250K program investment",
    url: "https://www.joinef.com/",
    domain: "joinef.com",
    description: "Pre-idea accelerator that helps talented individuals find co-founders and form companies, then invests in the best teams.",
    verified: "Sep 2026"
  },
  {
    id: "69",
    name: "SOSV",
    provider: "SOSV",
    region: "Global",
    type: "VC / Accelerator",
    stage: ["Pre-Seed", "Seed"],
    funding: "Deep-tech & health focused investment",
    url: "https://sosv.com/",
    domain: "sosv.com",
    description: "Deep-tech and life-sciences focused firm running HAX and IndieBio programs with lab space and capital.",
    verified: "Sep 2026"
  },
  {
    id: "70",
    name: "Seedcamp",
    provider: "Seedcamp",
    region: "Global",
    type: "VC / Accelerator",
    stage: ["Pre-Seed", "Seed"],
    funding: "Europe-focused early-stage investment",
    url: "https://seedcamp.com/",
    domain: "seedcamp.com",
    description: "Europe’s leading early-stage fund and accelerator network backing ambitious founders across the continent.",
    verified: "Sep 2026"
  },
  {
    id: "71",
    name: "Berkeley SkyDeck",
    provider: "UC Berkeley",
    region: "Global",
    type: "Accelerator",
    stage: ["MVP", "Early Stage"],
    funding: "\~$200K for \~5–7.5% equity",
    url: "https://skydeck.berkeley.edu/",
    domain: "berkeley.edu",
    description: "UC Berkeley accelerator offering capital, advisors and Demo Day exposure to deep-tech and software startups.",
    verified: "Sep 2026"
  },
  {
    id: "72",
    name: "Founder Institute",
    provider: "Founder Institute",
    region: "Global",
    type: "Accelerator",
    stage: ["Idea", "Pre-Seed"],
    funding: "Equity-based pre-seed program (2.5% warrant)",
    url: "https://fi.co/",
    domain: "fi.co",
    description: "Global pre-seed accelerator operating in 200+ cities. Idea-stage founders form companies and join the Equity Collective.",
    verified: "Sep 2026"
  },
  {
    id: "73",
    name: "a16z Speedrun",
    provider: "Andreessen Horowitz",
    region: "Global",
    type: "Accelerator",
    stage: ["Idea", "MVP", "Pre-Seed"],
    funding: "Up to $1M ($500K + follow-on)",
    url: "https://a16z.com/",
    domain: "a16z.com",
    description: "Highly selective a16z accelerator for early AI, tech and entertainment startups with large checks and platform access.",
    verified: "Sep 2026"
  },
  {
    id: "74",
    name: "South Park Commons",
    provider: "South Park Commons",
    region: "Global",
    type: "Accelerator / Community",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "$400K + guaranteed follow-on support",
    url: "https://www.southparkcommons.com/",
    domain: "southparkcommons.com",
    description: "Talent-dense community and Founder Fellowship offering $400K upfront for 7% plus guaranteed follow-on capital.",
    verified: "Sep 2026"
  },
  {
    id: "75",
    name: "LAUNCH Accelerator",
    provider: "LAUNCH",
    region: "Global",
    type: "Accelerator",
    stage: ["MVP", "Early Stage"],
    funding: "\~$125K for \~7% equity",
    url: "https://www.launch.co/",
    domain: "launch.co",
    description: "Selective accelerator by Jason Calacanis focused on small batches of high-potential startups with hands-on support.",
    verified: "Sep 2026"
  },
  {
    id: "76",
    name: "Station F",
    provider: "Station F",
    region: "Global",
    type: "Accelerator / Campus",
    stage: ["MVP", "Early Stage", "Growth"],
    funding: "Program-specific (campus + selected tracks)",
    url: "https://stationf.co/",
    domain: "stationf.co",
    description: "World’s largest startup campus in Paris. Offers space, programs and corporate partnerships for global founders.",
    verified: "Sep 2026"
  },
  {
    id: "77",
    name: "AngelPad",
    provider: "AngelPad",
    region: "Global",
    type: "Accelerator",
    stage: ["MVP", "Early Stage"],
    funding: "Program-specific investment",
    url: "https://angelpad.com/",
    domain: "angelpad.com",
    description: "Highly selective early-stage accelerator known for intensive mentorship and strong follow-on outcomes.",
    verified: "Sep 2026"
  },
  {
    id: "78",
    name: "Creative Destruction Lab",
    provider: "Creative Destruction Lab",
    region: "Global",
    type: "Accelerator",
    stage: ["Prototype", "MVP", "Early Stage"],
    funding: "Mentorship-driven (equity varies by stream)",
    url: "https://creativedestructionlab.com/",
    domain: "creativedestructionlab.com",
    description: "Objectives-based program for science and deep-tech startups with intensive mentor engagement across global sites.",
    verified: "Sep 2026"
  },
  {
    id: "79",
    name: "Entrepreneurs Roundtable Accelerator",
    provider: "ERA",
    region: "Global",
    type: "Accelerator",
    stage: ["MVP", "Early Stage"],
    funding: "Program-specific investment",
    url: "https://www.eranyc.com/",
    domain: "eranyc.com",
    description: "New York-based accelerator providing capital, mentorship and a strong East Coast investor network.",
    verified: "Sep 2026"
  },
  {
    id: "80",
    name: "HF0",
    provider: "HF0",
    region: "Global",
    type: "Accelerator",
    stage: ["Idea", "MVP", "Early Stage"],
    funding: "Program-specific (live-in residency)",
    url: "https://hf0.com/",
    domain: "hf0.com",
    description: "Intensive live-in accelerator residency designed for technical founders to ship product in a focused environment.",
    verified: "Sep 2026"
  }
];

const STAGES = ["All", "Idea", "Prototype", "MVP", "Pre-Seed", "Seed", "Early Stage", "Series A", "Growth"];
const TYPES = ["All", ...Array.from(new Set(FUNDING.map((x) => x.type))).sort()];
const REGIONS = ["All", ...Array.from(new Set(FUNDING.map((x) => x.region))).sort()];

const Logo: React.FC<{ item: FundingItem }> = ({ item }) => {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="w-11 h-11 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-primary)] flex items-center justify-center text-xs font-black text-purple-500 font-poppins">
        {item.name
          .split(" ")
          .map((x) => x[0])
          .slice(0, 2)
          .join("")}
      </div>
    );
  return (
    <div className="w-11 h-11 rounded-2xl bg-white/90 dark:bg-white/10 border border-[var(--border-primary)] flex items-center justify-center overflow-hidden shrink-0 backdrop-blur-sm">
      <img
        src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`}
        alt=""
        className="w-7 h-7 object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
};

const GlassSelect: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  placeholder?: string;
}> = ({ value, setValue, options, placeholder = "Select" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-11 px-4 rounded-full
          bg-white/40 dark:bg-white/[0.06]
          backdrop-blur-xl
          border border-white/50 dark:border-white/10
          shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
          text-xs font-medium text-[var(--text-primary)] font-poppins
          flex items-center justify-between gap-2
          outline-none focus:ring-2 focus:ring-purple-500/25
          transition-all duration-200"
      >
        <span className="truncate">{value === "All" ? placeholder : value}</span>
        <svg
          className={`w-3.5 h-3.5 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto
            rounded-2xl
            bg-white/90 dark:bg-[var(--component-background)]/95
            backdrop-blur-2xl
            border border-white/60 dark:border-white/10
            shadow-[0_16px_48px_rgba(0,0,0,0.12)]
            py-1.5 font-poppins"
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setValue(option);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors
                ${
                  value === option
                    ? "bg-purple-500/12 text-purple-600 dark:text-purple-400"
                    : "text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/8"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Detail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-2xl border border-[var(--border-primary)] bg-white/30 dark:bg-white/[0.04] backdrop-blur-md p-3">
    <div className="text-[8px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-1 font-['Work_Sans']">
      {label}
    </div>
    <div className="text-[11px] font-semibold leading-5 break-words font-poppins">{value}</div>
  </div>
);

export const StartivesFundingPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All");
  const [type, setType] = useState("All");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState<FundingItem | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FUNDING.filter((item) => {
      const matchesSearch =
        !q ||
        [item.name, item.provider, item.type, item.region, item.funding, item.description, item.stage.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return (
        matchesSearch &&
        (stage === "All" || item.stage.includes(stage)) &&
        (type === "All" || item.type === type) &&
        (region === "All" || item.region === region)
      );
    });
  }, [search, stage, type, region]);

  const reset = () => {
    setSearch("");
    setStage("All");
    setType("All");
    setRegion("All");
  };

  return (
    <section className="w-full font-poppins text-[var(--text-primary)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-10">
        {/* HEADER */}
        <div className="mb-8 md:mb-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-black tracking-[-0.04em] leading-[0.98] font-poppins">
              Find funding for your{" "}
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                startup.
              </span>
            </h1>
            <p className="mt-4 text-sm md:text-base leading-7 text-[var(--text-muted)] max-w-2xl font-['Work_Sans']">
              Discover government schemes, grants, accelerators, VCs and startup programs with direct official links and
              filters for your stage and region.
            </p>
          </div>
        </div>

        {/* FILTERS — glass bar */}
        <div className="sticky top-2 z-20 mb-5 p-2 rounded-2xl
          bg-white/50 dark:bg-white/[0.05]
          backdrop-blur-2xl
          border border-white/60 dark:border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.9fr_1fr_1fr_1fr] gap-2.5">
            <div className="relative flex items-center">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search funding, investor, sector..."
                className="w-full h-11 pl-4 pr-20 rounded-full
                  bg-white/40 dark:bg-white/[0.06]
                  backdrop-blur-xl
                  border border-white/50 dark:border-white/10
                  text-xs md:text-sm text-[var(--text-primary)]
                  placeholder:text-[var(--text-muted)]
                  outline-none focus:ring-2 focus:ring-purple-500/20
                  font-['Work_Sans']"
              />
              <button
                type="button"
                onClick={reset}
                className="absolute right-1.5 h-8 px-3.5 rounded-full
                  bg-gradient-to-r from-red-500 to-blue-500
                  text-white text-[10px] font-bold uppercase tracking-wider font-poppins
                  hover:opacity-90 active:scale-95 transition-all"
              >
                Reset
              </button>
            </div>

            <GlassSelect value={stage} setValue={setStage} options={STAGES} placeholder="Stage" />
            <GlassSelect value={type} setValue={setType} options={TYPES} placeholder="Type" />
            <GlassSelect value={region} setValue={setRegion} options={REGIONS} placeholder="Region" />
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-[11px] text-[var(--text-muted)] font-['Work_Sans']">
            Showing <b className="text-[var(--text-primary)] font-semibold font-poppins">{filtered.length}</b> opportunities
          </p>
          <p className="hidden sm:block text-[10px] text-[var(--text-muted)] font-['Work_Sans']">Updated: Sep 2026</p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {filtered.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelected(item)}
                className="group cursor-pointer rounded-2xl
                  bg-white/40 dark:bg-white/[0.05]
                  backdrop-blur-xl
                  border border-white/50 dark:border-white/10
                  shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.35)]
                  p-4 md:p-5
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]
                  hover:border-purple-500/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <Logo item={item} />
                  <span className="inline-flex max-w-[140px] truncate px-2.5 py-1 rounded-full
                    bg-gradient-to-r from-red-500/10 to-blue-500/10
                    border border-purple-500/20
                    text-[9px] font-semibold text-purple-600 dark:text-purple-400 font-poppins">
                    {item.region}
                  </span>
                </div>

                <h2 className="mt-4 text-[16px] md:text-[17px] leading-tight font-bold tracking-tight font-poppins group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {item.name}
                </h2>
                <p className="mt-1 text-[10px] text-purple-500 font-medium truncate font-['Work_Sans']">{item.provider}</p>

                <p className="mt-3 text-[11px] leading-[1.55] text-[var(--text-muted)] line-clamp-2 min-h-[34px] font-['Work_Sans']">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.stage.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 rounded-full border border-[var(--border-primary)] bg-[var(--background-tertiary)]/80 text-[9px] font-medium text-[var(--text-muted)] font-poppins"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-primary)]/50">
                  <p className="text-[12px] md:text-[13px] font-bold tracking-tight font-poppins">{item.funding}</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="text-[9px] text-[var(--text-muted)] font-['Work_Sans']">Official source</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:underline font-poppins"
                    >
                      Visit
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border-primary)] p-14 text-center">
            <p className="text-sm font-bold font-poppins">No funding opportunities found</p>
            <p className="mt-1 text-xs text-[var(--text-muted)] font-['Work_Sans']">Try another search or reset the filters.</p>
          </div>
        )}

        <p className="mt-7 px-1 text-[10px] leading-5 text-[var(--text-muted)] font-['Caudex']">
          Funding amounts, eligibility, deadlines and investment terms can change. Always verify the latest information
          on the official provider website before applying.
        </p>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 bg-black/50 dark:bg-black/65 backdrop-blur-md"
          style={{ width: "100vw", height: "100dvh" }}
          onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div
            className="w-full max-w-[620px] max-h-[88vh] overflow-y-auto rounded-[1.75rem]
              bg-[var(--component-background)]/95
              backdrop-blur-2xl
              border border-[var(--border-primary)]
              shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="p-5 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <Logo item={selected} />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="w-9 h-9 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] text-lg leading-none"
                >
                  ×
                </button>
              </div>

              <h2 className="mt-5 text-2xl md:text-3xl font-black tracking-[-0.03em] leading-tight font-poppins">
                {selected.name}
              </h2>
              <p className="mt-1 text-xs text-purple-500 font-medium font-['Work_Sans']">
                {selected.provider} · {selected.region}
              </p>

              {/* Funding + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                <Detail label="Funding" value={selected.funding} />
                <Detail label="Type" value={selected.type} />
              </div>

              {/* Description between Funding/Type and rest */}
              <div className="mt-3 rounded-2xl border border-[var(--border-primary)] bg-white/25 dark:bg-white/[0.04] backdrop-blur-md p-4">
                <p className="text-[11px] md:text-xs leading-6 text-[var(--text-secondary)] font-['Work_Sans']">
                  {selected.description}
                </p>
              </div>

              {/* Remaining details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                <Detail label="Startup stage" value={selected.stage.join(" · ")} />
                <Detail label="Region" value={selected.region} />
                <Detail label="Source checked" value={selected.verified} />
                <Detail label="Official domain" value={selected.domain} />
              </div>

              {/* Visit button */}
              <div className="mt-5">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 rounded-full
                    bg-gradient-to-r from-red-500 to-blue-500
                    text-white flex items-center justify-center gap-1.5
                    text-[9px] font-bold uppercase tracking-widest font-poppins
                    hover:opacity-95 active:scale-[0.98] transition-all"
                >
                  Visit Official Source
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>

              {/* Short disclaimer under Visit */}
              <p className="mt-4 text-[9px] leading-5 text-[var(--text-muted)] text-center font-['Caudex']">
                Funding amounts, eligibility, deadlines and investment terms can change. Always verify.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StartivesFundingPage;