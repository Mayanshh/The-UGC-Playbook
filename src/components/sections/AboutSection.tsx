"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT, type AboutContent, type AboutReel } from "@/data/about";
import { cn } from "@/lib/cn";

interface AboutSectionProps {
  content?: AboutContent;
  className?: string;
}

function ReelVideoTile({
  reel,
  index,
  variant,
}: {
  reel: AboutReel;
  index: number;
  variant: "mobile" | "desktop";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const safePlay = () => {
    const el = videoRef.current;
    if (!el || !reel.src || videoFailed) return;
    el.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
      });
  };

  const safePause = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el || !reel.src || videoFailed) return;
    if (el.paused) {
      safePlay();
    } else {
      safePause();
    }
  };

  const hasVideo = Boolean(reel.src && !videoFailed);

  if (variant === "mobile") {
    return (
      <div
        onClick={hasVideo ? togglePlay : undefined}
        role={hasVideo ? "button" : undefined}
        tabIndex={hasVideo ? 0 : undefined}
        onKeyDown={
          hasVideo
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePlay();
                }
              }
            : undefined
        }
        aria-label={
          hasVideo
            ? `Play or pause ${reel.alt || `Reel ${index + 1}`}`
            : undefined
        }
        className={cn(
          "relative flex aspect-9/14 items-center justify-center overflow-hidden rounded-xl border border-ink/15 bg-ink/10 p-2 text-center",
          hasVideo && "cursor-pointer"
        )}
      >
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              src={reel.src}
              poster={reel.poster}
              playsInline
              muted
              loop
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => {
                setVideoFailed(true);
                setIsPlaying(false);
              }}
              className="h-full w-full rounded-[11px] object-cover"
            />
            {!isPlaying && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute flex h-8 w-8 items-center justify-center rounded-full bg-paper/85 text-[10px] font-medium text-ink shadow-xs"
              >
                ▶
              </span>
            )}
          </>
        ) : reel.poster ? (
          <img
            src={reel.poster}
            alt={reel.alt || reel.label || `Reel ${index + 1}`}
            className="h-full w-full rounded-[11px] object-cover"
          />
        ) : (
          <span className="font-sans text-xs leading-tight text-ink/65">
            {reel.label || "Reel thumbnail"}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={hasVideo ? togglePlay : undefined}
      role={hasVideo ? "button" : undefined}
      tabIndex={hasVideo ? 0 : undefined}
      onKeyDown={
        hasVideo
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePlay();
              }
            }
          : undefined
      }
      onMouseEnter={hasVideo ? safePlay : undefined}
      onMouseLeave={hasVideo ? safePause : undefined}
      aria-label={
        hasVideo
          ? `Play or pause ${reel.alt || `Reel ${index + 1}`}`
          : undefined
      }
      className={cn(
        "group relative aspect-9/14 w-full overflow-hidden rounded-2xl border border-ink/12 bg-paper transition-all duration-500 hover:border-ink/30",
        hasVideo && "cursor-pointer"
      )}
    >
      {hasVideo ? (
        <>
          <video
            ref={videoRef}
            src={reel.src}
            poster={reel.poster}
            playsInline
            muted
            loop
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              setVideoFailed(true);
              setIsPlaying(false);
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-ink/75 via-ink/25 to-transparent p-4 text-paper">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              {isPlaying ? "Playing" : reel.label || "Hover or Click"}
            </span>
            {reel.views && (
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">
                {reel.views}
              </span>
            )}
          </div>
        </>
      ) : reel.poster ? (
        <>
          <img
            src={reel.poster}
            alt={reel.alt || reel.label || `Reel ${index + 1}`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-ink/75 via-ink/25 to-transparent p-4 text-paper">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              {reel.label || "Reel Preview"}
            </span>
            {reel.views && (
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">
                {reel.views}
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col justify-between p-6">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-ink/40">
            <span>0{index + 1}</span>
            {reel.views && <span>{reel.views}</span>}
          </div>
          <span className="text-center font-sans text-xs font-medium text-ink/65">
            {reel.label || "Reel thumbnail"}
          </span>
          <span className="h-px w-full bg-ink/10" />
        </div>
      )}
    </div>
  );
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
    reelsHeading = "Selected Reels & UGC Examples",
    reels,
    portraitSrc,
    portraitAlt = "Akansha Mishra portrait",
  } = content;

  return (
    <section
      id="about"
      aria-labelledby="about-heading-mobile"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink lg:border-solid lg:border-ink/10",
        className
      )}
    >
      {/* =====================================================================
          MOBILE VIEW (< 1024px) — EXACT WIREFRAME STRUCTURE
      ===================================================================== */}
      <div className="mx-auto w-full max-w-md px-5 py-10 lg:hidden">
        {/* Greeting */}
        <h2
          id="about-heading-mobile"
          className="font-serif text-[2rem] font-bold leading-[1.12] tracking-tight text-ink"
        >
          {greeting}
        </h2>

        {/* Short paragraphs */}
        <div className="mt-5 space-y-4 font-sans text-[15px] leading-[1.55] text-ink/75">
          {paragraphs.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>

        {/* Stat tiles */}
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

        {/* 3 Reel videos / thumbnails */}
        <div className="mt-7 grid grid-cols-3 gap-3">
          {reels.slice(0, 3).map((reel, idx) => (
            <ReelVideoTile
              key={reel.id || idx}
              reel={reel}
              index={idx}
              variant="mobile"
            />
          ))}
        </div>
      </div>

      {/* =====================================================================
          DESKTOP VIEW (>= 1024px) — BALANCED EDITORIAL GRID (NO DEAD SPACE)
      ===================================================================== */}
      <div className="mx-auto hidden w-full max-w-380 px-16 py-28 xl:px-24 lg:block">
        {/* Eyebrow Kicker */}
        <Reveal y={14}>
          <div className="mb-12 flex items-center justify-between border-b border-ink/12 pb-6">
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

        {/* Top Row: Balanced 12-Column Editorial Split (Portrait Left, Story + Metrics Right) */}
        <div className="grid grid-cols-12 items-stretch gap-14 xl:gap-20">
          {/* Left Column (5 cols): Portrait Frame */}
          <div className="col-span-5 flex flex-col justify-between">
            <Reveal y={18} className="h-full">
              <div className="group relative flex h-full min-h-115 w-full flex-col justify-between overflow-hidden rounded-2xl border border-ink/12 bg-paper">
                {portraitSrc ? (
                  <>
                    <img
                      src={portraitSrc}
                      alt={portraitAlt}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 via-ink/35 to-transparent p-7 text-paper">
                      <p className="font-serif text-2xl font-normal tracking-tight">
                        {portraitCaption?.name ?? "Akansha Mishra"}
                      </p>
                      <p className="mt-1 font-sans text-xs text-paper/80">
                        {portraitCaption?.subtitle ??
                          "Started in Uttar Pradesh with an Android phone"}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col justify-between p-8">
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
                      <span>Editorial Portrait</span>
                      <span>Index</span>
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
                    <div className="flex items-center justify-between border-t border-ink/12 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                      <span>
                        {portraitCaption?.methodLabel ?? "Direct Pitching Method"}
                      </span>
                      <span className="text-umber">
                        {portraitCaption?.badge ?? "Verified Creator"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column (7 cols): Greeting, Narrative & Inline Metrics */}
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <Reveal y={20}>
                <h2
                  id="about-heading-desktop"
                  className="font-serif text-[clamp(3.25rem,4.5vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.03em] text-ink"
                >
                  {greeting}
                </h2>
              </Reveal>

              <Reveal y={20} delay={0.08}>
                <div className="mt-8 max-w-2xl space-y-5 font-sans text-[17px] leading-[1.68] text-ink/75">
                  {paragraphs.map((text, idx) => (
                    <p key={idx}>{text}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Metrics aligned cleanly at the base of the top split */}
            <Reveal y={20} delay={0.14}>
              <dl className="mt-10 grid grid-cols-3 divide-x divide-ink/12 border-t border-ink/12 pt-7">
                {metrics.map((metric, idx) => (
                  <div
                    key={metric.id}
                    className={cn(
                      idx === 0
                        ? "pr-7"
                        : idx === metrics.length - 1
                        ? "pl-7"
                        : "px-7"
                    )}
                  >
                    <dt className="order-2 mt-1.5 font-sans text-xs leading-relaxed text-ink/60">
                      {metric.label}
                    </dt>
                    <dd className="order-1 font-serif text-4xl font-normal tracking-tight text-ink xl:text-5xl">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Bottom Row: Full-Width Reels Strip (Eliminates Left-Side Void) */}
        <Reveal y={20} delay={0.18}>
          <div className="mt-20 border-t border-ink/12 pt-12">
            <div className="mb-8 flex items-baseline justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">
                {reelsHeading}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-umber">
                0{Math.min(reels.length, 3)} Reels
              </span>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {reels.slice(0, 3).map((reel, idx) => (
                <ReelVideoTile
                  key={reel.id || idx}
                  reel={reel}
                  index={idx}
                  variant="desktop"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}