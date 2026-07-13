"use client";

import Marquee from "@/components/reactbits/Marquee";

const ITEMS = [
  "Real Fruit",
  "No Curse",
  "300 Berries",
  "Brewed on the Sunny",
  "Six Legends",
  "Sail Fizzy",
];

/**
 * MarqueeBanner — a crimson velocity ribbon that separates the hero from the
 * rest of the voyage. Drifts on its own and reacts to scroll speed.
 */
const MarqueeBanner = (): JSX.Element => {
  return (
    <section className="op-seam relative border-y border-[#C9A227]/25 bg-[#B3111C] py-5 text-[#FFE9A8] md:py-6">
      <Marquee
        items={ITEMS}
        speed={55}
        className="font-display text-2xl font-bold uppercase tracking-[0.18em] md:text-4xl"
      />
      {/* soft fade at both edges so the ribbon dissolves into the panel */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#B3111C] to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#B3111C] to-transparent md:w-40" />
    </section>
  );
};

export default MarqueeBanner;
