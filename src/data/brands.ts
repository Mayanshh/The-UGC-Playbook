export interface BrandLogoItem {
  id: string;
  name: string;
  category?: string;
  /** Path to the logo file in /public */
  logo: string;
  /** Intrinsic size (used for aspect ratio only; display size is controlled in the component) */
  width: number;
  height: number;
  /** Optical scale multiplier (e.g. 1.25 for square/compact marks) */
  scale?: number;
  /** Strip solid outer background on raster images via canvas flood-fill */
  removeBg?: boolean;
}

export const PARTNER_BRANDS: BrandLogoItem[] = [
  {
    id: "nykaa",
    name: "Nykaa",
    category: "Beauty & Retail",
    logo: "/media/brands/nykaa.svg",
    width: 140,
    height: 48,
  },
  {
    id: "dot-and-key",
    name: "Dot&key",
    category: "Skincare",
    logo: "/media/brands/dot&key.svg",
    width: 150,
    height: 48,
  },
  {
    id: "kay-beauty",
    name: "Kay beauty",
    category: "Cosmetics",
    logo: "/media/brands/kay-beauty-2.avif",
    width: 160,
    height: 48,
    removeBg: true,
  },
  {
    id: "eucerin",
    name: "Eucerine",
    category: "Dermocosmetics",
    logo: "/media/brands/eucerin.svg",
    width: 140,
    height: 48,
  },
  {
    id: "garnier",
    name: "Garnier",
    category: "Personal Care",
    logo: "/media/brands/Garnier.svg",
    width: 140,
    height: 48,
  },
  {
    id: "myntra",
    name: "Myntra",
    category: "Fashion",
    logo: "/media/brands/myntra.png",
    width: 140,
    height: 48,
    scale: 1.25,
    removeBg: true,
  },
  {
    id: "savana",
    name: "Savana",
    category: "Fashion",
    logo: "/media/brands/savana.png",
    width: 140,
    height: 48,
    scale: 1.2,
    removeBg: true,
  },
  {
    id: "rareism",
    name: "Rareism",
    category: "Apparel",
    logo: "/media/brands/rareism.png",
    width: 140,
    height: 200,
    removeBg: true,
  },
  {
    id: "kazo",
    name: "Kazo",
    category: "Fashion",
    logo: "/media/brands/kazo.png",
    width: 120,
    height: 48,
    scale: 1.2,
    removeBg: true,
  },
  {
    id: "tanishq",
    name: "Tanishq",
    category: "Jewellery",
    logo: "/media/brands/tanishq.svg",
    width: 145,
    height: 48,
  },
  {
    id: "newme",
    name: "Newme",
    category: "Fashion",
    logo: "/media/brands/newme.jpeg",
    width: 135,
    height: 48,
    scale: 1.2,
    removeBg: true,
  },
  {
    id: "bershka",
    name: "Bershka",
    category: "Fashion",
    logo: "/media/brands/bershka.svg",
    width: 150,
    height: 48,
  },
  {
    id: "airbnb",
    name: "Airbnb",
    category: "Travel",
    logo: "/media/brands/airbnb.svg",
    width: 135,
    height: 48,
  },
  {
    id: "booking-com",
    name: "Booking.com",
    category: "Travel",
    logo: "/media/brands/booking-com.svg",
    width: 170,
    height: 48,
  },
];