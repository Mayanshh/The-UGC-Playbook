"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MOTION } from "@/motion/presets";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  triggerOnScroll?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  triggerOnScroll = true,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.base,
          delay,
          ease: MOTION.ease.outExpo,
          clearProps: "transform",
          ...(triggerOnScroll && {
            scrollTrigger: {
              trigger: el,
              start: MOTION.scroll.start,
              once: MOTION.scroll.once,
            },
          }),
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}