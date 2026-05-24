import type { Config } from "tailwindcss";

const preset: Partial<Config> = {
  content: [],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2472",
          deep: "#001A4D",
          light: "#1a3a8f",
        },
        red: {
          brand: "#EE1C25",
          dark: "#C0151D",
        },
        sky: {
          brand: "#4D7CFF",
          light: "#7da0ff",
        },
        ink: "#0A0E1A",
        glass: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        garet: ["var(--font-garet)", "Inter", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 8vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "headline": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      backdropBlur: {
        glass: "20px",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
        "glass-sm": "0 2px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        "glass-lg": "0 8px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
};

export default preset;
