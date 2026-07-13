import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cinzel, Cormorant_Garamond } from "next/font/google";

import "./app.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";
import SiteThunder from "@/components/SiteThunder";

const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

// Display serif — carries the "premium adventure" tone (headings, big type).
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
  variable: "--font-display",
});

// Editorial italic — used for kickers / taglines with the pirate cadence.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  display: "swap",
  variable: "--font-pirate",
});

export const metadata: Metadata = {
  title: "Grand Line Fizz — Drink Like the Pirate King",
  description:
    "Six devil-fruit-grade sodas inspired by the Straw Hat crew. Real fruit, no curse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alpino.variable} ${cinzel.variable} ${cormorant.variable}`}
    >
      <body className="overflow-x-hidden bg-[#0B0E14] font-sans text-[#ECE4D3] antialiased">
        
        <main>
          {children}
          <ViewCanvas />
        </main>
        <SiteThunder />
      </body>
    </html>
  );
}
