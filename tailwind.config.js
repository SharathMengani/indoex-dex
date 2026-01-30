/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        siara: ["var(--font-siara)"],
        geist: ["var(--font-geist-sans)"],
      },
      keyframes: {
        waveMove: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        waveMoveReverse: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
      },
      animation: {
        waveSlow: 'waveMove 30s linear infinite',
        waveMedium: 'waveMoveReverse 24s linear infinite',
        waveFast: 'waveMove 18s linear infinite',
      },
    },
  },
  plugins: [],
};
