import { IApiResponse } from "~~/models/IApiResponse";

export const GetUserOrder = (): Promise<IApiResponse<Order[]>> => {
  return FetchApi("/order/userOrders");
};

export const GetOrderById = (orderId: number): Promise<IApiResponse<Order>> => {
  return FetchApi("/order/userOrderById", {
    query: {
      orderId,
    },
  });
};
