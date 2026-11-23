"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Index of the card sitting at the scroll-snap start edge */
function nearestIndex(track: HTMLElement) {
  const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
  let nearest = 0;
  let best = Infinity;
  (Array.from(track.children) as HTMLElement[]).forEach((card, i) => {
    const d = Math.abs(card.offsetLeft - track.scrollLeft - pad);
    if (d < best) {
      best = d;
      nearest = i;
    }
  });
  return nearest;
}

/**
 * Tracks a native scroll-snap row: current card, end state and a thumb that follows
 * scroll position. Progress is written straight to the DOM (no re-render per scroll
 * frame); React state only changes when the active card actually changes.
 */
export function useSnapCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState({ index: 0, count: 0, atEnd: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    const measure = () => {
      raf = 0;
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;

      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      const visible = track.scrollWidth > 0 ? track.clientWidth / track.scrollWidth : 1;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${visible + p * (1 - visible)})`;
      }

      const nearest = nearestIndex(track);
      const atEnd = max <= 1 || track.scrollLeft >= max - 2;
      setState((s) =>
        s.index === nearest && s.count === cards.length && s.atEnd === atEnd
          ? s
          : { index: nearest, count: cards.length, atEnd }
      );
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener("scroll", schedule, { passive: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(track);

    return () => {
      track.removeEventListener("scroll", schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const current = nearestIndex(track);
    const target = cards[Math.min(Math.max(current + dir, 0), cards.length - 1)];
    target?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  }, []);

  return {
    trackRef,
    barRef,
    index: state.index,
    count: state.count,
    atStart: state.index === 0,
    atEnd: state.atEnd,
    prev: () => go(-1),
    next: () => go(1),
  };
}
