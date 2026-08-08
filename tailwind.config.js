/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        salon: {
          dark: "rgb(var(--salon-primary) / <alpha-value>)",
          rose: "rgb(var(--salon-primary) / <alpha-value>)",
          gold: "rgb(var(--salon-gold) / <alpha-value>)",
          cream: "rgb(var(--salon-cream) / <alpha-value>)",
          section: "rgb(var(--salon-section) / <alpha-value>)",
          card: "rgb(var(--salon-card) / <alpha-value>)",
          overlay: "rgb(var(--salon-overlay) / <alpha-value>)",
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
