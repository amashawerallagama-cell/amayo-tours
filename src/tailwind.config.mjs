/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jungle: "#1B4332",
        tea: "#95D5B2",
        ocean: "#1D3557",
        sand: "#F1FAEE",
        gold: "#E9C46A",
      },
    },
  },
  plugins: [],
};