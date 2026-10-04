"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShinyText from "@/components/reactbits/ShinyText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * BigText — the closing type-slam. Jolly-Roger crimson with a molten-gold
 * fill; the middle words drift on scroll for a cinematic parallax finale.
 */
const BigText = (): JSX.Element => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      tl.fromTo(
        ".bigtext-drift-left",
        { xPercent: -12 },
        { xPercent: 6, ease: "none" },
        0,
      )
        .fromTo(
          ".bigtext-drift-right",
          { xPercent: 12 },
          { xPercent: -6, ease: "none" },
          0,
        )
        .from(
          ".bigtext-line",
          { opacity: 0, filter: "blur(12px)", stagger: 0.15, ease: "none" },
          0,
        );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="op-grain relative min-h-screen w-screen overflow-hidden bg-[#B3111C] text-[#FFD23F]"
    >
      <div className="flex min-h-screen flex-col justify-center py-16">
        <p className="mb-6 text-center">
          <span className="op-kicker text-sm text-[#FFD23F]/80 md:text-base">
            <ShinyText text="Weigh Anchor" speed={6} />
          </span>
        </p>
        <h2 className="grid w-full gap-[2.5vw] text-center font-display font-black uppercase leading-[.72] drop-shadow-[0_6px_0_rgba(0,0,0,0.15)]">
          <div className="bigtext-line text-[30vw]">Fizz</div>
          <div className="grid gap-[2.5vw] text-[30vw] md:flex md:justify-center md:text-[11vw]">
            <span className="bigtext-line bigtext-drift-left inline-block">
              worthy
            </span>
            <span className="bigtext-line inline-block max-md:text-[24vw]">
              of the
            </span>
            <span className="bigtext-line bigtext-drift-right inline-block max-md:text-[36vw]">
              Pirate
            </span>
          </div>
          <div className="bigtext-line text-[28vw]">King</div>
        </h2>
        <p className="mt-10 text-center font-pirate text-xl text-[#FFD23F]/80 md:text-2xl">
          Set sail. Stay fizzy. Never sink (results may vary).
        </p>
      </div>
    </section>
  );
};

export default BigText;
