"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/ui/Reveal";
import { FIT_CHECK, type FitCheckContent } from "@/data/fitCheck";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

interface FitCheckProps {
  content?: FitCheckContent;
  className?: string;
}

const yesVars = { "--fit-yes": "#2f6b3d" } as CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

/** A mark that draws itself in when its card scrolls into view */
function Mark({ kind }: { kind: "check" | "cross" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        data-fit-path
        pathLength={1}
        style={{ strokeDasharray: 1 }}
        d={kind === "check" ? "M3 8.5l3.2 3.2L13 4.8" : "M4 4l8 8M12 4l-8 8"}
      />
    </svg>
  );
}

function FitCard({
  title,
  items,
  kind,
  className,
}: {
  title: string;
  items: string[];
  kind: "check" | "cross";
  className?: string;
}) {
  const yes = kind === "check";

  return (
    <div
      data-fit-card
      className={cn(
        "rounded-3xl p-5 md:p-8 lg:p-10",
        yes
          ? "border border-ink/10 bg-coco/70 shadow-[0_30px_60px_-32px_rgba(40,25,15,0.28)]"
          : "border border-dashed border-ink/25",
        className
      )}
    >
      <h3
        className={cn(
          "flex items-center gap-3 font-serif text-xl font-semibold md:text-3xl",
          yes ? "text-(--fit-yes)" : "text-oxblood"
        )}
        style={yesVars}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
        {title}
      </h3>

      <ul className="mt-6 md:mt-8">
        {items.map((item) => (
          <li
            key={item}
            data-fit-item
            className="flex items-start gap-4 py-2.5 font-sans text-[0.95rem] leading-snug text-ink/80 first:pt-0 last:pb-0 md:border-b md:border-ink/10 md:py-5 md:text-[1.05rem] md:first:pt-0 md:last:border-b-0 md:last:pb-0 lg:text-lg"
          >
            <span
              aria-hidden="true"
              className={cn(
                "mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                yes ? "bg-(--fit-yes)/10 text-(--fit-yes)" : "bg-oxblood/10 text-oxblood"
              )}
              style={yesVars}
            >
              <Mark kind={kind} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FitCheck({ content = FIT_CHECK, className }: FitCheckProps) {
  const { tag, heading, subcopy, forYou, notForYou, closing } = content;
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        if (!root) return;

        root.querySelectorAll<HTMLElement>("[data-fit-card]").forEach((card) => {
          const items = card.querySelectorAll("[data-fit-item]");
          const paths = card.querySelectorAll("[data-fit-path]");

          gsap.set(card, { opacity: 0, y: 32 });
          gsap.set(items, { opacity: 0, x: -10 });
          gsap.set(paths, { strokeDashoffset: 1 });

          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            })
            .to(card, { opacity: 1, y: 0, duration: 1 })
            .to(items, { opacity: 1, x: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
            .to(
              paths,
              { strokeDashoffset: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
              "<0.15"
            );
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
    id="fit-check"
      ref={rootRef}
      aria-labelledby="fit-check-title"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink",
        className
      )}
    >
      {/* Soft warm glows: depth without adding colour */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-umber/10 blur-3xl lg:h-[34rem] lg:w-[34rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 hidden h-[30rem] w-[30rem] rounded-full bg-umber/[0.07] blur-3xl lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* Header (sticky on large screens) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal y={16}>
              <span className="inline-block px-2.5 py-1.5 font-sans text-[1.65rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                {tag}
              </span>
            </Reveal>

            <Reveal y={24} delay={0.08}>
              <h2
                id="fit-check-title"
                className="mt-6 font-serif font-bold text-[clamp(2rem,6.5vw,2.25rem)] font-bold leading-[1.12] tracking-tight md:mt-8 md:text-[clamp(2.25rem,5vw,3.25rem)] md:leading-[1.05] lg:text-[clamp(3.5rem,4.6vw,4.5rem)]"
              >
                {heading}
              </h2>
              <p className="mt-6 hidden max-w-xs font-sans text-lg leading-relaxed text-ink/70 lg:block">
                {subcopy}
              </p>
            </Reveal>

            {/* Quiet tally, desktop only */}
            <Reveal y={16} delay={0.16}>
              <dl className="mt-16 hidden gap-12 lg:flex">
                <div className="flex flex-col">
                  <dt className="order-2 mt-3 font-sans text-xs text-ink/60">
                    reasons it fits
                  </dt>
                  <dd className="order-1 font-serif text-7xl font-light leading-none tracking-tight text-ink">
                    {pad(forYou.items.length)}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="order-2 mt-3 font-sans text-xs text-ink/60">
                    reasons it doesn't
                  </dt>
                  <dd className="order-1 font-serif text-7xl font-light leading-none tracking-tight text-ink/35">
                    {pad(notForYou.items.length)}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Cards: an editorial stagger on large screens */}
          <div className="grid grid-cols-1 items-start gap-4 md:gap-6 lg:col-span-8 lg:grid-cols-5">
            <FitCard
              title={forYou.title}
              items={forYou.items}
              kind="check"
              className="lg:col-span-3"
            />
            <FitCard
              title={notForYou.title}
              items={notForYou.items}
              kind="cross"
              className="lg:col-span-2 lg:mt-24"
            />
          </div>
        </div>

        {/* Closing CTA */}
        <Reveal y={20}>
          <div className="mt-14 flex uppercase sm:text-center md:text-left flex-col gap-8 pt-10 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-12 md:pt-14 lg:mt-28">
            <p className="max-w-xl font-serif text-[1.65rem] font-bold leading-[1.15] tracking-tight md:text-4xl">
              {closing.text}
            </p>

            <div className="flex flex-col items-center gap-3 md:items-end">
              <a
                href={closing.cta.href}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-sans text-sm font-medium text-coco shadow-[0_18px_36px_-18px_rgba(20,12,8,0.6)] outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:text-base"
              >
                <span>{closing.cta.label}</span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-coco transition-transform duration-300 group-hover:scale-150"
                />
              </a>
              {closing.note && (
                <p className="font-sans text-xs text-ink/60">{closing.note}</p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
