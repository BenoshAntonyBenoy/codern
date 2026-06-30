import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
      },
      colors: {
        // Layered blue palette: sky → brand → indigo → navy
        sky: {
          50: "#f0f7ff",
          100: "#e0eefe",
          200: "#bbdcfd",
          300: "#7fc1fc",
          400: "#3aa1f8",
          500: "#1488ed",
          600: "#066bcb",
          700: "#0656a4",
          800: "#0a4986",
          900: "#0e3d6f",
        },
        brand: {
          50: "#eef4ff",
          100: "#dae6ff",
          200: "#bcd2ff",
          300: "#8eb3ff",
          400: "#5b8aff",
          500: "#3563ff",
          600: "#1f44f5",
          700: "#1a35d8",
          800: "#1c2eae",
          900: "#1d2c8a",
          950: "#161c54",
        },
        navy: {
          50: "#f4f6fb",
          100: "#e5eaf3",
          200: "#cbd5e9",
          300: "#9eb2d2",
          400: "#6c87b6",
          500: "#48669c",
          600: "#385082",
          700: "#2e416a",
          800: "#293858",
          900: "#1d2842",
          950: "#0e1428",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 6px 24px -10px rgba(15,23,42,0.10)",
        cardHover:
          "0 10px 30px -10px rgba(31,68,245,0.30), 0 20px 50px -20px rgba(15,23,42,0.20)",
        glow: "0 0 0 1px rgba(31,68,245,0.10), 0 20px 60px -20px rgba(31,68,245,0.45)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 20% 0%, #dae6ff 0%, transparent 40%), radial-gradient(ellipse at 80% 100%, #e0eefe 0%, transparent 50%), linear-gradient(180deg, #ffffff 0%, #f5f8ff 100%)",
        "section-gradient":
          "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
        "navy-gradient":
          "linear-gradient(135deg, #1d2842 0%, #1c2eae 60%, #1f44f5 100%)",
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(31,68,245,0.12) 1px, transparent 0)",
        "grid-lines":
          "linear-gradient(rgba(31,68,245,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(31,68,245,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "22px 22px",
        "grid-lines": "60px 60px",
      },
      keyframes: {
        "blob-float": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-60px) scale(1.08)" },
          "66%": { transform: "translate(-30px,40px) scale(0.95)" },
        },
        "blob-float-slow": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-50px,60px) scale(1.12)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "tilt-in": {
          "0%": {
            opacity: "0",
            transform: "perspective(900px) rotateX(8deg) translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "perspective(900px) rotateX(0) translateY(0)",
          },
        },
      },
      animation: {
        "blob-float": "blob-float 22s ease-in-out infinite",
        "blob-float-slow": "blob-float-slow 30s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "tilt-in": "tilt-in 700ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
