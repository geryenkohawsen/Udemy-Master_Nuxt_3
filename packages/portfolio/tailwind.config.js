/** @type {import('tailwindcss').Config} */

export default {
  content: ['./**/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
