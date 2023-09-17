import { CourseFilterData } from "./../models/courses/CourseFilterData";
import { MasterFilterData, SingeMasterData } from "./../models/masters/Master";
import { IApiResponse, FilterResult } from "./../models/IApiResponse";
export const GetMasters = (): Promise<
  IApiResponse<FilterResult<MasterFilterData>>
> => {
  return FetchApi("/Masters", {
    query: {
      pageId: 1,
      take: 100,
    },
  });
};

export const GetMasterByUserName = (
  userName: string
): Promise<IApiResponse<SingeMasterData>> => {
  var url = `/Masters/GetByUserName/${userName}`;
  return FetchApi(url);
};

export const GetMasterCourses = (
  userId: number
): Promise<IApiResponse<FilterResult<CourseFilterData>>> => {
  return FetchApi("/Course/GetByFilterForUserPanel", {
    query: {
      userId,
      pageId: 1,
      take: 30,
    },
  });
};
