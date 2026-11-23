export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  index: string;
}

// src/data/navigation.ts
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
    { id: "work", label: "Selected Work", href: "#work", index: "01" },
    { id: "playbook", label: "The Playbook", href: "#playbook", index: "02" },
    { id: "services", label: "Capabilities", href: "#services", index: "03" },
    { id: "studio", label: "Studio", href: "#studio", index: "04" },
  ],
  cta: {
    label: "Start a Project",
    href: "#contact",
  },
  status: {
    text: "Booking Q1",
    active: true,
  },
};