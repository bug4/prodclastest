import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "15": "3.75rem",   // 60px
        "18": "4.5rem",    // 72px
        "22": "5.5rem",    // 88px
        "25": "6.25rem",   // 100px
        "30": "7.5rem",    // 120px
        "35": "8.75rem",   // 140px
      },
      colors: {
        bg: {
          DEFAULT: "#f6f1e9",
          deep: "#ece5d6",
          paper: "#fbf8f2",
        },
        ink: {
          DEFAULT: "#1a1814",
          soft: "#3a342c",
          muted: "#8a8275",
        },
        brass: {
          DEFAULT: "#c9a76b",
          deep: "#8c6a3a",
          light: "#e6d3a8",
        },
        line: {
          DEFAULT: "rgba(26, 24, 20, 0.12)",
          soft: "rgba(26, 24, 20, 0.06)",
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Manrope"', "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-line": "scrollLine 2s ease-in-out infinite",
        marquee: "marqueeScroll 40s linear infinite",
        "hero-zoom": "heroZoom 20s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate",
        "slide-in-toast": "slideInToast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scrollLine: {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(0.6)", transformOrigin: "top" },
          "50%": { opacity: "1", transform: "scaleY(1)", transformOrigin: "top" },
        },
        marqueeScroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        heroZoom: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.08)" },
        },
        slideInToast: {
          from: { opacity: "0", transform: "translateX(120%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;