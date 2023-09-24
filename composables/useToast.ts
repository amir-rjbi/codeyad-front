import { useToast as Toaster } from "vue-toastification";
import Check from "~~/components/icons/toast/check.vue";
import Close from "~~/components/icons/toast/close.vue";
import Warning from "~~/components/icons/toast/warning.vue";
import Info from "~~/components/icons/toast/info.vue";

export class Toast {
  constructor(
    public message: string,
    public type: ToastType,
    public duration: number = 3000
  ) {}

  public static Error(message: string, duration: number = 3000) {
    return new Toast(message, ToastType.error, duration);
  }
}
export enum ToastType {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

export const useToast = () => {
  const showToast = (
    message: string="عملیات با موفقیت انجام شد",
    type: ToastType = ToastType.success,
    duration: number = 3000
  ) => {
    const toast = Toaster();
    switch (type) {
      case ToastType.success: {
        toast.success(message, { timeout: duration, icon: Check });
        break;
      }
      case ToastType.error: {
        toast.error(message, { timeout: duration, icon: Close });
        break;
      }
      case ToastType.warning: {
        toast.warning(message, { timeout: duration, icon: Warning });
        break;
      }
      case ToastType.info: {
        toast.info(message, { timeout: duration, icon: Info });
        break;
      }
    }
  };

  return { showToast };
};
