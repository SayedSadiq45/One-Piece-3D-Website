"use client";

import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** how far the element is allowed to travel toward the cursor (px) */
  strength?: number;
  /** activation padding around the element (px) */
  padding?: number;
};

/**
 * Magnet — reactbits.dev-style magnetic hover. The child eases toward the
 * cursor while it hovers within `padding`, then springs back on leave.
 */
export default function Magnet({
  children,
  className,
  strength = 24,
  padding = 40,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const maxDist = Math.max(rect.width, rect.height) / 2 + padding;
    const dist = Math.hypot(dx, dy);
    if (dist > maxDist) return;
    gsap.to(inner, {
      x: (dx / maxDist) * strength,
      y: (dy / maxDist) * strength,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  function reset() {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={clsx("inline-block", className)}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
