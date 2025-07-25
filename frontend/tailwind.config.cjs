/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '2/4': '90%'
      },
      fontFamily: {
        'anton': 'Anton',
        'poppins': 'Poppins',
        'bebas': 'Bebas Neue',
      }
    },
  },
  plugins: [],
}
