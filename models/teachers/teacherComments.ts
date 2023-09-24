import {FilterParams} from "~/models/IApiResponse";

export interface TeacherCommentsFilterParams extends FilterParams{
    courseId:number;
    search:string;
}
