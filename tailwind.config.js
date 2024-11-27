/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'pingLarge 5s linear infinite',
      },
      keyframes: {
        pingLarge: {
          '0%': {
            transform: 'scale(0)',
            opacity: 1
          },
          '75%, 100%': { 
            transform: 'scale(2.3)',
            opacity: 0.1
          },
        }
      }
    },
  },
  plugins: [],
}

