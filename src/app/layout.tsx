import type { Metadata } from "next";
import { Albert_Sans, Nanum_Myeongjo } from "next/font/google";
import { SmoothScrollProvider } from "@/motion/SmoothScrollProvider";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
// import FooterSection from "@/components/sections/FooterSection";
import SmoothHashNavigator from "@/motion/SmoothHashNavigator";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-serif",
  display: "swap",
});

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
      className={`${albertSans.variable} ${nanumMyeongjo.variable}`}
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