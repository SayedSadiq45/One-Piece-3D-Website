"use client";

import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  text: string;
  className?: string;
  /** split unit */
  splitBy?: "chars" | "words";
  /** stagger between units in seconds */
  stagger?: number;
  /** play when the element scrolls into view instead of on mount */
  onScroll?: boolean;
  as?: React.ElementType;
};

/**
 * SplitText — reactbits.dev-style entrance where each character (or word)
 * rises, unblurs and fades in with a GSAP stagger. Fires on scroll-in by
 * default so sections animate as the reader reaches them.
 */
export default function SplitText({
  text,
  className,
  splitBy = "chars",
  stagger = 0.03,
  onScroll = true,
  as: Comp = "span",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const units = splitBy === "words" ? text.split(" ") : text.split("");

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll(".rb-split-unit");
      gsap.from(targets, {
        yPercent: 120,
        opacity: 0,
        filter: "blur(8px)",
        rotate: splitBy === "chars" ? 6 : 0,
        ease: "power3.out",
        duration: 0.8,
        stagger,
        scrollTrigger: onScroll
          ? { trigger: ref.current, start: "top 85%", once: true }
          : undefined,
      });
    },
    { scope: ref },
  );

  return (
    <Comp ref={ref} className={clsx("rb-split inline-block", className)}>
      {units.map((u, i) => (
        <span
          key={i}
          className="rb-split-unit inline-block whitespace-pre will-change-transform"
        >
          {u}
          {splitBy === "words" && i < units.length - 1 ? " " : ""}
        </span>
      ))}
    </Comp>
  );
}
