import { FetchApi } from "../utils/customFetchApi";
export const Login = (phoneNumber: string, password: string) => {
  return FetchApi("/");
};
