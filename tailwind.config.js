/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-alpino)", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        pirate: ["var(--font-pirate)", "Georgia", "serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0B0E14",
          2: "#10151F",
        },
        gold: {
          DEFAULT: "#C9A227",
          soft: "#E7CF7A",
        },
        crimson: "#B3111C",
        cream: "#ECE4D3",
        seafoam: "#1E90B8",
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "slide-left": "slide-left 3s linear infinite",
        "spin-slow": "spin 6s linear infinite",
        "float-y": "float-y 4s ease-in-out infinite",
      },
    },
  },
};
