"use client";

import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  to: number;
  from?: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** decimals to keep */
  decimals?: number;
};

/**
 * CountUp — reactbits.dev-style number that rolls from `from` to `to` when it
 * scrolls into view.
 */
export default function CountUp({
  to,
  from = 0,
  className,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const obj = { val: from };
      el.textContent = `${prefix}${from.toFixed(decimals)}${suffix}`;
      gsap.to(obj, {
        val: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );

  return <span ref={ref} className={clsx("tabular-nums", className)} />;
}
