"use client";

import { Bounded } from "@/components/Bounded";
import { DRINKS, type DrinkKey } from "@/data/drinks";
import SplitText from "@/components/reactbits/SplitText";
import ShinyText from "@/components/reactbits/ShinyText";
import CountUp from "@/components/reactbits/CountUp";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import Aurora from "@/components/reactbits/Aurora";

/**
 * The full lineup lives in a single hero shot (public/images/hero-cans.png) —
 * a 3-column × 2-row grid of the six cans. Rather than ship six separate
 * cut-outs, each card crops its can straight out of that image with a CSS
 * sprite: `background-size: 300% 240%` blows the image up so one cell fills
 * the frame, and `background-position` slides to the right can. The 4:5 frame
 * matches the cell aspect so the crop stays distortion-free.
 *
 * Grid layout in the source image:
 *   row 0 →  zoro   | luffy | nami
 *   row 1 →  chopper | sanji | ace
 */
const CAN_SPRITE: Record<DrinkKey, string> = {
  zoro: "3% 9%",
  luffy: "49% 9%",
  nami: "93% 9%",
  // bottom row sits a little high so the crop clears the feature-text bar
  // along the bottom edge of the source image
  chopper: "3% 84%",
  sanji: "49% 84%",
  ace: "93% 84%",
};

/**
 * FlavorGrid — "The Full Manifest". A spotlight-card grid of the whole
 * six-can lineup plus a count-up stat strip. This is the page's product
 * catalogue beat: scannable, premium, and it makes the range feel complete.
 */
const FlavorGrid = (): JSX.Element => {
  return (
    <Bounded
      as="section"
      className="manifest op-grain relative overflow-hidden bg-[#0B0E14] py-24 text-[#ECE4D3] md:py-32"
    >
      <div id="manifest" className="absolute -top-24" aria-hidden="true" />
      <Aurora
        colors={["#B3111C", "#C9A227", "#122B47"]}
        intensity={0.28}
        className="z-0"
      />

      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="op-kicker text-xs text-[#C9A227] md:text-sm">
            <ShinyText text="The Full Manifest" speed={6} />
          </p>
          <SplitText
            as="h2"
            text="Six Legends. One Cooler."
            splitBy="words"
            stagger={0.06}
            className="op-title mt-4 text-4xl uppercase md:text-7xl"
          />
          <div className="op-rule mx-auto mt-6 w-32" />
          <p className="mt-6 text-lg text-[#ECE4D3]/70">
            The whole crew, bottled. Pick a fighter — or requisition the full
            case and sail with all six.
          </p>
        </div>

        {/* Stat strip */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4 border-y border-[#C9A227]/20 py-8 text-center">
          <Stat value={<CountUp to={6} />} label="Devil Fruit Grades" />
          <Stat value={<CountUp to={0} />} label="Curses Included" />
          <Stat
            value={
              <>
                <CountUp to={100} />%
              </>
            }
            label="Real Fruit"
          />
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DRINKS.map((drink) => (
            <SpotlightCard
              key={drink.key}
              spotlightColor="rgba(201, 162, 39, 0.22)"
              className="flex flex-col p-6"
            >
              {/* accent bar tinted with the can color */}
              <span
                className="mb-6 block h-1 w-12 rounded-full"
                style={{ backgroundColor: drink.color }}
              />

              <div
                className="relative mb-6 overflow-hidden rounded-xl ring-1 ring-[#C9A227]/15"
                role="img"
                aria-label={`${drink.character} — ${drink.name}`}
              >
                {/* the can, cropped straight out of the shared hero shot */}
                <div
                  className="aspect-[4/5] w-full bg-no-repeat transition-transform duration-500 group-hover:scale-125"
                  style={{
                    backgroundImage: "url('/images/hero-cans.png')",
                    backgroundSize: "300% 240%",
                    backgroundPosition: CAN_SPRITE[drink.key],
                  }}
                />
                {/* can-colored wash that warms up on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30"
                  style={{ backgroundColor: drink.color }}
                  aria-hidden="true"
                />
                {/* bottom vignette so the card text below reads cleanly */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <p className="font-pirate text-sm tracking-[0.2em] text-[#C9A227]">
                {drink.character}
              </p>
              <h3 className="op-title mt-1 text-2xl md:text-3xl">{drink.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#ECE4D3]/70">
                {drink.flavorNotes}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[#C9A227]/15 pt-4">
                <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C9A227]/80">
                  300 Berries
                </span>
                <span className="font-pirate text-sm text-[#ECE4D3]/60">
                  {drink.tagline}
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <p className="op-title text-4xl text-[#C9A227] md:text-6xl">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#ECE4D3]/60 md:text-sm">
        {label}
      </p>
    </div>
  );
}

export default FlavorGrid;
