import { IApiResponse } from "~~/models/IApiResponse";
import {
  QuestionCategory,
  QuestionFilterResult,
  QuestionDto,
} from "./../models/Question";

export const GetQuestionsByFilter = (
  pageId: number,
  categorySlug?: string | null,
  search?: string | null
): Promise<IApiResponse<QuestionFilterResult>> => {
  return FetchApi("/question", {
    query: {
      pageId,
      categorySlug,
      search,
    },
  });
};

export const GetQuestionCategories = (): Promise<
  IApiResponse<QuestionCategory[]>
> => {
  return FetchApi("/question/getCategories");
};
export const GetQuestionById = (
  id: string
): Promise<IApiResponse<QuestionDto>> => {
  return FetchApi(`/question/${id}?title=show`);
};

export const DeleteQuestionMessage = (
  questionId: number,
  messageId: number
) => {
  return FetchApi(`/Question/DeleteMessage/${questionId}/${messageId}`, {
    method: "DELETE",
  });
};

export const DeleteQuestion = (questionId: number) => {
  return FetchApi(`/Question/${questionId}`, {
    method: "DELETE",
  });
};
export const AcceptQuestionMessage = (
  questionId: number,
  messageId: number
) => {
  return FetchApi(`/Question/AcceptAnswer/${questionId}/${messageId}`, {
    method: "POST",
  });
};
export const SendQuestionAnswer = (data: FormData) => {
  return FetchApi("/question/sendAnswer", {
    method: "POST",
    body: data,
  });
};
export const CreateQuestion = (
  data: FormData
): Promise<IApiResponse<number>> => {
  return FetchApi("/question", {
    method: "POST",
    body: data,
  });
};
