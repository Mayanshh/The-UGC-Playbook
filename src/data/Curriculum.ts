/**
 * Curriculum: single source of truth for the "What's inside the playbook" section.
 * Add, remove or reorder modules and lessons here; counts, numbering and the
 * section chip update automatically.
 *
 * NOTE: Module 1's lessons are from the original design. Everything else is
 * placeholder copy: replace it with the real lesson titles.
 */

export interface CurriculumModule {
  id: string;
  /** e.g. "Module 1" */
  label: string;
  title: string;
  /** One line shown in the header on larger screens */
  summary: string;
  /** What the student can do after this module */
  outcome: string;
  lessons: string[];
}

export interface ExclusiveLesson {
  label: string;
  title: string;
  description: string;
}

export interface CurriculumContent {
  /** e.g. "05 · Curriculum". The module / lesson counts are appended automatically. */
  tagPrefix: string;
  heading: string;
  /** "{total}" is replaced with the real lesson count */
  subcopy: string;
  /** Short reassurance chips (shown beside the heading on large screens) */
  highlights: string[];
  modules: CurriculumModule[];
  exclusive?: ExclusiveLesson;
}

export const CURRICULUM: CurriculumContent = {
  tagPrefix: "Curriculum",
  heading: "From first reel to paid brand work.",
  subcopy:
    "{total} lessons, from understanding UGC to landing paid brand work. Tap a module to see the lessons.",
  highlights: ["Just your phone", "No face on camera", "From home, in your own time"],

  modules: [
    {
      id: "module-1",
      label: "Module 1",
      title: "UGC Unlocked: understand the game",
      summary:
        "What UGC is, why brands pay for it, and how the whole process works.",
      outcome: "A clear picture of how UGC works and exactly where you fit in.",
      lessons: [
        "What is UGC",
        "Why UGC is the cheat code",
        "UGC words that matter",
        "The UGC process explained",
      ],
    },
    {
      id: "module-2",
      label: "Module 2",
      title: "Create: content brands love",
      summary:
        "Shoot scroll-stopping content with just your phone, with or without your face.",
      outcome: "A repeatable way to create brand-ready content from home.",
      lessons: [
        "Setting up with just your phone",
        "Hooks and scripts that hold attention",
        "Faceless formats that still sell",
        "Editing fast, without fancy software",
      ],
    },
    {
      id: "module-3",
      label: "Module 3",
      title: "Pitch and get paid",
      summary:
        "Build a portfolio, find brands and pitch them every week until the deals land.",
      outcome:
        "A starter portfolio, a pitch you can send today and a plan for your first deal.",
      lessons: [
        "Building your starter portfolio",
        "Finding brands worth pitching",
        "The pitch that gets replies",
        "Rates, contracts and getting paid",
      ],
    },
  ],

  exclusive: {
    label: "Exclusive lesson",
    title: "Negotiating higher-paid deals",
    description:
      "A bonus lesson on pricing your work and negotiating better terms once the offers start coming in.",
  },
};
