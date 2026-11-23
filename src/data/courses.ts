export interface CourseIncludedItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CoursesContent {
  eyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  courseName: string;
  headline: string;
  price: string;
  billingNote: string;
  ctaLabel: string;
  ctaHref: string;
  reassuranceNote: string;
  includedItems: CourseIncludedItem[];
}

export const COURSES: CoursesContent = {
  eyebrow: "THE COURSE · START YOUR UGC JOURNEY",
  pageTitle: "The UGC Playbook",
  pageSubtitle:
    "Everything you need to start your UGC journey for ₹6,000.",
  courseName: "The UGC Playbook — Complete Course",
  headline: "Everything you need to start your UGC journey for ₹6,000",
  price: "₹6,000",
  billingNote: "One-time payment · Structured & practical",
  ctaLabel: "Get The UGC Playbook",
  ctaHref: "#offer",
  reassuranceNote:
    "Short, crisp, and practical · Built for beginners starting with real portfolio, pitching, and pricing frameworks.",
  includedItems: [
    {
      id: "ugc-playbook-complete",
      number: "01",
      title: "The UGC Playbook — Complete Course",
      description:
        "13 structured lessons covering everything from understanding UGC and creating content to building your portfolio, pitching brands, pricing and closing paid collaborations. Short, crisp and practical.",
    },
    {
      id: "exclusive-lesson",
      number: "02",
      title: "Exclusive Lesson — Things No One Tells You",
      description:
        "Learn the insider lessons, practical tips and mistakes I’ve learned through my own experience working with brands.",
    },
    {
      id: "bonus-1-kickstart",
      number: "03",
      title: "Bonus #1 — 7 Day UGC Kickstart Bundle",
      description:
        "Steps to follow first 7 days. Includes real student portfolios, pitching templates, brand communication & finding brand list strategy. Plus common doubts explained.",
    },
    {
      id: "bonus-2-starter-kit",
      number: "04",
      title: "Bonus #2 — UGC Portfolio & Rate Card Starter Kit",
      description:
        "Get ready-to-customise resources to help you present your work, showcase your content and communicate your pricing to potential clients.",
    },
  ],
};