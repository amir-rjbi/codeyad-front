export interface Notification {
  id: number;
  userId: number;
  notificationTitle: string;
  notificationBody: string;
  isSeen: boolean;
  createDate: Date;
}
