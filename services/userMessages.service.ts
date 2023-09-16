import { UserMessageFilterResult } from "./../models/account/UserMessage";
import { IApiResponse, FilterResult } from "./../models/IApiResponse";
export const getUserMessagesByFilter = (
  pageId: number
): Promise<IApiResponse<UserMessageFilterResult>> => {
  return FetchApi("/UserMessages", {
    query: {
      pageId,
    },
  });
};
