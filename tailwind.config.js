/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FED766',
        secondary: '#9CFFD9',
      },
      animation: {
        fadein: 'fadeIn .5s ease-in-out',
        win: 'rotateOnce .5s ease-in-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        rotateOnce: {
          from: { transform: 'rotate(60deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
