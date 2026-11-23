"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ, type FaqCategory, type FaqContent } from "@/data/faq";
import { cn } from "@/lib/cn";

interface FaqSectionProps {
  content?: FaqContent;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function FaqSection({
  content = FAQ,
  className,
}: FaqSectionProps) {
  const { eyebrow, pageTitle, pageSubtitle, categories, items } = content;

  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>("All");
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const visibleItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-page-title"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink lg:border-solid lg:border-ink/10",
        className
      )}
    >
      <div className="mx-auto w-full max-w-380 px-4 py-14 md:px-12 md:py-24 lg:px-16 lg:py-32 xl:px-24">
        {/* Top Masthead */}
        <Reveal y={14}>
          <header className="border-b border-ink/15 pb-8 md:pb-10 lg:pb-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-3">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-umber lg:tracking-[0.24em]">
                  {eyebrow}
                </p>
                <h1
                  id="faq-page-title"
                  className="font-serif text-[clamp(2.25rem,7vw,5rem)] font-bold leading-[1.04] tracking-tight text-ink lg:font-normal lg:leading-none lg:tracking-[-0.03em]"
                >
                  {pageTitle}
                </h1>
                <p className="max-w-2xl font-sans text-sm leading-relaxed text-ink/70 md:text-base lg:text-[17px]">
                  {pageSubtitle}
                </p>
              </div>

              {/* Minimalist Category Filter Strip */}
              <div
                role="tablist"
                aria-label="Filter FAQs by topic"
                className="flex flex-wrap gap-2"
              >
                {categories.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setSelectedCategory(category);
                        const nextList =
                          category === "All"
                            ? items
                            : items.filter((item) => item.category === category);
                        setOpenId(nextList[0]?.id ?? null);
                      }}
                      className={cn(
                        "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 cursor-pointer",
                        active
                          ? "border-ink bg-ink text-coco"
                          : "border-ink/15 bg-transparent text-ink/70 hover:border-ink/40 hover:text-ink"
                      )}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </header>
        </Reveal>

        {/* Minimalist Hairline Accordion Rows */}
        <div className="mt-8 lg:mt-14">
          <dl className="divide-y divide-ink/12 border-y border-ink/12">
            {visibleItems.map((item, idx) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const buttonId = `faq-trigger-${item.id}`;

              return (
                <Reveal key={item.id} y={14} delay={Math.min(idx * 0.04, 0.2)}>
                  <div className="py-6 transition-colors duration-200 lg:py-8">
                    <dt>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => handleToggle(item.id)}
                        className="group flex w-full items-start justify-between gap-6 text-left cursor-pointer"
                      >
                        <div className="flex items-baseline gap-4 lg:gap-8">
                          <span className="font-mono text-xs tracking-[0.22em] text-umber">
                            {pad(idx + 1)}
                          </span>
                          <div>
                            <span className="font-serif text-lg font-bold leading-snug text-ink transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-xl lg:text-2xl lg:font-normal lg:tracking-tight">
                              {item.question}
                            </span>
                            <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 lg:hidden">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-6">
                          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 lg:inline">
                            {item.category}
                          </span>
                          <span
                            aria-hidden="true"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 font-mono text-sm text-ink transition-colors duration-200 group-hover:border-ink"
                          >
                            {isOpen ? "−" : "+"}
                          </span>
                        </div>
                      </button>
                    </dt>

                    {isOpen && (
                      <dd
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="mt-4 pl-8 pr-4 md:pl-11 lg:mt-5 lg:max-w-3xl lg:pl-16"
                      >
                        <p className="font-sans text-sm leading-relaxed text-ink/75 md:text-base lg:text-[17px] lg:leading-[1.7]">
                          {item.answer}
                        </p>
                      </dd>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}