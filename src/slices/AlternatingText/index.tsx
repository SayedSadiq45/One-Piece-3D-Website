"use client";

import { Bounded } from "@/components/Bounded";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import SplitText from "@/components/reactbits/SplitText";

const SECTIONS = [
  {
    index: "01",
    heading: "Brewed on the Thousand Sunny",
    body: "Small-batch carbonation, shaken by real waves. Franky tuned the pressure himself — SUPER crisp bubbles from the first crack to the last drop.",
  },
  {
    index: "02",
    heading: "Real Fruit. No Curse.",
    body: "All the punch of a devil fruit with none of the downsides. You can still swim after drinking one — Luffy tested it so you don't have to. He sank. He always sinks.",
  },
  {
    index: "03",
    heading: "Crew-Sized Rations",
    body: "Stock the galley with 12-packs built for long voyages. Sanji-approved pairings printed on every case, from Baratie curry to sea-king steak.",
  },
];

/**
 * AlternatingText — story sections with the floating can weaving between them,
 * on a deep-sea backdrop with scroll-scrubbed copy.
 */
const AlternatingText = (): JSX.Element => {
  return (
    <Bounded className="alternating-text-container op-grain relative bg-[#0D1A2A] text-[#ECE4D3]">
      {/* Faint Grand Line sea-chart / map texture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/bg-map.png')] bg-cover bg-center opacity-[0.07] mix-blend-luminosity"
      />
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {SECTIONS.map((item, index) => (
            <div
              key={item.heading}
              className="alternating-section grid min-h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-2xl border border-[#C9A227]/15 bg-[#0B0E14]/60 p-8 backdrop-blur-md md:p-10",
                )}
              >
                <span className="op-kicker text-sm text-[#C9A227]/70">
                  {item.index} / 03
                </span>
                <SplitText
                  as="h2"
                  text={item.heading}
                  splitBy="words"
                  stagger={0.05}
                  className="op-title mt-3 text-balance text-4xl md:text-6xl"
                />
                <div className="op-rule my-6 w-24" />
                <ScrollReveal className="text-lg leading-relaxed text-[#ECE4D3] md:text-xl">
                  {item.body}
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
