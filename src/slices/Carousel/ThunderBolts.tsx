"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

export type ThunderBoltsHandle = {
  /** Fire a lightning strike tinted from the given character color */
  strike: (color: string) => void;
};

/** Mix a hex color toward white so deep character colors read as lightning */
function lighten(hex: string, amount: number) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/** Build a jagged main bolt path + a few branch paths (viewBox 0..1000) */
function makeBolt(startX: number) {
  const points: [number, number][] = [[startX, -20]];
  let x = startX;
  let y = -20;
  while (y < 980) {
    y += 60 + Math.random() * 110;
    x += (Math.random() - 0.5) * 190;
    points.push([x, Math.min(y, 1000)]);
  }
  const main = "M" + points.map(([px, py]) => `${px},${py}`).join(" L");

  const branches: string[] = [];
  for (let i = 1; i < points.length - 2; i++) {
    if (Math.random() < 0.45) {
      const [bx, by] = points[i];
      const dir = Math.random() < 0.5 ? -1 : 1;
      branches.push(
        `M${bx},${by} L${bx + dir * (60 + Math.random() * 90)},${
          by + 70 + Math.random() * 90
        } L${bx + dir * (110 + Math.random() * 130)},${
          by + 150 + Math.random() * 120
        }`,
      );
    }
  }
  return { main, branches };
}

/**
 * Full-section lightning overlay. Call `strike(color)` on flavor change:
 * spawns 2–3 glowing bolts, a colored sky flash, and shakes the section.
 */
export const ThunderBolts = forwardRef<ThunderBoltsHandle>(
  function ThunderBolts(_, ref) {
    const svgRef = useRef<SVGSVGElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      strike(color: string) {
        const svg = svgRef.current;
        const flash = flashRef.current;
        if (!svg || !flash) return;

        const core = lighten(color, 0.85); // near-white hot core
        const glow = lighten(color, 0.45); // colored glow

        svg.innerHTML = "";
        const boltCount = 2 + Math.floor(Math.random() * 2);
        const groups: SVGGElement[] = [];

        for (let i = 0; i < boltCount; i++) {
          const startX = 120 + Math.random() * 760;
          const { main, branches } = makeBolt(startX);
          const g = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );
          g.style.filter = `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 18px ${glow})`;

          const mk = (d: string, w: number, stroke: string, op: number) => {
            const p = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path",
            );
            p.setAttribute("d", d);
            p.setAttribute("fill", "none");
            p.setAttribute("stroke", stroke);
            p.setAttribute("stroke-width", String(w));
            p.setAttribute("stroke-linecap", "round");
            p.setAttribute("stroke-linejoin", "round");
            p.setAttribute("opacity", String(op));
            g.appendChild(p);
          };

          mk(main, 11, glow, 0.55); // outer glow stroke
          mk(main, 4, core, 1); // hot core
          branches.forEach((b) => {
            mk(b, 6, glow, 0.4);
            mk(b, 2, core, 0.9);
          });

          svg.appendChild(g);
          groups.push(g);
        }

        // Flicker each bolt like real lightning (staggered double-strike)
        groups.forEach((g, i) => {
          gsap
            .timeline({ delay: i * 0.07 })
            .fromTo(
              g,
              { opacity: 0 },
              { opacity: 1, duration: 0.04, ease: "none" },
            )
            .to(g, { opacity: 0.15, duration: 0.05 })
            .to(g, { opacity: 1, duration: 0.04 })
            .to(g, { opacity: 0, duration: 0.3, ease: "power2.in" }, "+=0.08");
        });

        // Colored sky flash
        gsap
          .timeline()
          .set(flash, { backgroundColor: core })
          .fromTo(
            flash,
            { opacity: 0 },
            { opacity: 0.5, duration: 0.05, ease: "none" },
          )
          .to(flash, { opacity: 0.1, duration: 0.06 })
          .to(flash, { opacity: 0.35, duration: 0.05 })
          .to(flash, { opacity: 0, duration: 0.45, ease: "power2.out" });

        // Rumble the whole section
        gsap.fromTo(
          ".carousel",
          { x: 0, y: 0 },
          {
            keyframes: [
              { x: -7, y: 3, duration: 0.05 },
              { x: 6, y: -4, duration: 0.05 },
              { x: -4, y: 2, duration: 0.05 },
              { x: 3, y: -1, duration: 0.05 },
              { x: 0, y: 0, duration: 0.08 },
            ],
            ease: "none",
          },
        );
      },
    }));

    return (
      <>
        <div
          ref={flashRef}
          className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-screen"
        />
        <svg
          ref={svgRef}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        />
      </>
    );
  },
);
