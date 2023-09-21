import {BaseFilterResult,FilterParams} from "~/models/IApiResponse";

export interface ConsultationFilterParams extends FilterParams{
    teacherId:number | null | undefined;
    OwnerUserId:number | null | undefined;
    StartDate:Date | null | undefined;
    EndDate:Date | null | undefined;
    SearchOn:SearchOnType | null | undefined;
}
export enum SearchOnType{
    deleted,
    active,
    all
}

export interface ConsultationFilterResult extends BaseFilterResult{
    requests : ConsultationDto[];
}

export interface ConsultationDto{
    id: number;
    teacherId: number;
    ownerUserId: number;
    date: Date;
    hour: string;
    description: string;
    teacherNote: string;
    status: ConsultationStatus;
}
export enum ConsultationStatus{
    new,
    accepted,
    rejected
}