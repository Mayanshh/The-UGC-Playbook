export interface OfferItem {
  id: string;
  title: string;
  subtitle?: string;
  tag: string;
}

export interface OfferContent {
  eyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  items: OfferItem[];
}

export const OFFER: OfferContent = {
  eyebrow: "OFFER + PRICE · CHRISTMAS SALE",
  pageTitle: "What's Included",
  pageSubtitle:
    "Every lesson, bonus resource, guarantee, and completion credential bundled into a single enrollment.",
  headline: "Everything you get for ₹6,000",
  ctaLabel: "Claim the Offer",
  ctaHref: "#playbook",
  items: [
    {
      id: "playbook",
      title: "The UGC Playbook",
      subtitle: "13 lessons, lifetime access",
      tag: "[value]",
    },
    {
      id: "exclusive-lesson",
      title: "Exclusive lesson: Things no one tells you",
      tag: "Included",
    },
    {
      id: "bonus-1",
      title: "Bonus: [Akansha to choose]",
      tag: "[value]",
    },
    {
      id: "bonus-2",
      title: "Bonus: [Akansha to choose]",
      tag: "[value]",
    },
    {
      id: "action-promise",
      title: "The Action Promise",
      subtitle: "1:1 help if no brand after 30 pitches",
      tag: "T&C apply",
    },
    {
      id: "certificate",
      title: "Certificate of completion",
      tag: "Included",
    },
  ],
};