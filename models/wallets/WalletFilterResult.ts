import { BaseFilterResult } from "./../IApiResponse";

export interface WalletDto {
  userId: number;
  walletType: WalletType;
  amount: number;
  cryptoAmount: number;
  description: string;
  isFinally: boolean;
  paymentDate: Date;
}

export enum WalletType {
  واریز ="واریز",
  برداشت ="برداشت",
}

export interface WalletFilterResult extends BaseFilterResult {
  wallets: WalletDto[];
  userWalletAmount: number;
  userCryptoWalletAmount: number;
}
