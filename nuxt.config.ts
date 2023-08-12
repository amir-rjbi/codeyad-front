// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-swiper",
    "floating-vue/nuxt",
  ],
  css: ["@/assets/css/main.scss", "@/assets/css/dark.scss"],
  colorMode: {
    classSuffix: "",
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },
  image: {
    domains: ["dl.test13.ir", "localhost:3000"],
    alias: {
      hamcar: "http://api.codeyad.com",
      static: "http://localhost:3000",
      //static: "http://158.255.74.204:3000",
    },
  },
});
