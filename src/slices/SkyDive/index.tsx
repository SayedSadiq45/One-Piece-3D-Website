"use client";

import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { View } from "@react-three/drei";
import SplitText from "@/components/reactbits/SplitText";
import ShinyText from "@/components/reactbits/ShinyText";

const SENTENCE = "Set sail. Stay fizzy.";

/**
 * SkyDive — a can free-falling through the clouds above the Grand Line.
 * The 3D scene animates the letters; the overlay adds an editorial kicker
 * and corner framing so the moment reads like a title card, not a demo.
 */
const SkyDive = (): JSX.Element => {
  return (
    <Bounded className="skydive relative min-h-screen overflow-hidden bg-[#0D1A2A]">
      <h2 className="sr-only">{SENTENCE}</h2>

      {/* Title-card overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-between py-16 md:py-24">
        <p className="op-kicker text-xs text-[#C9A227] md:text-sm">
          <ShinyText text="Chapter 01 · The Descent" speed={6} />
        </p>
        <div className="text-center">
          <SplitText
            as="p"
            text="Terminal velocity, maximum fizz."
            splitBy="words"
            stagger={0.08}
            className="font-pirate text-xl text-[#ECE4D3]/80 md:text-3xl"
          />
        </div>
      </div>

      {/* Corner framing marks */}
      <span className="pointer-events-none absolute left-6 top-6 z-20 h-10 w-10 border-l border-t border-[#C9A227]/40 md:left-10 md:top-10" />
      <span className="pointer-events-none absolute right-6 top-6 z-20 h-10 w-10 border-r border-t border-[#C9A227]/40 md:right-10 md:top-10" />
      <span className="pointer-events-none absolute bottom-6 left-6 z-20 h-10 w-10 border-b border-l border-[#C9A227]/40 md:bottom-10 md:left-10" />
      <span className="pointer-events-none absolute bottom-6 right-6 z-20 h-10 w-10 border-b border-r border-[#C9A227]/40 md:bottom-10 md:right-10" />

      <View className="h-screen w-screen">
        <Scene flavor="luffy" sentence={SENTENCE} />
      </View>
    </Bounded>
  );
};

export default SkyDive;
