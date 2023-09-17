import { SeoData } from "./../SeoData";
export interface Article {
  title: string;
  slug: string;
  body: string;
  imageName: string;
  categoryId: number;
  subCategoryId: number;
  dateRelease: string;
  mainCategory: ArticleCategory;
  subCategory: ArticleCategory;
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
