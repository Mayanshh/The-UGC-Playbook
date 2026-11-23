export interface CourseTier {
  id: string;
  code: string;
  name: string;
  badge?: string;
  featured?: boolean;
  tagline: string;
  price: string;
  originalPrice?: string;
  billingNote: string;
  ctaLabel: string;
  ctaHref: string;
  deliverables: string[];
}

export interface CoursesContent {
  eyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  reassuranceNote: string;
  tiers: CourseTier[];
}

export const COURSES: CoursesContent = {
  eyebrow: "COURSES · START YOUR UGC BUSINESS",
  pageTitle: "Courses & Editions",
  pageSubtitle:
    "Pick the path that fits how fast you want to build your portfolio, send daily brand pitches, and close paid UGC deals.",
  reassuranceNote:
    "Instant access after enrollment · Built for creators starting with a smartphone and zero prior agency experience.",
  tiers: [
    {
      id: "starter-sprint",
      code: "01",
      name: "Phone-to-Portfolio Sprint",
      tagline:
        "For beginners who want to shoot their first three sample videos and set up a clean starter portfolio.",
      price: "₹2,499",
      originalPrice: "₹3,999",
      billingNote: "One-time payment · Lifetime access",
      ctaLabel: "Start Sprint",
      ctaHref: "#offer",
      deliverables: [
        "Smartphone lighting, framing & audio basics",
        "3 sample UGC video frameworks (faceless & on-camera)",
        "Starter portfolio structure & rate card checklist",
        "Certificate of completion",
      ],
    },
    {
      id: "ugc-playbook-pro",
      code: "02",
      name: "The UGC Playbook",
      badge: "Most Popular",
      featured: true,
      tagline:
        "The complete step-by-step system from first pitch to recurring brand deals across national and international brands.",
      price: "₹6,000",
      originalPrice: "₹9,999",
      billingNote: "One-time payment · Full bundle access",
      ctaLabel: "Enroll in Playbook",
      ctaHref: "#offer",
      deliverables: [
        "All core playbook lessons with lifetime access",
        "Exclusive lesson: Things no one tells you",
        "Direct outreach scripts, follow-ups & negotiation guide",
        "The Action Promise (1:1 help after 30 pitches, T&C apply)",
        "Certificate of completion",
      ],
    },
    {
      id: "deal-accelerator",
      code: "03",
      name: "Pitch & Retainer Lab",
      tagline:
        "For creators ready to turn one-off collaborations into monthly retainers and travel/hotel partnerships.",
      price: "₹11,999",
      originalPrice: "₹16,999",
      billingNote: "One-time payment · Playbook + Lab resources",
      ctaLabel: "Join the Lab",
      ctaHref: "#offer",
      deliverables: [
        "Everything inside The UGC Playbook",
        "Monthly retainer & usage-rights pricing playbooks",
        "Hotel, travel & multi-video campaign pitch angles",
        "Portfolio & pitch teardown framework",
      ],
    },
  ],
};