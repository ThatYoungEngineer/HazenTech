/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx, mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Roboto-Regular' : ['Roboto-Regular', 'sans-serif'],
        'Roboto-Medium' : ['Roboto-Medium', 'sans-serif'],
        'Inter-Regular' : ['Inter-Regular', 'sans-serif'],
        'Inter-Medium' : ['Inter-Medium', 'sans-serif'],
        'Inter-SemiBold' : ['Inter-SemiBold', 'sans-serif'],
      },
      colors: {
        'primary': '#05173B',
      },
    },
  },
  plugins: [],
}

