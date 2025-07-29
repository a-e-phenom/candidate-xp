/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4D3EE0',
          light: '#9B94EA',
          dark: '#3F32B5',
        },
        secondary: {
          DEFAULT: '#D1D5DC',
          dark: '#637085',
        },
        text: {
          primary: '#353B46',
          secondary: '#637085',
        },
        background: {
          light: '#F8F9FB',
        },
      },
    },
  },
  plugins: [],
};