"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { HeroOfferTicker } from "@/types";
import { cn } from "@/lib/cn";

interface OfferTickerProps {
  offer: HeroOfferTicker;
  className?: string;
}

export function OfferTicker({ offer, className }: OfferTickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.to(track, {
        xPercent: -50,
        duration: 18,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={cn("w-full", className)}>
      <Link
        href={offer.href}
        className="group flex items-center justify-between gap-2 rounded-full border border-(--bg-ink)/15 bg-(--bg-ink)/95 p-1.5 pl-3.5 text-(--bg-coco) shadow-sm backdrop-blur-md transition-transform duration-300 active:scale-[0.98]"
      >
        {/* Pulsing Oxblood Live Indicator */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--accent-oxblood) opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-(--accent-oxblood)" />
        </span>

        {/* Smooth Seamless Marquee Stream */}
        <div className="relative flex-1 overflow-hidden mask-fade-edges">
          <div
            ref={trackRef}
            className="flex w-max items-center will-change-transform"
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-3 pr-3 font-sans text-xs tracking-wide"
              >
                <span className="font-medium text-(--bg-coco)">
                  {offer.text}
                </span>

                {offer.badge && (
                  <span className="rounded-full border border-(--bg-coco)/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-(--bg-coco)/90">
                    {offer.badge}
                  </span>
                )}

                {(offer.originalPrice || offer.salePrice) && (
                  <span className="flex items-center gap-1.5 tabular-nums">
                    {offer.originalPrice && (
                      <span className="text-(--bg-ash) line-through">
                        {offer.originalPrice}
                      </span>
                    )}
                    {offer.salePrice && (
                      <span className="font-semibold text-(--bg-coco)">
                        → {offer.salePrice}
                      </span>
                    )}
                  </span>
                )}

                <span aria-hidden="true" className="text-(--bg-taupe)">
                  ·
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Tappable Action Pill */}
        <span className="shrink-0 rounded-full bg-(--bg-coco) px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-(--bg-ink) transition-colors group-hover:bg-(--bg-paper)">
          {offer.ctaLabel}
        </span>
      </Link>
    </div>
  );
}