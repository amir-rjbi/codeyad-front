import { NotificationDto } from './../models/account/Notification';
import { User } from "./../models/account/User";
import { IApiResponse } from "~~/models/IApiResponse";

export const GetCurrentUserData = (): Promise<IApiResponse<User>> => {
  return FetchApi("/user/current");
};
export const GetNotifications = (): Promise<IApiResponse<NotificationDto[]>> => {
  return FetchApi("/notification");
};
export const ChangePassword = (data: FormData) => {
  return FetchApi("/user/ChangePassword", {
    method: "POST",
    body: data,
  });
};
export const EditUser = (data: FormData) => {
  return FetchApi("/user", {
    method: "PUT",
    body: data,
  });
};