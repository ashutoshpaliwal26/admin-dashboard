/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#070B16',
          lighter: '#0B1120',
          card: '#0F1631',
        },
      },
    },
  },
  plugins: [],
};