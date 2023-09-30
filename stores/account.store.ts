import { TicketFilterResult } from "./../models/tickets/TicketDto";
import {
  GetCurrentUserData,
  GetUserAlertsCount,
} from "./../services/account.service";
import { User, UserAlertsCount } from "./../models/account/User";
import { defineStore } from "pinia";
import { ApiStatusCodes } from "~/models/ApiStatusCodes";

export const useAccountStore = defineStore("account", () => {
  const currentUser: Ref<User | null> = ref(null);
  const newAlertsCount: Ref<UserAlertsCount | null> = ref(null);
  const initLoading = ref(true);
  const ticketFilterResult: Ref<TicketFilterResult | null> = ref(null);

  const haveNewAlert = computed(() => {
    if ((newAlertsCount.value?.newMessagesCount ?? 0) > 0) return true;
    if ((newAlertsCount.value?.newNotificationsCount ?? 0) > 0) return true;
    return false;
  });
  const userHasTeacherRole = computed(() => {
    return currentUser.value?.roles.includes("مدرس");
  });

  const initData = async () => {
    initLoading.value = true;
    var promise = await Promise.all([
      GetCurrentUserData(),
      GetUserAlertsCount(),
    ]);
    if (promise[0].isSuccess) {
      currentUser.value = promise[0].data!;
      newAlertsCount.value = promise[1].data ?? null;
    } else if (
      promise[0].metaData.appStatusCode == ApiStatusCodes.UnAuthorize
    ) {
      var cookie = useCookie("c-access-token");
      console.log(cookie);
      var refreshCookie = useCookie("c-refresh-token");
      cookie.value = null;
      refreshCookie.value = null;
      currentUser.value = null;
      newAlertsCount.value = null;
    }
    initLoading.value = false;
  };
  return {
    initData,
    haveNewAlert,
    userHasTeacherRole,
    currentUser,
    newAlertsCount,
    initLoading,
    ticketFilterResult
  };
});
