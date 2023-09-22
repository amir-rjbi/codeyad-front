import { ShopCart } from "./../models/ShopCart";
import { IApiResponse } from "./../models/IApiResponse";
import { TetherPayPageDataDto } from "~/models/TetherPayPageData";
export const AddToShopCart = (courseId: number) => {
  return FetchApi(`/shopCart/AddToCart/${courseId}`, {
    method: "POST",
  });
};
export const GetCurrentCart = (): Promise<IApiResponse<ShopCart>> => {
  return FetchApi("/ShopCart/current");
};
export const DeleteShopCartItem = (id: number) => {
  return FetchApi(`/shopCart?id=${id}`, {
    method: "DELETE",
  });
};
export const ApplyDiscount = (code: string) => {
  return FetchApi(`/shopCart/ApplyDisCountCode/${code}`, {
    method: "POST",
  });
};
export const PayShopcartWithWallet = () => {
  return FetchApi(`/shopCart/PayWithWallet`, {
    method: "POST",
  });
};
export const TetherPayPageData = (): Promise<
  IApiResponse<TetherPayPageDataDto>
> => {
  return FetchApi("/TetherPay");
};
export const CreateTetherPayRequest = (txtId: string) => {
  return FetchApi(`/TetherPay`, {
    method: "POST",
    query: {
      txId: txtId,
    },
  });
};
