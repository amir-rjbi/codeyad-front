export interface NotificationDto {
  id: number;
  userId: number;
  notificationTitle: string;
  notificationBody: string;
  isSeen: boolean;
  createDate: Date;
}
