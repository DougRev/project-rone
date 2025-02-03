/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        win95gray: "#C0C0C0",
        win95blue: "#000080",
        win95background: "#008080",
      },
      fontFamily: {
        sans: ['"MS Sans Serif"', 'Tahoma', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
