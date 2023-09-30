import { CourseFilterData } from "./../models/courses/CourseFilterData";
import { MasterFilterData, SingeMasterData } from "./../models/masters/Master";
import { IApiResponse, FilterResult } from "./../models/IApiResponse";
export const GetMasters = (): Promise<
  IApiResponse<FilterResult<MasterFilterData>>
> => {
  return useFetchWithCache("/Masters?pageId=1&take=100");
};

export const GetMasterByUserName = (
  userName: string
): Promise<IApiResponse<SingeMasterData>> => {
  var url = `/Masters/GetByUserName/${userName}`;
  return FetchApi(url);
};
export const GetMasterByUserId = (
  userId: string
): Promise<IApiResponse<SingeMasterData>> => {
  var url = `/Masters/GetByUserId/${userId}`;
  return FetchApi(url);
};
export const FollowTeacher = (userName: string) => {
  return FetchApi("/masters/Follow", {
    method: "POST",
    query: {
      userName,
    },
  });
};
export const UnFollowTeacher = (userName: string) => {
  return FetchApi("/masters/unFollow", {
    method: "POST",
    query: {
      userName,
    },
  });
};
export const GetMasterCourses = (
  userId: number
): Promise<IApiResponse<FilterResult<CourseFilterData>>> => {
  return FetchApi("/Course/getByFilter", {
    query: {
      userId,
      pageId: 1,
      take: 30,
    },
  });
};
