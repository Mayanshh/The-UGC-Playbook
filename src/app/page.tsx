import { Hero } from "@/components/sections/Hero";
import { HERO_CONTENT } from "@/data/site";
import { BrandMarquee } from "@/components/sections/BrandMarquee"; 
import BuiltFor from "@/components/sections/BuiltFor";
import { StudentResults } from "@/components/sections/StudentResultsSection";
import { FitCheck } from "@/components/sections/FitCheckSection";
import { Curriculum } from "@/components/sections/CurriculumSection";
import {AboutSection} from "@/components/sections/AboutSection";
import { WhatIsUgcSection } from "@/components/sections/WhatIsUgcSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
// import { OfferSection } from "@/components/sections/OfferSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { FloatingCta } from "@/components/ui/FloatingCta";

export default function HomePage() {
  return (
    <main>
      <Hero content={HERO_CONTENT} />
      <BuiltFor />
      <BrandMarquee  />
      <FitCheck />
      <StudentResults />
      <Curriculum />
      <AboutSection />
      <WhatIsUgcSection />
      <RoadmapSection />
      <CoursesSection />
      {/* <OfferSection /> */}
      <FaqSection />
      <FooterSection />
      <FloatingCta
        label="Get The UGC Playbook"
        sublabel="₹6,000 · Lifetime Access"
        href="#offer"
      />
    </main>
  );
}