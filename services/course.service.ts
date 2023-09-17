import { CourseLanding } from "./../models/courses/CourseLanding";
import { IApiResponse } from "./../models/IApiResponse";
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
