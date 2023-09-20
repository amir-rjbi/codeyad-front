import { FilterResult } from './../IApiResponse';
import { BaseFilterResult } from "~/models/IApiResponse";
export interface NotificationDto {
  id: number;
  userId: number;
  notificationTitle: string;
  notificationBody: string;
  isSeen: boolean;
  createDate: Date;
}

export interface NotificationFilterResult
  extends FilterResult<NotificationDto> {
  newNotifications: number;
}
