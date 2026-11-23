"use client";

import { useEffect, useRef, useState } from "react";

interface UseNavbarScrollOptions {
  threshold?: number;
  hideOffset?: number;
}

export function useNavbarScroll({
  threshold = 40,
  hideOffset = 140,
}: UseNavbarScrollOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > threshold);

      if (currentY > hideOffset && currentY > lastScrollY.current + 6) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current - 6 || currentY <= hideOffset) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, hideOffset]);

  return { isScrolled, isHidden };
}