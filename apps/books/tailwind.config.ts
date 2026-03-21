// Tailwind v4 note: content detection is automatic via @tailwindcss/postcss.
// This file is referenced via `@config "./tailwind.config.ts"` in globals.css
// if explicit content paths or theme overrides are needed.
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Books design tokens added here
    },
  },
} satisfies Config;
