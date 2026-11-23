"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import LockedYouTubePlayer, {
  type VideoOrientation,
} from "@/components/ui/LockedYouTubePlayer";
import {
  ABOUT_CONTENT,
  type AboutImage,
  type AboutMobileContent,
} from "@/data/builtFor";

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  eyebrow?: string;
  /** One string per line. Each line is revealed from behind a mask. */
  title?: string[];
  subtitle?: string;
  body?: string;
  cta?: { label: string; href: string };
  imageLarge?: AboutImage;
  imageSmall?: AboutImage;
  mobile?: AboutMobileContent;
  /** Optional desktop YouTube URL/ID override; defaults to ABOUT_CONTENT.founderVideo.videoSrc */
  desktopVideoUrl?: string;
  /** Video orientation ("vertical" = 9:16, "horizontal" = 16:9). Defaults to "vertical". */
  videoOrientation?: VideoOrientation;
  className?: string;
}

export default function AboutSection({
  eyebrow = ABOUT_CONTENT.eyebrow,
  title = ABOUT_CONTENT.title,
  subtitle = ABOUT_CONTENT.subtitle,
  body = ABOUT_CONTENT.body,
  cta = ABOUT_CONTENT.cta,
  imageLarge = ABOUT_CONTENT.imageLarge,
  imageSmall = ABOUT_CONTENT.imageSmall,
  mobile = ABOUT_CONTENT.mobile,
  desktopVideoUrl = ABOUT_CONTENT.founderVideo.videoSrc,
  videoOrientation = "vertical",
  className,
}: AboutSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const resolvedVideoSrc = desktopVideoUrl ?? mobile.founderVideo.videoSrc;
  const isVertical = videoOrientation === "vertical";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(rootRef);
        const lines = q("[data-line]");
        const frames = q("[data-frame]");
        const fades = q("[data-fade]");
        const media = q("[data-media]");

        gsap.set(frames, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(lines, { yPercent: 110 });
        gsap.set(fades, { opacity: 0 });
        if (media[0]) gsap.set(media[0], { scale: 1.04 });
        if (media[1]) gsap.set(media[1], { scale: 1.2 });

        gsap
          .timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 65%",
              once: true,
            },
          })
          .to(frames[0], { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6 })
          .to(media[0], { scale: 1, duration: 1.6 }, "<")
          .to(lines, { yPercent: 0, duration: 1.3, stagger: 0.12 }, "-=1.2")
          .to(fades[0], { opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.9")
          .to(frames[1], { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6 }, "-=1.1")
          .to(media[1], { scale: 1.12, duration: 2 }, "<")
          .to(
            fades.slice(1),
            { opacity: 1, duration: 1.2, stagger: 0.15, ease: "power2.out" },
            "-=1"
          );

        // Apply scroll parallax only to the secondary image frame so the video container stays exact
        if (media[1]) {
          gsap.fromTo(
            media[1],
            { yPercent: -9 },
            {
              yPercent: 9,
              ease: "none",
              scrollTrigger: {
                trigger: media[1].closest("[data-frame]"),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
    id="built-for"
      ref={rootRef}
      aria-labelledby="about-title"
      className={cn("w-full bg-coco text-ink", className)}
    >
      {/* =========================================================
          MOBILE LAYOUT (< md) — Locked YouTube Founder Video
         ========================================================= */}
      <div className="px-5 py-12 md:hidden">
        <div className="space-y-4">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-umber">
            {mobile.eyebrow}
          </p>

          <h2 className="font-serif text-[2.15rem] font-bold leading-[1.08] tracking-tight text-ink">
            {mobile.headline}
          </h2>

          <p className="font-sans text-[0.95rem] leading-relaxed text-umber">
            {mobile.subcopy}
          </p>
        </div>

        {/* Founder Video Card — Exact aspect match, zero blank space */}
        <div className="mt-6">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-2xl border border-ink/15 bg-black shadow-2xs",
              isVertical ? "aspect-9/16" : "aspect-video"
            )}
          >
            {mobile.founderVideo.videoSrc ? (
              <LockedYouTubePlayer
                videoUrlOrId={mobile.founderVideo.videoSrc}
                orientation={videoOrientation}
                posterSrc={mobile.founderVideo.posterSrc}
                posterAlt={mobile.founderVideo.posterAlt}
                label={mobile.founderVideo.label}
              />
            ) : (
              <Image
                src={mobile.founderVideo.posterSrc}
                alt={mobile.founderVideo.posterAlt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>

        {/* Stacked Proof Cards */}
        <div className="mt-4 space-y-3">
          {mobile.proofCards.map((card) => (
            <div
              key={card.id}
              className="rounded-xl border border-ink/15 bg-paper px-5 py-4"
            >
              <p className="font-sans text-xl font-bold leading-none text-ink">
                {card.metric}
              </p>
              <p className="mt-0.5 font-sans text-sm leading-relaxed text-umber">
                {card.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile CTA Pill */}
        <div className="mt-6">
          <Button variant="solid-ink" href="#playbook">
            {mobile?.cta.label ?? "Join Now"}
          </Button>
        </div>
      </div>

      {/* =========================================================
          DESKTOP / TABLET LAYOUT (md+) — Locked YouTube Video Showcase
         ========================================================= */}
      <div className="hidden md:block">
        <div className="flex w-full items-start justify-start px-12 py-12">
          {eyebrow && (
            <p
              data-fade
              className="mb-6 flex items-center gap-3 font-sans text-[4rem] font-medium uppercase tracking-[0.12em] text-umber md:mb-8"
            >
              <span>{eyebrow}</span>
            </p>
          )}
        </div>
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-8 gap-y-16 px-6 py-28 pb-8 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-y-28 md:px-12 md:py-2 lg:gap-x-12">
          {/* Section label + Title + subtitle */}
          <div className="md:col-span-6 md:col-start-7 md:row-start-1">
            <h2
              id="about-title"
              className="font-sans text-[clamp(2.5rem,6.2vw,6rem)] font-light leading-[1.02] tracking-[-0.035em]"
            >
              {title.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span data-line className="block will-change-transform">
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <p
              data-fade
              className="mt-8 max-w-md font-sans text-lg font-normal leading-snug md:mt-12 md:text-xl"
            >
              {subtitle}
            </p>
          </div>

          {/* Desktop Video Container — Exact 9:16 match to video, zero blank space */}
          <figure
            data-frame
            className={cn(
              "relative w-full overflow-hidden rounded-2xl bg-black md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1",
              isVertical ? "aspect-9/16 max-w-[26rem]" : "aspect-video"
            )}
          >
            <div data-media className="h-full w-full will-change-transform">
              {resolvedVideoSrc ? (
                <LockedYouTubePlayer
                  videoUrlOrId={resolvedVideoSrc}
                  orientation={videoOrientation}
                  posterSrc={imageLarge.src}
                  posterAlt={imageLarge.alt}
                  label={mobile.founderVideo.label}
                />
              ) : (
                <Image
                  src={imageLarge.src}
                  alt={imageLarge.alt}
                  fill
                  sizes="(min-width: 768px) 36vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
          </figure>

          {/* Small image + paragraph + CTA */}
          <div className="grid grid-cols-1 items-end gap-12 sm:grid-cols-2 sm:gap-8 md:col-span-6 md:col-start-7 md:row-start-2 lg:gap-12">
            <figure
              data-frame
              className="relative aspect-[4/5] w-full max-w-[22rem] overflow-hidden bg-ink/5"
            >
              <div data-media className="absolute inset-0 will-change-transform">
                <Image
                  src={imageSmall.src}
                  alt={imageSmall.alt}
                  fill
                  sizes="(min-width: 768px) 20vw, 80vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <div className="flex flex-col items-start gap-10 sm:pb-1">
              <p
                data-fade
                className="max-w-[34ch] font-sans text-[0.95rem] leading-[1.75] text-ink/70 md:text-base"
              >
                {body}
              </p>

              <Link
                data-fade
                href={cta.href}
                className="group inline-flex items-center gap-4 font-sans text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ink md:text-base"
              >
                <span>{cta.label}</span>
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-current transition-[width] duration-500 ease-out group-hover:w-20"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}