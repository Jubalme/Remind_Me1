/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream-pink': '#f8e8e8',
        'purple-900': '#5e3a8c',
        'purple-700': '#7b4eb2',
        'purple-800': '#6a4096',
      },
    },
  },
  plugins: [],
};
