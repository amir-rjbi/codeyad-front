import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isOpenModal = ref(false);

  return { isOpenModal };
});
