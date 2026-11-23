"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { CURRICULUM, type CurriculumContent } from "@/data/Curriculum";
import { cn } from "@/lib/cn";
import { ExclusiveLessonCard } from "@/components/ui/ExclusiveLessonCard";
import { ModuleAccordionItem } from "@/components/ui/ModuleAccordionItem";

interface CurriculumProps {
  content?: CurriculumContent;
  /** Optional page/section title shown above the curriculum layout */
  pageTitle?: string;
  pageSubtitle?: string;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Curriculum({
  content = CURRICULUM,
  pageTitle = "Course Curriculum & Syllabus",
  pageSubtitle = "Every lesson inside the playbook—structured step by step from first pitch to recurring brand deals.",
  className,
}: CurriculumProps) {
  const { tagPrefix, heading, subcopy, highlights, modules, exclusive } = content;

  // Mobile state: One module open at a time; tapping an open module closes it.
  const [openId, setOpenId] = useState<string | null>(modules[0]?.id ?? null);

  // Desktop state: Multiple or single chapter focus along the editorial spine.
  const [desktopExpandedId, setDesktopExpandedId] = useState<string | null>(
    modules[0]?.id ?? null
  );

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const total = totalLessons + (exclusive ? 1 : 0);

  const tag = `${tagPrefix} · ${modules.length} module${
    modules.length === 1 ? "" : "s"
  }${exclusive ? " + 1 exclusive lesson" : ""}`;

  const activeIdx = Math.max(
    0,
    modules.findIndex((m) => m.id === desktopExpandedId)
  );

  return (
    <section
      aria-labelledby="curriculum-title"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink lg:border-solid lg:border-ink/10",
        className
      )}
    >
      {/* Mobile-only ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-umber/10 blur-3xl lg:hidden"
      />

      {/* =====================================================================
          MOBILE & TABLET VIEW (< 1024px) — UNCHANGED
      ===================================================================== */}
      <div className="relative mx-auto w-full max-w-360 px-4 py-14 md:px-12 md:py-24 lg:hidden">
        <div className="mb-12 border-b border-ink/15 pb-8 md:mb-16 md:pb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-2.5">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-umber">
                {tagPrefix}
              </p>
              <h1 className="font-serif text-[clamp(2rem,5.2vw,3.75rem)] font-bold leading-[1.06] tracking-tight text-ink">
                {pageTitle}
              </h1>
              <p className="max-w-2xl font-sans text-sm leading-relaxed text-ink/70 md:text-base">
                {pageSubtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-8">
          <aside>
            <div>
              <Reveal y={16}>
                <span className="block w-full rounded-md border border-ink/10 bg-ink/5 px-3 py-2 font-sans text-[0.65rem] font-medium uppercase leading-snug tracking-[0.14em] text-ink/70 md:inline-block md:w-auto md:py-1.5">
                  {tag}
                </span>
              </Reveal>

              <Reveal y={24} delay={0.08}>
                <h2
                  id="curriculum-title-mobile"
                  className="mt-5 font-serif text-[clamp(1.75rem,6.5vw,2.25rem)] font-bold leading-[1.12] tracking-tight md:mt-6 md:text-[clamp(2.25rem,5vw,3.25rem)] md:leading-[1.05]"
                >
                  {heading}
                </h2>
                <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-ink/70 md:mt-5">
                  {subcopy.replace("{total}", String(total))}
                </p>
              </Reveal>
            </div>
          </aside>

          <div className="flex flex-col gap-3 md:gap-4">
            {modules.map((module, i) => (
              <Reveal key={module.id} y={24} delay={Math.min(i * 0.08, 0.24)}>
                <ModuleAccordionItem
                  module={module}
                  index={i}
                  open={openId === module.id}
                  onToggle={() =>
                    setOpenId(openId === module.id ? null : module.id)
                  }
                />
              </Reveal>
            ))}

            {exclusive && (
              <Reveal y={24} delay={0.24}>
                <div className="pt-2">
                  <ExclusiveLessonCard lesson={exclusive} />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          DESKTOP VIEW (>= 1024px) — GALLERY MONOGRAPH & KINETIC SPINE
      ===================================================================== */}
      <div className="relative mx-auto hidden w-full max-w-360 px-16 py-36 xl:px-24 lg:block">
        {/* Giant Ghosted Index Numeral in Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none font-serif text-[18rem] xl:text-[24rem] font-light leading-none tracking-tighter text-ink/[0.035] absolute right-12 top-20"
        >
          {pad(activeIdx + 1)}
        </div>

        {/* Offset Editorial Title & Intro */}
        <div className="relative z-10 grid grid-cols-12 items-start gap-12 border-b border-ink/15 pb-20">
          <div className="col-span-7">
            <Reveal y={18}>
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-umber">
                {tagPrefix}
              </span>
              <h1
                id="curriculum-title"
                className="mt-5 font-serif text-[clamp(3.5rem,5.6vw,5.75rem)] font-light leading-[0.96] tracking-[-0.035em] text-ink"
              >
                {pageTitle}
              </h1>
            </Reveal>
          </div>

          <div className="col-span-5 pt-4 flex flex-col gap-8">
            <Reveal y={18} delay={0.08}>
              <h2 className="font-serif text-2xl font-normal tracking-tight text-ink">
                {heading}
              </h2>
              <p className="mt-3 font-sans text-base leading-[1.7] text-ink/65">
                {subcopy.replace("{total}", String(total))}
              </p>
            </Reveal>

            <Reveal y={18} delay={0.14}>
              <div className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.2em] text-ink/55">
                <span>{pad(modules.length)} Chapters</span>
                <span>•</span>
                <span>{pad(total)} Lessons</span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Kinetic Spine Syllabus */}
        <div className="relative z-10 mt-20 grid grid-cols-12 gap-16">
          {/* Left Margin Note & Highlights */}
          <div className="col-span-4">
            <div className="sticky top-28 flex flex-col gap-10 pr-6">
              <p className="font-mono text-[11px] leading-relaxed uppercase tracking-[0.22em] text-ink/45">
                Select any chapter along the index to unfold its complete lesson sequence.
              </p>

