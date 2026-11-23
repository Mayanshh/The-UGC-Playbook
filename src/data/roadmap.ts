export interface RoadmapPhase {
  id: string;
  stepNumber: string;
  timeframe: string;
  title: string;
  description: string;
  milestones: string[];
}

export interface RoadmapContent {
  eyebrow: string;
  pageTitle: string;
  headline: string;
  subcopy: string;
  phases: RoadmapPhase[];
}

export const ROADMAP: RoadmapContent = {
  eyebrow: "09 · YOUR FIRST 30 DAYS",
  pageTitle: "30-Day Roadmap",
  headline: "A clear plan, not just videos",
  subcopy:
    "Four focused weekly sprints designed to take you from zero portfolio to active outreach and closed deals.",
  phases: [
    {
      id: "days-1-7",
      stepNumber: "01",
      timeframe: "Days 1 to 7",
      title: "Learn and build your portfolio",
      description: "Watch the course, shoot 3 sample videos.",
      milestones: [
        "Break down high-converting UGC hooks and pacing",
        "Film 3 clean sample videos with your phone",
        "Assemble a concise starter portfolio link",
      ],
    },
    {
      id: "days-8-14",
      stepNumber: "02",
      timeframe: "Days 8 to 14",
      title: "Set your rates and niche",
      description: "Pick your niche, make your rate card.",
      milestones: [
        "Choose your primary content niches to focus outreach",
        "Structure clear base rates and usage add-ons",
        "Build a simple, scannable rate card",
      ],
    },
    {
      id: "days-15-21",
      stepNumber: "03",
      timeframe: "Days 15 to 21",
      title: "Pitch every day",
      description: "Send pitches using what you learned.",
      milestones: [
        "Curate targeted brand prospects daily",
        "Send personalized pitches referencing real brand angles",
        "Track responses and refine messaging",
      ],
    },
    {
      id: "days-22-30",
      stepNumber: "04",
      timeframe: "Days 22 to 30",
      title: "Follow up and close",
      description: "Negotiate, sign, deliver.",
      milestones: [
        "Run structured follow-ups on warm threads",
        "Agree on deliverables, rights, and payment terms",
        "Deliver polished videos and ask for referrals or retainers",
      ],
    },
  ],
};