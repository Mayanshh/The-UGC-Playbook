"use client";

import { useEffect, useRef, useState } from "react";
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
  /** Unified slot width classes per item (defaults to ~7 items across desktop) */
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

const RASTER_EXT_RE = /\.(png|jpe?g|webp|avif)(\?|#|$)/i;
const bgRemovedCache = new Map<string, string>();
const bgRemovedPending = new Map<string, Promise<string>>();

function shouldStripBg(brand: BrandLogoItem): boolean {
  if (brand.removeBg === false) return false;
  if (brand.removeBg === true) return true;
  return RASTER_EXT_RE.test(brand.logo);
}

function colorDist(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number
): number {
  return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
}

/**
 * Flood-fills connected near-white / outer-border pixels from the image edges
 * and feathers the boundary so interior shapes aren't accidentally erased.
 */
async function stripOuterWhiteBg(src: string): Promise<string> {
  if (bgRemovedCache.has(src)) return bgRemovedCache.get(src)!;
  if (bgRemovedPending.has(src)) return bgRemovedPending.get(src)!;

  const task = new Promise<string>((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        if (!w || !h) {
          resolve(src);
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          resolve(src);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        // Sample corners to detect the outer background color (typically near-white)
        const corners = [
          0,
          (w - 1) * 4,
          (h - 1) * w * 4,
          ((h - 1) * w + (w - 1)) * 4,
        ];
        const lightCorners = corners.filter(
          (idx) => data[idx] > 235 && data[idx + 1] > 235 && data[idx + 2] > 235
        );

        // Only strip if at least 2 corners are near-white; otherwise leave untouched
        if (lightCorners.length < 2) {
          resolve(src);
          return;
        }

        const bgR =
          lightCorners.reduce((s, idx) => s + data[idx], 0) / lightCorners.length;
        const bgG =
          lightCorners.reduce((s, idx) => s + data[idx + 1], 0) /
          lightCorners.length;
        const bgB =
          lightCorners.reduce((s, idx) => s + data[idx + 2], 0) /
          lightCorners.length;

        const total = w * h;
        const visited = new Uint8Array(total);
        const toRemove = new Uint8Array(total);
        const queue = new Int32Array(total);
        let head = 0;
        let tail = 0;

        const hardThreshold = 28;
        const softThreshold = 62;

        const tryEnqueue = (x: number, y: number) => {
          if (x < 0 || x >= w || y < 0 || y >= h) return;
          const p = y * w + x;
          if (visited[p]) return;
          visited[p] = 1;

          const i = p * 4;
          if (data[i + 3] === 0) {
            toRemove[p] = 1;
            queue[tail++] = p;
            return;
          }

          const dist = colorDist(
            data[i],
            data[i + 1],
            data[i + 2],
            bgR,
            bgG,
            bgB
          );
          if (dist <= softThreshold) {
            toRemove[p] = 1;
            if (dist <= hardThreshold) {
              queue[tail++] = p;
            }
          }
        };

        // Seed along all 4 borders
        for (let x = 0; x < w; x++) {
          tryEnqueue(x, 0);
          tryEnqueue(x, h - 1);
        }
        for (let y = 0; y < h; y++) {
          tryEnqueue(0, y);
          tryEnqueue(w - 1, y);
        }

        while (head < tail) {
          const curr = queue[head++];
          const cx = curr % w;
          const cy = (curr - cx) / w;
          tryEnqueue(cx + 1, cy);
          tryEnqueue(cx - 1, cy);
          tryEnqueue(cx, cy + 1);
          tryEnqueue(cx, cy - 1);
        }

        // Apply transparency and feather fringe pixels
        for (let p = 0; p < total; p++) {
          if (!toRemove[p]) continue;
          const i = p * 4;
          const dist = colorDist(
            data[i],
            data[i + 1],
            data[i + 2],
            bgR,
            bgG,
            bgB
          );
          if (dist <= hardThreshold) {
            data[i + 3] = 0;
          } else {
            const t = (dist - hardThreshold) / (softThreshold - hardThreshold);
            data[i + 3] = Math.round(data[i + 3] * Math.min(Math.max(t, 0), 1));
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const url = canvas.toDataURL("image/png");
        bgRemovedCache.set(src, url);
        resolve(url);
      } catch {
        resolve(src);
      }
    };

    img.onerror = () => resolve(src);
    img.src = src;
  });

  bgRemovedPending.set(src, task);
  const result = await task;
  bgRemovedPending.delete(src);
  return result;
}

function BrandMark({
  brand,
  logoClassName,
  monochrome,
  onReady,
}: {
  brand: BrandLogoItem;
  logoClassName?: string;
  monochrome: boolean;
  onReady?: () => void;
}) {
  const [failed, setFailed] = useState(!brand.logo);
  const [resolvedSrc, setResolvedSrc] = useState<string>(brand.logo);

  useEffect(() => {
    let active = true;
    setFailed(!brand.logo);
    setResolvedSrc(brand.logo);

    if (brand.logo && shouldStripBg(brand)) {
      stripOuterWhiteBg(brand.logo).then((processed) => {
        if (active) {
          setResolvedSrc(processed);
          onReady?.();
        }
      });
    }

    return () => {
      active = false;
    };
  }, [brand, onReady]);

  if (failed) {
    return (
      <span className="truncate whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink/70 md:text-sm">
        {brand.name}
      </span>
    );
  }

  const scale = brand.scale ?? 1;

  return (
    <Image
      src={resolvedSrc}
      alt={brand.name}
      width={brand.width}
      height={brand.height}
      unoptimized={resolvedSrc.startsWith("data:")}
      draggable={false}
      onLoad={onReady}
      onError={() => {
        if (resolvedSrc !== brand.logo) {
          setResolvedSrc(brand.logo);
        } else {
          setFailed(true);
        }
      }}
      style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
      className={cn(
        "max-h-8 max-w-28 w-auto h-auto select-none object-contain transition-[filter,opacity,transform] duration-500 md:max-h-10 md:max-w-36",
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
  monochrome = false,
  className,
}: BrandMarqueeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const passRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef<number>(0);

  // Live motion values: tweened by GSAP, read every frame by the ticker.
  const motion = useRef({ hover: 1, dir: 1, boost: 0, skew: 0 });

  const remeasureLoop = () => {
    if (passRef.current) {
      loopWidthRef.current = passRef.current.offsetWidth;
    }
  };

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
      loopWidthRef.current = pass.offsetWidth;
      let visible = true;

      // One pass = one seamless loop. Re-measure when logos load or the viewport changes.
      const ro = new ResizeObserver(remeasureLoop);
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
        const loop = loopWidthRef.current;
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
      id="brand-marquee"
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
                    slotClassName
                  )}
                >
                  <BrandMark
                    brand={brand}
                    logoClassName={logoClassName}
                    monochrome={monochrome}
                    onReady={remeasureLoop}
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