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
          © Void Century — Grand Line Fizz. Not affiliated with any actual
          pirates.
        </p>
      </div>
    </footer>
  );
}
