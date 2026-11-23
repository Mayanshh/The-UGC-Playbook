import type { ExclusiveLesson } from "@/data/Curriculum";
import { cn } from "@/lib/cn";

interface ExclusiveLessonCardProps {
  lesson: ExclusiveLesson;
  className?: string;
}

export function ExclusiveLessonCard({
  lesson,
  className,
}: ExclusiveLessonCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-ink/15 bg-ink p-6 text-coco shadow-xl transition-all duration-500 md:rounded-3xl md:p-10 lg:p-12 lg:hover:border-coco/25 lg:hover:shadow-2xl",
        className
      )}
    >
      {/* Subtle ambient glow + ghost "+1" numeral */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-coco/[0.07] blur-3xl transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[9rem] font-light leading-none tracking-tighter text-coco/[0.06] transition-transform duration-700 ease-out md:block lg:right-12 lg:text-[12rem] lg:group-hover:-translate-y-[53%]"
      >
        +1
      </span>

      {/* Top Monospace Meta Strip on Desktop */}
      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-coco/12 pb-4 lg:pb-5">
        <span className="inline-block rounded-md border border-coco/15 bg-coco/10 px-2.5 py-1.5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em] text-coco/80 lg:rounded-full lg:px-3.5 lg:py-1 lg:font-mono lg:text-[11px] lg:tracking-[0.2em]">
          {lesson.label}
        </span>

        <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-coco/45 lg:inline-block">
          Bonus Chapter · 01
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mt-5 max-w-xl lg:mt-8 lg:max-w-2xl">
        <h3 className="font-serif text-2xl font-bold leading-[1.15] tracking-tight text-coco md:text-4xl lg:text-[2.75rem] lg:font-light lg:leading-[1.06] lg:tracking-[-0.025em]">
          {lesson.title}
        </h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-coco/70 md:mt-4 md:text-base lg:mt-5 lg:max-w-xl lg:text-[1.02rem] lg:leading-[1.7] lg:text-coco/75">
          {lesson.description}
        </p>

        {/* Bottom Hairline Accent */}
        <div className="mt-6 hidden items-center gap-3 pt-2 lg:flex">
          <span className="h-px w-8 bg-coco/30 transition-all duration-500 ease-out group-hover:w-14 group-hover:bg-coco/65" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-coco/50">
            Included Inside Playbook
          </span>
        </div>
      </div>
    </article>
  );
}