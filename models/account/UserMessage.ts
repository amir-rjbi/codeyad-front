import { User } from "./User";

export interface UserMessageFilterResult {
  entityCount: number;
  currentPage: number;
  pageCount: number;
  startPage: number;
  endPage: number;
  take: number;
  messages: UserMessageFilterData[];
}
export interface UserMessageFilterData {
  id: number;
  senderId: number;
  senderName: string;
  reciverId: number;
  reciverName: string;
  createDate: Date;
  subject: string;
  status: boolean;
  contentCount: number;
}
export interface UserMessageData {
  messageId: number;
  senderId: number;
  reciverId: number;
  createDate: string;
  subject: string;
  messageContents: MessageContent[];
}
export interface MessageContent {
  id: number;
  messageId: number;
  userId: number;
  text: string;
  createDate: string;
  isSeen: boolean;
  senderUser: User;
}