              {highlights.length > 0 && (
                <ul className="flex flex-col gap-3 border-t border-ink/12 pt-6">
                  {highlights.map((item, idx) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-sans text-sm text-ink/75"
                    >
                      <span className="font-mono text-[11px] text-umber">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Expandable Monograph Spine */}
          <div className="col-span-8 flex flex-col border-t border-ink/15">
            {modules.map((module, idx) => {
              const isOpen = desktopExpandedId === module.id;
              return (
                <div
                  key={module.id}
                  className="border-b border-ink/15 transition-colors duration-300"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setDesktopExpandedId(isOpen ? null : module.id)
                    }
                    className="group flex w-full items-baseline justify-between gap-8 py-9 text-left transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-baseline gap-8">
                      <span
                        className={cn(
                          "font-mono text-xs tracking-[0.2em] transition-colors duration-300",
                          isOpen
                            ? "text-umber font-semibold"
                            : "text-ink/40 group-hover:text-ink"
                        )}
                      >
                        {pad(idx + 1)}
                      </span>
                      <h3
                        className={cn(
                          "font-serif text-3xl xl:text-[2.5rem] font-light tracking-[-0.02em] transition-transform duration-500 ease-out",
                          isOpen
                            ? "translate-x-2 text-ink"
                            : "text-ink/85 group-hover:translate-x-2 group-hover:text-ink"
                        )}
                      >
                        {module.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink/45">
                        {pad(module.lessons.length)} lessons
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition-colors duration-300 group-hover:border-ink group-hover:text-ink"
                      >
                        <span className="h-px w-3 bg-current" />
                        <span
                          className={cn(
                            "absolute h-3 w-px bg-current transition-transform duration-300",
                            isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
                          )}
                        />
                      </span>
                    </div>
                  </button>

                  {/* Smooth CSS Grid Accordion Reveal */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <ol className="pb-10 pl-14 pr-4 flex flex-col divide-y divide-ink/8">
                        {module.lessons.map((lessonTitle, lessonIdx) => (
                          <li
                            key={`${module.id}-${lessonIdx}`}
                            className="group/item flex items-baseline justify-between gap-6 py-4 text-ink/80 transition-colors hover:text-ink"
                          >
                            <div className="flex items-baseline gap-5">
                              <span className="font-mono text-xs text-ink/35 group-hover/item:text-umber transition-colors">
                                {pad(idx + 1)}.{pad(lessonIdx + 1)}
                              </span>
                              <span className="font-sans text-base xl:text-[1.05rem] leading-relaxed">
                                {lessonTitle}
                              </span>
                            </div>
                            <span
                              aria-hidden="true"
                              className="h-px w-6 bg-ink/15 transition-all duration-300 group-hover/item:w-12 group-hover/item:bg-umber"
                            />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Exclusive Bonus Feature */}
            {exclusive && (
              <div className="mt-16 border-l-2 border-umber pl-8">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.26em] text-umber">
                  Exclusive Bonus Lesson
                </p>
                <ExclusiveLessonCard lesson={exclusive} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}