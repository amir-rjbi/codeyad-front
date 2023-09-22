import { useUtilStore } from "./util.store";
import { NotificationDto } from "./../models/account/Notification";
import {
  GetCurrentUserData,
  GetNotifications,
} from "./../services/account.service";
import { User } from "./../models/account/User";
import { defineStore } from "pinia";
import { ApiStatusCodes } from "~/models/ApiStatusCodes";

export const useAccountStore = defineStore("account", () => {
  const currentUser: Ref<User | null> = ref(null);
  const notifications: Ref<NotificationDto[]> = ref([]);
  const newNotifications = ref(0);
  const initLoading = ref(true);

  const initData = async () => {
    initLoading.value = true;
    var promise = await Promise.all([GetCurrentUserData(), GetNotifications()]);
    if (promise[0].isSuccess) {
      currentUser.value = promise[0].data!;
      notifications.value = promise[1].data?.data ?? [];
      newNotifications.value = promise[1].data?.newNotifications ?? 0;
    } else if (
      promise[0].metaData.appStatusCode == ApiStatusCodes.UnAuthorize
    ) {
      var cookie = useCookie("c-access-token");
      console.log(cookie)
      var refreshCookie = useCookie("c-refresh-token");
      cookie.value = null;
      refreshCookie.value = null;
      currentUser.value = null;
      notifications.value = [];
    }
    initLoading.value = false;
  };
  return { initData, currentUser, notifications, initLoading };
});
