import React from "react";
import { GrandLineLogo } from "./GrandLineLogo";
import CircleText from "./CircleText";

export default function Footer() {
  return (
    <footer className="op-grain op-seam relative overflow-hidden bg-[#0B0E14] text-[#C9A227]">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-20">
        <div className="relative">
          <GrandLineLogo className="bg-gradient-to-b from-[#F5E6B3] to-[#C9A227] bg-clip-text text-transparent" />
          <div className="absolute -right-16 -top-14 size-28 origin-center text-[#C9A227] md:-right-28 md:-top-24 md:size-44">
            <CircleText />
          </div>
        </div>

        <div className="op-rule w-40" />

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="op-kicker text-[10px] text-[#ECE4D3]/50">
            Crafted with aura by
          </p>
          <p className="font-display text-3xl font-black uppercase tracking-[0.14em] text-[#F5E6B3] drop-shadow-[0_0_22px_rgba(201,162,39,0.3)] sm:text-5xl">
            SAYED SADIQ
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 font-display text-[11px] uppercase tracking-[0.18em]">
            <a
              href="https://one-piece-3-d-website.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="border border-[#F5E6B3]/70 bg-[#C9A227]/15 px-4 py-2 text-[#F5E6B3] transition-all hover:border-[#F5E6B3] hover:bg-[#C9A227]/25"
            >
              Visit the voyage
            </a>
            <a
              href="https://www.linkedin.com/in/sayed-sadiq45/"
              target="_blank"
              rel="noreferrer"
              className="border border-[#C9A227]/40 px-4 py-2 text-[#ECE4D3]/75 transition-all hover:border-[#C9A227] hover:bg-[#C9A227]/10 hover:text-[#F5E6B3]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/SayedSadiq45"
              target="_blank"
              rel="noreferrer"
              className="border border-[#C9A227]/40 px-4 py-2 text-[#ECE4D3]/75 transition-all hover:border-[#C9A227] hover:bg-[#C9A227]/10 hover:text-[#F5E6B3]"
            >
              GitHub
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 font-display text-xs uppercase tracking-[0.25em] text-[#ECE4D3]/60">
          <a href="#crew" className="transition-colors hover:text-[#C9A227]">
            The Crew
          </a>
          <a href="#manifest" className="transition-colors hover:text-[#C9A227]">
            Manifest
          </a>
          <span className="hidden md:inline">·</span>
          <span>Real Fruit · No Curse</span>
        </nav>

        <p className="text-center font-pirate text-sm text-[#ECE4D3]/40">
          © 2026 SayedSadiq45 — Grand Line Fizz. Not affiliated with any
          actual pirates.
        </p>
      </div>
    </footer>
  );
}
