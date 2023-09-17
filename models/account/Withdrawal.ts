import { BaseFilterResult } from "./../IApiResponse";
export interface WithdrawalDto {
  userId: number;
  amount: number;
  cryptoAmount: number;
  cardId: number;
  cardNumber: string;
  createDate: Date;
  paymentDate: Date;
  isPay: boolean;
}
export interface WithdrawalFilterResult extends BaseFilterResult {
  withdrawals: WithdrawalDto[];
}
