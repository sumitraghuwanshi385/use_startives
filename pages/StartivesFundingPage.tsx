import React, { useMemo, useState } from "react";

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
    "name": "Startup India Seed Fund Scheme",
    "provider": "DPIIT",
    "region": "India",
    "type": "Government",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage"
    ],
    "funding": "Up to ₹20L grant + up to ₹50L convertible/debt support",
    "url": "https://www.startupindia.gov.in/content/sih/en/Startup-India-Seed-Fund-Scheme.html",
    "domain": "startupindia.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Credit Guarantee Scheme for Startups",
    "provider": "DPIIT / NCGTC",
    "region": "India",
    "type": "Government",
    "stage": [
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Credit guarantee support; limits depend on framework",
    "url": "https://www.startupindia.gov.in/content/sih/en/credit-guarantee-scheme-for-startups.html",
    "domain": "startupindia.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Startup India Investor Connect",
    "provider": "Startup India",
    "region": "India",
    "type": "Investor Platform",
    "stage": [
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Investor discovery / investment opportunities",
    "url": "https://www.startupindia.gov.in/",
    "domain": "startupindia.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Fund of Funds for Startups",
    "provider": "Government of India / SIDBI",
    "region": "India",
    "type": "Government",
    "stage": [
      "Early Stage",
      "Growth"
    ],
    "funding": "Indirect VC funding through eligible AIFs",
    "url": "https://www.startupindia.gov.in/",
    "domain": "startupindia.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Fund of Funds 2.0",
    "provider": "Government of India",
    "region": "India",
    "type": "Government",
    "stage": [
      "Early Stage",
      "Growth"
    ],
    "funding": "₹10,000 Cr corpus announced",
    "url": "https://www.startupindia.gov.in/",
    "domain": "startupindia.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "GeM Startup / Public Procurement",
    "provider": "Government e Marketplace",
    "region": "India",
    "type": "Government",
    "stage": [
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Government procurement opportunity",
    "url": "https://gem.gov.in/",
    "domain": "gem.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Bihar Startup Policy",
    "provider": "Department of Industries, Bihar",
    "region": "Bihar, India",
    "type": "State Government",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage"
    ],
    "funding": "Up to ₹10L seed support listed in policy",
    "url": "https://www.startupindia.gov.in/content/sih/en/state-startup-policies/Bihar-state-policy.html",
    "domain": "startupindia.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Kerala Startup Mission",
    "provider": "KSUM",
    "region": "Kerala, India",
    "type": "State / Incubator",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program-specific grants and support",
    "url": "https://startupmission.kerala.gov.in/",
    "domain": "startupmission.kerala.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Karnataka Startup Cell",
    "provider": "Government of Karnataka",
    "region": "Karnataka, India",
    "type": "State Government",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program-specific support",
    "url": "https://startup.karnataka.gov.in/",
    "domain": "startup.karnataka.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "StartupTN",
    "provider": "Government of Tamil Nadu",
    "region": "Tamil Nadu, India",
    "type": "State Government",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program-specific support",
    "url": "https://startuptn.in/",
    "domain": "startuptn.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Maharashtra Startup Ecosystem",
    "provider": "Government of Maharashtra",
    "region": "Maharashtra, India",
    "type": "State Government",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program-specific support",
    "url": "https://startup.maharashtra.gov.in/",
    "domain": "startup.maharashtra.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Gujarat Startup Ecosystem",
    "provider": "Government of Gujarat",
    "region": "Gujarat, India",
    "type": "State Government",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program-specific support",
    "url": "https://startup.gujarat.gov.in/",
    "domain": "startup.gujarat.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Startup Telangana",
    "provider": "Government of Telangana",
    "region": "Telangana, India",
    "type": "State Government",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program-specific support",
    "url": "https://startup.telangana.gov.in/",
    "domain": "startup.telangana.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "NIDHI-PRAYAS",
    "provider": "Department of Science & Technology",
    "region": "India",
    "type": "Grant / Incubation",
    "stage": [
      "Idea",
      "Prototype"
    ],
    "funding": "Prototype support through eligible incubators",
    "url": "https://nidhi.dst.gov.in/",
    "domain": "nidhi.dst.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "NIDHI Seed Support System",
    "provider": "Department of Science & Technology",
    "region": "India",
    "type": "Grant / Seed",
    "stage": [
      "Prototype",
      "MVP",
      "Early Stage"
    ],
    "funding": "Program-specific seed support",
    "url": "https://nidhi.dst.gov.in/",
    "domain": "nidhi.dst.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "MeitY TIDE 2.0",
    "provider": "MeitY",
    "region": "India",
    "type": "Government / Incubation",
    "stage": [
      "Idea",
      "Prototype",
      "MVP"
    ],
    "funding": "Program-specific support",
    "url": "https://www.meity.gov.in/",
    "domain": "meity.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "MeitY GENESIS",
    "provider": "MeitY",
    "region": "India",
    "type": "Government / Accelerator",
    "stage": [
      "MVP",
      "Early Stage"
    ],
    "funding": "Program-specific support",
    "url": "https://www.meity.gov.in/",
    "domain": "meity.gov.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Y Combinator",
    "provider": "Y Combinator",
    "region": "Global",
    "type": "Accelerator",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage"
    ],
    "funding": "$500K standard deal",
    "url": "https://www.ycombinator.com/apply",
    "domain": "ycombinator.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Techstars",
    "provider": "Techstars",
    "region": "Global",
    "type": "Accelerator",
    "stage": [
      "MVP",
      "Early Stage"
    ],
    "funding": "$220K current standard offer",
    "url": "https://www.techstars.com/accelerators",
    "domain": "techstars.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Antler India",
    "provider": "Antler",
    "region": "India",
    "type": "VC / Accelerator",
    "stage": [
      "Idea",
      "Pre-Seed",
      "Early Stage"
    ],
    "funding": "Program-specific investment",
    "url": "https://www.antler.co/location/india",
    "domain": "antler.co",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "100X.VC",
    "provider": "100X.VC",
    "region": "India",
    "type": "VC",
    "stage": [
      "Pre-Seed",
      "Seed"
    ],
    "funding": "Investment-specific",
    "url": "https://www.100x.vc/",
    "domain": "100x.vc",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "India Accelerator",
    "provider": "India Accelerator",
    "region": "India",
    "type": "Accelerator",
    "stage": [
      "Pre-Seed",
      "Seed"
    ],
    "funding": "Program-specific investment",
    "url": "https://www.indiaaccelerator.co/",
    "domain": "indiaaccelerator.co",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Venture Catalysts",
    "provider": "Venture Catalysts",
    "region": "India",
    "type": "Incubator / VC",
    "stage": [
      "Pre-Seed",
      "Seed",
      "Early Stage"
    ],
    "funding": "Investment-specific",
    "url": "https://venturecatalysts.in/",
    "domain": "venturecatalysts.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Peak XV Partners",
    "provider": "Peak XV Partners",
    "region": "India / Global",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://www.peakxv.com/",
    "domain": "peakxv.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Blume Ventures",
    "provider": "Blume Ventures",
    "region": "India",
    "type": "VC",
    "stage": [
      "Pre-Seed",
      "Seed",
      "Series A"
    ],
    "funding": "Investment-specific",
    "url": "https://blume.vc/",
    "domain": "blume.vc",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Elevation Capital",
    "provider": "Elevation Capital",
    "region": "India",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://www.elevationcapital.com/",
    "domain": "elevationcapital.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Accel India",
    "provider": "Accel",
    "region": "India",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://www.accel.com/",
    "domain": "accel.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Z47",
    "provider": "Z47",
    "region": "India",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://www.z47.com/",
    "domain": "z47.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "pi Ventures",
    "provider": "pi Ventures",
    "region": "India",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A"
    ],
    "funding": "Investment-specific",
    "url": "https://piventures.in/",
    "domain": "piventures.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "3one4 Capital",
    "provider": "3one4 Capital",
    "region": "India",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Series B"
    ],
    "funding": "Investment-specific",
    "url": "https://www.3one4capital.com/",
    "domain": "3one4capital.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Good Capital",
    "provider": "Good Capital",
    "region": "India",
    "type": "VC",
    "stage": [
      "Pre-Seed",
      "Seed"
    ],
    "funding": "Investment-specific",
    "url": "https://www.goodcapital.vc/",
    "domain": "goodcapital.vc",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Inflection Point Ventures",
    "provider": "IPV",
    "region": "India",
    "type": "Angel Network",
    "stage": [
      "Pre-Seed",
      "Seed",
      "Early Stage"
    ],
    "funding": "Investment-specific",
    "url": "https://www.ipventures.in/",
    "domain": "ipventures.in",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "LetsVenture",
    "provider": "LetsVenture",
    "region": "India",
    "type": "Angel / Investment Platform",
    "stage": [
      "Pre-Seed",
      "Seed",
      "Early Stage"
    ],
    "funding": "Investment-specific",
    "url": "https://letsventure.com/",
    "domain": "letsventure.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "500 Global",
    "provider": "500 Global",
    "region": "Global",
    "type": "VC / Accelerator",
    "stage": [
      "Pre-Seed",
      "Seed"
    ],
    "funding": "Program / investment-specific",
    "url": "https://500.co/",
    "domain": "500.co",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Andreessen Horowitz",
    "provider": "a16z",
    "region": "Global",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://a16z.com/",
    "domain": "a16z.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Founders Fund",
    "provider": "Founders Fund",
    "region": "Global",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://foundersfund.com/",
    "domain": "foundersfund.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Sequoia Capital",
    "provider": "Sequoia Capital",
    "region": "Global",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://www.sequoiacap.com/",
    "domain": "sequoiacap.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Lightspeed",
    "provider": "Lightspeed",
    "region": "Global",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://lsvp.com/",
    "domain": "lsvp.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "General Catalyst",
    "provider": "General Catalyst",
    "region": "Global",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://www.generalcatalyst.com/",
    "domain": "generalcatalyst.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Index Ventures",
    "provider": "Index Ventures",
    "region": "Global",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://www.indexventures.com/",
    "domain": "indexventures.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Benchmark",
    "provider": "Benchmark",
    "region": "Global",
    "type": "VC",
    "stage": [
      "Seed",
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://www.benchmark.com/",
    "domain": "benchmark.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "General Atlantic",
    "provider": "General Atlantic",
    "region": "Global",
    "type": "Growth VC",
    "stage": [
      "Series A",
      "Growth"
    ],
    "funding": "Investment-specific",
    "url": "https://www.generalatlantic.com/",
    "domain": "generalatlantic.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "YC Startup School",
    "provider": "Y Combinator",
    "region": "Global",
    "type": "Founder Program",
    "stage": [
      "Idea",
      "MVP"
    ],
    "funding": "Free founder education / network",
    "url": "https://www.startupschool.org/",
    "domain": "startupschool.org",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "AWS Activate",
    "provider": "Amazon Web Services",
    "region": "Global",
    "type": "Credits / Startup Program",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "AWS credits; eligibility-based",
    "url": "https://aws.amazon.com/activate/",
    "domain": "aws.amazon.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Microsoft for Startups Founders Hub",
    "provider": "Microsoft",
    "region": "Global",
    "type": "Credits / Startup Program",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage"
    ],
    "funding": "Credits and benefits; eligibility-based",
    "url": "https://www.microsoft.com/en-us/startups",
    "domain": "microsoft.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Google for Startups Cloud Program",
    "provider": "Google",
    "region": "Global",
    "type": "Credits / Startup Program",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Cloud credits; eligibility-based",
    "url": "https://cloud.google.com/startup",
    "domain": "cloud.google.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "NVIDIA Inception",
    "provider": "NVIDIA",
    "region": "Global",
    "type": "Startup Program",
    "stage": [
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program benefits / credits vary",
    "url": "https://www.nvidia.com/en-us/startups/",
    "domain": "nvidia.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Hugging Face",
    "provider": "Hugging Face",
    "region": "Global",
    "type": "Startup Program",
    "stage": [
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program-specific benefits",
    "url": "https://huggingface.co/",
    "domain": "huggingface.co",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Oracle for Startups",
    "provider": "Oracle",
    "region": "Global",
    "type": "Startup Program",
    "stage": [
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Cloud / program benefits vary",
    "url": "https://www.oracle.com/startup/",
    "domain": "oracle.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "GitHub for Startups",
    "provider": "GitHub",
    "region": "Global",
    "type": "Startup Program",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage"
    ],
    "funding": "Product benefits / credits",
    "url": "https://github.com/enterprise/startups",
    "domain": "github.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "OpenAI for Startups",
    "provider": "OpenAI",
    "region": "Global",
    "type": "Startup Program",
    "stage": [
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program-specific benefits",
    "url": "https://openai.com/startups/",
    "domain": "openai.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Alchemist Accelerator",
    "provider": "Alchemist",
    "region": "Global",
    "type": "Accelerator",
    "stage": [
      "MVP",
      "Early Stage"
    ],
    "funding": "Program-specific investment",
    "url": "https://www.alchemistaccelerator.com/",
    "domain": "alchemistaccelerator.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "Plug and Play",
    "provider": "Plug and Play",
    "region": "Global",
    "type": "Accelerator / Corporate Innovation",
    "stage": [
      "MVP",
      "Early Stage",
      "Growth"
    ],
    "funding": "Program-specific",
    "url": "https://www.plugandplaytechcenter.com/",
    "domain": "plugandplaytechcenter.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "MassChallenge",
    "provider": "MassChallenge",
    "region": "Global",
    "type": "Accelerator",
    "stage": [
      "Idea",
      "MVP",
      "Early Stage"
    ],
    "funding": "Program-specific",
    "url": "https://masschallenge.org/",
    "domain": "masschallenge.org",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  },
  {
    "name": "StartX",
    "provider": "StartX",
    "region": "Global",
    "type": "Accelerator",
    "stage": [
      "MVP",
      "Early Stage"
    ],
    "funding": "No-equity accelerator program",
    "url": "https://startx.com/",
    "domain": "startx.com",
    "description": "Funding or startup ecosystem opportunity. Check the official source for current eligibility, application window and terms.",
    "verified": "Sep 2026"
  }
];

const STAGES = ["All","Idea","Prototype","MVP","Pre-Seed","Seed","Early Stage","Series A","Growth"];
const TYPES = ["All", ...Array.from(new Set(FUNDING.map(x => x.type))).sort()];
const REGIONS = ["All", ...Array.from(new Set(FUNDING.map(x => x.region))).sort()];

const Logo: React.FC<{item: FundingItem}> = ({ item }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="w-11 h-11 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-primary)] flex items-center justify-center text-xs font-black text-purple-500">
      {item.name.split(" ").map(x => x[0]).slice(0,2).join("")}
    </div>
  );
  return (
    <div className="w-11 h-11 rounded-xl bg-white border border-[var(--border-primary)] flex items-center justify-center overflow-hidden shrink-0">
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

const Select: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
}> = ({ value, setValue, options }) => (
  <select
    value={value}
    onChange={e => setValue(e.target.value)}
    className="w-full h-11 px-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-xs text-[var(--text-primary)] outline-none focus:border-purple-500/50"
  >
    {options.map(option => <option key={option} value={option}>{option}</option>)}
  </select>
);

const MiniStat: React.FC<{value:string;label:string}> = ({value,label}) => (
  <div className="px-3 py-2.5 rounded-xl bg-[var(--component-background)] border border-[var(--border-primary)]">
    <div className="text-sm font-black tracking-tight">{value}</div>
    <div className="text-[9px] text-[var(--text-muted)] mt-0.5">{label}</div>
  </div>
);

const Detail: React.FC<{label:string;value:string}> = ({label,value}) => (
  <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--background-tertiary)] p-3">
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
    return FUNDING.filter(item => {
      const matchesSearch =
        !q ||
        [item.name,item.provider,item.type,item.region,item.funding,item.description,item.stage.join(" ")]
          .join(" ").toLowerCase().includes(q);
      return matchesSearch &&
        (stage === "All" || item.stage.includes(stage)) &&
        (type === "All" || item.type === type) &&
        (region === "All" || item.region === region);
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

        {/* PAGE CONTENT ONLY — NO HEADER / NAVBAR / FOOTER */}
        <div className="mb-7 md:mb-9">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/[0.07] dark:bg-purple-500/[0.12] border border-purple-500/20 text-[10px] font-black uppercase tracking-[0.14em] text-purple-600 dark:text-purple-400">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Startives Funding Hub
          </div>

          <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-black tracking-[-0.04em] leading-[0.98]">
                Find funding for your
                <span className="text-purple-600 dark:text-purple-400"> startup.</span>
              </h1>
              <p className="mt-4 text-sm md:text-base leading-7 text-[var(--text-muted)] max-w-2xl">
                Discover government schemes, grants, accelerators, VCs and startup
                programs with direct official links and filters for your stage and region.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 min-w-0 lg:min-w-[420px]">
              <MiniStat value={`${FUNDING.length}+`} label="Opportunities" />
              <MiniStat value="India" label="Coverage" />
              <MiniStat value="Global" label="Programs" />
              <MiniStat value="Official" label="Links" />
            </div>
          </div>
        </div>

        <div className="sticky top-2 z-20 mb-5 p-2 rounded-2xl bg-[var(--component-background)]/85 backdrop-blur-xl border border-[var(--border-primary)] shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.8fr_1fr_1fr_1fr_auto] gap-2">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search funding, investor, sector..."
              className="w-full h-11 px-4 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-xs md:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10"
            />
            <Select value={stage} setValue={setStage} options={STAGES} />
            <Select value={type} setValue={setType} options={TYPES} />
            <Select value={region} setValue={setRegion} options={REGIONS} />
            <button
              type="button"
              onClick={reset}
              className="h-11 px-4 rounded-xl border border-[var(--border-primary)] bg-[var(--background-tertiary)] text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-purple-600 hover:border-purple-500/40 transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-[11px] text-[var(--text-muted)]">
            Showing <b className="text-[var(--text-primary)]">{filtered.length}</b> opportunities
          </p>
          <p className="hidden sm:block text-[10px] text-[var(--text-muted)]">Updated: Sep 2026</p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map(item => (
              <article
                key={item.id}
                onClick={() => setSelected(item)}
                className="group cursor-pointer rounded-2xl border border-[var(--border-primary)] bg-[var(--component-background)] p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <Logo item={item} />
                  <div className="text-right min-w-0">
                    <span className="inline-flex max-w-[150px] truncate px-2.5 py-1 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[9px] font-bold text-[var(--text-muted)]">
                      {item.type}
                    </span>
                    <p className="mt-1 text-[9px] text-[var(--text-muted)] truncate">{item.region}</p>
                  </div>
                </div>

                <h2 className="mt-4 text-[16px] md:text-[17px] leading-tight font-bold tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {item.name}
                </h2>
                <p className="mt-1 text-[10px] text-purple-500 font-medium truncate">{item.provider}</p>

                <p className="mt-3 text-[11px] leading-[1.6] text-[var(--text-muted)] line-clamp-2 min-h-[35px]">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.stage.slice(0,3).map(s => (
                    <span key={s} className="px-2 py-1 rounded-full border border-[var(--border-primary)] bg-[var(--background-tertiary)] text-[9px] font-semibold text-[var(--text-muted)]">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-primary)]">
                  <p className="text-[12px] md:text-[13px] font-bold tracking-tight">{item.funding}</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="text-[9px] text-[var(--text-muted)]">Official source</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Visit ↗
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
          Funding amounts, eligibility, deadlines and investment terms can change.
          Always verify the latest information on the official provider website before applying.
        </p>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-md"
          style={{ width: "100vw", height: "100dvh" }}
          onMouseDown={e => e.target === e.currentTarget && setSelected(null)}
        >
          <div
            className="w-full max-w-[620px] max-h-[88vh] overflow-y-auto rounded-[1.75rem] bg-[var(--component-background)] border border-[var(--border-primary)] shadow-2xl"
            onMouseDown={e => e.stopPropagation()}
          >
            <div className="p-5 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <Logo item={selected} />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="w-9 h-9 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  ×
                </button>
              </div>

              <h2 className="mt-5 text-2xl md:text-4xl font-black tracking-[-0.04em] leading-tight">{selected.name}</h2>
              <p className="mt-1 text-xs text-purple-500 font-semibold">{selected.provider} · {selected.region}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                <Detail label="Funding" value={selected.funding} />
                <Detail label="Type" value={selected.type} />
                <Detail label="Startup stage" value={selected.stage.join(" · ")} />
                <Detail label="Region" value={selected.region} />
                <Detail label="Source checked" value={selected.verified} />
                <Detail label="Official domain" value={selected.domain} />
              </div>

              <div className="mt-5 rounded-2xl border border-[var(--border-primary)] bg-[var(--background-tertiary)] p-4">
                <p className="text-[11px] md:text-xs leading-6 text-[var(--text-secondary)]">{selected.description}</p>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 rounded-xl button-gradient text-white flex items-center justify-center text-[10px] font-black uppercase tracking-widest"
                >
                  Visit Official Source ↗
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="h-11 px-5 rounded-xl border border-[var(--border-primary)] bg-[var(--background-tertiary)] text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]"
                >
                  Close
                </button>
              </div>

              <p className="mt-4 text-[9px] leading-5 text-[var(--text-muted)]">
                Verify current eligibility, deadlines, application requirements, funding amount and legal/investment terms on the official source.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StartivesFundingPage;
