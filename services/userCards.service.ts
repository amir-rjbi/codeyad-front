import { IApiResponse } from "~~/models/IApiResponse";
import {card}from "../models/account/card"



export const GetUserCard = (): Promise<IApiResponse<card>> => {
    return FetchApi("/UserCards");
  };
  export const GetUserCardById = (
    id: string
  ): Promise<IApiResponse<card>> => {
    return FetchApi(`/UserCards/GetById/${id}`);
  };
  export const AddCard = (data: FormData) => {
    return FetchApi("/UserCards", {
      method: "POST",
      body: data,
    });
  };
  export const EditCard = (data: FormData) => {
    return FetchApi("/UserCards", {
      method: "PUT",
      body: data,
    });
  };
  export const DeleteCard = (
    CardId: number,
  
  ) => {
    return FetchApi(`/UserCards/${CardId}`, {
      method: "DELETE",
    });
  };