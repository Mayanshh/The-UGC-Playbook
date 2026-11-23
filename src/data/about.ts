export interface AboutReel {
  id: string;
  label?: string;
  views?: string;
  src?: string;
  alt?: string;
}

export interface AboutMetric {
  id: string;
  value: string;
  label: string;
}

export interface AboutContent {
  greeting: string;
  roleTag?: string;
  eyebrowIndex?: string;
  portraitCaption?: {
    name: string;
    subtitle: string;
    methodLabel: string;
    badge: string;
  };
  paragraphs: string[];
  metrics: AboutMetric[];
  reelsHeading?: string;
  reels: AboutReel[];
  portraitSrc?: string;
  portraitAlt?: string;
}

export const ABOUT: AboutContent = {
  greeting: "Hi, I'm Akansha Mishra.",
  roleTag: "Creator · Pitching & Brand Partnerships",
  eyebrowIndex: "Creator Profile · 01",
  portraitCaption: {
    name: "Akansha Mishra",
    subtitle: "Travel, hotel collaborations & brand storytelling",
    methodLabel: "Direct Pitching Method",
    badge: "Verified Creator",
  },
  paragraphs: [
    "I started out sharing everyday moments and creative experiments without an agency, a big budget, or connections—just learning how to show up consistently and tell stories people genuinely connected with.",
    "Everything shifted when I landed my first paid brand deal and realized creators don't have to wait around to get picked. By sending clear, thoughtful pitches, I turned cold outreach into travel features, hotel collaborations, and recurring brand partnerships.",
    "I built this playbook so you have the exact scripts, structure, and confidence to pitch brands directly and turn your craft into repeatable income.",
  ],
  metrics: [
    {
      id: "ig",
      value: "33k",
      label: "Instagram community, verified",
    },
    {
      id: "reel",
      value: "1.7M",
      label: "views on her top reel",
    },
    {
      id: "brands",
      value: "[X]",
      label: "brands worked with",
    },
  ],
  reelsHeading: "Selected Reels & Features",
  reels: [
    { id: "reel-1", label: "Reel thumbnail" },
    { id: "reel-2", label: "Reel thumbnail" },
    { id: "reel-3", label: "Reel thumbnail" },
  ],
};