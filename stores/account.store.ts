import { NotificationDto } from './../models/account/Notification';
import {
  GetCurrentUserData,
  GetNotifications,
} from "./../services/account.service";
import { User } from "./../models/account/User";
import { defineStore } from "pinia";
import { ApiStatusCodes } from "~/models/ApiStatusCodes";
import Loading from "~/components/icons/loading.vue";

export const useAccountStore = defineStore("account", () => {
  const currentUser: Ref<User | null> = ref(null);
  const notifications: Ref<NotificationDto[]> = ref([]);
  const initLoading = ref(true);

  const initData = async () => {
    initLoading.value = true;
    var promise = await Promise.all([GetCurrentUserData(), GetNotifications()]);
    if (promise[0].isSuccess) {
      currentUser.value = promise[0].data!;
      notifications.value = promise[1].data!;
    } else if (
      promise[0].metaData.appStatusCode == ApiStatusCodes.UnAuthorize
    ) {
      var cookie = useCookie("c-access-token");
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
