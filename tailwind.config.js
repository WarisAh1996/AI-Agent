/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF69B4', // Hot pink
          dark: '#FF1493'     // Deep pink
        },
        secondary: {
          DEFAULT: '#000000', // Black
          dark: '#1a1a1a'     // Slightly lighter black
        },
        accent: '#FF69B4'     // Hot pink for accent
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
