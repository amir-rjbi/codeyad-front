import { User } from "./User";
import {BaseFilterResult} from "~/models/IApiResponse";

export interface UserMessageFilterResult extends BaseFilterResult{
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
  hasNewMessage: boolean;
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
