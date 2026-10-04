"use client";

import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";

import FloatingCan from "@/components/FloatingCan";
import { DRINKS } from "@/data/drinks";
import { ArrowIcon } from "./ArrowIcon";
import { ThunderBolts, ThunderBoltsHandle } from "./ThunderBolts";
import { WavyCircles } from "./WavyCircles";
import ShinyText from "@/components/reactbits/ShinyText";
import GradientText from "@/components/reactbits/GradientText";
import StarBorder from "@/components/reactbits/StarBorder";
import Magnet from "@/components/reactbits/Magnet";

const SPINS_ON_CHANGE = 8;

// ─── Front-facing adjustment ────────────────────────────────────────────
// The can group's resting rotation. Since the flavor-change spin below
// moves the can by whole multiples of 2*PI (`+=`/`-=`), whatever value you
// set here is where the can settles after every spin too — so this alone
// controls which side faces the camera in the carousel.
const CAN_FRONT_ROTATION_Y = -(Math.PI * 1 * 1.62); // 10% turn left

/**
 * Carousel — "Choose Your Nakama" character drink selector.
 */
const Carousel = (): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);
  const thunderRef = useRef<ThunderBoltsHandle>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + DRINKS.length) % DRINKS.length;

    // Thunderclap tinted with the next character's color
    thunderRef.current?.strike(DRINKS[nextIndex].color);

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: DRINKS[nextIndex].color,
          fill: DRINKS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  const current = DRINKS[currentFlavorIndex];

  return (
    <section
      id="crew"
      className="carousel op-grain op-seam relative grid min-h-screen grid-rows-[auto,1fr,auto] justify-items-center overflow-hidden bg-[#0B0E14] py-16 text-[#ECE4D3] md:py-24"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#141C2B] opacity-70" />

      {/* Tiled wanted-poster texture, very faint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/bg-wanted-posters.jfif')] bg-repeat opacity-[0.06] mix-blend-screen"
      />

      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#141C2B] opacity-80" />

      <ThunderBolts ref={thunderRef} />

      {/* Header */}
      <div className="relative z-10 text-center">
        <p className="op-kicker text-xs text-[#C9A227] md:text-sm">
          <ShinyText text="Pick Your Fighter" speed={6} />
        </p>
        <h2 className="op-title mt-3 text-5xl uppercase md:text-8xl">
          <GradientText colors={["#E7CF7A", "#C9A227", "#B3111C", "#C9A227"]}>
            Choose Your Nakama
          </GradientText>
        </h2>
        <div className="op-rule mx-auto mt-6 w-32" />
      </div>

      {/* Can stage */}
      <div className="relative z-10 grid w-full max-w-5xl grid-cols-[auto,1fr,auto] items-center">
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="left"
          label="Previous Drink"
        />
        <View className="mx-auto aspect-square h-[60vmin] min-h-40 w-full">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={current.key}
              rotation={[0, CAN_FRONT_ROTATION_Y, 0]}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Drink"
        />
      </div>

      {/* Details */}
      <div className="text-area relative z-10 mx-auto max-w-2xl px-4 text-center">
        <div className="text-wrapper">
          <p className="op-title text-4xl md:text-6xl">
            <GradientText colors={["#F5E6B3", "#C9A227", "#E7CF7A"]}>
              {current.name}
            </GradientText>
          </p>
          <p className="mt-2 font-pirate text-xl tracking-[0.2em] text-[#C9A227]">
            {current.character}
          </p>
          <p className="mt-3 text-base text-[#ECE4D3]/60 md:text-lg">
            &ldquo;{current.tagline}&rdquo;
          </p>
          <p className="mt-4 text-base font-normal leading-relaxed text-[#ECE4D3]/80 md:text-lg">
            {current.flavorNotes}
          </p>
        </div>

        <div className="op-rule mx-auto mt-7 w-24" />

        <div className="mt-6 flex items-center justify-center gap-6">
          <span className="font-display text-sm uppercase tracking-[0.3em] text-[#C9A227]/80">
            300 Berries · 12-Pack
          </span>
        </div>

        <Magnet strength={16} className="mt-7">
          <StarBorder as="a" href="#manifest" speed="6s">
            Stow in the Hold
          </StarBorder>
        </Magnet>
      </div>

      {/* Flavor dot navigation */}
      <div className="relative z-10 col-span-full mt-10 flex items-center justify-center gap-3">
        {DRINKS.map((drink, i) => (
          <button
            key={drink.key}
            aria-label={`Show ${drink.name}`}
            onClick={() => changeFlavor(i)}
            className={clsx(
              "h-2 rounded-full transition-all duration-300",
              i === currentFlavorIndex
                ? "w-8 bg-[#C9A227]"
                : "w-2 bg-[#ECE4D3]/25 hover:bg-[#ECE4D3]/50",
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({ label, onClick, direction = "right" }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="z-10 size-12 rounded-full border border-[#C9A227]/40 bg-[#141C2B]/60 p-3 text-[#C9A227] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#C9A227] hover:bg-[#141C2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
