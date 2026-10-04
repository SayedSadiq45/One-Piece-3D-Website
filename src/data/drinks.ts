// ─── GRAND LINE FIZZ — One Piece character drink lineup ────────────────────
// Each drink maps to a can label texture in /public/labels/<key>.png
// Replace the placeholder PNGs with your own art (1086 x 583 px, wraps the can).

export type DrinkKey = "luffy" | "zoro" | "nami" | "sanji" | "chopper" | "ace";

export type Drink = {
  key: DrinkKey;
  character: string;
  name: string;
  tagline: string;
  flavorNotes: string;
  /** Deep background color used by the carousel while this can is selected */
  color: string;
};

export const DRINKS: Drink[] = [
  {
    key: "luffy",
    character: "Monkey D. Luffy",
    name: "Gum-Gum Burst",
    tagline: "Stretches your limits.",
    flavorNotes: "Tropical mango-pineapple punch with a smoked chili kick",
    color: "#8C0A13", // Luffy's vest red, deepened
  },
  {
    key: "zoro",
    character: "Roronoa Zoro",
    name: "Three-Sword Slash",
    tagline: "Triple-bladed green.",
    flavorNotes: "Matcha, lime and a wasabi bite — three cuts, one sip",
    color: "#14471E", // haramaki green
  },
  {
    key: "nami",
    character: "Nami",
    name: "Mikan Thunderbolt",
    tagline: "Citrus with a forecast of lightning.",
    flavorNotes: "Bellemère-orchard tangerine charged with electric ginger",
    color: "#8A4500", // mikan orange, deepened
  },
  {
    key: "sanji",
    character: "Sanji",
    name: "Diable Jambe",
    tagline: "Served at a rolling boil.",
    flavorNotes: "Blood orange flambé, cracked black pepper heat finish",
    color: "#122B47", // midnight-blue suit
  },
  {
    key: "chopper",
    character: "Tony Tony Chopper",
    name: "Sakura Rumble",
    tagline: "A blizzard of blossoms.",
    flavorNotes: "Cherry-blossom cotton candy cream soda, doctor approved",
    color: "#7C2650", // sakura pink, deepened
  },
  {
    key: "ace",
    character: "Portgas D. Ace",
    name: "Fire Fist",
    tagline: "Flames you can swallow.",
    flavorNotes: "Smoked cinnamon cola that burns twice as bright",
    color: "#5C1602", // ember
  },
];
