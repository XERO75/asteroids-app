/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      white: '#fff',
      gray: {
        light: '#32334A',
        DEFAULT: '#9499C3',
        dark: '#1A1B2F',
      },
      red: '#EB5757',
      blue: '#00F0FF',
      green: {
        light: '#38D9A9',
        DEFAULT: '#00CF67',
        dark: '#00CF67',
      },
      dark: '#1A1B2F',
    },
    extend: {},
  },
  plugins: [],
};
