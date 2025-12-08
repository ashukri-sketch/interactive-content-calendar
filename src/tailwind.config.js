/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./AppWithTagSystem.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        calypso: {
          DEFAULT: '#006781',
          600: '#00bfe3',
        },
        pistachio: '#95b730',
        tulip: '#f0b52b',
        alto: {
          50: '#f7f7f7',
        },
        white: {
          DEFAULT: '#ffffff',
          950: '#292929',
        },
      },
    },
  },
  plugins: [],
}
