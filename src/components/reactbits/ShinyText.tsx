"use client";

import clsx from "clsx";

type Props = {
  text: string;
  className?: string;
  /** seconds for one sweep */
  speed?: number;
  disabled?: boolean;
};

/**
 * ShinyText — reactbits.dev-style sweeping highlight across text.
 * A masked gradient glides left→right on a loop. Great for small labels
 * and eyebrows.
 */
export default function ShinyText({
  text,
  className,
  speed = 4,
  disabled = false,
}: Props) {
  return (
    <span
      className={clsx("rb-shiny-text", disabled && "rb-shiny-text--off", className)}
      style={{ ["--rb-shine-speed" as string]: `${speed}s` }}
    >
      {text}
    </span>
  );
}
