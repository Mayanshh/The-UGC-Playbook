"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAVBAR_CONFIG, type NavbarConfig } from "@/data/navigation";
import { useNavbarScroll } from "@/motion/useNavbarScroll";
import { cn } from "@/lib/cn";

interface NavbarProps {
  config?: NavbarConfig;
  variant?: "dark" | "paper";
  className?: string;
}

export function Navbar({
  config = NAVBAR_CONFIG,
  variant = "dark",
  className,
}: NavbarProps) {
  const headerRef = useRef<HTMLElement>(null);
  const { isScrolled, isHidden } = useNavbarScroll({
    threshold: 32,
    hideOffset: 160,
  });

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", delay: 0.1 }
      );
    },
    { scope: headerRef }
  );

  const isDark = variant === "dark";

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:block",
        isHidden ? "-translate-y-full" : "translate-y-0",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isScrolled
            ? "mt-3 max-w-[1320px] rounded-full border px-5 py-3 shadow-lg backdrop-blur-md md:px-7"
            : "max-w-[1440px] border-b border-transparent px-6 py-6 md:px-12",
          isScrolled &&
            (isDark
              ? "border-white/10 bg-[#0a0a0a]/80 text-coco"
              : "border-ink/10 bg-coco/85 text-ink"),
          !isScrolled && (isDark ? "text-coco" : "text-ink")
        )}
      >
        {/* Left: Editorial Wordmark */}
        <Link
          href={config.brand.href}
          className="group relative z-50 flex items-center gap-2.5"
        >
          <span className="font-serif text-lg tracking-tight md:text-2xl">
            {config.brand.name}
          </span>
        </Link>

        {/* Center: Minimal Desktop Links */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-9"
        >
          {config.links.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative py-1 font-sans text-[0.9rem] font-medium uppercase tracking-[0.16em] opacity-80 transition-opacity duration-300 hover:opacity-100"
            >
              <span>{item.label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100",
                  isDark ? "bg-coco" : "bg-ink"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Right: Desktop CTA */}
        <div className="flex items-center gap-5">
          <Link
            href={config.cta.href}
            className={cn(
              "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300",
              isDark
                ? "bg-coco text-ink hover:bg-paper"
                : "bg-ink text-coco hover:bg-umber"
            )}
          >
            <span>{config.cta.label}</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}