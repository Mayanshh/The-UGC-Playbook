"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BODY_FONTS,
  DEFAULT_PALETTE,
  FONT_PAIRINGS,
  HEADING_FONTS,
  THEME_PRESETS,
  type ColorPaletteConfig,
} from "@/data/customizer";
import { cn } from "@/lib/cn";

function applyPaletteToRoot(palette: ColorPaletteConfig) {
  const root = document.documentElement;
  root.style.setProperty("--bg-paper", palette.bg);
  root.style.setProperty("--bg-bone", palette.bg);
  root.style.setProperty("--bg-coco", palette.bg);
  root.style.setProperty("--bg-ink", palette.primary);
  root.style.setProperty("--bg-umber", palette.secondary);
  root.style.setProperty("--accent-oxblood", palette.accent);
  root.style.setProperty("--bg-taupe", palette.accent);
}

function applyFontsToRoot(headingCssVar: string, bodyCssVar: string) {
  const root = document.documentElement;
  root.style.setProperty("--font-serif", headingCssVar);
  root.style.setProperty("--font-sans", bodyCssVar);
}

export function FloatingCustomizer() {
  const pathname = usePathname();
  const isCustomiseRoute = pathname === "/customise";

  const [expanded, setExpanded] = useState(true);
  const [activeThemeId, setActiveThemeId] = useState<string>("sunlit-linen");
  const [palette, setPalette] = useState<ColorPaletteConfig>(DEFAULT_PALETTE);
  const [headingFontId, setHeadingFontId] = useState<string>(HEADING_FONTS[0].id);
  const [bodyFontId, setBodyFontId] = useState<string>(BODY_FONTS[0].id);
  const [headingScale, setHeadingScale] = useState<number>(1);
  const [surfaceTint, setSurfaceTint] = useState<"soft" | "crisp" | "warm">("soft");

  useEffect(() => {
    applyPaletteToRoot(palette);
  }, [palette]);

  useEffect(() => {
    const heading =
      HEADING_FONTS.find((f) => f.id === headingFontId)?.cssVar ??
      HEADING_FONTS[0].cssVar;
    const body =
      BODY_FONTS.find((f) => f.id === bodyFontId)?.cssVar ?? BODY_FONTS[0].cssVar;
    applyFontsToRoot(heading, body);
  }, [headingFontId, bodyFontId]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--customizer-heading-scale",
      String(headingScale)
    );
  }, [headingScale]);

  useEffect(() => {
    const tintMap = {
      soft: { border: "rgba(35, 33, 30, 0.12)", radius: "1rem" },
      crisp: { border: "rgba(35, 33, 30, 0.2)", radius: "0.5rem" },
      warm: { border: "rgba(108, 99, 91, 0.22)", radius: "1.5rem" },
    } as const;
    const chosen = tintMap[surfaceTint];
    document.documentElement.style.setProperty("--border-subtle", chosen.border);
    document.documentElement.style.setProperty("--customizer-radius", chosen.radius);
  }, [surfaceTint]);

  // Only show the dock when on /customise
  if (!isCustomiseRoute) {
    return null;
  }

  const handleSelectPreset = (presetId: string) => {
    const preset = THEME_PRESETS.find((t) => t.id === presetId);
    if (!preset) return;
    setActiveThemeId(preset.id);
    setPalette(preset.palette);
  };

  const handleColorChange = (key: keyof ColorPaletteConfig, value: string) => {
    setActiveThemeId("custom");
    setPalette((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyPairing = (pairingId: string) => {
    const pair = FONT_PAIRINGS.find((p) => p.id === pairingId);
    if (!pair) return;
    setHeadingFontId(pair.headingId);
    setBodyFontId(pair.bodyId);
  };

  const handleReset = () => {
    setActiveThemeId("sunlit-linen");
    setPalette(DEFAULT_PALETTE);
    setHeadingFontId(HEADING_FONTS[0].id);
    setBodyFontId(BODY_FONTS[0].id);
    setHeadingScale(1);
    setSurfaceTint("soft");
  };

  return (
    <div
      data-lenis-prevent
      className="fixed bottom-4 left-1/2 z-50 w-[min(94vw,740px)] -translate-x-1/2"
    >
      {expanded && (
        <div
          style={{ borderRadius: "var(--customizer-radius, 1rem)" }}
          className="mb-2.5 max-h-[72vh] overflow-y-auto subtle-scrollbar border border-ink/15 bg-paper/95 p-4 text-ink shadow-xl backdrop-blur-md md:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-ink/15" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-umber">
                UGC Creator Palette & Font Studio
              </span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-ink/15 bg-bone px-3 py-1 font-sans text-[11px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Reset Defaults
            </button>
          </div>

          {/* Light & Positive Theme Presets */}
          <div className="mt-3.5">
            <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-umber">
              Light Palettes & Themes
            </p>
            <div className="flex flex-wrap gap-2">
              {THEME_PRESETS.map((preset) => {
                const selected = activeThemeId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-left font-sans text-xs transition-all",
                      selected
                        ? "border-ink bg-ink text-paper shadow-2xs"
                        : "border-ink/15 bg-bone/80 text-ink hover:border-ink/35"
                    )}
                  >
                    <span className="flex -space-x-1">
                      {preset.swatches.map((hex) => (
                        <span
                          key={hex}
                          style={{ backgroundColor: hex }}
                          className="h-3 w-3 rounded-full border border-black/15"
                        />
                      ))}
                    </span>
                    <span className="font-medium">{preset.name}</span>
                    <span
                      className={cn(
                        "hidden text-[10px] sm:inline",
                        selected ? "text-paper/75" : "text-umber"
                      )}
                    >
                      · {preset.mood}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BG, Primary, Secondary, Accent Color Pickers */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {(
              [
                ["bg", "Background"],
                ["primary", "Primary"],
                ["secondary", "Secondary"],
                ["accent", "Accent"],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center justify-between gap-2 rounded-xl border border-ink/15 bg-bone/75 px-3 py-2 font-sans text-xs"
              >
                <span className="font-medium text-ink">{label}</span>
                <input
                  type="color"
                  value={palette[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  aria-label={`${label} color`}
                  className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                />
              </label>
            ))}
          </div>

          {/* Curated Elegant Font Pairings */}
          <div className="mt-4">
            <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-umber">
              Curated Font Pairings
            </p>
            <div className="flex flex-wrap gap-1.5">
              {FONT_PAIRINGS.map((pair) => (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => handleApplyPairing(pair.id)}
                  className="rounded-full border border-ink/15 bg-bone/75 px-3 py-1 font-sans text-xs font-medium text-ink transition-colors hover:border-ink/40 hover:bg-bone"
                >
                  {pair.name}
                </button>
              ))}
            </div>
          </div>

          {/* Individual Heading & Body Font Selectors */}
          <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="heading-font-select"
                className="mb-1.5 block font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-umber"
              >
                Heading Font
              </label>
              <select
                id="heading-font-select"
                value={headingFontId}
                onChange={(e) => setHeadingFontId(e.target.value)}
                className="w-full rounded-xl border border-ink/15 bg-bone/80 px-3 py-2 font-sans text-xs font-medium text-ink outline-none focus:border-ink"
              >
                {HEADING_FONTS.map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.label} ({font.styleNote})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="body-font-select"
                className="mb-1.5 block font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-umber"
              >
                Body Font
              </label>
              <select
                id="body-font-select"
                value={bodyFontId}
                onChange={(e) => setBodyFontId(e.target.value)}
                className="w-full rounded-xl border border-ink/15 bg-bone/80 px-3 py-2 font-sans text-xs font-medium text-ink outline-none focus:border-ink"
              >
                {BODY_FONTS.map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.label} ({font.styleNote})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Extra Polish Options: Heading Scale & Card Feel */}
          <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 rounded-xl border border-ink/15 bg-bone/65 px-3 py-2 font-sans text-xs">
              <div className="flex items-center justify-between text-umber">
                <span>Heading Scale</span>
                <span className="font-semibold text-ink tabular-nums">
                  {Math.round(headingScale * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0.85}
                max={1.2}
                step={0.05}
                value={headingScale}
                onChange={(e) => setHeadingScale(parseFloat(e.target.value))}
                className="accent-ink cursor-pointer"
              />
            </label>

            <div className="flex flex-col justify-between gap-1.5 rounded-xl border border-ink/15 bg-bone/65 px-3 py-2 font-sans text-xs">
              <span className="text-umber">Corner & Frame Feel</span>
              <div className="flex gap-1.5">
                {(["soft", "crisp", "warm"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSurfaceTint(mode)}
                    className={cn(
                      "flex-1 rounded-lg px-2 py-1 text-[11px] font-medium capitalize transition-colors",
                      surfaceTint === mode
                        ? "bg-ink text-paper"
                        : "bg-paper text-ink hover:bg-bone"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Floating Dock Bar */}
      <div className="flex items-center justify-between gap-2 rounded-full border border-ink/15 bg-ink px-4 py-2 text-paper shadow-lg">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex flex-1 items-center gap-2.5 text-left font-sans text-xs font-medium"
        >
          <span className="flex -space-x-1.5">
            {[palette.bg, palette.primary, palette.secondary, palette.accent].map(
              (hex, idx) => (
                <span
                  key={`${hex}-${idx}`}
                  style={{ backgroundColor: hex }}
                  className="h-3.5 w-3.5 rounded-full border border-white/30"
                />
              )
            )}
          </span>
          <span className="truncate">
            {expanded ? "Collapse Dock" : "Open Palette & Font Dock"}
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          {THEME_PRESETS.slice(0, 3).map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset.id)}
              title={preset.name}
              className={cn(
                "hidden rounded-full px-2.5 py-1 font-sans text-[11px] transition-colors sm:inline-flex",
                activeThemeId === preset.id
                  ? "bg-paper font-semibold text-ink"
                  : "text-paper/80 hover:bg-white/10 hover:text-paper"
              )}
            >
              {preset.name.split(" ")[0]}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="rounded-full bg-paper px-3 py-1 font-sans text-[11px] font-semibold text-ink transition-transform active:scale-95"
          >
            {expanded ? "Hide" : "Customize"}
          </button>
        </div>
      </div>
    </div>
  );
}