import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%, 99%': { opacity: '0.6' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        flicker: 'flicker 4s infinite',
        scanline: 'scanline 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
