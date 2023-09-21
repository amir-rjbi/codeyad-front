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
export const CreateWithdrawalRequest = (
  amount: number,
  cardId: number,
  cryptoAmount: number = 0
) => {
  var formData = new FormData();
  formData.append("CardId", cardId.toString());
  formData.append("Amount", amount.toString());
  formData.append("cryptoAmount", cryptoAmount.toString());

  return FetchApi("/Withdrawal", {
    method: "POST",
    body: formData,
  });
};
