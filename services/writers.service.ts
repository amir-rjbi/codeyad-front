import { ArticleFilterResult } from "./../models/articles/Article";
import { IApiResponse } from "./../models/IApiResponse";
import { WriterFilterData, Writer } from "./../models/writers/Writer";
export const GetWriters = (): Promise<IApiResponse<WriterFilterData[]>> => {
  return FetchApi("/writers");
};
export const GetWriterById = (
  id: number | string
): Promise<IApiResponse<Writer>> => {
  return FetchApi(`/writers/${id}`);
};

export const GetWriterArticles = (
  id: number | string,
  pageId: number
): Promise<IApiResponse<ArticleFilterResult>> => {
  return FetchApi(`/writers/articles/${id}`, {
    query: {
      pageId,
      take: 5,
    },
  });
};
