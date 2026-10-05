/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        primary: '#FED766',
        secondary: '#9CFFD9',
        // Preserve the Tailwind 3 palette used by the existing design.
        slate: {
          100: '#f1f5f9',
          200: '#e2e8f0',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
        },
        gray: { 200: '#e5e7eb', 300: '#d1d5db', 600: '#4b5563' },
        amber: { 100: '#fef3c7', 600: '#d97706' },
        cyan: { 500: '#06b6d4' },
        yellow: { 300: '#fde047' },
      },
      animation: {
        'fade-in': 'fadeIn var(--tw-duration, .3s) ease-in-out',
        'rotate-1': 'rotateOnce .5s ease-in-out',
        'blink-2': 'blinkTwoTimes .5s ease-in-out 2',
      },
    },
  },
  plugins: [],
};
