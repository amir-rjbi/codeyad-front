import {
  Article,
  ArticleFilterResult,
  SinglePageArticle,
} from "./../models/articles/Article";
import { IApiResponse } from "./../models/IApiResponse";
export const getPopularArticles = (): Promise<IApiResponse<Article[]>> => {
  return FetchApi("/article/papulars");
};
export const GetArticleBySlug = (
  slug: string
): Promise<IApiResponse<SinglePageArticle>> => {
  return FetchApi("/article/GetBySlug/" + slug);
};
export const GetLatestArticles = (): Promise<
  IApiResponse<ArticleFilterResult>
> => {
  return FetchApi("/article", {
    query: {
      take: 3,
      pageId: 1,
      OrderBy: "dateRelease",
    },
  });
};
