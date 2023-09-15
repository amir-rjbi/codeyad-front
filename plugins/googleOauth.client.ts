import vue3GoogleLogin from "vue3-google-login";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vue3GoogleLogin, {
    clientId:
      "629672813404-5in94g4meg9gqmnsd2kh3voqi7uk1ptt.apps.googleusercontent.com",
  });
});
