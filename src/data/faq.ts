export type FaqCategory =
  | "All"
  | "Getting Started"
  | "Pitching & Deals"
  | "Pricing & Guarantee";

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, "All">;
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  categories: FaqCategory[];
  items: FaqItem[];
}

export const FAQ: FaqContent = {
  eyebrow: "FAQ · QUESTIONS, ANSWERED",
  pageTitle: "Questions, answered",
  pageSubtitle:
    "Straight answers on followers, filming faceless, gear, language, schedule flexibility, and results.",
  categories: [
    "All",
    "Getting Started",
    "Pitching & Deals",
    "Pricing & Guarantee",
  ],
  items: [
    {
      id: "faq-1",
      category: "Getting Started",
      question: "Do I need followers?",
      answer:
        "No! You don’t need any Instagram followers to become a UGC creator. Brands pay you for content which they can post on your pages.",
    },
    {
      id: "faq-2",
      category: "Getting Started",
      question: "Do I have to show my face?",
      answer:
        "Not at all! You can create faceless UGC using product shots, hands-only videos, voiceovers and other creative formats.",
    },
    {
      id: "faq-3",
      category: "Getting Started",
      question: "Do I need a DSLR or expensive setup?",
      answer:
        "No! Your smartphone is enough to get started. You don’t need a professional camera, studio or expensive equipment.",
    },
    {
      id: "faq-4",
      category: "Getting Started",
      question: "Is the course in Hindi or English?",
      answer:
        "The course is in simple English . The lessons are structured to make UGC easy to understand, even for complete beginners.",
    },
    {
      id: "faq-5",
      category: "Pitching & Deals",
      question: "Can I do this as a student, homemaker or with a full-time job?",
      answer:
        "Absolutely! UGC is flexible. You can learn, create content and pitch brands around your existing schedule.",
    },
    {
      id: "faq-6",
      category: "Pitching & Deals",
      question: "How soon will I see results?",
      answer:
        "You can start building your portfolio and pitching brands as soon as you complete the relevant lessons. Your first paid collaboration depends on your skills, consistency and implementation.",
    },
    {
      id: "faq-7",
      category: "Pricing & Guarantee",
      question: "How does the Action Promise work?",
      answer:
        "1:1 help if you don't land a brand after 30 pitches (T&C apply).",
    },
    {
      id: "faq-8",
      category: "Pricing & Guarantee",
      question: "How do I get access, and is there a refund?",
      answer:
        "Access details and refund policy can be added here once finalized.",
    },
  ],
};