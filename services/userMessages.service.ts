import {
  UserMessageData,
  UserMessageFilterResult,
} from "./../models/account/UserMessage";
import { IApiResponse } from "./../models/IApiResponse";
export const getUserMessagesByFilter = (
  pageId: number
): Promise<IApiResponse<UserMessageFilterResult>> => {
  return FetchApi("/UserMessages", {
    query: {
      pageId,
    },
  });
};

export const CreateMessage = (
  userName: string,
  title: string,
  message: string
): Promise<IApiResponse<number>> => {
  return FetchApi("/userMessages/CreateMessage", {
    method: "POST",
    body: {
      userName,
      title,
      message,
    },
  });
};

export const getUserMessage = (
  messageId: number
): Promise<IApiResponse<UserMessageData>> => {
  return FetchApi(`/UserMessages/GetById/${messageId}`);
};

export const SendMessage = (
  messageId: number,
  message: string
): Promise<IApiResponse<number>> => {
  return FetchApi(`/UserMessages`, {
    method: "POST",
    body: {
      messageId,
      message,
    },
  });
};
