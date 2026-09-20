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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    verified: "Sep 2026"
  },
  // —— New India schemes ——
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    verified: "Sep 2026"
  },
  // —— New Global schemes ——
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    verified: "Sep 2026"
  },
  {
    id: "72",
    name: "Founder Institute",
    provider: "Founder Institute",
    region: "Global",
    type: "Accelerator",
    stage: ["Idea", "Pre-Seed"],
    funding: "Equity-based pre-seed program",
    url: "https://fi.co/",
    domain: "fi.co",
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
    description: "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
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
      <div className="w-11 h-11 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-primary)] flex items-center justify-center text-xs font-black text-purple-500">
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

/* —— Custom Glass iOS-style Dropdown —— */
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
          bg-white/40 dark:bg-white/8
          backdrop-blur-xl
          border border-white/50 dark:border-white/15
          shadow-[0_4px_24px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.4)]
          text-xs font-semibold text-[var(--text-primary)]
          flex items-center justify-between gap-2
          outline-none focus:ring-2 focus:ring-purple-500/30
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
            bg-white/70 dark:bg-[#1c1c1e]/85
            backdrop-blur-2xl
            border border-white/60 dark:border-white/10
            shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(0,0,0,0.05)]
            py-1.5
            animate-in fade-in slide-in-from-top-1 duration-150"
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
                    ? "bg-purple-500/15 text-purple-600 dark:text-purple-400"
                    : "text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10"
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
  <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--background-tertiary)]/80 backdrop-blur-sm p-3">
    <div className="text-[8px] uppercase tracking-widest font-black text-[var(--text-muted)] mb-1">{label}</div>
    <div className="text-[11px] font-semibold leading-5 break-words">{value}</div>
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
        {/* HEADER — no top pill */}
        <div className="mb-8 md:mb-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-black tracking-[-0.04em] leading-[0.98]">
              Find funding for your{" "}
              <span
                className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                startup.
              </span>
            </h1>
            <p className="mt-4 text-sm md:text-base leading-7 text-[var(--text-muted)] max-w-2xl">
              Discover government schemes, grants, accelerators, VCs and startup programs with direct official links and
              filters for your stage and region.
            </p>
          </div>
        </div>

        {/* FILTERS — search pill with reset inside + glass dropdowns */}
        <div className="sticky top-2 z-20 mb-5 p-2 rounded-2xl bg-[var(--component-background)]/70 backdrop-blur-2xl border border-[var(--border-primary)]/60 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.9fr_1fr_1fr_1fr] gap-2.5">
            {/* Search + Reset inside pill */}
            <div className="relative flex items-center">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search funding, investor, sector..."
                className="w-full h-11 pl-4 pr-20 rounded-full
                  bg-white/40 dark:bg-white/8
                  backdrop-blur-xl
                  border border-white/50 dark:border-white/15
                  shadow-[0_4px_24px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.35)]
                  text-xs md:text-sm text-[var(--text-primary)]
                  placeholder:text-[var(--text-muted)]
                  outline-none focus:ring-2 focus:ring-purple-500/25
                  transition-all"
              />
              <button
                type="button"
                onClick={reset}
                className="absolute right-1.5 h-8 px-3.5 rounded-full
                  bg-gradient-to-r from-red-500 via-purple-500 to-blue-500
                  text-white text-[10px] font-black uppercase tracking-wider
                  shadow-md hover:opacity-90 active:scale-95 transition-all"
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
          <p className="text-[11px] text-[var(--text-muted)]">
            Showing <b className="text-[var(--text-primary)]">{filtered.length}</b> opportunities
          </p>
          <p className="hidden sm:block text-[10px] text-[var(--text-muted)]">Updated: Sep 2026</p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {filtered.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelected(item)}
                className="group cursor-pointer rounded-2xl
                  bg-white/35 dark:bg-white/[0.06]
                  backdrop-blur-xl
                  border border-white/50 dark:border-white/10
                  shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.4)]
                  p-4 md:p-5
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]
                  hover:border-purple-500/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <Logo item={item} />
                  {/* Region pill (theme color) — type pill removed */}
                  <span className="inline-flex max-w-[140px] truncate px-2.5 py-1 rounded-full
                    bg-gradient-to-r from-red-500/15 via-purple-500/15 to-blue-500/15
                    border border-purple-500/25
                    text-[9px] font-bold text-purple-600 dark:text-purple-400">
                    {item.region}
                  </span>
                </div>

                <h2 className="mt-4 text-[16px] md:text-[17px] leading-tight font-bold tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {item.name}
                </h2>
                <p className="mt-1 text-[10px] text-purple-500 font-medium truncate">{item.provider}</p>

                <p className="mt-3 text-[11px] leading-[1.6] text-[var(--text-muted)] line-clamp-2 min-h-[35px]">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.stage.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 rounded-full border border-[var(--border-primary)] bg-[var(--background-tertiary)]/70 text-[9px] font-semibold text-[var(--text-muted)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-primary)]/60">
                  <p className="text-[12px] md:text-[13px] font-bold tracking-tight">{item.funding}</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="text-[9px] text-[var(--text-muted)]">Official source</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:underline"
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
            <p className="text-sm font-bold">No funding opportunities found</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Try another search or reset the filters.</p>
          </div>
        )}

        <p className="mt-7 px-1 text-[10px] leading-5 text-[var(--text-muted)]">
          Funding amounts, eligibility, deadlines and investment terms can change. Always verify the latest information
          on the official provider website before applying.
        </p>
      </div>

      {/* DETAIL MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-md"
          style={{ width: "100vw", height: "100dvh" }}
          onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div
            className="w-full max-w-[620px] max-h-[88vh] overflow-y-auto rounded-[1.75rem]
              bg-[var(--component-background)]/95 backdrop-blur-2xl
              border border-[var(--border-primary)] shadow-2xl"
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

              <h2 className="mt-5 text-2xl md:text-4xl font-black tracking-[-0.04em] leading-tight">{selected.name}</h2>
              <p className="mt-1 text-xs text-purple-500 font-semibold">
                {selected.provider} · {selected.region}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                <Detail label="Funding" value={selected.funding} />
                <Detail label="Type" value={selected.type} />
                <Detail label="Startup stage" value={selected.stage.join(" · ")} />
                <Detail label="Region" value={selected.region} />
                <Detail label="Source checked" value={selected.verified} />
                <Detail label="Official domain" value={selected.domain} />
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 rounded-full
                    bg-gradient-to-r from-red-500 via-purple-500 to-blue-500
                    text-white flex items-center justify-center gap-1.5
                    text-[10px] font-black uppercase tracking-widest
                    shadow-lg hover:opacity-95 active:scale-[0.98] transition-all"
                >
                  Visit Official Source
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="h-11 px-6 rounded-full
                    border border-[var(--border-primary)]
                    bg-[var(--background-tertiary)]
                    text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]
                    hover:text-[var(--text-primary)] hover:border-purple-500/40 transition-all"
                >
                  Close
                </button>
              </div>

              {/* Description moved below Close button */}
              <p className="mt-5 text-[11px] md:text-xs leading-6 text-[var(--text-secondary)] text-center sm:text-left">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StartivesFundingPage;