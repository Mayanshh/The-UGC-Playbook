export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  brandName: string;
  tagline: string;
  navHeading: string;
  navLinks: FooterLink[];
  sectionsHeading: string;
  sectionLinks: FooterLink[];
  contactHeading: string;
  contactEmail: string;
  contactNote: string;
  copyright: string;
  legalNote: string;
}

export const FOOTER: FooterContent = {
  brandName: "The UGC Playbook",
  tagline:
    "A practical system for creating phone-shot UGC, pitching brands directly, and building repeatable creator income without needing a massive following.",
  navHeading: "Playbook",
  navLinks: [
    { label: "About Akansha", href: "#about" },
    { label: "What Is UGC", href: "#what-is-ugc" },
    { label: "30-Day Roadmap", href: "#roadmap" },
    { label: "What's Included", href: "#offer" },
  ],
  sectionsHeading: "More",
  sectionLinks: [
    { label: "Student Results", href: "#student-results" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Fit Check", href: "#fit-check" },
    { label: "FAQ", href: "#faq" },
  ],
  contactHeading: "Direct Inquiries",
  contactEmail: "hello@ugcplaybook.com",
  contactNote: "Creator partnerships, press & support",
  copyright: "© 2026 The UGC Playbook. All rights reserved.",
  legalNote: "Built for creators · Minimalist Edition",
};