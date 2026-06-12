/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
  plugins: [require("daisyui")],
  theme: {
    fontFamily: {
      'sans': ['"Space Grotesk"', 'sans-serif'],
      'mono': ['"JetBrains Mono"', 'monospace'],
    },
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

