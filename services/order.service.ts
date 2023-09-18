import { IApiResponse } from "~~/models/IApiResponse";
import {order}from "../models/account/Order"


export const GetCurrentOrder = (): Promise<
  IApiResponse<order>
> => {
  return FetchApi("/order/current");
};
export const GetUserOrder = (): Promise<
  IApiResponse<order>
> => {
  return FetchApi("/order/userOrders");
};

export const GetOrderById = (
    orderId: number,
   
  ): Promise<IApiResponse<order>> => {
    return FetchApi("/order/userOrderById", {
      query: {
        orderId
      },
    });
  };
