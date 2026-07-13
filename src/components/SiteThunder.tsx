"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * SiteThunder — an ambient, viewport-wide lightning storm layered over the
 * whole site. It fires on its own at random intervals: a couple of glowing
 * jagged bolts plus a soft colored sky-flash, tinted from the brand palette
 * (mikan gold, storm blue, vest red). Purely decorative — pointer-events are
 * off and it lightens only (mix-blend-screen), so it never blocks the UI.
 * Respects `prefers-reduced-motion`.
 */

// Brand-tinted storm colors (gold / electric blue / vest red)
const TINTS = ["#C9A227", "#1E90B8", "#B3111C"];

/** Mix a hex color toward white so it reads as hot lightning */
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
    if (Math.random() < 0.4) {
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

export default function SiteThunder() {
  const svgRef = useRef<SVGSVGElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let timer = 0;

    const strike = () => {
      const svg = svgRef.current;
      const flash = flashRef.current;
      if (!svg || !flash) return;

      const tint = TINTS[Math.floor(Math.random() * TINTS.length)];
      const core = lighten(tint, 0.85); // near-white hot core
      const glow = lighten(tint, 0.4); // colored halo

      svg.innerHTML = "";
      const boltCount = 1 + Math.floor(Math.random() * 2); // 1–2 bolts
      const groups: SVGGElement[] = [];

      for (let i = 0; i < boltCount; i++) {
        const startX = 120 + Math.random() * 760;
        const { main, branches } = makeBolt(startX);
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
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

        mk(main, 9, glow, 0.5); // outer glow stroke
        mk(main, 3, core, 1); // hot core
        branches.forEach((b) => {
          mk(b, 5, glow, 0.35);
          mk(b, 1.5, core, 0.85);
        });

        svg.appendChild(g);
        groups.push(g);
      }

      // Flicker each bolt like real lightning (staggered double-strike)
      groups.forEach((g, i) => {
        gsap
          .timeline({ delay: i * 0.08 })
          .fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.04, ease: "none" })
          .to(g, { opacity: 0.15, duration: 0.05 })
          .to(g, { opacity: 1, duration: 0.04 })
          .to(g, { opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.08");
      });

      // Soft colored sky flash — kept subtle so text stays readable
      gsap
        .timeline()
        .set(flash, { backgroundColor: core })
        .fromTo(flash, { opacity: 0 }, { opacity: 0.22, duration: 0.05, ease: "none" })
        .to(flash, { opacity: 0.05, duration: 0.06 })
        .to(flash, { opacity: 0.16, duration: 0.05 })
        .to(flash, { opacity: 0, duration: 0.5, ease: "power2.out" });
    };

    const loop = () => {
      strike();
      // next strike in 5–12s so it stays ambient, not constant
      timer = window.setTimeout(loop, 5000 + Math.random() * 7000);
    };

    // first strike shortly after load
    timer = window.setTimeout(loop, 2000 + Math.random() * 2000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <div ref={flashRef} className="absolute inset-0 opacity-0 mix-blend-screen" />
      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
