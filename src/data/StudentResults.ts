/**
 * Student results: single source of truth for the "Real students. Real first wins." section.
 * Add, remove or reorder rows here; the section adapts automatically.
 */

export interface ChatProof {
  id: string;
  /** Used for the lightbox caption and alt text */
  student: string;
  src: string;
  /** Intrinsic size, keeps the layout stable while images load */
  width: number;
  height: number;
  alt: string;
}

export interface StudentResult {
  id: string;
  name: string;
  /** Small line under the name, e.g. "Mumbai · Beauty niche" */
  meta: string;
  /** Bold one-line outcome */
  result: string;
  quote: string;
  /** Optional profile photo. Falls back to an initial. */
  avatar?: { src: string; alt?: string };
  /** Links the card to a chat screenshot in `proofs` */
  proofId?: string;
}

export interface StudentResultsContent {
  tag: string;
  heading: string;
  subcopy: string;
  proofLabel: string;
  proofHint: string;
  results: StudentResult[];
  proofs: ChatProof[];
}

export const STUDENT_RESULTS: StudentResultsContent = {
  tag: "Student results · Rolling",
  heading: "Real students. Real first wins.",
  subcopy:
    "Written results from students of The UGC Playbook, with the original chats behind every one.",
  proofLabel: "In their own words",
  proofHint: "Tap any chat to read it in full",

  results: [
    {
      id: "aradhya",
      name: "Aradhya",
      meta: "Beauty niche",
      result: "6 deals locked in a single month",
      quote:
        "Now being able to close ₹10–14k deals is something I cannot explain. Thank you for helping me at each step.",
      proofId: "aradhya",
    },
    {
      id: "paridhi",
      name: "Paridhi",
      meta: "Beauty niche",
      result: "₹13,000 from one brand, 4 more deals closed",
      quote:
        "I can't believe I'm finally able to support my mom financially. Without the playbook and your guidance this was never possible.",
      proofId: "paridhi",
    },
    {
      id: "sia",
      name: "Sia",
      meta: "Faceless creator",
      result: "₹38,300 in a month, without showing her face",
      quote:
        "I never believed I could earn from faceless content. I received all my payments from last month's deals.",
      proofId: "sia",
    },
    {
      id: "nupur",
      name: "Nupur",
      meta: "Books niche",
      result: "2 UGC deals in her first month of pitching",
      quote:
        "I started pitching to brands last month and got two deals, including monthly packages. Thank you for all the guidance.",
      proofId: "nupur",
    },
    {
      id: "siya",
      name: "Siya",
      meta: "1:1 guidance",
      result: "High-paid deals, closed within the month",
      quote:
        "The playbook itself holds such great value. The high paid deals I'm closing this month are all because of your guidance and practical teaching.",
      proofId: "siya",
    },
    {
      id: "ishita",
      name: "Ishita",
      meta: "Enrolled student",
      result: "Clarity and the motivation to keep going",
      quote:
        "The way you explained everything made it easier to understand. It really gave me more clarity and motivation to keep going.",
      proofId: "ishita",
    },
  ],

  proofs: [
    {
      id: "aradhya",
      student: "Aradhya",
      src: "/media/images/results/result-ss-1.jpeg",
      width: 739,
      height: 1029,
      alt: "WhatsApp chat: Aradhya shares that 6 beauty deals were locked this month",
    },
    {
      id: "paridhi",
      student: "Paridhi",
      src: "/media/images/results/result-ss-2.jpeg",
      width: 739,
      height: 1172,
      alt: "WhatsApp chat: Paridhi shares a ₹13,000 payment and four more closed deals",
    },
    {
      id: "sia",
      student: "Sia",
      src: "/media/images/results/result-ss-3.jpeg",
      width: 739,
      height: 885,
      alt: "WhatsApp chat: Sia shares ₹38,300 earned from faceless content",
    },
    {
      id: "nupur",
      student: "Nupur",
      src: "/media/images/results/result-ss-4.jpeg",
      width: 739,
      height: 1198,
      alt: "WhatsApp chat: Nupur shares two UGC deals from her first month of pitching",
    },
    {
      id: "siya",
      student: "Siya",
      src: "/media/images/results/result-ss-5.jpeg",
      width: 739,
      height: 679,
      alt: "WhatsApp chat: Siya thanks Akansha for 1:1 guidance and high-paid deals",
    },
    {
      id: "ishita",
      student: "Ishita",
      src: "/media/images/results/result-ss-6.jpeg",
      width: 739,
      height: 790,
      alt: "WhatsApp chat: Ishita shares how the session gave her clarity and motivation",
    },
  ],
};

export function getProofById(proofId?: string): ChatProof | undefined {
  if (!proofId) return undefined;
  return STUDENT_RESULTS.proofs.find((proof) => proof.id === proofId);
}