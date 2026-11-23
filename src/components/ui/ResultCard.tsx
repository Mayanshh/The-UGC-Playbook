import Image from "next/image";
import type { StudentResult } from "@/data/StudentResults";

interface ResultCardProps {
  item: StudentResult;
  /** When provided and the item has a proofId, shows a "Read the chat" link */
  onOpenProof?: (proofId: string) => void;
}

export function ResultCard({ item, onOpenProof }: ResultCardProps) {
  const initial = item.name.trim().charAt(0).toUpperCase();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-coco p-5 md:p-8">
      <header className="flex items-center gap-3">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink/10 bg-ink/5 font-sans text-sm text-umber md:h-12 md:w-12">
          {item.avatar ? (
            <Image
              src={item.avatar.src}
              alt={item.avatar.alt ?? ""}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span aria-hidden="true">{initial}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-sans text-base font-semibold text-ink">
            {item.name}
          </p>
          <p className="truncate font-sans text-xs text-ink/60">{item.meta}</p>
        </div>
      </header>

      <h3 className="mt-5 font-sans text-[0.95rem] font-semibold leading-snug text-ink md:mt-10 md:font-serif md:text-[1.7rem] md:font-bold md:leading-[1.15] md:tracking-tight">
        {item.result}
      </h3>

      <blockquote className="mt-2 font-sans text-sm leading-relaxed text-ink/70 md:mt-4 md:text-base">
        <p>“{item.quote}”</p>
      </blockquote>

      {item.proofId && onOpenProof && (
        <button
          type="button"
          onClick={() => onOpenProof(item.proofId!)}
          className="group mt-auto inline-flex items-center gap-3 self-start pt-6 font-sans text-sm text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:pt-10"
        >
          <span>Read the chat</span>
          <span
            aria-hidden="true"
            className="h-px w-6 bg-current transition-[width] duration-500 ease-out group-hover:w-12"
          />
        </button>
      )}
    </article>
  );
}
