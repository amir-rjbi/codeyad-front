import {FilterParams} from "~/models/IApiResponse";

export interface TeacherCommentsFilterParams extends FilterParams{
    courseId:number;
    search:number;
}

export interface TeacherComment {
    id: number;
    creationDate: string;
    text: string;
    fullName: string;
    userImageName: string;
    userId: number;
    replies: string[];
}