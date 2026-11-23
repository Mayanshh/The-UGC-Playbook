"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { STUDENT_RESULTS, type StudentResultsContent } from "@/data/StudentResults";
import { cn } from "@/lib/cn";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { ChatProofMarquee } from "@/components/ui/ChatProofMarquee";
import { ProofLightbox } from "@/components/ui/ProofLightbox";
import { ResultCard } from "@/components/ui/ResultCard";
import { useSnapCarousel } from "@/components/ui/useSnapCarousel";
import { Button } from "@/components/ui/Button";

interface StudentResultsProps {
  content?: StudentResultsContent;
  /** Optional page/section title shown at the top of the page */
  pageTitle?: string;
  pageSubtitle?: string;
  className?: string;
}

export function StudentResults({
  content = STUDENT_RESULTS,
  pageTitle = "Student Results & Proof",
  pageSubtitle = "Real outcomes, creator wins, and unedited brand deal receipts from students applying the playbook.",
  className,
}: StudentResultsProps) {
  const { tag, heading, subcopy, proofLabel, proofHint, results, proofs } = content;
  const [activeProof, setActiveProof] = useState<string | null>(null);
  const carousel = useSnapCarousel();

  return (
    <section
    id="student-results"
      aria-labelledby="student-results-title"
      className={cn(
        "w-full border-t border-dashed border-ink/15 bg-taupe text-paper",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-12 md:py-32">
        {/* Top Page Title Header */}
        <header className="mb-12 border-b border-paper/15 pb-8 md:mb-16 md:pb-10">
          <div className="max-w-3xl space-y-2.5">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-coco/70">
              {tag}
            </p>
            <h1 className="font-serif text-[clamp(2rem,5.2vw,3.75rem)] font-bold leading-[1.06] tracking-tight text-paper">
              {pageTitle}
            </h1>
            <p className="max-w-2xl font-sans text-sm leading-relaxed text-paper/70 md:text-base">
              {pageSubtitle}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-12 md:gap-y-0">
          {/* Header (sticky on desktop) */}
          <div className="md:col-span-4 md:self-start md:sticky md:top-28">
            <Reveal y={16}>
              <span className="inline-block px-2.5 py-1.5 font-sans text-[1rem] font-medium uppercase tracking-[0.14em] text-paper">
                {tag}
              </span>
            </Reveal>

            <Reveal y={24} delay={0.08}>
              <h2
                id="student-results-title"
                className="mt-6 font-serif text-[clamp(1.75rem,6.5vw,2.25rem)] font-bold leading-[1.12] tracking-tight md:mt-8 md:text-[clamp(2.5rem,3.6vw,3.5rem)] md:leading-[1.05]"
              >
                {heading}
              </h2>
              <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-paper/70 md:mt-6">
                {subcopy}
              </p>
            </Reveal>

            <CarouselControls
              className="mt-12 hidden md:block"
              index={carousel.index}
              count={carousel.count || results.length}
              atStart={carousel.atStart}
              atEnd={carousel.atEnd}
              onPrev={carousel.prev}
              onNext={carousel.next}
              barRef={carousel.barRef}
            />
          </div>

          {/* Written results: swipeable on phones, snapped row with controls on desktop */}
          <div className="min-w-0 md:col-span-8">
            <div
              ref={carousel.trackRef}
              role="region"
              aria-label="Student results"
              tabIndex={0}
              className="relative -mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-2 outline-none [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:mx-0 md:scroll-px-0 md:gap-6 md:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {results.map((item) => (
                <div
                  key={item.id}
                  className="w-[82vw] max-w-[21rem] shrink-0 snap-start md:w-[26rem] md:max-w-none"
                >
                  <ResultCard item={item} onOpenProof={setActiveProof} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rolling proof: the original chats */}
        {proofs.length > 0 && (
          <div className="mt-20 md:mt-32">
            <div className="mb-6 flex items-center gap-6 md:mb-10">
              <p className="shrink-0 font-sans text-sm text-coco/70 md:text-base">
                {proofLabel}
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-coco/10" />
              <p className="hidden shrink-0 font-sans text-xs text-coco/50 md:block">
                {proofHint}
              </p>
            </div>

            <div className="-mx-4 md:-mx-12">
              <ChatProofMarquee
                proofs={proofs}
                onOpen={setActiveProof}
                paused={activeProof !== null}
              />
            </div>
          </div>
        )}
      </div>

      <ProofLightbox proofs={proofs} activeId={activeProof} onChange={setActiveProof} />

      <div className="flex items-start justify-start h-fit w-full pb-5 px-5 md:px-15">
          <Button variant="solid-coco" href="#playbook">
            I want results like these
          </Button>
      </div>
    </section>
  );
}