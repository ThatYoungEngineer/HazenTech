/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Roboto-Regular' : ['Roboto-Regular', 'sans-serif'],
        'Inter-Regular' : ['Inter-Regular', 'sans-serif'],
        'Inter-SemiBold' : ['Inter-SemiBold', 'sans-serif'],
      },
      colors: {
        'primary': '#05173B',
      },
    },
  },
  plugins: [],
}

