import React from "react";
import { GrandLineLogo } from "@/components/GrandLineLogo";

export default function Header() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex items-center justify-center py-6">
      <GrandLineLogo className="pointer-events-auto cursor-pointer bg-gradient-to-b from-[#F5E6B3] to-[#C9A227] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(201,162,39,0.25)]" />
    </header>
  );
}
