"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  YouTube IFrame API typings                                                */
/* -------------------------------------------------------------------------- */

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
  getIframe?: () => HTMLIFrameElement;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: string | HTMLElement,
        config: {
          videoId: string;
          host?: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: {
              data: number;
              target: YTPlayerInstance;
            }) => void;
          };
        }
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// YT.PlayerState values
const YT_ENDED = 0;
const YT_PLAYING = 1;
const YT_PAUSED = 2;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

export function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const patterns = [
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const regex of patterns) {
    const match = trimmed.match(regex);
    if (match?.[1]) return match[1];
  }

  return trimmed;
}

/**
 * Thumbnail candidates, best first. `maxresdefault` is a true 16:9 frame but
 * doesn't exist for every video, so we fall back to `hqdefault` (4:3 with
 * letterbox bars, which `object-cover` crops away inside a 16:9 box).
 */
function getThumbnailSources(videoId: string): string[] {
  return [
    `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`,
    `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  ];
}

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeIframeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();

  if (!ytApiPromise) {
    ytApiPromise = new Promise<void>((resolve, reject) => {
      const prevReady = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        prevReady?.();
        resolve();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        tag.onerror = () => {
          // Allow a retry on the next interaction (ad-blocker, offline, etc.)
          ytApiPromise = null;
          tag.remove();
          reject(new Error("Failed to load video player"));
        };
        document.head.appendChild(tag);
      }
    });
  }

  return ytApiPromise;
}

let connectionsWarmed = false;

/** Preconnect + fetch the player API only when the user shows intent to play. */
function warmUpPlayer() {
  if (typeof document === "undefined") return;

  if (!connectionsWarmed) {
    connectionsWarmed = true;
    ["https://www.youtube-nocookie.com", "https://i.ytimg.com"].forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      document.head.appendChild(link);
    });
  }

  loadYouTubeIframeAPI().catch(() => {});
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export type VideoOrientation = "horizontal" | "vertical";

interface LockedYouTubePlayerProps {
  videoUrlOrId: string;
  /** Always defaults to landscape "horizontal" (16:9) */
  orientation?: VideoOrientation;
  /** Optional override. By default the video's own thumbnail is used. */
  posterSrc?: string;
  posterAlt?: string;
  label?: string;
  className?: string;
}

// Extra iframe height (px) rendered above and below the video and clipped away,
// which keeps the embed's own title bar, logo and paused-state suggestions
// out of view. The video itself still fills the box edge to edge.
const IFRAME_BLEED = 140;

export default function LockedYouTubePlayer({
  videoUrlOrId,
  orientation = "horizontal",
  posterSrc,
  posterAlt = "Video preview",
  label = "Tap to play",
  className,
}: LockedYouTubePlayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const isPlayingRef = useRef(false);

  // Nothing from YouTube is loaded until the user presses play.
  const [activated, setActivated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);

  const videoId = extractYouTubeId(videoUrlOrId);
  const isLandscape = orientation !== "vertical";

  const thumbs = getThumbnailSources(videoId);
  const posterUrl = posterSrc ?? thumbs[Math.min(thumbIndex, thumbs.length - 1)];

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  /* ---- Create the player on demand (first press) ---- */
  useEffect(() => {
    if (!activated) return;
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let blockedTimer: ReturnType<typeof setTimeout> | undefined;

    loadYouTubeIframeAPI()
      .then(() => {
        if (cancelled || !window.YT?.Player) return;

        // YouTube replaces the element it is given, so hand it a node that
        // React doesn't own to avoid removeChild errors on unmount.
        const mount = document.createElement("div");
        host.appendChild(mount);

        playerRef.current = new window.YT.Player(mount, {
          videoId,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            cc_load_policy: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            loop: 1,
            playlist: videoId,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return;

              const iframe = event.target.getIframe?.();
              if (iframe) {
                iframe.title = "Video player";
                iframe.tabIndex = -1;
                iframe.setAttribute("aria-hidden", "true");
              }

              setIsReady(true);
              setIsMuted(event.target.isMuted());
              event.target.playVideo();

              // If the browser refuses to autoplay, hand control back to the
              // user so a second tap (a real gesture) starts playback.
              blockedTimer = setTimeout(() => {
                if (!cancelled && !isPlayingRef.current) setAutoplayBlocked(true);
              }, 3000);
            },
            onStateChange: (event) => {
              if (cancelled) return;

              if (event.data === YT_PLAYING) {
                clearTimeout(blockedTimer);
                setHasStarted(true);
                setIsPlaying(true);
                setAutoplayBlocked(false);
              } else if (event.data === YT_PAUSED) {
                setIsPlaying(false);
              } else if (event.data === YT_ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setActivated(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(blockedTimer);
      try {
        playerRef.current?.destroy();
      } catch {
        /* player already gone */
      }
      playerRef.current = null;
      host.replaceChildren();
      setIsReady(false);
      setHasStarted(false);
      setIsPlaying(false);
      setAutoplayBlocked(false);
    };
  }, [activated, videoId]);

  /* ---- Pause automatically when scrolled out of view ---- */
  useEffect(() => {
    if (!isPlaying) return;
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) playerRef.current?.pauseVideo();
      },
      { threshold: 0.25 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [isPlaying]);

  const handleTogglePlay = useCallback(() => {
    if (!activated) {
      setActivated(true);
      return;
    }

    const player = playerRef.current;
    if (!player || !isReady) return;

    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setHasStarted(true);
      setIsPlaying(true);
    }
  }, [activated, isReady, isPlaying]);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const player = playerRef.current;
    if (!player || !isReady) return;

    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const isWaiting = activated && !hasStarted && !autoplayBlocked;

  return (
    <div
      ref={rootRef}
      onContextMenu={(e) => e.preventDefault()}
      className={cn(
        "group relative w-full overflow-hidden bg-black select-none",
        isLandscape ? "aspect-video" : "aspect-9/16",
        className
      )}
    >
      {/* Poster: the video's own thumbnail, shown until playback begins */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterUrl}
        alt={posterAlt}
        loading="lazy"
        decoding="async"
        draggable={false}
        onLoad={(e) => {
          // YouTube serves a tiny placeholder instead of a 404 in some cases
          if (!posterSrc && e.currentTarget.naturalWidth <= 120) {
            setThumbIndex((i) => Math.min(i + 1, thumbs.length - 1));
          }
        }}
        onError={() => {
          if (!posterSrc) setThumbIndex((i) => Math.min(i + 1, thumbs.length - 1));
        }}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 group-hover:scale-[1.02]",
          hasStarted ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Video layer (fades in over the poster once frames are playing) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300",
          hasStarted ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          ref={hostRef}
          style={
            isLandscape
              ? { top: -IFRAME_BLEED, bottom: -IFRAME_BLEED }
              : undefined
          }
          className={cn(
            "absolute inset-x-0 [&_iframe]:block [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0",
            !isLandscape && "inset-y-0"
          )}
        />
      </div>

      {/* Initial Center Play Trigger Overlay */}
      {!isPlaying && (
        <button
          type="button"
          onClick={handleTogglePlay}
          onPointerEnter={warmUpPlayer}
          onTouchStart={warmUpPlayer}
          onFocus={warmUpPlayer}
          disabled={isWaiting}
          aria-label="Play video"
          className="absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center bg-bone/45 px-6 text-center backdrop-blur-[1px] transition-colors duration-300 active:scale-[0.99] cursor-pointer"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-umber/60 bg-paper/90 text-umber shadow-md transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="ml-0.5 h-6 w-6"
            >
              <path
                d="M8 6.5L17.5 12L8 17.5V6.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {label && (
            <span className="mt-4 rounded-full bg-paper/85 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-umber">
              {isWaiting ? "Loading..." : label}
            </span>
          )}
        </button>
      )}

      {/* Transparent Shield When Playing */}
      {isPlaying && (
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label="Pause video"
          className="absolute inset-0 z-10 h-full w-full cursor-pointer bg-transparent"
        />
      )}

      {/* Minimal Custom Controls: ONLY Play/Pause & Mute */}
      {hasStarted && (
        <div className="pointer-events-none absolute bottom-3.5 left-3.5 right-3.5 z-30 flex items-center justify-between">
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black cursor-pointer"
          >
            {isPlaying ? (
              <>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white backdrop-blur-md transition hover:bg-black cursor-pointer"
          >
            {isMuted ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
                />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
