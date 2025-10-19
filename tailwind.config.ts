import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/content/**/*.{ts,tsx}',
    './docs/**/*.md'
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px'
      }
    },
    extend: {
      borderRadius: {
        '2xl': '1.5rem'
      },
      colors: {
        brand: {
          50: '#f3f7ff',
          100: '#e1ecff',
          200: '#c4d7ff',
          300: '#9bbaff',
          400: '#6d96ff',
          500: '#3e6fff',
          600: '#2150e6',
          700: '#193eb4',
          800: '#152f88',
          900: '#112565'
        }
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'slide-up': {
          from: { transform: 'translateY(1rem)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-in forwards',
        'slide-up': 'slide-up 300ms ease-out forwards'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
