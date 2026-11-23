"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PARTNER_BRANDS, type BrandLogoItem } from "@/data/brands";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

interface BrandMarqueeProps {
  label?: string;
  brands?: BrandLogoItem[];
  /** Unified size classes applied to every logo at once */
  logoClassName?: string;
  /** Unified slot width classes per item (defaults to ~8 items across desktop) */
  slotClassName?: string;
  /** Base speed in pixels per second */
  speed?: number;
  /** Move left-to-right instead of right-to-left */
  reverse?: boolean;
  /** Ease down to a crawl while the pointer is over the logos */
  pauseOnHover?: boolean;
  /** Scroll speed boosts the marquee, scroll direction steers it, fast scroll adds a slight skew */
  scrollReactive?: boolean;
  /** Logos rest as quiet monochrome and reveal their real colours on hover */
  monochrome?: boolean;
  className?: string;
}

const MASK =
  "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)";

function BrandMark({
  brand,
  logoClassName,
  monochrome,
}: {
  brand: BrandLogoItem;
  logoClassName?: string;
  monochrome: boolean;
}) {
  const [failed, setFailed] = useState(!brand.logo);

  if (failed) {
    return (
      <span className="truncate whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink/70 md:text-sm">
        {brand.name}
      </span>
    );
  }

  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={brand.width}
      height={brand.height}
      draggable={false}
      onError={() => setFailed(true)}
      className={cn(
        "h-7 w-auto max-w-full select-none object-contain transition-[filter,opacity] duration-500 md:h-9",
        monochrome &&
          "opacity-55 brightness-0 group-hover/item:opacity-100 group-hover/item:brightness-100",
        logoClassName
      )}
    />
  );
}

export function BrandMarquee({
  label = "Also worked with",
  brands = PARTNER_BRANDS,
  logoClassName,
  slotClassName,
  speed = 50,
  reverse = false,
  pauseOnHover = true,
  scrollReactive = true,
  monochrome = true,
  className,
}: BrandMarqueeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const passRef = useRef<HTMLDivElement>(null);

  // Live motion values: tweened by GSAP, read every frame by the ticker.
  const motion = useRef({ hover: 1, dir: 1, boost: 0, skew: 0 });

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const pass = passRef.current;
      if (!section || !track || !pass) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const m = motion.current;
      const base = reverse ? 1 : -1;
      let x = 0;
      let loop = pass.offsetWidth;
      let visible = true;

      // One pass = one seamless loop. Re-measure when logos load or the viewport changes.
      const ro = new ResizeObserver(() => {
        loop = pass.offsetWidth;
      });
      ro.observe(pass);

      // Don't spend frames while off-screen
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { rootMargin: "100px" }
      );
      io.observe(section);

      const tick = (_time: number, deltaMs: number) => {
        if (!visible || loop <= 0) return;
        const dt = Math.min(deltaMs, 64) / 1000;
        x = gsap.utils.wrap(
          -loop,
          0,
          x + base * m.dir * speed * m.hover * (1 + m.boost) * dt
        );
        track.style.transform = `translate3d(${x}px,0,0) skewX(${m.skew}deg)`;
      };
      gsap.ticker.add(tick);

      const cleanups: Array<() => void> = [];

      if (scrollReactive) {
        let lastDir = 1;

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity(); // px/s, + when scrolling down
            const abs = Math.abs(v);

            gsap.to(m, {
              boost: Math.min(abs / 1600, 2),
              skew: gsap.utils.clamp(-4, 4, -v / 450),
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });

            // Scrolling up eases the marquee through zero and back the other way
            if (abs > 60 && self.direction !== lastDir) {
              lastDir = self.direction;
              gsap.to(m, {
                dir: lastDir === 1 ? 1 : -1,
                duration: 0.9,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }
          },
        });

        const settle = () =>
          gsap.to(m, {
            boost: 0,
            skew: 0,
            duration: 1.1,
            ease: "power3.out",
            overwrite: "auto",
          });
        ScrollTrigger.addEventListener("scrollEnd", settle);

        cleanups.push(() => {
          st.kill();
          ScrollTrigger.removeEventListener("scrollEnd", settle);
        });
      }

      return () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        io.disconnect();
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: sectionRef, dependencies: [speed, reverse, scrollReactive] }
  );

  const handleEnter = () => {
    if (!pauseOnHover) return;
    gsap.to(motion.current, {
      hover: 0.12,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    gsap.to(motion.current, {
      hover: 1,
      duration: 1,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-label={label}
      className={cn(
        "w-full overflow-hidden border-y border-ink/10 bg-coco py-10 md:py-16",
        className
      )}
    >
      {/* Label + hairline */}
      <div className="mx-auto mb-6 flex max-w-[1440px] items-center gap-6 px-5 md:mb-10 md:px-12">
        <p className="shrink-0 font-sans text-sm text-ink/70 md:text-base">
          {label}
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
      </div>

      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden motion-reduce:overflow-x-auto"
        style={{ maskImage: MASK, WebkitMaskImage: MASK }}
      >
        <div
          ref={trackRef}
          className="group/track flex w-max items-center will-change-transform"
        >
          {[0, 1].map((pass) => (
            <div
              key={pass}
              ref={pass === 0 ? passRef : undefined}
              aria-hidden={pass === 1}
              className={cn(
                "flex shrink-0 items-center gap-4 pr-4 md:gap-5 md:pr-5",
                pass === 1 && "motion-reduce:hidden"
              )}
            >
              {brands.map((brand) => (
                <div
                  key={`${pass}-${brand.id}`}
                  title={brand.name}
                  className={cn(
                    "group/item flex h-14 w-[30vw] shrink-0 items-center justify-center px-2 transition-opacity duration-500 sm:w-[20vw] md:h-20 md:w-[calc((100vw-11rem)/7)] xl:w-[calc((1440px-12rem)/7)]",
                    // Focus one logo, quiet the rest
                    "group-hover/track:opacity-25 group-hover/track:hover:opacity-100",
                    slotClassName
                  )}
                >
                  <BrandMark
                    brand={brand}
                    logoClassName={logoClassName}
                    monochrome={monochrome}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
