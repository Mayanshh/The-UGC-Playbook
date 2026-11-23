"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ChatProof } from "@/data/StudentResults";

interface ProofLightboxProps {
  proofs: ChatProof[];
  /** Id of the open proof, or null when closed */
  activeId: string | null;
  onChange: (id: string | null) => void;
}

const iconBtn =
  "flex h-11 w-11 items-center justify-center rounded-full border border-coco/30 text-coco transition-colors duration-300 hover:bg-coco hover:text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coco";

export function ProofLightbox({ proofs, activeId, onChange }: ProofLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const index = proofs.findIndex((p) => p.id === activeId);
  const proof = index >= 0 ? proofs[index] : null;

  // Open / close the native <dialog> (gives us focus trapping and Esc for free)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (proof && !dialog.open) dialog.showModal();
    if (!proof && dialog.open) dialog.close();
  }, [proof]);

  // Lock page scroll while open
  useEffect(() => {
    if (!proof) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [proof]);

  const step = (dir: 1 | -1) => {
    if (index < 0) return;
    onChange(proofs[(index + dir + proofs.length) % proofs.length].id);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={proof ? `${proof.student}'s chat` : "Chat"}
      onClose={() => onChange(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
    >
      {proof && (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-5 px-4 py-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) onChange(null);
          }}
        >
          <Image
            key={proof.id}
            src={proof.src}
            alt={proof.alt}
            width={proof.width}
            height={proof.height}
            sizes="(min-width: 768px) 480px, 92vw"
            className="h-auto max-h-[78svh] w-auto max-w-full rounded-2xl"
            priority
          />

          <div className="flex items-center gap-4">
            <button type="button" onClick={() => step(-1)} aria-label="Previous chat" className={iconBtn}>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 -scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3.5L10.5 8 6 12.5" /></svg>
            </button>
            <p className="min-w-[7rem] text-center font-sans text-sm text-coco/80">
              {proof.student}
            </p>
            <button type="button" onClick={() => step(1)} aria-label="Next chat" className={iconBtn}>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3.5L10.5 8 6 12.5" /></svg>
            </button>
            <button type="button" onClick={() => onChange(null)} aria-label="Close" className={iconBtn}>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /></svg>
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
