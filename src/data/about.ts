export interface AboutReel {
  id: string;
  label?: string;
  views?: string;
  niche?: string;
  src?: string;
  poster?: string;
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
  greeting: "Hi, I’m Akansha Mishra.",
  roleTag: "Creator Behind The UGC Playbook",
  eyebrowIndex: "Creator Profile · 01",
  portraitCaption: {
    name: "Akansha Mishra",
    subtitle: "Started in Uttar Pradesh with an Android phone · 6-figure UGC business",
    methodLabel: "No Huge Following Needed",
    badge: "Hundreds of Brands",
  },
  paragraphs: [
    "The creator behind The UGC Playbook.",
    "A few years ago, I started creating content from my room in a small town of Uttar Pradesh, with just my Android phone. I didn’t have a professional camera, an expensive setup, industry connections or a huge Instagram following.",
    "I was figuring everything out on my own — learning how to create content, approach brands, negotiate deals and turn a creative skill into an actual business.",
    "Fast forward to today, I’ve worked with hundreds of national and international brands, built a full-time 6 figure business through UGC, travelled for brand collaborations and created content across fashion, beauty, lifestyle, travel and more.",
    "And no, I didn’t have to become an influencer or build a massive following to make this happen.",
  ],
  metrics: [
    {
      id: "brands",
      value: "33k+",
      label: "Instagram community verified",
    },
    {
      id: "business",
      value: "1.7M",
      label: "Views on her top reel",
    },
    {
      id: "niches",
      value: "100+",
      label: "Worked with",
    },
  ],
  reelsHeading: "Selected Reels & UGC Examples",
  portraitSrc:
    "/media/images/portrait.jpg",
  portraitAlt: "Akansha Mishra — Creator behind The UGC Playbook",
  reels: [
    {
      id: "reel-1",
      label: "Beauty & Skincare UGC",
      views: "Beauty · Demo Reel",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster:
        "/media/images/img1.jpg",
      alt: "Beauty and skincare UGC reel example",
    },
    {
      id: "reel-2",
      label: "Travel & Brand Collab",
      views: "Travel · Demo Reel",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      poster:
        "/media/images/img2.jpg",
      alt: "Travel brand collaboration UGC reel example",
    },
    {
      id: "reel-3",
      label: "Fashion & Lifestyle UGC",
      views: "Lifestyle · Demo Reel",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      poster:
        "/media/images/img3.jpg",
      alt: "Fashion and lifestyle UGC reel example",
    },
  ],
};