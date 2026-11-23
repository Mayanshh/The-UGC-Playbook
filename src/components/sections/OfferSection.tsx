"use client";

import { Reveal } from "@/components/ui/Reveal";
import { OFFER, type OfferContent } from "@/data/offer";
import { cn } from "@/lib/cn";

interface OfferSectionProps {
  content?: OfferContent;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function OfferSection({
  content = OFFER,
  className,
}: OfferSectionProps) {
  const { eyebrow, pageTitle, pageSubtitle, headline, ctaLabel, ctaHref, items } =
    content;

  return (
    <section
      id="offer"
      aria-labelledby="offer-page-title"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink lg:border-solid lg:border-ink/10",
        className
      )}
    >
      <div className="mx-auto w-full max-w-380 px-4 py-14 md:px-12 md:py-24 lg:px-16 lg:py-32 xl:px-24">
        {/* Big Clear Page Title + Price Anchor */}
        <Reveal y={14}>
          <header className="border-b border-ink/15 pb-8 md:pb-10 lg:pb-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-3">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-umber lg:tracking-[0.24em]">
                  {eyebrow}
                </p>
                <h1
                  id="offer-page-title"
                  className="font-serif text-[clamp(2.5rem,7.2vw,5.25rem)] font-bold leading-none tracking-tight text-ink lg:font-normal lg:tracking-[-0.03em]"
                >
                  {pageTitle}
                </h1>
                <p className="max-w-2xl font-sans text-sm leading-relaxed text-ink/70 md:text-base lg:text-[17px]">
                  {pageSubtitle}
                </p>
              </div>

              <div className="border-t border-ink/12 pt-4 lg:border-t-0 lg:pt-0 lg:text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
                  Bundle Offer
                </p>
                <p className="mt-1 font-serif text-2xl font-bold tracking-tight text-ink md:text-3xl lg:font-normal lg:text-4xl">
                  {headline}
                </p>
              </div>
            </div>
          </header>
        </Reveal>

        {/* 2-Column Manifest Grid on Desktop / Clean Stack on Mobile */}
        <ol className="mt-10 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-2 lg:gap-0 lg:border-l lg:border-ink/12">
          {items.map((item, idx) => (
            <Reveal key={item.id} y={16} delay={Math.min(idx * 0.05, 0.25)}>
              <li className="group flex h-full flex-col justify-between rounded-2xl border border-ink/15 bg-transparent p-5 transition-colors duration-300 lg:rounded-none lg:border-0 lg:border-r lg:border-b lg:border-ink/12 lg:p-10 xl:p-12 lg:hover:bg-ink/2">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs tracking-[0.24em] text-umber lg:text-sm">
                    {pad(idx + 1)}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                    {item.tag}
                  </span>
                </div>

                <div className="mt-4 lg:mt-10">
                  <h2 className="font-sans text-base font-bold leading-snug text-ink lg:font-serif lg:text-3xl lg:font-normal lg:leading-[1.15] lg:tracking-tight">
                    {item.title}
                  </h2>
                  {item.subtitle && (
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink/70 lg:mt-2.5 lg:text-[15px]">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Grounded Bottom Action Strip */}
        <Reveal y={16} delay={0.15}>
          <div className="mt-10 flex flex-col gap-5 border-t border-ink/15 pt-7 sm:flex-row sm:items-center sm:justify-between lg:mt-14 lg:pt-8">
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
              <span>{pad(items.length)} Items Included</span>
              <span aria-hidden="true" className="text-ink/25">
                /
              </span>
              <span className="text-umber">{headline}</span>
            </div>

            <a
              href={ctaHref}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-ink bg-ink px-7 py-3.5 font-sans text-sm font-medium text-coco transition-colors duration-300 hover:bg-transparent hover:text-ink"
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
        </Reveal>
      </div>
    </section>
  );
}