/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          light: '#c0a8eb',
          medium: '#8458b3',
          regular: '#8D83BA',
          dark: '#8458b3',
          darker: '#443483',
        },
        gray: {
          darker: '#111111',
          dark: '#1e1e1e',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
