// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans], // Inter first
      },
    },
  },
  plugins: [],
}
