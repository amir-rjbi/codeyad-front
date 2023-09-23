import {FilterResult,IApiResponse} from "~/models/IApiResponse";
import {TeacherCourseFilterParams,CourseFilterData} from "~/models/courses/CourseFilterData";
import {OrderDetailsFilterResult} from "~/models/teachers/orderDetails";
import {TeacherComment, TeacherCommentsFilterParams} from "~/models/teachers/teacherComments";
import {CourseLanding} from "~/models/courses/CourseLanding";
import {CourseSpecialComment} from "~/models/courses/CourseLanding";

export const GetTeacherCourses = (
    params: TeacherCourseFilterParams
): Promise<IApiResponse<FilterResult<CourseFilterData>>> => {
    return FetchApi("/Teacher/Courses", {
        params
    });
};

export const GetTeacherCourseById = (
    courseId:number
): Promise<IApiResponse<CourseLanding>> => {
    return FetchApi(`/Teacher/Courses/${courseId}`);
};

export const CreateCourse = (
    createCourseCommand:FormData
)=>{
    return FetchApi('/Teacher',{
        method:'POST',
        body:createCourseCommand
    });
}
export const EditCourse = (
    editCourseCommand:FormData
)=>{
    return FetchApi('/Teacher',{
        method:'PUT',
        body:editCourseCommand
    });
}

export const AddSection = (
    title:string,
    courseId:number
)=>{
    return FetchApi('/Teacher/AddSection',{
        method:'POST',
        body: {
            title,
            courseId
        }
    });
}
export const EditSection = (
    title:string,
    courseId:number,
    sectionId:number
)=>{
    return FetchApi('/Teacher/EditSection',{
        method:'PUT',
        body: {
            title,
            courseId,
            sectionId
        }
    });
}
export const AddEpisode = (
    addEpisodeCommand:FormData
)=>{
    return FetchApi('/Teacher/AddEpisode',{
        method:'POST',
        body:addEpisodeCommand
    });
}

export const GetSpecialComments = (
    courseId: number
): Promise<IApiResponse<FilterResult<CourseSpecialComment>>> => {
    return FetchApi(`/Teacher/SpecialComments?courseId=${courseId}`);
};

export const SetSpecialComments = (
    courseId:number,
    comments:string
)=>{
    return FetchApi(`/Teacher/SetSpecialComments?courseId=${courseId}&commentIds=${comments}`,{
        method:'POST'
    });
}
export const DeleteSpecialComment = (
    commentId:number
)=>{
    return FetchApi(`/Teacher/DeleteSpecialComments?specialCommnetId=${commentId}`,{
        method:'DELETE',
    });
}

export const GetNote = (
    courseId:number,
):Promise<IApiResponse<string>> => {
    return FetchApi(`/Teacher/Note?courseId=${courseId}`,{
        method:'GET',
    });
};

export const SetNote = (
    courseId:number,
    note:string
)=>{
    const data = new FormData();
    // @ts-ignore
    data.append('CourseId',courseId);
    data.append('Note',note);

    return FetchApi(`/Teacher/Note`,{
        method:'POST',
        body:data
    });
}

export const GetOrderDetailsOfStudents = (
    courseId:number,
    pageId:number
):Promise<IApiResponse<OrderDetailsFilterResult>> => {
    return FetchApi('/Teacher/OrderDetails');
};

export const GetTeacherComments = (
    params:TeacherCommentsFilterParams
):Promise<IApiResponse<FilterResult<TeacherComment>>> => {
    return FetchApi('/Teacher/TeacherComments',{
        params
    });
};