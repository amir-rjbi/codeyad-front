import { TransactionFor } from "./../models/transaction/TransactionFor";
import { IApiResponse } from "./../models/IApiResponse";
export const CreateTransaction = (
  transactionFor: TransactionFor,
  paymentAmount: number = 0,
  linkId: number = 0,
  errorCallBack: string = "",
  successCallBack: string = ""
): Promise<IApiResponse<string>> => {
  if (errorCallBack == "") {
    errorCallBack = `${CurrentDomainUrl}/payment/error`;
  }

  if (successCallBack == "") {
    successCallBack = `${CurrentDomainUrl}/payment/success`;
  }

  return FetchApi("/Transaction", {
    method: "POST",
    body: {
      errorCallBack,
      successCallBack,
      paymentAmount,
      linkId,
      transactionFor,
    },
  });
};
