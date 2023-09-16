import { User } from "./User";

export interface UserMessageFilterResult {
  entityCount: number;
  currentPage: number;
  pageCount: number;
  startPage: number;
  endPage: number;
  take: number;
  messages: UserMessage[];
}
export interface UserMessage {
  id: number;
  senderId: number;
  reciverId: number;
  createDate: string;
  subject: string;
  senderUser: User;
  reciverUser: User;
  messageContents: MessageContent[];
}
interface MessageContent {
  id: number;
  messageId: number;
  userId: number;
  text: string;
  createDate: string;
  isSeen: boolean;
}
