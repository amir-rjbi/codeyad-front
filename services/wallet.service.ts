import {IApiResponse} from "../models/IApiResponse";
import {WalletFilterResult} from "../models/wallets/WalletFilterResult"


export const GetWallets = (
    pageId: number = 1
): Promise<IApiResponse<WalletFilterResult>> => {
    return FetchApi("/Wallet", {
        query: {
            pageId,
            take: 10,
        },
    });
};
