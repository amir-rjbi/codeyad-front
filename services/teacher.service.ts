import { Course } from "./../models/courses/Course";
import { FilterResult, IApiResponse } from "~/models/IApiResponse";
import {
  TeacherCourseFilterParams,
  CourseFilterData,
} from "~/models/courses/CourseFilterData";
import { OrderDetailsFilterResult } from "~/models/teachers/orderDetails";
import { TeacherCommentsFilterParams } from "~/models/teachers/teacherComments";
import { CourseSpecialComment } from "~/models/courses/CourseLanding";
import { Comment } from "~/models/comments/Comment";
import {CourseSpecificationDto} from "~/models/teachers/courseSpecification";

export const GetTeacherCourses = (
  params: TeacherCourseFilterParams
): Promise<IApiResponse<FilterResult<CourseFilterData>>> => {
  return FetchApi("/Teacher/Courses", {
    params,
  });
};

export const GetTeacherCourseById = (
  courseId: number
): Promise<IApiResponse<Course>> => {
  return FetchApi(`/Teacher/Courses/${courseId}`);
};

export const CreateCourse = (createCourseCommand: FormData) => {
  return FetchApi("/Teacher", {
    method: "POST",
    body: createCourseCommand,
  });
};
export const EditCourse = (editCourseCommand: FormData) => {
  return FetchApi("/Teacher", {
    method: "PUT",
    body: editCourseCommand,
  });
};

export const AddSection = (title: string, courseId: number) => {
  return FetchApi("/Teacher/AddSection", {
    method: "POST",
    body: {
      title,
      courseId,
    },
  });
};
export const EditSection = (
  title: string,
  courseId: number,
  sectionId: number
) => {
  return FetchApi("/Teacher/EditSection", {
    method: "PUT",
    body: {
      title,
      courseId,
      sectionId,
    },
  });
};
export const AddEpisode = (addEpisodeCommand: FormData) => {
  return FetchApi("/Teacher/AddEpisode", {
    method: "POST",
    body: addEpisodeCommand,
    timeout: 7200000,
    
  });
};

export const GetSpecialComments = (
  courseId: number
): Promise<IApiResponse<CourseSpecialComment[]>> => {
  return FetchApi(`/Teacher/SpecialComments?courseId=${courseId}`);
};

export const SetSpecialComments = (courseId: number, comments: string) => {
  return FetchApi(
    `/Teacher/SetSpecialComments?courseId=${courseId}&commentIds=${comments}`,
    {
      method: "POST",
    }
  );
};
export const DeleteSpecialComment = (commentId: number) => {
  return FetchApi(
    `/Teacher/DeleteSpecialComments/${commentId}`,
    {
      method: "DELETE",
    }
  );
};

export const GetNote = (courseId: number): Promise<IApiResponse<string>> => {
  return FetchApi(
    `/Teacher/Note?courseId=${courseId}`,
    {
      method: "GET",
    },
    {
      ignoreErrors: true,
    }
  );
};

export const SetNote = (courseId: number, note: string) => {
  const data = new FormData();
  // @ts-ignore
  data.append("CourseId", courseId);
  data.append("Note", note);

  return FetchApi(`/Teacher/Note`, {
    method: "POST",
    body: data,
  });
};

export const GetOrderDetailsOfCourse = (
  courseId: number,
  pageId: number,
  take: number
): Promise<IApiResponse<OrderDetailsFilterResult>> => {
  return FetchApi(
    `/Teacher/OrderDetails?courseId=${courseId}&pageId=${pageId}&take=${take}`
  );
};

export const GetTeacherComments = (
  params: TeacherCommentsFilterParams
): Promise<IApiResponse<FilterResult<Comment>>> => {
  return FetchApi("/Teacher/TeacherComments", {
    params,
  });
};

// --- Course Specification Services --- //
export const GetSpecificationsOfCourse = (
    courseId:number
):Promise<IApiResponse<CourseSpecificationDto[]>> => {
  return FetchApi(`/Teacher/CourseSpecification/${courseId}`);
}
export const GetSpecifications = (
    specificationId:number
):Promise<IApiResponse<CourseSpecificationDto>> => {
  return FetchApi(`/Teacher/CourseSpecification/GetById/${specificationId}`);
}
export const AddCourseSpecification = (
    courseId:number,
    title:string,
    desc:string
) => {

  const addData = new FormData();
  addData.append('courseId',courseId.toString());
  addData.append('title',title);
  addData.append('description',desc);

  return FetchApi(`/Teacher/CourseSpecification`,{
    method:'POST',
    body:addData
  });
}
export const EditCourseSpecification = (
    specificationId:number,
    courseId:number,
    title:string,
    desc:string
) => {

  const editData = new FormData();
  editData.append('id',specificationId.toString());
  editData.append('courseId',courseId.toString());
  editData.append('title',title);
  editData.append('description',desc);

  return FetchApi(`/Teacher/CourseSpecification`,{
    method:'PUT',
    body:editData
  });
}
export const RemoveCourseSpecification = (
    specificationId:number
) => {
  return FetchApi(`/Teacher/CourseSpecification/${specificationId}`,{
    method:'DELETE'
  });
}