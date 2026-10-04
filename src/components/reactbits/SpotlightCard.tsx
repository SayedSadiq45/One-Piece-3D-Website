"use client";

import { useRef } from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** rgba/hex spotlight color */
  spotlightColor?: string;
};

/**
 * SpotlightCard — reactbits.dev-style card with a radial glow that tracks the
 * cursor. Uses CSS custom properties updated on pointer-move (no re-renders).
 */
export default function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(201, 162, 39, 0.25)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--rb-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--rb-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={clsx("rb-spotlight-card group", className)}
      style={{ ["--rb-spot" as string]: spotlightColor }}
    >
      <div className="rb-spotlight-card__glow" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
