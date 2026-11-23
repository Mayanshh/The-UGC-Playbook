// export interface HeroContent {
//   eyebrow: string;
//   headline: string;
//   subcopy: string;
//   backgroundImage: {
//     src: string;
//     alt: string;
//   };
//   mobile?: {
//     eyebrow: string;
//     headline: string;
//     subcopy: string;
//     highlights: string[];
//     cta: {
//       label: string;
//       href: string;
//     };
//   };
// }

export interface HeroOfferTicker {
  badge?: string;
  text: string;
  originalPrice?: string;
  salePrice?: string;
  ctaLabel: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subcopy: string;
  backgroundImage: {
    src: string;
    alt: string;
  };
  offer?: HeroOfferTicker;
  mobile?: {
    eyebrow: string;
    headline: string;
    subcopy: string;
    highlights: string[];
    cta: {
      label: string;
      href: string;
    };
  };
}