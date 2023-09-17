import { Article } from "./../models/articles/Article";
import { IApiResponse } from "./../models/IApiResponse";
export const getPopularArticles = (): Promise<IApiResponse<Article[]>> => {
  return FetchApi("/article/papulars");
};
