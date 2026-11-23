export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  index: string;
}

export interface NavbarConfig {
  brand: {
    name: string;
    href: string;
  };
  links: NavLinkItem[];
  cta: {
    label: string;
    href: string;
  };
  status?: {
    text: string;
    active: boolean;
  };
  copyrightYear?: number;
}

export const NAVBAR_CONFIG: NavbarConfig = {
  brand: {
    name: "The UGC Playbook",
    href: "/",
  },
  links: [
    { id: "about", label: "About", href: "#about", index: "01" },
    { id: "what-is-ugc", label: "What Is UGC", href: "#what-is-ugc", index: "02" },
    { id: "roadmap", label: "Roadmap", href: "#roadmap", index: "03" },
    { id: "courses", label: "Courses", href: "#courses", index: "04" },
    { id: "faq", label: "FAQ", href: "#faq", index: "05" },
  ],
  cta: {
    label: "Get Playbook",
    href: "#offer",
  },
  status: {
    text: "₹6,000 Offer",
    active: true,
  },
  copyrightYear: 2026,
};