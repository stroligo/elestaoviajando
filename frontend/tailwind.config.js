/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFF',
        black: '#000',
        gray: '#444343',
        'gray-light': '#b4b4b4',
        'gray-extralight': '#f3f3f3',
        beige: '#EFEED6',
        primary: '#41798B',
        secondary: '#C78A4A',
        'blue-light': '#def5ff',
        blue: '#41798B',
        'blue-dark': '#263b44',
        brown: '#C78A4A',
        teal: '#75A8A9',
        green: '#3F9499',
        yellow: '#ece05b',
        orange: '#ebb858',
      },
      fontFamily: {
        sans: ['BreveSans', 'sans-serif'],
        serif: ['BreveSlab', 'serif'],
      },
      dropShadow: {
        texto: '0 0 2px rgba(0, 0, 0, 0.9)',
        nav: '0 2px 2px rgba(0, 0, 0, 0.579)',
      },
    },
  },
  plugins: [],
};
