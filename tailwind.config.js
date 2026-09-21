/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      colors: {
        navy: {
          DEFAULT: '#000022',
          raised: '#06062c',
          overlay: '#0a0a38',
        },
        cream: {
          DEFAULT: '#F4F3EE',
          sunken: '#eceae2',
        },
        gold: {
          DEFAULT: '#B68F40',
          light: '#DCC383',
        },
        paper: '#ffffff',
        'footer-blue': '#dfe6f0',
        danger: {
          DEFAULT: '#e0645f',
          ink: '#b02f2a',
        },
        success: {
          DEFAULT: '#6fbf8b',
          ink: '#2f7a4d',
        },

        /* Semantic text roles — these are what components should reach for. */
        ink: {
          1: 'rgb(0 0 34 / 1)',
          2: 'rgb(0 0 34 / 0.74)',
          3: 'rgb(0 0 34 / 0.60)',
        },
        sheet: {
          1: 'rgb(244 243 238 / 1)',
          2: 'rgb(244 243 238 / 0.78)',
          3: 'rgb(244 243 238 / 0.62)',
        },
      },

      /* Fluid scale. Every step grows with the viewport, so desktop never
         ends up with smaller headlines than mobile. */
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '600' }],
        'display-xl': ['clamp(2.5rem, 1.55rem + 3.8vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.032em' }],
        'display-lg': ['clamp(2.125rem, 1.5rem + 2.6vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.028em' }],
        'display-md': ['clamp(1.75rem, 1.35rem + 1.7vw, 2.625rem)', { lineHeight: '1.12', letterSpacing: '-0.024em' }],
        'display-sm': ['clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.018em' }],
        'title-lg': ['clamp(1.1875rem, 1.1rem + 0.4vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.012em' }],
        'title-md': ['1.0625rem', { lineHeight: '1.4', letterSpacing: '-0.008em' }],
        lead: ['clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)', { lineHeight: '1.6' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65' }],
        body: ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
      },

      borderRadius: {
        sm: '0.5rem',
        DEFAULT: '0.75rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },

      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section-y)',
        'section-tight': 'var(--section-y-tight)',
        header: 'var(--header-h)',
      },

      maxWidth: {
        container: 'var(--container)',
        'container-wide': 'var(--container-wide)',
        prose: 'var(--container-prose)',
        measure: '68ch',
        'measure-sm': '54ch',
      },

      transitionTimingFunction: {
        brand: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'brand-inout': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      backgroundImage: {
        'gold-gradient': 'linear-gradient(100deg, #B68F40 0%, #DCC383 100%)',
        'gold-gradient-soft': 'linear-gradient(135deg, rgb(182 143 64 / 0.16) 0%, rgb(220 195 131 / 0.16) 100%)',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'sheet-in': {
          from: { opacity: '0', transform: 'translateY(-0.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        'fade-in': 'fade-in 240ms var(--ease) both',
        'sheet-in': 'sheet-in 260ms var(--ease) both',
      },
    },
  },
  plugins: [],
};
