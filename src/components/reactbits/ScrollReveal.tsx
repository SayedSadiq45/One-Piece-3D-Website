"use client";

import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: string;
  className?: string;
  /** brighten words as they pass through the viewport */
  baseOpacity?: number;
};

/**
 * ScrollReveal — reactbits.dev-style paragraph that fills in word by word,
 * scrubbed to scroll position. Dim words brighten and un-blur as the reader
 * scrolls them into the middle of the screen.
 */
export default function ScrollReveal({
  children,
  className,
  baseOpacity = 0.18,
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = children.split(" ");

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll(".rb-reveal-word");
      gsap.fromTo(
        targets,
        { opacity: baseOpacity, filter: "blur(4px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={clsx("rb-reveal", className)}>
      {words.map((w, i) => (
        <span key={i} className="rb-reveal-word inline-block whitespace-pre">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
