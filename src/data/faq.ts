export type FaqCategory = "All" | "Getting Started" | "Pricing & Guarantee" | "Pitching & Deals";

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
  eyebrow: "FAQ · ANSWERS BEFORE YOU START",
  pageTitle: "Frequently Asked Questions",
  pageSubtitle:
    "Straight answers on starting with zero followers, filming on a phone, pricing, and how brand deals work.",
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
      question: "Do I need a big Instagram following to make money with UGC?",
      answer:
        "No. Brands pay UGC creators to make content for their own ads and product pages—not to post to a massive audience. You can start with zero followers.",
    },
    {
      id: "faq-2",
      category: "Getting Started",
      question: "Can I start with just a smartphone and no camera gear?",
      answer:
        "Yes. Modern phone cameras, natural window light, and clean framing are more than enough to film high-converting product demos, voiceovers, and lifestyle shots.",
    },
    {
      id: "faq-3",
      category: "Pitching & Deals",
      question: "Do I have to show my face in every video?",
      answer:
        "No. Hands-only shots, unboxing, aesthetic B-roll, and voiceover videos perform very well across beauty, food, tech, home, and travel brands.",
    },
    {
      id: "faq-4",
      category: "Pitching & Deals",
      question: "How do brands actually find and pay UGC creators?",
      answer:
        "Creators land deals through direct outreach (email and DMs), inbound portfolio inquiries, and repeatable pitch systems—turning one-off tests into ongoing monthly work.",
    },
    {
      id: "faq-5",
      category: "Pricing & Guarantee",
      question: "What does enrollment include, and how does the Action Promise work?",
      answer:
        "You get lifetime access to The UGC Playbook, the exclusive lesson, included bonuses, a completion certificate, and 1:1 help under The Action Promise if you don't land a brand after 30 pitches (subject to terms).",
    },
  ],
};