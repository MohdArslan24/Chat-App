/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ig-black": "#000",
        "ig-dark-gray": "#262626",
        "ig-border": "#262626",
        "ig-text-gray": "#a8a8a8",
        "ig-blue": "#0095f6",
        "ig-hover": "#1a1a1a",
        "ig-message-received": "#262626",
      }
    },
  },
  plugins: [],
}