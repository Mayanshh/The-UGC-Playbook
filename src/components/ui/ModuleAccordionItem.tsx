"use client";

import { useId } from "react";
import type { CurriculumModule } from "@/data/Curriculum";
import { cn } from "@/lib/cn";

interface ModuleAccordionItemProps {
  module: CurriculumModule;
  /** Zero-based position, shown as 01, 02... on larger screens */
  index: number;
  open: boolean;
  onToggle: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function ModuleAccordionItem({
  module,
  index,
  open,
  onToggle,
}: ModuleAccordionItemProps) {
  const uid = useId();
  const buttonId = `${uid}-button`;
  const panelId = `${uid}-panel`;
  const count = module.lessons.length;

  return (
    <article
      className={cn(
        "rounded-2xl border border-ink/10 transition-[background-color,box-shadow] duration-500 md:rounded-3xl",
        open
          ? "bg-white/80 shadow-[0_30px_60px_-34px_rgba(40,25,15,0.3)]"
          : "bg-white/50 hover:bg-white/70"
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="grid w-full grid-cols-[1fr_auto] items-start gap-x-4 rounded-[inherit] p-5 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink md:grid-cols-[auto_1fr_auto] md:items-center md:gap-x-8 md:p-8"
        >
          {/* Numeral: large screens only */}
          <span
            aria-hidden="true"
            className={cn(
              "hidden font-serif text-5xl font-light leading-none tracking-tight transition-colors duration-500 md:block md:w-14",
              open ? "text-ink" : "text-ink/25"
            )}
          >
            {pad(index + 1)}
          </span>

          <span className="block">
            <span className="block font-sans text-sm text-ink/60">{module.label}</span>
            <span className="mt-2 block font-sans text-xl font-semibold leading-snug tracking-tight text-ink md:text-2xl">
              {module.title}
            </span>
            <span className="mt-3 hidden max-w-xl font-sans text-base leading-relaxed text-ink/65 md:block">
              {module.summary}
            </span>
          </span>

          <span className="flex flex-col items-start gap-2 font-sans text-sm text-ink/60 md:flex-row md:items-center md:gap-4">
            <span>
              <span className="block md:inline">{count}</span>{" "}
              <span className="block md:inline">{count === 1 ? "lesson" : "lessons"}</span>
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-500 ease-out md:h-4 md:w-4",
                open && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 6l4.5 4.5L12.5 6" />
            </svg>
          </span>
        </button>
      </h3>

      {/* Height animates via grid rows: no measuring, no layout thrash */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div
          className={cn(
            "min-h-0 overflow-hidden",
            // Pull collapsed content out of the tab order once the collapse finishes
            open
              ? "visible [transition:visibility_0s]"
              : "invisible [transition:visibility_0s_linear_500ms]"
          )}
        >
          <div className="px-5 pb-5 md:pb-8 md:pl-[7.5rem] md:pr-8">
            <div className="border-t border-ink/10 pt-6 md:pt-8">
              <ol className="space-y-3 md:grid md:grid-cols-2 md:gap-x-12 md:space-y-0">
                {module.lessons.map((lesson, i) => (
                  <li
                    key={lesson}
                    className="font-sans text-base leading-snug text-ink/85 md:flex md:gap-4 md:border-b md:border-ink/10 md:py-4 md:text-[1.05rem]"
                  >
                    <span
                      aria-hidden="true"
                      className="md:w-6 md:shrink-0 md:tabular-nums md:text-ink/40"
                    >
                      {i + 1}.
                    </span>{" "}
                    <span>{lesson}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-xl bg-ink/[0.04] px-4 py-4 md:mt-8 md:px-6 md:py-5">
                <p className="font-sans text-xs text-ink/55">You’ll leave with</p>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink/80 md:text-base">
                  {module.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
