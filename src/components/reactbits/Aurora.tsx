"use client";

import clsx from "clsx";

type Props = {
  className?: string;
  /** Tailwind-friendly hex colors for the drifting light blobs */
  colors?: [string, string, string];
  /** 0–1 overall strength */
  intensity?: number;
};

/**
 * Aurora — a lightweight, dependency-free take on the reactbits.dev Aurora
 * background. Three softly-blurred radial blobs drift on their own timelines
 * behind whatever it wraps. Pure CSS, GPU-cheap, no WebGL.
 */
export default function Aurora({
  className,
  colors = ["#C9A227", "#B3111C", "#1E90B8"],
  intensity = 0.55,
}: Props) {
  const [a, b, c] = colors;
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{ opacity: intensity }}
    >
      <div
        className="rb-aurora-blob absolute -left-[10%] top-[-20%] h-[60vmax] w-[60vmax] rounded-full blur-[90px]"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${a}, transparent 60%)`,
          animationDuration: "22s",
        }}
      />
      <div
        className="rb-aurora-blob rb-aurora-blob--2 absolute right-[-15%] top-[10%] h-[55vmax] w-[55vmax] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${b}, transparent 62%)`,
          animationDuration: "28s",
        }}
      />
      <div
        className="rb-aurora-blob rb-aurora-blob--3 absolute bottom-[-25%] left-[25%] h-[50vmax] w-[50vmax] rounded-full blur-[110px]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${c}, transparent 64%)`,
          animationDuration: "34s",
        }}
      />
    </div>
  );
}
