/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--text-cream)",
        crimson: {
          DEFAULT: "var(--crimson)",
          bright: "var(--crimson-bright)",
          deep: "var(--crimson-deep)",
        },
      },
      backgroundColor: {
        "surface-0": "var(--surface-0)",
        "surface-1": "var(--surface-1)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        "crimson-soft": "var(--crimson-soft)",
      },
      borderColor: {
        hairline: "var(--border-hairline)",
        soft: "var(--border-soft)",
        strong: "var(--border-strong)",
        crimson: "var(--crimson)",
      },
      backgroundImage: {
        aurora: "var(--gradient-aurora)",
        "aurora-soft": "var(--gradient-aurora-soft)",
        crimson: "var(--gradient-crimson)",
      },
      boxShadow: {
        "elev-1": "var(--elev-1)",
        "elev-2": "var(--elev-2)",
        "elev-3": "var(--elev-3)",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        "out-soft": "var(--ease-out-soft)",
        "out-expo": "var(--ease-out-expo)",
        "in-out-soft": "var(--ease-in-out-soft)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
        xslow: "var(--dur-xslow)",
      },
      fontSize: {
        "display-1": ["var(--text-display-1)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-2": ["var(--text-display-2)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["var(--text-h1)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        h2: ["var(--text-h2)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["var(--text-h3)", { lineHeight: "1.3" }],
        "body-1": ["var(--text-body-1)", { lineHeight: "1.55" }],
        "body-2": ["var(--text-body-2)", { lineHeight: "1.55" }],
        label: ["var(--text-label)", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        mono: ["var(--text-mono)", { lineHeight: "1.4" }],
      },
      keyframes: {
        "aurora-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(2%,-3%,0) scale(1.05)" },
          "66%": { transform: "translate3d(-2%,2%,0) scale(0.97)" },
        },
        "aurora-sweep": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "underline-draw": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "aurora-drift": "aurora-drift 22s ease-in-out infinite",
        "aurora-sweep": "aurora-sweep 8s ease-in-out infinite",
        "underline-draw": "underline-draw 1s ease-out-expo forwards 0.8s",
      },
    },
  },
  plugins: [],
};
