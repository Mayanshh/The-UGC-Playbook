"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import type { NavbarConfig } from "@/data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  config: NavbarConfig;
}

export function MobileMenu({ isOpen, onClose, config }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Pause/resume Lenis smooth scroll & body scroll
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const links = overlay.querySelectorAll("[data-mobile-link]");
      const meta = overlay.querySelectorAll("[data-mobile-meta]");

      const tl = gsap.timeline({ paused: true });

      tl.set(overlay, { pointerEvents: "auto" })
        .fromTo(
          overlay,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.75,
            ease: "expo.inOut",
          }
        )
        .fromTo(
          links,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "expo.out",
          },
          "-=0.35"
        )
        .fromTo(
          meta,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.45"
        );

      tlRef.current = tl;
    },
    { scope: overlayRef }
  );

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (isOpen) {
      tl.play();
    } else {
      tl.reverse().eventCallback("onReverseComplete", () => {
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
        }
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      aria-hidden={!isOpen}
      style={{ clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" }}
      className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-coco md:hidden"
    >
      {/* Subtle editorial grid hairlines */}
      <div className="pointer-events-none absolute inset-x-6 top-24 h-px bg-coco/10" />

      <nav aria-label="Mobile navigation" className="my-auto flex flex-col gap-5">
        {config.links.map((item) => (
          <div key={item.id} className="overflow-hidden py-1">
            <Link
              href={item.href}
              onClick={onClose}
              data-mobile-link
              className="group flex items-baseline gap-4 font-serif text-4xl tracking-tight text-coco transition-colors hover:text-ash sm:text-5xl"
            >
              <span className="font-sans text-xs tracking-widest text-taupe">
                {item.index}
              </span>
              <span>{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>

      <div className="space-y-6 border-t border-coco/10 pt-6">
        <div data-mobile-meta>
          <Link
            href={config.cta.href}
            onClick={onClose}
            className="flex w-full items-center justify-between rounded-full bg-coco px-6 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-ink transition-transform active:scale-[0.98]"
          >
            <span>{config.cta.label}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {config.status && (
          <div
            data-mobile-meta
            className="flex items-center justify-between font-sans text-xs text-taupe"
          >
            <span className="flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  config.status.active ? "bg-oxblood" : "bg-stone"
                }`}
              />
              {config.status.text}
            </span>
            <span>© {year ?? ""}</span>
          </div>
        )}
      </div>
    </div>
  );
}