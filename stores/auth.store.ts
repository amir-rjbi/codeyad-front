import { useUtilStore } from "./util.store";
import { useAccountStore } from "./account.store";
import { LogoutUser, RegisterCommand } from "./../services/auth.service";
import { LoginResult } from "./../models/account/LoginResult";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isOpenModal = ref(false);
  const currentStep = ref("login");
  const loading = ref(false);
  const callBackFunctionAfterLogin: Ref<Function | null> = ref(null);
  const utilStore = useUtilStore();

  const registerData: Ref<RegisterCommand | null> = ref(null);

  const getAccessToken = () => {
    var cookie = useCookie("c-access-token");
    return cookie.value;
  };
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
    setTimeout(() => {
      if (callBackFunctionAfterLogin != null) {
        callBackFunctionAfterLogin.value!();
      }
    }, 300);
  };
  const logOut = async () => {
    utilStore.globalLoading = true;
    var res = await LogoutUser();
    if (res.isSuccess) {
      var cookie = useCookie("c-access-token");
      var refreshCookie = useCookie("c-refresh-token");
      cookie.value = null;
      refreshCookie.value = null;
      location.reload();
    } else {
      utilStore.globalLoading = false;
    }
  };
  const changeStep = (
    step: "login" | "register" | "forgotPassword" | "activate"
  ) => {
    currentStep.value = step;
  };
  const openRegisterModal = (fn: Function | null = null) => {
    currentStep.value = "register";
    isOpenModal.value = true;
    callBackFunctionAfterLogin.value = fn;
  };
  const openLoginModal = (fn: Function | null = null) => {
    currentStep.value = "login";
    isOpenModal.value = true;
    callBackFunctionAfterLogin.value = fn;
  };
  return {
    isOpenModal,
    isLogin,
    changeStep,
    currentStep,
    registerData,
    openLoginModal,
    openRegisterModal,
    setToken,
    logOut,
    getAccessToken,
  };
});
