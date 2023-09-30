import { IApiResponse } from "./../models/IApiResponse";
import {
  BootcampStatus,
  BootCamp,
  BootCampFilterResult,
  BootCampFilterData,
} from "./../models/bootcamps/BootCampFilterData";
export const GetBootcamps = (
  pageId: number = 1,
  take: number = 5,
  status: BootcampStatus | null = null
): Promise<IApiResponse<BootCampFilterResult>> => {
  var queryParams = {
    pageId,
    take,
    status,
  };
  RemoveEmptyProps(queryParams);
  return FetchApi("/bootcamp", {
    query: queryParams,
  });
};

export const GetBootcampBySlug = (
  slug: string
): Promise<IApiResponse<BootCamp>> => {
  return FetchApi("/bootcamp/getBySlug/" + slug);
};

export const GetUserBootcamps = (): Promise<
  IApiResponse<BootCampFilterData[]>
> => {
  return FetchApi("/bootcamp/UserBootCamps");
};
