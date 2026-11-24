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
  eyebrow: "YOUR FIRST 30 DAYS",
  pageTitle: "30 Day Roadmap",
  headline: "A clear plan, not just videos",
  subcopy:
    "Four focused phases designed to take you from shooting your first sample videos to pitching brands, closing deals, and getting paid.",
  phases: [
    {
      id: "days-1-3",
      stepNumber: "01",
      timeframe: "Days 1 to 3",
      title: "Learn and create sample videos",
      description:
        "Go through the core lessons and film your first 3 sample videos right on your phone.",
      milestones: [
        "Learn high-converting UGC hooks, scripting, and pacing",
        "Shoot and edit 3 clean sample videos using just your phone",
        "Apply framing and natural lighting techniques that brands look for",
      ],
    },
    {
      id: "days-4-5",
      stepNumber: "02",
      timeframe: "Days 4 to 5",
      title: "Build portfolio as trained",
      description:
        "Package your sample videos into a high-converting portfolio and set up your pricing.",
      milestones: [
        "Organize your sample videos into the trained portfolio structure",
        "Pick your core niches and craft a clear, scannable rate card",
        "Prepare a ready-to-send portfolio link for brand outreach",
      ],
    },
    {
      id: "days-6-14",
      stepNumber: "03",
      timeframe: "Days 6 to 14",
      title: "Implement pitching strategies, follow up and close deals",
      description:
        "Start daily brand outreach, follow up consistently, and turn replies into closed deals.",
      milestones: [
        "Find decision-makers and send tailored pitches using the trained scripts",
        "Run structured follow-ups so warm leads never slip through",
        "Negotiate deliverables, lock in rates, and close your first paid deals",
      ],
    },
    {
      id: "days-14-onwards",
      stepNumber: "04",
      timeframe: "Day 14 onwards",
      title: "Create content for brands, get paid, repeat pitching and closing",
      description:
        "Deliver brand videos, collect payouts, and keep your pipeline full with ongoing outreach.",
      milestones: [
        "Film and deliver polished brand content on schedule",
        "Collect payments and turn one-off gigs into repeat retainers",
        "Keep pitching and closing consistently to scale your monthly income",
      ],
    },
  ],
};