export interface AboutImage {
  src: string;
  alt: string;
}

export interface FounderVideo {
  label: string;
  durationLabel: string;
  posterSrc: string;
  posterAlt: string;
  /** Accepts any YouTube URL (watch, shorts, youtu.be) or 11-char video ID */
  videoSrc?: string;
}

export interface MobileProofCard {
  id: string;
  metric: string;
  caption: string;
}

export interface AboutMobileContent {
  eyebrow: string;
  headline: string;
  subcopy: string;
  founderVideo: FounderVideo;
  proofCards: MobileProofCard[];
  cta: {
    label: string;
    href: string;
  };
}

export interface AboutContent {
  eyebrow: string;
  /** One string per line. Each line is revealed from behind a mask. */
  title: string[];
  subtitle: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
  founderVideo: FounderVideo;
  imageLarge: AboutImage;
  imageSmall: AboutImage;
  mobile: AboutMobileContent;
}

/**
 * Single source of truth for the founder YouTube video across desktop & mobile.
 * Paste any YouTube link (watch?v=..., shorts/..., youtu.be/...) or 11-char video ID.
 */
const FOUNDER_YOUTUBE_URL = "https://www.youtube.com/watch?v=FBC6Q1Ptn_g";

const SHARED_FOUNDER_VIDEO: FounderVideo = {
  label: "Tap to play",
  durationLabel: "60 to 90 sec, vertical",
  posterSrc: "/media/images/img9.jpg",
  posterAlt: "Founder vertical video preview",
  videoSrc: FOUNDER_YOUTUBE_URL,
};

export const ABOUT_CONTENT: AboutContent = {
  eyebrow: "Story",
  title: ["Design with less noise,", "made to last."],
  subtitle: "An independent studio for brands that want to be remembered.",
  body: "We work with a small number of founders and teams each year. Every project starts by removing what does not matter, then giving what remains the time, space and craft it deserves. The result is work that feels calm, clear and unmistakably yours.",
  cta: {
    label: "Read our story",
    href: "/about",
  },
  founderVideo: SHARED_FOUNDER_VIDEO,
  imageLarge: {
    src: "/media/images/img9.jpg",
    alt: "An arch and a sphere in warm light",
  },
  imageSmall: {
    src: "/media/images/img6.jpg",
    alt: "A cream plane resting against a red circle",
  },
  mobile: {
    eyebrow: "THE STORY BEHIND THE PLAYBOOK",
    headline: "Built for real creators shooting from everyday rooms.",
    subcopy:
      "You don't need studio lighting, fancy cameras, or a massive following to get brands to pay for your content.",
    founderVideo: SHARED_FOUNDER_VIDEO,
    proofCards: [
      {
        id: "students",
        metric: "1300+ students",
        caption: "learning the exact UGC system inside",
      },
      {
        id: "community",
        metric: "33k community",
        caption: "Verified Instagram @the.ugcplaybook",
      },
      {
        id: "deals",
        metric: "1100+ students landed paid deals",
        caption: "within 4weeks",
      },
      {
        id: "gear",
        metric: "Phone only",
        caption: "No dslr, no studio",
      },
    ],
    cta: {
      label: "I want to see results myself",
      href: "#courses",
    },
  },
};