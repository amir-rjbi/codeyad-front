// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    publicAssets: [
      {
        baseURL: "/",
        dir: "public/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    ],
    compressPublicAssets: {
      gzip: true,
      brotli: false,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-swiper",
    "floating-vue/nuxt",
    "nuxt-schema-org",
  ],
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
  },
  image: {
    quality: 90,
    domains: [
      "https://api.codeyad.com",
      "http://localhost:3000",
      "https://codeyad.com",
      "http://127.0.0.1:3000",
    ],
    alias: {
      codeyad: "https://codeyad.com",
      static: "http://127.0.0.1:3000",
      //static: "https://codeyad-front.vercel.app",
    },
  },
  schemaOrg:{
    reactive:true,

  }
});
