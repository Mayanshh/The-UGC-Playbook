"use client";

import { useEffect, useState, type RefObject } from "react";
import { cn } from "@/lib/cn";

interface FloatingCtaProps {
  label?: string;
  sublabel?: string;
  href?: string;
  /** CSS selector for the hero element to watch (defaults to "#hero") */
  heroSelector?: string;
  /** Optional ref to the hero element instead of a selector */
  heroRef?: RefObject<HTMLElement | null>;
  className?: string;
}

export function FloatingCta({
  label = "Get The UGC Playbook",
  sublabel = "₹6,000 · Lifetime Access",
  href = "#offer",
  heroSelector = "#hero",
  heroRef,
  className,
}: FloatingCtaProps) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const target = heroRef?.current ?? document.querySelector<HTMLElement>(heroSelector);

    if (!target) {
      const onScroll = () => {
        setPastHero(window.scrollY > window.innerHeight * 0.75);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show only after the hero has been scrolled past (above the viewport)
        const scrolledPast =
          !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setPastHero(scrolledPast);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [heroRef, heroSelector]);

  return (
    <div
      aria-hidden={!pastHero}
      className={cn(
        "fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-all duration-300 ease-out md:bottom-7",
        pastHero
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className
      )}
    >
      <a
        href={href}
        tabIndex={pastHero ? 0 : -1}
        className="group flex items-center gap-4 rounded-full border border-ink/20 bg-transparent backdrop-blur-md px-8 py-5 text-ink shadow-[0_18px_40px_-14px_rgba(20,12,8,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-umber"
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-umber transition-transform duration-300 group-hover:scale-125"
        />
        <span className="font-sans text-sm font-medium tracking-tight">
          {label}
        </span>
        {sublabel && (
          <span className="hidden border-l border-coco/15 pl-4 font-mono bg-ink text-[11px] px-2 py-2 rounded-full uppercase tracking-[0.18em] text-coco/70 sm:inline">
            {sublabel}
          </span>
        )}
        <span
          aria-hidden="true"
          className="font-mono text-xs text-coco/80 transition-transform rounded-full px-3 py-2 bg-ink duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  );
}