import type { Metadata } from "next";
import {
  Albert_Sans,
  // Nanum_Myeongjo,
  // Playfair_Display,
  Cormorant_Garamond,
  // Instrument_Serif,
  // Plus_Jakarta_Sans,
  // DM_Sans,
  // Inter,
} from "next/font/google";
import { SmoothScrollProvider } from "@/motion/SmoothScrollProvider";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import SmoothHashNavigator from "@/motion/SmoothHashNavigator";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
  display: "swap",
});

// const nanumMyeongjo = Nanum_Myeongjo({
//   subsets: ["latin"],
//   weight: ["400", "700", "800"],
//   variable: "--font-nanum-myeongjo",
//   display: "swap",
// });

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// const instrumentSerif = Instrument_Serif({
//   subsets: ["latin"],
//   weight: ["400"],
//   variable: "--font-instrument-serif",
//   display: "swap",
// });

// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-playfair",
//   display: "swap",
// });

// const plusJakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   variable: "--font-plus-jakarta",
//   display: "swap",
// });

// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   variable: "--font-dm-sans",
//   display: "swap",
// });

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

const allFontVars = [
  albertSans.variable,
  // nanumMyeongjo.variable,
  cormorant.variable,
  // instrumentSerif.variable,
  // playfair.variable,
  // plusJakarta.variable,
  // dmSans.variable,
  // inter.variable,
].join(" ");

export const metadata: Metadata = {
  title: "The UGC Playbook — Creative Studio",
  description: "Awwwards-grade animated digital experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={
        {
          "--font-sans": "var(--font-albert-sans)",
          "--font-serif": "var(--font-cormorant)",
        } as React.CSSProperties
      }
      className={allFontVars}
    >
      <body className="bg-(--bg-bone) font-sans text-(--bg-ink) antialiased selection:bg-white selection:text-black">
        <SmoothHashNavigator
          headerOffset={32}
          duration={1.2}
          ease="power4.inOut"
          highlightTarget={true}
          routeTransitionVeil={true}
        />
        <SmoothScrollProvider>
          <Navbar variant="paper" />
          {children}
          {/* <FooterSection /> */}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}