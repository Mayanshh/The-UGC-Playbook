"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { ChatProof } from "@/data/StudentResults";
import { cn } from "@/lib/cn";

interface ChatProofMarqueeProps {
  proofs: ChatProof[];
  onOpen: (proofId: string) => void;
  /** Freeze the row (e.g. while the lightbox is open) */
  paused?: boolean;
  /** Seconds each chat spends crossing the loop. Higher = slower. */
  secondsPerItem?: number;
  className?: string;
}

// Three copies guarantee the row always covers wide screens, however few chats there are.
const COPIES = 3;

const MASK =
  "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)";

export function ChatProofMarquee({
  proofs,
  onOpen,
  paused = false,
  secondsPerItem = 9,
  className,
}: ChatProofMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const flags = useRef({ paused, visible: true });

  const sync = () => {
    tweenRef.current?.paused(flags.current.paused || !flags.current.visible);
  };

  // Apply the latest `paused` prop
  useEffect(() => {
    flags.current.paused = paused;
    sync();
  }, [paused]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track || proofs.length === 0) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tween = gsap.to(track, {
        xPercent: -100 / COPIES,
        duration: proofs.length * secondsPerItem,
        ease: "none",
        repeat: -1,
      });
      tweenRef.current = tween;

      // No frames spent while off-screen
      const io = new IntersectionObserver(
        ([entry]) => {
          flags.current.visible = entry.isIntersecting;
          sync();
        },
        { rootMargin: "120px" }
      );
      io.observe(root);

      sync();

      return () => {
        io.disconnect();
        tween.kill();
        tweenRef.current = null;
      };
    },
    { scope: rootRef, dependencies: [proofs.length, secondsPerItem] }
  );

  const slow = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.8, ease: "power3.out", overwrite: "auto" });
  };
  const resume = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 1, duration: 1, ease: "power2.inOut", overwrite: "auto" });
  };

  return (
    <div
      ref={rootRef}
      onPointerEnter={slow}
      onPointerLeave={resume}
      className={cn(
        "relative overflow-hidden motion-reduce:overflow-x-auto",
        className
      )}
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul
            key={copy}
            aria-hidden={copy > 0}
            className={cn(
              "flex shrink-0 items-center gap-4 pr-4 md:gap-6 md:pr-6",
              copy > 0 && "motion-reduce:hidden"
            )}
          >
            {proofs.map((proof) => (
              <li key={`${copy}-${proof.id}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpen(proof.id)}
                  tabIndex={copy > 0 ? -1 : 0}
                  aria-label={`Open ${proof.student}'s chat`}
                  className="group relative block h-(--h) overflow-hidden rounded-2xl border border-ink/10 bg-white/60 outline-none transition-transform duration-500 ease-out [--h:20rem] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:[--h:27rem]"
                  style={{ width: `calc(var(--h) * ${(proof.width / proof.height).toFixed(4)})` }}
                >
                  <Image
                    src={proof.src}
                    alt={copy === 0 ? proof.alt : ""}
                    fill
                    sizes="(min-width: 768px) 360px, 280px"
                    draggable={false}
                    className="select-none object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
