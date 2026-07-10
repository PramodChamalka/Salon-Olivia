/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        salon: {
          dark: "#B76E79",
          gold: "#D4AF37",
          cream: "#FFFDF9",
          section: "#F8D7DA",
          card: "#F8D7DA",
          overlay: "#F8D7DA",
          rose: "#B76E79",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
