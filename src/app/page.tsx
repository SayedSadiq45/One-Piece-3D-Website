import Hero from "@/slices/Hero";
import MarqueeBanner from "@/slices/Marquee";
import SkyDive from "@/slices/SkyDive";
import Carousel from "@/slices/Carousel";
import FlavorGrid from "@/slices/FlavorGrid";
import AlternatingText from "@/slices/AlternatingText";
import BigText from "@/slices/BigText";

// Static, CMS-free homepage. New voyage flow:
//   Hero → velocity ribbon → sky-dive title card → crew selector →
//   full manifest grid → brew story → big-type finale.
export default function Index() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <SkyDive />
      <Carousel />
      <FlavorGrid />
    </>
  );
}
