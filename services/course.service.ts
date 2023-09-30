import { CourseCategory } from "~/models/courses/Course";
import {
  CourseSearchData,
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
): Promise<IApiResponse<FilterResult<CourseSearchData>>> => {
  RemoveEmptyProps(filterParams);
  return FetchApi("/course/getByFilter", {
    query: filterParams,
  });
};
export const GetCourseCategories = (): Promise<
  IApiResponse<CourseCategory[]>
> => {
  return FetchApi("/course/categories");
};
export const RegisterFreeCourse = (courseId: number) => {
  return FetchApi("/course/registerFreeCourse?courseId=" + courseId,{
    method:"POST"
  });
};
