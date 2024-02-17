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
        'fade-in': 'fadeIn .5s ease-in-out',
        'rotate-1': 'rotateOnce .5s ease-in-out',
        'blink-2': 'blinkTwoTimes .5s ease-in-out 2',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        rotateOnce: {
          from: { transform: 'rotate(60deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        blinkTwoTimes: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
      },
    },
  },
  plugins: [],
};
