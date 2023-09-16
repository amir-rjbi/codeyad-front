import { NotificationDto } from './../models/account/Notification';
import { User } from "./../models/account/User";
import { IApiResponse } from "~~/models/IApiResponse";

export const GetCurrentUserData = (): Promise<IApiResponse<User>> => {
  return FetchApi("/user/current");
};
export const GetNotifications = (): Promise<IApiResponse<NotificationDto[]>> => {
  return FetchApi("/notification");
};
