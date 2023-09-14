import {
  GetCurrentUserData,
  GetNotifications,
} from "./../services/account.service";
import { User } from "./../models/account/User";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", () => {
  const currentUser: Ref<User | null> = ref(null);
  const notifications: Ref<Notification[]> = ref([]);
  const initLoading = ref(true);

  const initData = async () => {
    initLoading.value = true;
    var promise = await Promise.all([GetCurrentUserData(), GetNotifications()]);
    if (promise[0].isSuccess) {
      currentUser.value = promise[0].data!;
      notifications.value = promise[1].data!;
    }
    initLoading.value = false;
  };
  return { initData, currentUser, notifications, initLoading };
});
