/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFF',
        black: '#000',
        beige: '#EFEED6',
        primary: '#41798B',
        secondary: '#C78A4A',
        blue: '#41798B',
        'blue-dark': '#263b44',
        brown: '#C78A4A',
        teal: '#75A8A9',
        green: '#3F9499',
        yellow: '#ECA95B',
        orange: '#EB9658',
      },
      fontFamily: {
        sans: ['BreveSans', 'sans-serif'],
        serif: ['BreveSlab', 'serif'],
      },
    },
  },
  plugins: [],
};
