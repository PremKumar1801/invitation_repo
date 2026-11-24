/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: '#1F060A',
          900: '#380B13',
          850: '#4A0E17',
          800: '#5E121E',
          700: '#751726',
          600: '#8E1F31',
          500: '#A92A40',
        },
        gold: {
          900: '#5A3E09',
          800: '#7F5710',
          700: '#996515',
          600: '#B8861E',
          500: '#C5A059',
          400: '#D4AF37',
          300: '#E5C46E',
          200: '#F0D89A',
          100: '#F8ECC8',
          50: '#FCF7E9',
        },
        ivory: {
          900: '#D6CDBF',
          800: '#E6DECE',
          700: '#EFE9DC',
          600: '#F5F0E6',
          500: '#FAF5EE',
          400: '#FCF8F2',
          300: '#FDFBF7',
          200: '#FEFCFA',
          100: '#FFFFFF',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #C5A059 0%, #F5E5C9 35%, #D4AF37 55%, #996515 100%)',
        'royal-gradient': 'radial-gradient(ellipse at top, #5E121E 0%, #380B13 50%, #1F060A 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(74, 14, 23, 0.85) 0%, rgba(31, 6, 10, 0.95) 100%)',
      },
      boxShadow: {
        'royal-gold': '0 0 25px rgba(212, 175, 55, 0.25)',
        'royal-glow': '0 0 40px rgba(197, 160, 89, 0.35)',
        'inner-gold': 'inset 0 0 15px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'subtle-pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
