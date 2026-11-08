/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Layout switch: < 900px follows the mobile design, >= 900px the desktop design.
    screens: {
      sm: '640px',
      md: '768px',
      lg: '900px',
      xl: '1280px',
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#000022',
          hover: '#11114A',
        },
        cream: {
          DEFAULT: '#F4F3EE',
          light: '#FBFAF6',
        },
        gold: {
          light: '#DCC383',
          DEFAULT: '#B68F40',
          dark: '#7A5C22',
        },
        error: '#A33B2B',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(140deg,#E3CD93 0%,#C9A65C 100%)',
        'gold-gradient-sm': 'linear-gradient(140deg,#DCC383,#B68F40)',
      },
      // Extra steps so text-navy/68, border-cream/14 etc. map 1:1 to the design tokens.
      opacity: {
        3: '0.03',
        4: '0.04',
        6: '0.06',
        8: '0.08',
        12: '0.12',
        14: '0.14',
        16: '0.16',
        18: '0.18',
        22: '0.22',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        62: '0.62',
        64: '0.64',
        66: '0.66',
        68: '0.68',
        72: '0.72',
        76: '0.76',
        78: '0.78',
        82: '0.82',
        84: '0.84',
        86: '0.86',
        92: '0.92',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(.2,.7,.2,1)',
      },
    },
  },
  plugins: [],
};
