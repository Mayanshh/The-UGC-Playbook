import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HeroContent } from "@/types";
import { Button } from "@/components/ui/Button";
import { OfferTicker } from "@/components/ui/OfferTicker";

export function Hero({ content }: { content: HeroContent }) {
  const mobile = content.mobile;

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-stretch overflow-hidden pb-8 pt-6 md:items-end md:pb-8 md:pt-32"
    >
      {/* Full-bleed Background Image (Mobile + Desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src={content.backgroundImage.src}
          alt={content.backgroundImage.alt}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        {/* Mobile readability gradient: transparent top for image, paper fade at bottom for copy */}
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent from-30% to-(--bg-paper) md:hidden"
          aria-hidden="true"
        />
      </div>

      {/* Mobile Layout (< md) — Offer Ticker + Top Title + Bottom Grouped Subcopy, Bullets & CTA */}
      <Container className="relative z-10 flex flex-1 flex-col justify-between gap-12 pb-2 md:hidden">
        {/* Top Group: Offer Marquee Pill + Eyebrow + Main Serif Headline */}
        <div className="space-y-10 pt-4">
          {content.offer && (
            <Reveal triggerOnScroll={false} delay={0.02} y={10}>
              <OfferTicker offer={content.offer} />
            </Reveal>
          )}

          <div className="space-y-4">
            <Reveal triggerOnScroll={false} delay={0.08} y={14}>
              <p className="font-sans text-[15px] font-medium uppercase tracking-[0.18em] text-(--bg-umber) sm:text-xs">
                {mobile?.eyebrow ?? content.eyebrow}
              </p>
            </Reveal>

            <Reveal triggerOnScroll={false} delay={0.14} y={24}>
              <h1 className="font-serif text-[clamp(1.8rem,8.8vw,3.15rem)] font-bold uppercase leading-[1.06] tracking-tight text-(--bg-ink)">
                {mobile?.headline ?? content.headline}
              </h1>
            </Reveal>
          </div>
        </div>

        {/* Bottom Group: Subcopy + Highlights + CTA anchored together */}
        <div className="mb-10 space-y-6">
          <div className="space-y-4">
            <Reveal triggerOnScroll={false} delay={0.18} y={18}>
              <p className="font-sans text-[clamp(1rem,4.2vw,1.2rem)] font-semibold leading-snug text-(--bg-ink)">
                {mobile?.subcopy ?? content.subcopy}
              </p>
            </Reveal>

            {mobile?.highlights && mobile.highlights.length > 0 && (
              <Reveal triggerOnScroll={false} delay={0.24} y={16}>
                <ul className="space-y-2.5 font-sans text-[clamp(0.875rem,3.6vw,0.975rem)] leading-snug text-(--bg-ink)">
                  {mobile.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-0.5 text-(--bg-ink)">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <Reveal triggerOnScroll={false} delay={0.3} y={16}>
            <div className="pt-4">
              <Button variant="solid-ink" href="#courses">
                {mobile?.cta.label ?? "Join Now"}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Desktop / Laptop Layout (md+) — Unchanged */}
      <Container className="relative z-10 hidden md:block">
        <div className="max-w-4xl space-y-6">
          <Reveal triggerOnScroll={false} delay={0.05} y={16}>
            <p className="font-sans text-md font-medium uppercase tracking-[0.2em] text-(--bg-ink)">
              {content.eyebrow}
            </p>
          </Reveal>

          <Reveal triggerOnScroll={false} delay={0.15} y={36}>
            <h1 className="font-serif text-5xl font-bold uppercase leading-[1.05] tracking-tight text-black/80 sm:text-6xl md:max-w-3xl md:text-7xl">
              {content.headline}
            </h1>
          </Reveal>
        </div>
        <Reveal triggerOnScroll={false} delay={0.3} y={24}>
          <div className="flex flex-row items-center justify-between lg:mt-32">
            <p className="max-w-xl font-sans text-base leading-relaxed text-(--bg-ink) md:text-3xl">
              {content.subcopy}
            </p>
            <Button variant="solid-ink" href="/#courses">Join Now</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}