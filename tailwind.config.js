// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Montserrat Alternates', ...defaultTheme.fontFamily.sans]
    },
    extend: {},
  },
  plugins: [],
}
