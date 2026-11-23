"use client";

import { Reveal } from "@/components/ui/Reveal";
import { WHAT_IS_UGC, type WhatIsUgcContent } from "@/data/whatIsUgc";
import { cn } from "@/lib/cn";

interface WhatIsUgcSectionProps {
  content?: WhatIsUgcContent;
  /** Clear top-level page title */
  pageTitle?: string;
  pageSubtitle?: string;
  className?: string;
}

export function WhatIsUgcSection({
  content = WHAT_IS_UGC,
  pageTitle = "What Is UGC",
  pageSubtitle = "How user-generated content works—and why brands pay everyday creators for videos instead of follower counts.",
  className,
}: WhatIsUgcSectionProps) {
  const {
    eyebrow,
    headline,
    subcopy,
    steps,
    comparisonHeading,
    comparisonColumns,
    comparison,
  } = content;

  return (
    <section
      id="what-is-ugc"
      aria-labelledby="what-is-ugc-page-title"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink lg:border-solid lg:border-ink/10",
        className
      )}
    >
      <div className="mx-auto w-full max-w-380 px-4 py-14 md:px-12 md:py-24 lg:px-16 lg:py-32 xl:px-24">
        {/* Clear Big Page Title Banner */}
        <Reveal y={14}>
          <header className="mb-12 border-b border-ink/15 pb-8 md:mb-16 md:pb-10 lg:mb-20 lg:pb-12">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-3">
                <span className="hidden h-px w-8 bg-umber lg:inline-block" />
                <p className="rounded-md border border-ink/12 bg-paper/70 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink/75 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:tracking-[0.24em] lg:text-umber">
                  {eyebrow}
                </p>
              </div>

              <h1
                id="what-is-ugc-page-title"
                className="font-serif text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.02] tracking-tight text-ink lg:font-normal lg:tracking-[-0.03em]"
              >
                {pageTitle}
              </h1>

              <p className="max-w-2xl font-sans text-sm leading-relaxed text-ink/70 md:text-base lg:text-[17px]">
                {pageSubtitle}
              </p>
            </div>
          </header>
        </Reveal>

        {/* Main 12-Column Editorial Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-16 xl:gap-24">
          {/* Left Sticky Column: Core Premise */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal y={18}>
              <h2 className="font-serif text-[2rem] font-bold leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-[clamp(2.75rem,3.8vw,4rem)] lg:font-normal lg:leading-[1.02] lg:tracking-[-0.03em]">
                {headline}
              </h2>
            </Reveal>

            <Reveal y={18} delay={0.08}>
              <p className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-ink/75 md:mt-6 md:text-lg lg:text-[17px] lg:leading-[1.68] lg:text-ink/70">
                {subcopy}
              </p>
            </Reveal>
          </div>

          {/* Right Column: 3-Step Flow */}
          <div className="lg:col-span-7">
            {/* Mobile Card Stack */}
            <ol className="flex flex-col gap-4 lg:hidden">
              {steps.map((step, idx) => (
                <Reveal key={step.id} y={16} delay={idx * 0.06}>
                  <li className="rounded-2xl border border-ink/15 bg-paper/80 px-5 py-5">
                    <p className="font-sans text-base font-bold leading-snug text-ink">
                      {idx + 1}. {step.title}
                    </p>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink/70">
                      {step.detail}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>

            {/* Desktop Architectural Numbered Ledger */}
            <ol className="hidden divide-y divide-ink/12 border-y border-ink/12 lg:block">
              {steps.map((step) => (
                <Reveal key={step.id} y={18}>
                  <li className="group py-10 transition-colors duration-300">
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex items-baseline gap-8">
                        <span className="font-mono text-xs tracking-[0.24em] text-umber">
                          {step.number}
                        </span>
                        <div>
                          <h3 className="font-serif text-3xl font-normal tracking-tight text-ink transition-transform duration-300 ease-out group-hover:translate-x-1.5 xl:text-[2.25rem]">
                            {step.title}
                          </h3>
                          <p className="mt-2.5 max-w-lg font-sans text-base leading-relaxed text-ink/65">
                            {step.detail}
                          </p>
                        </div>
                      </div>

                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 shrink-0 rounded-full border border-ink/25 transition-colors duration-300 group-hover:border-umber group-hover:bg-umber"
                      />
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* Influencer vs. UGC Creator Comparison Table */}
        {comparison.length > 0 && (
          <Reveal y={20} delay={0.12}>
            <div className="mt-14 border-t border-ink/15 pt-10 md:mt-20 md:pt-12 lg:mt-24 lg:pt-16">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between lg:mb-10">
                <h2 className="font-serif text-2xl font-bold tracking-tight text-ink md:text-3xl lg:font-normal lg:text-4xl">
                  {comparisonHeading}
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-umber">
                  Side-by-Side Breakdown
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-ink/12 bg-paper/75 lg:rounded-none lg:border-0 lg:bg-transparent">
                <table className="w-full min-w-120 border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-ink/20">
                      <th
                        scope="col"
                        className="w-[38%] py-4 pr-4 font-sans text-xs font-medium uppercase tracking-[0.14em] text-ink/50 lg:py-5 lg:pr-8"
                      >
                        <span className="sr-only">Criteria</span>
                      </th>
                      <th
                        scope="col"
                        className="w-[31%] px-4 py-4 font-sans text-sm font-bold text-ink md:text-base lg:px-8 lg:py-5 lg:text-lg"
                      >
                        {comparisonColumns.influencer}
                      </th>
                      <th
                        scope="col"
                        className="w-[31%] bg-taupe/60 px-4 py-4 font-sans text-sm font-bold text-ink md:text-base lg:px-8 lg:py-5 lg:text-lg"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-umber"
                          />
                          {comparisonColumns.ugcCreator}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/12 border-b border-ink/12">
                    {comparison.map((row) => (
                      <tr
                        key={row.dimension}
                        className="transition-colors duration-200 hover:bg-ink/2"
                      >
                        <th
                          scope="row"
                          className="py-4 pr-4 font-sans text-sm font-bold text-ink md:text-[15px] lg:py-6 lg:pr-8 lg:text-base"
                        >
                          {row.dimension}
                        </th>
                        <td className="px-4 py-4 font-sans text-sm text-ink/75 md:text-[15px] lg:px-8 lg:py-6 lg:text-base">
                          {row.influencer}
                        </td>
                        <td className="bg-taupe/50 px-4 py-4 font-sans text-sm font-semibold text-ink md:text-[15px] lg:px-8 lg:py-6 lg:text-base">
                          {row.ugcCreator}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}