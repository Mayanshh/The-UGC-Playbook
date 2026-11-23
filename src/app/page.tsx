import { Hero } from "@/components/sections/Hero";
import { HERO_CONTENT } from "@/data/site";
import { BrandMarquee } from "@/components/sections/BrandMarquee"; 
import BuiltFor from "@/components/sections/BuiltFor";
import { StudentResults } from "@/components/sections/StudentResultsSection";
import { FitCheck } from "@/components/sections/FitCheckSection";
import { Curriculum } from "@/components/sections/CurriculumSection";
import {AboutSection} from "@/components/sections/AboutSection";

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
    </main>
  );
}