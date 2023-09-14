import { LoginResult } from "./../models/account/LoginResult";
import { IApiResponse } from "~~/models/IApiResponse";
import { FetchApi } from "../utils/customFetchApi";

export const Login = (
  phoneNumber: string,
  password: string
): Promise<IApiResponse<LoginResult>> => {
  return FetchApi("/auth", {
    method: "POST",
    body: {
      password,
      phoneNumber,
    },
  });
};
export const LogoutUser=()=>{
  return FetchApi("/auth/logout",{
    method:"DELETE"
  })
}
export const LoginWithGoogle = (
  token: string
): Promise<IApiResponse<LoginResult>> => {
  return FetchApi("/auth/GoogleLogin?accessToken=" + token, {
    method: "POST",
  });
};
