/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./assets/**/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./components/**/**/*.{vue,js}",
    "./components/**/**/**/*.{vue,js}",
    "./components/base/*.{vue,js}",
    "./composables/*.{ts,js}",
    "./composables/**/*.{ts,js}",
    "./pages/*.vue",
    "./layouts/*.vue",
    "./pages/**/*.vue",
    "./pages/**/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./*.{vue,js}",
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue|default)-(250|950|300)/,
      variants: ["hover"],
    },
    {
      pattern: /bg-(red|green|blue|default)/,
    },
    {
      pattern: /!border-(red|green|blue|default)/,
      variants: ["hover"],
    },
    {
      pattern: /text-(red|green|blue|white|default)/,
    },
  ],
  theme: {
    extend: {
      transitionDelay: {
        50: ".5sec",
      },
      colors: {
        primary: "#286BB8",
        secondary: "#E4EDF8",
        surface: "#FAFAFA",
        blue: {
          DEFAULT: "var(--primary-color)",
          250: "#EEF4FB",
          950: "#1C4E88",
        },
        default: {
          DEFAULT: "var(--color-black)",
        },
        red: {
          DEFAULT: "#D40138",
          250: "#fef2f2",
          950: "#991b1b",
        },
        green: {
          DEFAULT: "#39A54A",
          250: "#f0fdf4",
          950: "#166534",
        },
        gray: {
          400: "var(--color-gray-400)",
          300: "var(--color-gray-300)",
        },
        black: "#080808",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        sm: "0.75rem",
        md: "0.9375rem",
        lg: "1.25rem",
      },
      boxShadow: {
        md: "17px 37px 42px 0px rgba(160, 160, 160, 0.12)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "2rem",
          xl: "4rem",
          "2xl": "6rem",
        },
      },
      screens: {
        xl: { max: "1536px" },
        lg: { max: "1280px" },
        md: { max: "1024px" },
        sm: { max: "768px" },
      },
      fontFamily: {
        IranSans: "iransans",
        IranSansBold: "iransans-bold",
      },
    },
  },
  plugins: [],
};
