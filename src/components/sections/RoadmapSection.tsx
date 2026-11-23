"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ROADMAP, type RoadmapContent } from "@/data/roadmap";
import { cn } from "@/lib/cn";

interface RoadmapSectionProps {
  content?: RoadmapContent;
  className?: string;
}

export function RoadmapSection({
  content = ROADMAP,
  className,
}: RoadmapSectionProps) {
  const { eyebrow, pageTitle, headline, subcopy, phases } = content;
  const [activeId, setActiveId] = useState<string>(phases[0]?.id ?? "");

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink lg:border-solid lg:border-ink/10",
        className
      )}
    >
      <div className="mx-auto w-full max-w-380 px-4 py-14 md:px-12 md:py-24 lg:px-16 lg:py-32 xl:px-24">
        {/* Top Section Heading */}
        <Reveal y={14}>
          <header className="mb-10 border-b border-ink/15 pb-7 md:mb-14 lg:mb-20 lg:pb-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="hidden h-px w-8 bg-umber lg:inline-block" />
                <p className="inline-block font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-umber lg:text-[11px] lg:tracking-[0.24em]">
                  {eyebrow}
                </p>
              </div>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45 lg:inline">
                30-Day Execution Sprint
              </span>
            </div>

            <h1
              id="roadmap-heading"
              className="mt-4 font-serif text-[2.25rem] font-bold leading-[1.06] tracking-tight text-ink md:text-5xl lg:mt-5 lg:text-[clamp(2.75rem,4.2vw,4.5rem)] lg:font-normal lg:leading-[1.02] lg:tracking-[-0.03em]"
            >
              {pageTitle}
            </h1>
          </header>
        </Reveal>

        {/* Main 12-Column Editorial Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-16 xl:gap-24">
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal y={18}>
              <h2 className="font-serif text-[1.75rem] font-bold leading-[1.12] tracking-tight text-ink md:text-4xl lg:text-[clamp(2.25rem,3vw,3.25rem)] lg:font-normal lg:leading-[1.08] lg:tracking-[-0.02em]">
                {headline}
              </h2>
            </Reveal>

            <Reveal y={18} delay={0.08}>
              <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-ink/70 md:mt-5 md:text-base lg:text-[17px] lg:leading-[1.68]">
                {subcopy}
              </p>
            </Reveal>

            {/* Desktop Phase Quick-Jump Index */}
            <Reveal y={18} delay={0.14}>
              <div className="mt-12 hidden border-t border-ink/12 pt-6 lg:block">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45">
                  Sprint Sequence
                </p>
                <div className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
                  {phases.map((phase) => {
                    const isActive = phase.id === activeId;
                    return (
                      <button
                        key={phase.id}
                        type="button"
                        onClick={() => setActiveId(phase.id)}
                        onMouseEnter={() => setActiveId(phase.id)}
                        className={cn(
                          "flex items-center justify-between py-3.5 text-left transition-colors duration-300 cursor-pointer",
                          isActive ? "text-ink" : "text-ink/45 hover:text-ink/80"
                        )}
                      >
                        <span className="flex items-center gap-3 font-mono text-xs tracking-wider">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full transition-colors",
                              isActive ? "bg-umber" : "bg-transparent"
                            )}
                          />
                          {phase.stepNumber}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                          {phase.timeframe}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            {/* Mobile View: Transparent Hairline Card Stack */}
            <ol className="flex flex-col gap-4 lg:hidden">
              {phases.map((phase, idx) => (
                <Reveal key={phase.id} y={16} delay={idx * 0.05}>
                  <li className="rounded-2xl border border-ink/15 bg-transparent px-5 py-5">
                    <p className="font-sans text-xs font-medium text-ink/60">
                      {phase.timeframe}
                    </p>
                    <h3 className="mt-1.5 font-sans text-base font-bold leading-snug text-ink">
                      {phase.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink/75">
                      {phase.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>

            {/* Desktop View: Minimalist Editorial Sprint Ledger */}
            <ol className="hidden divide-y divide-ink/12 border-y border-ink/12 lg:block">
              {phases.map((phase) => {
                const isActive = phase.id === activeId;
                return (
                  <Reveal key={phase.id} y={18}>
                    <li
                      onMouseEnter={() => setActiveId(phase.id)}
                      onClick={() => setActiveId(phase.id)}
                      className={cn(
                        "group py-9 transition-opacity duration-300 cursor-pointer",
                        isActive ? "opacity-100" : "opacity-65 hover:opacity-100"
                      )}
                    >
                      <div className="flex items-start justify-between gap-8">
                        <div className="flex items-baseline gap-8">
                          <span className="font-mono text-xs tracking-[0.24em] text-umber">
                            {phase.stepNumber}
                          </span>

                          <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">
                              {phase.timeframe}
                            </p>
                            <h3 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-ink transition-transform duration-300 ease-out group-hover:translate-x-1.5 xl:text-[2.15rem]">
                              {phase.title}
                            </h3>
                            <p className="mt-2 font-sans text-base leading-relaxed text-ink/70">
                              {phase.description}
                            </p>

                            {phase.milestones.length > 0 && (
                              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 border-t border-ink/8 pt-3.5 font-sans text-xs text-ink/60">
                                {phase.milestones.map((item) => (
                                  <li
                                    key={item}
                                    className="before:mr-2 before:text-umber before:content-['—']"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-2 h-2 w-2 shrink-0 rounded-full border transition-colors duration-300",
                            isActive
                              ? "border-umber bg-umber"
                              : "border-ink/25 bg-transparent"
                          )}
                        />
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}