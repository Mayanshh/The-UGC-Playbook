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
  const { eyebrow, pageTitle, pageSubtitle, reassuranceNote, tiers } = content;

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

        {/* Conversion Tier Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-8">
          {tiers.map((tier, idx) => (
            <Reveal key={tier.id} y={18} delay={Math.min(idx * 0.06, 0.2)}>
              <article
                className={cn(
                  "flex h-full flex-col justify-between rounded-2xl border bg-transparent p-6 transition-colors duration-300 md:p-8 lg:p-10",
                  tier.featured
                    ? "border-umber ring-1 ring-umber/30"
                    : "border-ink/15 hover:border-ink/35"
                )}
              >
                <div>
                  {/* Top Index & Edition Label */}
                  <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                    <span className="font-mono text-xs tracking-[0.24em] text-umber">
                      EDITION {tier.code}
                    </span>
                    {tier.badge && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-umber">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  {/* Course Title & Tagline */}
                  <h2 className="mt-6 font-serif text-2xl font-bold tracking-tight text-ink md:text-3xl lg:font-normal">
                    {tier.name}
                  </h2>
                  <p className="mt-2.5 font-sans text-sm leading-relaxed text-ink/70">
                    {tier.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="mt-7 border-y border-ink/10 py-5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-4xl font-bold tracking-tight text-ink lg:font-normal lg:text-[2.75rem]">
                        {tier.price}
                      </span>
                      {tier.originalPrice && (
                        <span className="font-mono text-xs text-ink/45 line-through">
                          {tier.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                      {tier.billingNote}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <ul className="mt-6 space-y-3.5">
                    {tier.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 font-sans text-sm leading-snug text-ink/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-umber"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conversion CTA */}
                <div className="mt-9 pt-2">
                  <a
                    href={tier.ctaHref}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-full border px-6 py-3.5 font-sans text-sm font-medium transition-colors duration-300",
                      tier.featured
                        ? "border-ink bg-ink text-coco hover:bg-transparent hover:text-ink"
                        : "border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-coco"
                    )}
                  >
                    <span>{tier.ctaLabel}</span>
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
          ))}
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