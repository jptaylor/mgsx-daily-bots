import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)"],
        pixel: ["var(--font-pixel)"],
      },
      colors: {
        mgs: {
          lightest: "#D4FDFD",
          light: "#A3D6C1",
          dark: "#2E473D",
          darkest: "#131F1A",
        },
      },
      backgroundImage: {
        selectArrow:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDE1IDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03LjA3MTc4IDlMMC4wNzE3NzgxIDBIMTQuMDcxOEw3LjA3MTc4IDlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K')",
        selectArrowFocus:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDE1IDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik03LjA3MTc4IDlMMC4wNzE3NzgxIDBIMTQuMDcxOEw3LjA3MTc4IDlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K')",
      },
      backgroundColor: {
        selectArrow: "rgba(0,0,0,1)",
        selectArrowFocus: "rgba(0,0,0,1)",
      },
      backgroundPosition: {
        selectArrow: "right 0.75rem center",
      },
      animation: {
        fadeIn: "fadeIn 0.3s forwards",
        appear: "appear 0.3s steps(6) forwards",
        bgAppear: "bgAppear 3s linear forwards 1s",
        bgFade:
          "bgFade 3s alternate infinite, bgScale 6s linear alternate infinite",
        bgScroll:
          "bgFade2 6s alternate infinite, bgScroll 12s alternate infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        appear: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-20px)" },
        },
        bgAppear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bgFade: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.3" },
        },
        bgFade2: {
          "0%": { opacity: "0.1 " },
          "100%": { opacity: "0.5" },
        },
        bgScale: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" },
        },
        bgScroll: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
