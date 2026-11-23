/** "Is this for you?" copy. Edit freely; the section adapts to any number of items. */

export interface FitList {
  title: string;
  items: string[];
}

export interface FitCheckContent {
  tag: string;
  heading: string;
  /** Short line under the heading (desktop only) */
  subcopy: string;
  forYou: FitList;
  notForYou: FitList;
  closing: {
    text: string;
    cta: { label: string; href: string };
    note?: string;
  };
}

export const FIT_CHECK: FitCheckContent = {
  tag: "Is this for you",
  heading: "Is The UGC Playbook for you?",
  subcopy: "An honest check before you enroll. No pressure, just clarity.",
  forYou: {
    title: "This is for you if",
    items: [
      "You want a skill you can do from home, around college, work or family",
      "You love making reels but don't want to become an influencer",
      "You'd rather keep your face off camera",
      "You want income that isn't tied to followers",
      "You're ready to practise and pitch brands every week",
    ],
  },
  notForYou: {
    title: "This is not for you if",
    items: [
      "You want quick money without doing the work",
      "You won't film or pitch until everything feels perfect",
      "You expect results without taking action on what you learn",
    ],
  },
  closing: {
    text: "If this sounds like you, it was built for you.",
    cta: { label: "Join The UGC Playbook · ₹6,000", href: "#playbook" },
    note: "Christmas Sale · 40% off, now ₹6,000",
  },
};
