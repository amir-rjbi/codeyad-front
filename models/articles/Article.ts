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
  ownerUser: {
    userId:number,
    imageName:string,
    fullName:string,
  };
  article: Article;
  relatedArticles: Article[];
}
export interface ArticleFilterResult extends BaseFilterResult {
  articleDtos: Article[];
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
