/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          pink: '#F6B8CF',
          lavender: '#C9B6F2',
          cream: '#FFF7EC',
          yellow: '#FFE5A3',
          mint: '#B9DFC8',
          plum: '#685072',
          deep: '#150D24',
          night: '#0F0918',
          neonPink: '#FF70A6',
          neonGold: '#FFD166',
        }
      },
      fontFamily: {
        handwriting: ['"Dancing Script"', 'cursive'],
        sans: ['"Be Vietnam Pro"', '"Quicksand"', 'sans-serif'],
        rounded: ['"Quicksand"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'sway-slow': 'sway 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(246, 184, 207, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(246, 184, 207, 0.8))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
