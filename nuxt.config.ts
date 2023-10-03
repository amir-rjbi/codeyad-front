// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  nitro: {
    publicAssets: [
      {
        baseURL: "/images",
        dir: "public/images",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    ],
    compressPublicAssets: {
      gzip: true,
      brotli: false,
    },
  },
  experimental: {
    writeEarlyHints: false,
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
    "@vueuse/nuxt",
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
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
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
    quality: 100,
    domains: [
      "https://api.codeyad.com",
      "http://localhost:3000",
      "https://codeyad.com",
      "https://dl.codeyad.com",
      "http://127.0.0.1:3000",
    ],
    alias: {
      codeyad: "https://dl.codeyad.com",
      static: "http://localhost:3000",
      //static: "https://codeyad-front.vercel.app",
    },
  },
  site: {
    defaultLocale: "fa",
    currentLocale: "fa",
    indexable: true,
  },
});
