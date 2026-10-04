"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { StrawHatMark } from "@/components/StrawHatMark";
import { TextSplitter } from "@/components/TextSplitter";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Hero — "Grand Line Fizz" landing section.
 */
const Hero = (): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 1,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          {
            backgroundColor: "#0B0E14", // deep sea
          },
          {
            backgroundColor: "#0D1A2A", // darker toward the horizon
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded className="hero opacity-0">
      {/* IMAGE PLACEHOLDER: faint One Piece backdrop behind the hero
          (Going Merry silhouette on open sea, clouds, seagulls).
          Replace /public/images/bg-hero.png */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/bg-hero.jpg')] bg-cover bg-center "
      />
      {/* unify the tone across both hero screens so the "Bottled Haki" panel
          settles into the same deep-sea color as the top of the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B0E14]/10 via-[#0B0E14]/10 to-[#0D1A2A]"
      />

      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={300} speed={2} repeat={true} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <StrawHatMark className="hero-mark mb-6 h-20 w-20 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] md:h-24 md:w-24" />
            {/* <h1 className="hero-header font-display text-7xl font-black uppercase leading-[.8] text-red-600 md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                text="Grand Line Fizz"
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1> */}
            <div className="hero-subheading mt-12 font-pirate text-5xl font-semibold text-[#ECE4D3] lg:text-6xl">
              <p>Drink Like the Pirate King</p>
            </div>
            <div className="hero-body text-2xl font-normal text-[#ECE4D3]/80">
              <p>Six devil-fruit-grade sodas, one for every legend of the crew.</p>
            </div>
            <Button
              href="#crew"
              buttonText="Join the Crew"
              className="hero-button mt-12"
            />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          {/* IMAGE PLACEHOLDER: mobile-only shot of two cans clinking
              (Luffy & Zoro cans, ocean spray). Replace /public/images/hero-cans-mobile.png */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full md:hidden"
            src="/images/hero-cans.png"
            alt="Grand Line Fizz cans"
          />
          <div>
            <h2 className="text-side-heading font-display text-balance text-6xl font-black uppercase text-[#ECE4D3] lg:text-8xl">
              <TextSplitter text="Bottled Haki" />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-[#ECE4D3]/80">
              <p>
                Every can is brewed from real fruit hauled straight off the
                Grand Line — mikan from Cocoyasi, sakura from Drum Island, chili
                from the Baratie&apos;s spice locker. No devil fruit curse, all
                of the power. Crack one open and feel your Gear change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
