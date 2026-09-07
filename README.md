# Grand Line Fizz — One Piece 3D Drink Landing Page

https://one-piece-3-d-website.vercel.app/

A One Piece 3d landing page (Next.js + GSAP + React Three Fiber).
Prismic CMS has been removed — all copy is hardcoded, so it runs standalone.

## Run it

```
npm install
npm run dev
```

Open http://localhost:3000

## Where things live

- `src/data/drinks.ts` — the 6 character drinks (names, flavor notes, carousel colors). Edit here to change the lineup.
- `src/slices/*` — Hero, SkyDive, Carousel, AlternatingText, BigText sections (copy is inline).
- `public/labels/*.png` — can label textures (one per character). **1086 x 583 px**, wraps around the 3D can.
- `public/images/*.png` — background/photo placeholders.

## Images to replace (placeholders included so the site runs)

Can labels — 1086 x 583 px PNG each (art wraps the can; keep key text vertically centered):
- `public/labels/luffy.png` — Gum-Gum Burst
- `public/labels/zoro.png` — Three-Sword Slash
- `public/labels/nami.png` — Mikan Thunderbolt
- `public/labels/sanji.png` — Diable Jambe
- `public/labels/chopper.png` — Sakura Rumble
- `public/labels/ace.png` — Fire Fist

Backgrounds / photos:
- `public/images/bg-hero.png` — wide sea/sky backdrop behind the hero (rendered at 20% opacity)
- `public/images/bg-wanted-posters.png` — small tileable texture behind the carousel (10% opacity, repeats)
- `public/images/bg-map.png` — wide sea-chart/map texture behind the story sections (10% opacity)
- `public/images/hero-cans-mobile.png` — square-ish product shot shown only on mobile in the hero

Note: labels are applied with `flipY = false` on the 3D can — if your art appears upside down, flip it vertically in your editor.
