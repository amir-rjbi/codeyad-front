import { type FetchError, type FetchOptions } from "ofetch";
import { IApiResponse } from "~~/models/IApiResponse";
import { BASE_URL } from "./api.config";
import FetchCustomConfig from "./FetchCustomConfig";
import { ApiStatusCodes } from "~~/models/ApiStatusCodes";

export async function FetchApi<T>(
  url: string,
  config: FetchOptions = {},
  customConfig: FetchCustomConfig = {}
): Promise<IApiResponse<T>> {
  config = { baseURL: BASE_URL, retry: 0, ...config };
  if (!config.headers) {
    config.headers = {};
  }
  var cookie = useCookie("c-access-token");
  if (cookie.value) {
    //@ts-ignore
    config.headers["Authorization"] = `Bearer ${cookie.value}`;
  }

  function showError(result: IApiResponse<any>) {
    if (
      customConfig.ignoreErrors == false ||
      customConfig.ignoreErrors == undefined
    ) {
      if (process.server == false) {
        const toast = useToast();
        toast.showToast(result.metaData.message, ToastType.error, 3000);
      }
    }
  }

  //@ts-ignore
  return $fetch<IApiResponse<T>>(url, config)
    .then((response) => {
      if (response.isSuccess == false) {
        showError(response);
      }
      return response;
    })
    .catch((e: FetchError) => {
      customConfig.onError?.(e);
      var response = {
        data: undefined,
        isSuccess: false,
        metaData: {
          message:
            e.response?._data?.MetaData?.Message ?? "مشکلی در عملیات رخ داده",
          appStatusCode: e.response?._data?.MetaData?.AppStatusCode,
        },
      };
      if (e.response?.status == 401) {
        response.metaData.appStatusCode = ApiStatusCodes.UnAuthorize;
        showError({
          isSuccess: false,
          data: undefined,
          metaData: {
            message: "دسترسی غیر مجاز",
            appStatusCode: ApiStatusCodes.UnAuthorize,
          },
        });
      } else if (e.response?.status == 400) {
        var errMessage = "اطلاعات نامعتبر است";
        showError({
          isSuccess: false,
          data: undefined,
          metaData: {
            message: e.response?._data?.metaData?.message ?? errMessage,
            appStatusCode: ApiStatusCodes.BadRequest,
          },
        });
      } else if (e.response?.status == 403) {
        var errMessage = "دسترسی غیرمجاز";
        console.log(e.response?._data);
        showError({
          isSuccess: false,
          data: undefined,
          metaData: {
            message: e.response?._data?.metaData?.message ?? errMessage,
            appStatusCode: ApiStatusCodes.BadRequest,
          },
        });
      } else if (e.response?.status == 429) {
        showError({
          isSuccess: false,
          data: undefined,
          metaData: {
            message:
              "تعداد درخواست های شما بیشتر از حد مجاز است ، چند دقیقه بعد تلاش کنید",
            appStatusCode: ApiStatusCodes.ServerError,
          },
        });
      } else if (e.response?._data == undefined) {
        showError({
          data: undefined,
          isSuccess: false,
          metaData: {
            message: "ارتباط با سرور برقرار نشد",
            appStatusCode: ApiStatusCodes.ServerError,
          },
        });
      } else {
        showError(response);
      }

      return response;
    });
}