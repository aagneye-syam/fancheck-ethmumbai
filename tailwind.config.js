/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ethmumbai: {
          red: '#FF0000',
          blue: '#0066FF',
          dark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
}

