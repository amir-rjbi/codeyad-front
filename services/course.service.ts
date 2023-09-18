import {
  CourseFilterData,
  CourseFilterParams,
} from "./../models/courses/CourseFilterData";
import { CourseLanding } from "./../models/courses/CourseLanding";
import { IApiResponse, FilterResult } from "./../models/IApiResponse";

export const GetCourseLanding = (
  slug: string
): Promise<IApiResponse<CourseLanding>> => {
  return FetchApi(
    "/course/GetBySlug/" + slug,
    {},
    {
      ignoreErrors: true,
    }
  );
};
export const GetCourseByFilter = (
  filterParams: CourseFilterParams
): Promise<IApiResponse<FilterResult<CourseFilterData>>> => {
  return FetchApi("/course/getByFilter", {
    query: filterParams,
  });
};
