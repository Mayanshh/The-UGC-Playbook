"use client";

import { Reveal } from "@/components/ui/Reveal";
import { COURSES, type CoursesContent } from "@/data/courses";
import { cn } from "@/lib/cn";

interface CoursesSectionProps {
  content?: CoursesContent;
  className?: string;
}

export function CoursesSection({
  content = COURSES,
  className,
}: CoursesSectionProps) {
  const {
    eyebrow,
    pageTitle,
    pageSubtitle,
    courseName,
    headline,
    price,
    billingNote,
    ctaLabel,
    ctaHref,
    reassuranceNote,
    includedItems,
  } = content;

  return (
    <section
      id="courses"
      aria-labelledby="courses-page-title"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink lg:border-solid lg:border-ink/10",
        className
      )}
    >
      <div className="mx-auto w-full max-w-380 px-4 py-14 md:px-12 md:py-24 lg:px-16 lg:py-32 xl:px-24">
        {/* Big Clear Page Title Banner */}
        <Reveal y={14}>
          <header className="mb-10 border-b border-ink/15 pb-8 md:mb-14 md:pb-10 lg:mb-16 lg:pb-12">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-3">
                <span className="hidden h-px w-8 bg-umber lg:inline-block" />
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-umber lg:tracking-[0.24em]">
                  {eyebrow}
                </p>
              </div>

              <h1
                id="courses-page-title"
                className="font-serif text-[clamp(2.5rem,7.2vw,5.25rem)] font-bold leading-[1.02] tracking-tight text-ink lg:font-normal lg:tracking-[-0.03em]"
              >
                {pageTitle}
              </h1>

              <p className="max-w-2xl font-sans text-sm leading-relaxed text-ink/70 md:text-base lg:text-[17px]">
                {pageSubtitle}
              </p>
            </div>
          </header>
        </Reveal>

        {/* Single-Course Conversion Feature Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
          {/* Left Column: Single Course Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal y={18}>
              <article className="flex flex-col justify-between rounded-2xl border border-umber bg-transparent p-6 ring-1 ring-umber/30 transition-colors duration-300 hover:bg-taupe/30 md:p-8 lg:p-10">
                <div>
                  <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                    <span className="font-mono text-xs tracking-[0.24em] text-umber">
                      SINGLE COURSE EDITION
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-umber">
                      {includedItems.length} Modules &amp; Bonuses
                    </span>
                  </div>

                  <h2 className="mt-6 font-serif text-2xl font-bold tracking-tight text-ink md:text-3xl lg:font-normal">
                    {courseName}
                  </h2>

                  <p className="mt-2.5 font-sans text-sm leading-relaxed text-ink/75">
                    {headline}
                  </p>

                  <div className="mt-7 border-y border-ink/10 py-5">
                    <span className="font-serif text-4xl font-bold tracking-tight text-ink lg:text-[2.75rem] lg:font-normal">
                      {price}
                    </span>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                      {billingNote}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={ctaHref}
                    className="group flex w-full items-center justify-between rounded-full border border-taupe bg-taupe px-6 py-3.5 font-sans text-sm font-medium text-coco transition-colors duration-300 hover:bg-transparent hover:text-taupe"
                  >
                    <span>{ctaLabel}</span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Right Column: Course & Bonuses Breakdown */}
          <div className="lg:col-span-7">
            <ol className="grid grid-cols-1 gap-5">
              {includedItems.map((item, idx) => (
                <Reveal key={item.id} y={16} delay={Math.min(idx * 0.05, 0.2)}>
                  <li className="rounded-2xl border border-ink/15 bg-transparent p-6 transition-colors duration-300 hover:border-ink/35 hover:bg-taupe/30 md:p-7">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs tracking-[0.24em] text-umber">
                        {item.number}
                      </span>
                      <h3 className="font-serif text-xl font-bold tracking-tight text-ink md:text-2xl lg:font-normal">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 pl-8 font-sans text-sm leading-relaxed text-ink/75 md:text-[15px] lg:leading-[1.68]">
                      {item.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* Bottom Conversion Reassurance Bar */}
        <Reveal y={14} delay={0.16}>
          <div className="mt-10 border-t border-ink/12 pt-6 lg:mt-14 lg:pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
              {reassuranceNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}