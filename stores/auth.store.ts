import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isOpenModal = ref(false);
  const currentStep = ref("login");

  const changeStep = (
    step: "login" | "register" | "forgotPassword" | "activate"
  ) => {
    currentStep.value = step;
  };
  const openRegisterModal = () => {
    currentStep.value = "register";
    isOpenModal.value = true;
  };
  const openLoginModal = () => {
    currentStep.value = "login";
    isOpenModal.value = true;
  };
  return {
    isOpenModal,
    changeStep,
    currentStep,
    openLoginModal,
    openRegisterModal,
  };
});
