import { WithdrawalFilterResult } from "./../models/account/Withdrawal";
import { IApiResponse } from "~~/models/IApiResponse";

export const GetWithdrawals = (
  pageId: number = 1
): Promise<IApiResponse<WithdrawalFilterResult>> => {
  return FetchApi("/Withdrawal", {
    query: {
      pageId,
      take: 10,
    },
  });
};
