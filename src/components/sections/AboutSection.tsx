"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ABOUT, type AboutContent } from "@/data/about";
import { cn } from "@/lib/cn";

interface AboutSectionProps {
  content?: AboutContent;
  className?: string;
}

export function AboutSection({
  content = ABOUT,
  className,
}: AboutSectionProps) {
  const {
    greeting,
    roleTag = "About Akansha",
    eyebrowIndex = "Creator Profile · 01",
    portraitCaption,
    paragraphs,
    metrics,
    reelsHeading = "Selected Reels & Features",
    reels,
    portraitSrc,
    portraitAlt = "Akansha Mishra portrait",
  } = content;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink lg:border-solid lg:border-ink/10",
        className
      )}
    >
      {/* =====================================================================
          MOBILE VIEW (< 1024px) — EXACT WIREFRAME STRUCTURE
      ===================================================================== */}
      <div className="mx-auto w-full max-w-md px-5 py-10 lg:hidden">
        {/* Top subtle bar */}
        <div
          aria-hidden="true"
          className="mb-8 h-9 w-full rounded-md bg-ink/10"
        />

        {/* Greeting */}
        <h2
          id="about-heading"
          className="font-serif text-[2rem] font-bold leading-[1.12] tracking-tight text-ink"
        >
          {greeting}
        </h2>

        {/* 2 to 3 short paragraphs */}
        <div className="mt-5 space-y-4 font-sans text-[15px] leading-[1.55] text-ink/75">
          {paragraphs.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>

        {/* Stat tiles (2-col grid matching reference: 2 on row 1, 1 on row 2) */}
        <div className="mt-7 grid grid-cols-2 gap-3.5">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="rounded-xl border border-ink/15 bg-paper/70 px-4 py-3.5"
            >
              <p className="font-sans text-lg font-bold leading-tight text-ink">
                {metric.value}
              </p>
              <p className="mt-1 font-sans text-xs leading-snug text-ink/60">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Reel thumbnail placeholders */}
        <div className="mt-7 grid grid-cols-3 gap-3">
          {reels.slice(0, 3).map((reel, idx) => (
            <div
              key={reel.id || idx}
              className="flex aspect-[9/14] items-center justify-center rounded-xl border border-ink/15 bg-ink/10 p-2 text-center"
            >
              {reel.src ? (
                <img
                  src={reel.src}
                  alt={reel.alt || `Reel ${idx + 1}`}
                  className="h-full w-full rounded-[11px] object-cover"
                />
              ) : (
                <span className="font-sans text-xs leading-tight text-ink/65">
                  {reel.label || "Reel thumbnail"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================================
          DESKTOP VIEW (>= 1024px) — AWWWARDS EDITORIAL MINIMALISM
      ===================================================================== */}
      <div className="mx-auto hidden w-full max-w-380 px-16 py-32 xl:px-24 lg:block">
        {/* Eyebrow Kicker */}
        <Reveal y={14}>
          <div className="mb-14 flex items-center justify-between border-b border-ink/12 pb-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-umber" />
              <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-umber">
                {roleTag}
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
              {eyebrowIndex}
            </span>
          </div>
        </Reveal>

        {/* Main Asymmetric 12-Column Editorial Split */}
        <div className="grid grid-cols-12 items-start gap-16 xl:gap-24">
          {/* Left Sticky Column: Portrait Frame + Quick Index */}
          <aside className="col-span-5">
            <div className="sticky top-28 space-y-8">
              <Reveal y={18}>
                <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink/12 bg-paper">
                  {portraitSrc ? (
                    <img
                      src={portraitSrc}
                      alt={portraitAlt}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col justify-between p-8">
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
                        <span>Editorial Portrait</span>
                        <span>4:5</span>
                      </div>
                      <div className="space-y-2">
                        <p className="font-serif text-3xl font-normal tracking-tight text-ink/80">
                          {portraitCaption?.name ?? "Akansha Mishra"}
                        </p>
                        <p className="font-sans text-sm text-ink/55">
                          {portraitCaption?.subtitle ??
                            "Travel, hotel collaborations & brand storytelling"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>

              <Reveal y={16} delay={0.1}>
                <div className="flex items-center justify-between border-t border-ink/12 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                  <span>
                    {portraitCaption?.methodLabel ?? "Direct Pitching Method"}
                  </span>
                  <span className="text-umber">
                    {portraitCaption?.badge ?? "Verified Creator"}
                  </span>
                </div>
              </Reveal>
            </div>
          </aside>

          {/* Right Column: Narrative, Architectural Metrics & Reel Showcase */}
          <div className="col-span-7">
            <Reveal y={20}>
              <h2
                id="about-heading-desktop"
                className="font-serif text-[clamp(3.25rem,4.6vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.03em] text-ink"
              >
                {greeting}
              </h2>
            </Reveal>

            {/* Story Paragraphs */}
            <Reveal y={20} delay={0.08}>
              <div className="mt-10 max-w-2xl space-y-6 font-sans text-lg leading-[1.7] text-ink/75">
                {paragraphs.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </Reveal>

            {/* Hairline Architectural Metric Strip */}
            <Reveal y={20} delay={0.14}>
              <dl className="mt-14 grid grid-cols-3 divide-x divide-ink/12 border-y border-ink/12 py-8">
                {metrics.map((metric, idx) => (
                  <div
                    key={metric.id}
                    className={cn(
                      idx === 0
                        ? "pr-8"
                        : idx === metrics.length - 1
                        ? "pl-8"
                        : "px-8"
                    )}
                  >
                    <dt className="order-2 mt-2 font-sans text-xs leading-relaxed text-ink/60">
                      {metric.label}
                    </dt>
                    <dd className="order-1 font-serif text-4xl font-normal tracking-tight text-ink xl:text-5xl">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Featured Reels Strip */}
            <Reveal y={20} delay={0.2}>
              <div className="mt-14">
                <div className="mb-6 flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">
                    {reelsHeading}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-umber">
                    0{Math.min(reels.length, 3)} Highlights
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {reels.slice(0, 3).map((reel, idx) => (
                    <div
                      key={reel.id || idx}
                      className="group relative aspect-[9/15] overflow-hidden rounded-2xl border border-ink/12 bg-paper transition-all duration-500 hover:-translate-y-1 hover:border-ink/30"
                    >
                      {reel.src ? (
                        <img
                          src={reel.src}
                          alt={reel.alt || `Reel ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col justify-between p-5">
                          <span className="font-mono text-[11px] tracking-widest text-ink/40">
                            0{idx + 1}
                          </span>
                          <span className="text-center font-sans text-xs font-medium text-ink/65">
                            {reel.label || "Reel thumbnail"}
                          </span>
                          <span className="h-px w-full bg-ink/10" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}