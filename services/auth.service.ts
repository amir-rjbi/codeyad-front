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
export interface RegisterCommand {
  email: string;
  phoneNumber: string;
  password: string;
  rePassword: string;
}
export const RegisterUser = (
  command: RegisterCommand
): Promise<IApiResponse<LoginResult>> => {
  return FetchApi("/auth/register", {
    method: "POST",
    body: command,
  });
};

export const LogoutUser = () => {
  return FetchApi("/auth/logout", {
    method: "DELETE",
  });
};
export const LoginWithGoogle = (
  token: string
): Promise<IApiResponse<LoginResult>> => {
  return FetchApi("/auth/GoogleLogin?accessToken=" + token, {
    method: "POST",
  });
};

export const ValidateLoginSmsCode = (
  phoneNumber: string,
  code: string
): Promise<IApiResponse<LoginResult>> => {
  return FetchApi("/auth/ValidateSmsCode", {
    method: "PUT",
    query: {
      phoneNumber,
      code,
    },
  });
};
export const RecoveryUserPassword = (phoneNumber: string) => {
  return FetchApi("/auth/RecoveryPassword", {
    method: "POST",
    query: {
      phoneNumber,
    },
  });
};
export const ResetUserPassword = (
  phoneNumber: string,
  password: string,
  code: string
) => {
  return FetchApi("/auth/ResetPassword", {
    method: "PUT",
    body: {
      phoneNumber,
      password,
      code,
    },
  });
};
