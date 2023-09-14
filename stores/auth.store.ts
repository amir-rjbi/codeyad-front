import { useAccountStore } from "./account.store";
import { LogoutUser } from "./../services/auth.service";
import { LoginResult } from "./../models/account/LoginResult";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isOpenModal = ref(false);
  const currentStep = ref("login");
  const loading = ref(false);
  const isLogin = computed(() => {
    var cookie = useCookie("c-access-token");
    return cookie.value != null && cookie.value != "";
  });
  const setToken = (tokenResult: LoginResult) => {
    var cookie = useCookie("c-access-token", {
      expires: new Date(new Date().setDate(new Date().getDate() + 30)),
    });
    var refreshCookie = useCookie("c-refresh-token", {
      expires: new Date(new Date().setDate(new Date().getDate() + 35)),
    });
    cookie.value = tokenResult.token;
    refreshCookie.value = tokenResult.refreshToken;
  };
  const logOut = async () => {
    loading.value = true;
    var res = await LogoutUser();
    if (res.isSuccess) {
      var cookie = useCookie("c-access-token");
      var refreshCookie = useCookie("c-refresh-token");
      cookie.value = null;
      refreshCookie.value = null;
    }
    loading.value = false;
  };
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
    isLogin,
    changeStep,
    currentStep,
    openLoginModal,
    openRegisterModal,
    setToken,
    logOut,
  };
});
