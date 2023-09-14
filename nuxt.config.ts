// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/image", "@pinia/nuxt", "nuxt-swiper", "floating-vue/nuxt"],
  build: {
    transpile: ["vue-toastification"],
  },
  css: [
    "@/assets/css/main.scss",
    "@/assets/css/dark.scss",
    "@/assets/css/custom.scss",
    "@/assets/css/carousel.scss",
  ],

  app: {
    head: {
      script: [
        { src: "/ckeditor5/build/ckeditor.js" },
        { src: "/js/ckeditorConfig.js" },
      ],
      htmlAttrs: {
        lang: "fa",
      },
    },

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
    quality: 90,
    domains: [
      "https://api.codeyad.com",
      "http://localhost:3000",
      "https://codeyad.com",
      "https://cdn.bama.ir",
      "http://127.0.0.1:3000"
    ],
    alias: {
      codeyad: "https://codeyad.com",
      test: "https://cdn.bama.ir",
      hamcar: "http://dl.test13.ir",
      // static: "http://127.0.0.1:3000",
      static: "https://codeyad-front.vercel.app",
    },
  },
});
