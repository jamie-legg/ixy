// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...defaultTheme.colors,
      'ixy': {
        100: '#fafbfc',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#2f2f2f',
        700: '#1e1e1e',
        800: '#e11d48',
        900: '#0a0a0a',
      },
      'ixy-rose' : {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337'
      },
      'ixy-green' : {
        50: '#f0fff4',
        100: '#c6f6d5',
        200: '#9ae6b4',
        300: '#68d391',
        400: '#48bb78',
        500: '#38a169',
        600: '#2f2f2f',
        700: '#1e1e1e',
        800: '#0a0a0a',
        900: '#000000'
      }
    },
    fontFamily: {
      'sans': ['Montserrat Alternates', ...defaultTheme.fontFamily.sans]
    },
    extend: {},
  },
  plugins: [],
}
