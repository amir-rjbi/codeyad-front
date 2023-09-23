import {IApiResponse} from "~/models/IApiResponse";
import {ConsultationFilterResult,ConsultationFilterParams} from "~/models/consultations/consultationDto";

export const GetUserConsultations = (
    params:ConsultationFilterParams
): Promise<IApiResponse<ConsultationFilterResult>> => {
    return FetchApi("/Consultation", {
        query: params,
    });
};