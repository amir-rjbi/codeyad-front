import { User } from "./../account/User";
import { BaseFilterResult } from "./../IApiResponse";
import { SeoData } from "./../SeoData";
export interface Article {
  id: number;
  title: string;
  slug: string;
  body: string;
  imageName: string;
  categoryId: number;
  subCategoryId: number;
  dateRelease: string;
  mainCategory: ArticleCategory;
  subCategory: ArticleCategory;
  seoData: SeoData;
}
export interface SinglePageArticle {
  ownerUser: User;
  article: Article;
  relatedArticles: Article[];
}
export interface ArticleFilterResult extends BaseFilterResult {
  articles: Article[];
}
export interface ArticleCategory {
  id: number;
  isDelete: boolean;
  creationDate: string;
  categoryTitle: string;
  slug: string;
  seoData: SeoData;
  parentId: number;
}
