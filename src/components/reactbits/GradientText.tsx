"use client";

import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  /** seconds per loop */
  speed?: number;
};

/**
 * GradientText — reactbits.dev-style animated gradient clipped to text.
 * The gradient slowly pans, giving headings a living, premium sheen.
 */
export default function GradientText({
  children,
  className,
  colors = ["#C9A227", "#F5E6B3", "#B3111C", "#C9A227"],
  speed = 8,
}: Props) {
  return (
    <span
      className={clsx("rb-gradient-text", className)}
      style={{
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        ["--rb-gradient-speed" as string]: `${speed}s`,
      }}
    >
      {children}
    </span>
  );
}
