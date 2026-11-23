export interface UgcStep {
  id: string;
  number: string;
  title: string;
  detail: string;
  examples?: string[];
}

export interface ComparisonRow {
  dimension: string;
  influencer: string;
  ugcCreator: string;
}

export interface WhatIsUgcContent {
  eyebrow: string;
  pageHeading: string;
  headline: string;
  subcopy: string;
  steps: UgcStep[];
  comparisonHeading: string;
  comparisonColumns: {
    influencer: string;
    ugcCreator: string;
  };
  comparison: ComparisonRow[];
}

export const WHAT_IS_UGC: WhatIsUgcContent = {
  eyebrow: "08 · WHAT IS UGC · INFLUENCER VS UGC CREATOR",
  pageHeading: "What Is UGC",
  headline: "Brands pay for content, not followers.",
  subcopy:
    "UGC is short, real looking video that brands use in their ads and pages. You make it. They post it. You get paid.",
  steps: [
    {
      id: "step-1",
      number: "01",
      title: "A brand sends you a product",
      detail: "Skincare, food, fashion, tech, travel, home, and more.",
      examples: ["Skincare", "Food", "Fashion", "Tech", "Travel"],
    },
    {
      id: "step-2",
      number: "02",
      title: "You film it on your phone",
      detail: "Hands only, voiceover or on camera.",
    },
    {
      id: "step-3",
      number: "03",
      title: "The brand pays and uses it",
      detail: "On their ads and page, not yours.",
    },
  ],
  comparisonHeading: "Influencer vs. UGC Creator",
  comparisonColumns: {
    influencer: "Influencer",
    ugcCreator: "UGC Creator",
  },
  comparison: [
    {
      dimension: "Followers needed",
      influencer: "Thousands",
      ugcCreator: "Zero",
    },
    {
      dimension: "Show your face",
      influencer: "Always",
      ugcCreator: "Optional",
    },
    {
      dimension: "Where content goes",
      influencer: "Your own feed",
      ugcCreator: "Their ads & feed",
    },
    {
      dimension: "Depends on algorithm",
      influencer: "Yes",
      ugcCreator: "No",
    },
  ],
};