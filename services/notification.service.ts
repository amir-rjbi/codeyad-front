import { IApiResponse } from "./../models/IApiResponse";
import { NotificationFilterResult } from "./../models/account/Notification";
export const GetNotifications = (
  pageId: number = 1,
  take: number = 5
): Promise<IApiResponse<NotificationFilterResult>> => {
  return FetchApi("/notification", {
    query: {
      pageId,
      take,
    },
  });
};
export const DeleteAllNotifications = () => {
  return FetchApi("/notification", {
    method: "DELETE",
  });
};
export const SeenNotification = (notificationId: number) => {
  return FetchApi("/notification", {
    method: "PUT",
    query: {
      notificationId: notificationId,
    },
  });
};
