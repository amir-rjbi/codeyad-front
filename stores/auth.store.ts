import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isOpenModal = ref(false);
  const currentStep = ref("login");

  const changeStep = (step: "login" | "register") => {
    currentStep.value = step;
  };
  return { isOpenModal, changeStep, currentStep };
});
