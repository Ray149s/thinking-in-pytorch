/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-halo': 'pulse-halo 2.4s ease-in-out infinite',
        'blink': 'blink 1s steps(1) infinite',
        'slide-up': 'slide-up 0.25s ease-out',
      },
      keyframes: {
        'pulse-halo': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1.4)' },
          '50%': { opacity: '0.9', transform: 'scale(1.55)' },
        },
        'blink': {
          '0%, 50%': { borderColor: 'rgb(167 139 250)' },
          '51%, 100%': { borderColor: 'rgba(167, 139, 250, 0.3)' },
        },
        'slide-up': {
          'from': { transform: 'translateY(100%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
