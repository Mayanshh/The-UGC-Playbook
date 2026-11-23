import type { Ref } from "react";

interface CarouselControlsProps {
  index: number;
  count: number;
  atStart: boolean;
  atEnd: boolean;
  onPrev: () => void;
  onNext: () => void;
  barRef: Ref<HTMLSpanElement>;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

function Chevron({ flip }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={flip ? "h-4 w-4 -scale-x-100" : "h-4 w-4"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3.5L10.5 8 6 12.5" />
    </svg>
  );
}

const btn =
  "flex h-12 w-12 items-center justify-center rounded-full border border-paper text-coco transition-colors duration-300 hover:bg-coco hover:text-taupe disabled:pointer-events-none disabled:opacity-30 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

export function CarouselControls({
  index,
  count,
  atStart,
  atEnd,
  onPrev,
  onNext,
  barRef,
  className,
}: CarouselControlsProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={atStart}
          aria-label="Previous result"
          className={btn}
        >
          <Chevron flip />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={atEnd}
          aria-label="Next result"
          className={btn}
        >
          <Chevron />
        </button>
        <p
          className="ml-3 font-sans text-sm tabular-nums text-paper/80"
          aria-live="polite"
        >
          {pad(Math.min(index + 1, count || 1))} / {pad(count)}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="mt-8 block h-px w-full max-w-xs overflow-hidden bg-coco/10"
      >
        <span
          ref={barRef}
          className="block h-full w-full origin-left bg-coco will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </span>
    </div>
  );
}