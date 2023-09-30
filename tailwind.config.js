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
      pattern: /!bg-(red|green|blue|orange|default)-(250|950|300)/,
      variants: ["hover"],
    },
    {
      pattern: /bg-(red|green|blue|orange|default)/,
    },
    {
      pattern: /!border-(red|green|blue|orange|default)/,
      variants: ["hover"],
    },
    {
      pattern: /text-(red|green|blue|orange|white|default)/,
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
          250: "#d6e4f4",
          950: "#1C4E88",
        },
        default: {
          DEFAULT: "var(--color-black)",
        },
        red: {
          // DEFAULT: "#D40138",
          DEFAULT: "var(--color-error)",
          250: "#fef2f2",
          950: "#991b1b",
        },
        green: {
          DEFAULT: "#39A54A",
          250: "#f0fdf4",
          950: "#166534",
          action: "#5DCAA7",
        },
        gray: {
          400: "var(--color-gray-400)",
          300: "var(--color-gray-300)",
        },
        black: "#080808",
        bodyBg: "#EEF3F9",
        orange: {
          DEFAULT: "#EF8F00",
          950: "#d07d00",
        },
        bluegray: {
          100: "var(--color-blue-gray-100)",
        },
      },
      container: {
        center: true,
        padding: "1rem",
      },
      borderRadius: {
        DEFAULT: "0.47819rem",
        sm: "0.42175rem",
        md: "0.9375rem",
        lg: "1.25rem",
      },
      boxShadow: {
        md: "17px 37px 42px 0px rgba(160, 160, 160, 0.12)",
        sm: " 7px 8px 31px 0px rgba(20, 62, 101, 0.11)",
      },
      screens: {
        xl: { max: "1536px" },
        lg: { max: "1280px" },
        md: { max: "1024px" },
        sm: { max: "768px" },
      },
      gap: {
        19: "19px",
      },
      fontFamily: {
        IranSans: "iransans",
        IranSansBold: "iransans-bold",
      },
    },
    fontSize: {
      h2: "var(--h2-font-size)",
      h3: "var(--h3-font-size)",
      h4: "var(--h4-font-size)",
      h5: "var(--h5-font-size)",
      h6: "var(--h6-font-size)",
      h7: "var(--h7-font-size)",
      h8: "var(--h8-font-size)",
      h9: "var(--h9-font-size)",
      22: "22px",
    },
  },
  plugins: [],
};
