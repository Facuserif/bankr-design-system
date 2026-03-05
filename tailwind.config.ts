import type { Config } from "tailwindcss";
import preset from "./tailwind-preset";

const config: Config = {
  darkMode: "class",
  presets: [preset],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
};

export default config;