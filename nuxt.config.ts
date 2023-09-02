// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/image", "@pinia/nuxt", "nuxt-swiper", "floating-vue/nuxt"],
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
    presets: {
      cover: {
        modifiers: {
          format: "webp",
          width: 50,
          height: 50,
        },
      },
    },
    domains: [
      "https://api.codeyad.com",
      "localhost:3000",
      "https://codeyad.com",
      "https://cdn.bama.ir",
    ],
    alias: {
      codeyad: "https://api.codeyad.com",
      test: "https://cdn.bama.ir",
      hamcar: "http://dl.test13.ir",
      //static: "http://localhost:3000",
      static: "https://codeyad-front.vercel.app",
    },
  },
});
