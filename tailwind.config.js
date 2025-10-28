/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-brick': '#FFD700',
        'yellow-brick-dark': '#FFA500',
        'yellow-brick-light': '#FFED4E',
        'sepia': '#F4EFE4',
        'parchment': '#FFF8DC',
        'emerald': '#50C878',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'baskerville': ['Libre Baskerville', 'serif'],
      },
      borderWidth: {
        '6': '6px',
      },
    },
  },
  plugins: [],
}
