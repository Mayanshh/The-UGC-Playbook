"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          host?: string;
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
      PlayerState?: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
}

export function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const regex of patterns) {
    const match = trimmed.match(regex);
    if (match?.[1]) return match[1];
  }

  return trimmed;
}

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeIframeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();

  if (!ytApiPromise) {
    ytApiPromise = new Promise<void>((resolve) => {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      const prevReady = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        prevReady?.();
        resolve();
      };

      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.head.appendChild(tag);
      }
    });
  }

  return ytApiPromise;
}

export type VideoOrientation = "horizontal" | "vertical";

interface LockedYouTubePlayerProps {
  videoUrlOrId: string;
  /** Always defaults to landscape "horizontal" (16:9) */
  orientation?: VideoOrientation;
  posterSrc?: string;
  posterAlt?: string;
  label?: string;
  className?: string;
}

export default function LockedYouTubePlayer({
  videoUrlOrId,
  orientation = "horizontal",
  posterSrc,
  posterAlt = "Founder video preview",
  label = "Tap to play",
  className,
}: LockedYouTubePlayerProps) {
  const reactId = useId().replace(/:/g, "");
  const containerId = `yt-locked-${reactId}`;
  const playerRef = useRef<YTPlayerInstance | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoId = extractYouTubeId(videoUrlOrId);
  const isLandscape = orientation !== "vertical";

  useEffect(() => {
    let mounted = true;

    loadYouTubeIframeAPI().then(() => {
      if (!mounted || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: videoId,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady: (event) => {
            if (!mounted) return;
            setIsReady(true);
            setIsMuted(event.target.isMuted());
          },
          onStateChange: (event) => {
            if (!mounted) return;
            const YTState = window.YT?.PlayerState;
            if (!YTState) return;

            if (event.data === YTState.PLAYING) {
              setHasStarted(true);
              setIsPlaying(true);
            } else if (event.data === YTState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === YTState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      mounted = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [containerId, videoId]);

  const handleTogglePlay = () => {
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
  };

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

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden bg-black select-none",
        isLandscape ? "aspect-video" : "aspect-9/16",
        className
      )}
    >
      {/* Full-bleed 16:9 YouTube IFrame with zero extra bars */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300",
          hasStarted ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          id={containerId}
          className="h-full w-full [&_iframe]:block [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
        />
      </div>

      {/* Poster Cover Before First Play */}
      {!hasStarted && posterSrc && (
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      )}

      {/* Initial Center Play Trigger Overlay */}
      {!isPlaying && (
        <button
          type="button"
          onClick={handleTogglePlay}
          disabled={!isReady}
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
              {isReady ? label : "Loading..."}
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