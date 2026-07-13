"use client";

import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  items: string[];
  className?: string;
  /** base drift speed (px/sec-ish) */
  speed?: number;
  direction?: "left" | "right";
  /** separator glyph between items */
  separator?: string;
};

/**
 * Marquee (ScrollVelocity) — reactbits.dev-style infinite ribbon of text.
 * It always drifts, and scrolling the page adds velocity — fast scrolls
 * shove the ribbon forward, then it eases back to its idle drift.
 */
export default function Marquee({
  items,
  className,
  speed = 60,
  direction = "left",
  separator = "✦",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const dir = direction === "left" ? -1 : 1;
      const baseX = { x: 0 };

      // The track holds the content twice; the loop wraps over the width of ONE
      // copy. Measuring the first copy directly (rather than scrollWidth / 2)
      // keeps this exact even if the copies ever differ.
      const firstCopy = track.children[0] as HTMLElement;
      // NOTE: `unit` must be re-read live inside the tick — it changes when the
      // display font swaps in or the viewport resizes. Measuring it only once
      // at mount is what leaves a blank gap at the seam (the "blank at left").
      let unit = firstCopy.getBoundingClientRect().width;
      const measure = () => {
        unit = firstCopy.getBoundingClientRect().width;
      };

      // Re-measure once web fonts finish loading (they shift text width) and on
      // every resize, so the wrap point always matches the real copy width.
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
      fonts?.ready.then(measure).catch(() => {});
      const ro = new ResizeObserver(measure);
      ro.observe(firstCopy);

      const tick = gsap.ticker.add(() => {
        baseX.x += dir * (speed / 60);
        // keep x within one copy's width so the loop is seamless
        const min = dir === -1 ? -unit : 0;
        const max = dir === -1 ? 0 : unit;
        baseX.x = gsap.utils.wrap(min, max, baseX.x);
        gsap.set(track, { x: baseX.x });
      });

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          // add a velocity kick, decaying naturally via the ticker loop
          const boost = self.getVelocity() / 300;
          baseX.x += dir * Math.abs(boost);
        },
      });

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        ro.disconnect();
      };
    },
    { scope: wrapRef, dependencies: [speed, direction] },
  );

  const content = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span>{item}</span>
          <span className="mx-6 text-[#C9A227] opacity-70 md:mx-10">
            {separator}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      ref={wrapRef}
      className={clsx("relative w-full overflow-hidden", className)}
    >
      <div ref={trackRef} className="flex w-max flex-nowrap will-change-transform">
        <div className="flex flex-nowrap items-center">{content}</div>
        <div className="flex flex-nowrap items-center" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
}
