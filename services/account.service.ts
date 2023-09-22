import { NotificationFilterResult } from "./../models/account/Notification";
import { User, UserAlertsCount } from "./../models/account/User";
import { IApiResponse } from "~~/models/IApiResponse";

export const GetCurrentUserData = (): Promise<IApiResponse<User>> => {
  return FetchApi("/user/current");
};
export const GetUserAlertsCount = (): Promise<
  IApiResponse<UserAlertsCount>
> => {
  return FetchApi("/user/current/alertsCount");
};
export const EditProfile = (
  name: string,
  family: string,
  phoneNumber: string,
  email: string,
  about: string | null = null,
  avatar: any | null
) => {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("family", family);
  formData.append("phoneNumber", phoneNumber);
  if (about != null && about != "") {
    formData.append("aboutMe", about.toString());
  }
  formData.append("email", email);
  if (avatar != null) {
    formData.append("Avatar", avatar);
  }
  return FetchApi("/user", {
    method: "PUT",
    body: formData,
  });
};

export const SendVerifyPhoneNumber = () => {
  return FetchApi("/user/activate-phone", {
    method: "POST",
  });
};
export const VerifyUserPhoneNumber = (code: string) => {
  return FetchApi("/user/activate-phone", {
    method: "PUT",
    query: {
      code,
    },
  });
};
export const ChangePassword = (data: FormData) => {
  return FetchApi("/user/ChangePassword", {
    method: "POST",
    body: data,
  });
};
export const EditUser = (data: FormData) => {
  return FetchApi("/user", {
    method: "PUT",
    body: data,
  });
};
export const IsAccessRegisterTeacherPage = () => {
  return FetchApi("/user/TeacherRequest");
};
export const RegisterTeacherRequest = (formData: FormData) => {
  return FetchApi("/user/TeacherRequest", {
    method: "POST",
    body: formData,
  });
};
