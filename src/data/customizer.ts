export interface ColorPaletteConfig {
  bg: string;
  primary: string;
  secondary: string;
  accent: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  mood: string;
  palette: ColorPaletteConfig;
  swatches: string[];
}

export interface FontOption {
  id: string;
  label: string;
  styleNote: string;
  cssVar: string;
}

export const DEFAULT_PALETTE: ColorPaletteConfig = {
  bg: "#FAF7F2",
  primary: "#23211E",
  secondary: "#6C635B",
  accent: "#E4CBB6",
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "sunlit-linen",
    name: "Sunlit Linen",
    mood: "Warm & Airy",
    palette: {
      bg: "#FAF7F2",
      primary: "#23211E",
      secondary: "#6C635B",
      accent: "#E4CBB6",
    },
    swatches: ["#FAF7F2", "#23211E", "#6C635B", "#E4CBB6"],
  },
  {
    id: "monochromatic-chalk",
    name: "Monochromatic Chalk",
    mood: "Pure Minimal",
    palette: {
      bg: "#F8F8F7",
      primary: "#1C1C1B",
      secondary: "#686865",
      accent: "#D8D7D3",
    },
    swatches: ["#F8F8F7", "#1C1C1B", "#686865", "#D8D7D3"],
  },
  {
    id: "peach-sorbet",
    name: "Peach Sorbet",
    mood: "Upbeat Creator",
    palette: {
      bg: "#FFF8F3",
      primary: "#2B1E18",
      secondary: "#7B5747",
      accent: "#F6C8A8",
    },
    swatches: ["#FFF8F3", "#2B1E18", "#7B5747", "#F6C8A8"],
  },
  {
    id: "pistachio-dew",
    name: "Pistachio Dew",
    mood: "Fresh & Calm",
    palette: {
      bg: "#F5F9F4",
      primary: "#1D2920",
      secondary: "#526958",
      accent: "#B8DEC2",
    },
    swatches: ["#F5F9F4", "#1D2920", "#526958", "#B8DEC2"],
  },
  {
    id: "sky-porcelain",
    name: "Sky Porcelain",
    mood: "Crisp Daylight",
    palette: {
      bg: "#F5F8FC",
      primary: "#1B2430",
      secondary: "#50637A",
      accent: "#BFD7F2",
    },
    swatches: ["#F5F8FC", "#1B2430", "#50637A", "#BFD7F2"],
  },
  {
    id: "blush-petals",
    name: "Blush Petals",
    mood: "Soft Editorial",
    palette: {
      bg: "#FDF5F7",
      primary: "#2C1D22",
      secondary: "#7A5260",
      accent: "#F3C3D1",
    },
    swatches: ["#FDF5F7", "#2C1D22", "#7A5260", "#F3C3D1"],
  },
  {
    id: "golden-honey",
    name: "Golden Honey",
    mood: "Bright & Optimistic",
    palette: {
      bg: "#FEF9EE",
      primary: "#282112",
      secondary: "#75633B",
      accent: "#F2D58A",
    },
    swatches: ["#FEF9EE", "#282112", "#75633B", "#F2D58A"],
  },
];

export const HEADING_FONTS: FontOption[] = [
  {
    id: "nanum-myeongjo",
    label: "Nanum Myeongjo",
    styleNote: "Editorial Serif",
    cssVar: "var(--font-nanum-myeongjo)",
  },
  {
    id: "cormorant",
    label: "Cormorant Garamond",
    styleNote: "Graceful Display",
    cssVar: "var(--font-cormorant)",
  },
  {
    id: "instrument-serif",
    label: "Instrument Serif",
    styleNote: "Tall Magazine",
    cssVar: "var(--font-instrument-serif)",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    styleNote: "Classic Contrast",
    cssVar: "var(--font-playfair)",
  },
  {
    id: "plus-jakarta",
    label: "Plus Jakarta Sans",
    styleNote: "Clean Modern",
    cssVar: "var(--font-plus-jakarta)",
  },
];

export const BODY_FONTS: FontOption[] = [
  {
    id: "albert-sans",
    label: "Albert Sans",
    styleNote: "Balanced Geometric",
    cssVar: "var(--font-albert-sans)",
  },
  {
    id: "dm-sans",
    label: "DM Sans",
    styleNote: "Friendly & Crisp",
    cssVar: "var(--font-dm-sans)",
  },
  {
    id: "plus-jakarta",
    label: "Plus Jakarta Sans",
    styleNote: "Warm Studio Sans",
    cssVar: "var(--font-plus-jakarta)",
  },
  {
    id: "inter",
    label: "Inter",
    styleNote: "Ultra Legible",
    cssVar: "var(--font-inter)",
  },
];

export const FONT_PAIRINGS = [
  {
    id: "editorial-grace",
    name: "Editorial Grace",
    headingId: "cormorant",
    bodyId: "dm-sans",
  },
  {
    id: "sunlit-playbook",
    name: "Sunlit Playbook",
    headingId: "nanum-myeongjo",
    bodyId: "albert-sans",
  },
  {
    id: "modern-creator",
    name: "Modern Creator",
    headingId: "plus-jakarta",
    bodyId: "plus-jakarta",
  },
  {
    id: "gallery-print",
    name: "Gallery Print",
    headingId: "instrument-serif",
    bodyId: "inter",
  },
];