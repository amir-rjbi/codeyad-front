import { NotificationFilterResult } from "./../models/account/Notification";
import { User } from "./../models/account/User";
import { IApiResponse } from "~~/models/IApiResponse";

export const GetCurrentUserData = (): Promise<IApiResponse<User>> => {
  return FetchApi("/user/current");
};
export const GetNotifications = (
  pageId: number = 1,
  take: number = 5
): Promise<IApiResponse<NotificationFilterResult>> => {
  return FetchApi("/notification", {
    query: {
      pageId,
      take,
    },
  });
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
  return FetchApi("/user/activate-phone",{
    method:"POST"
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
