import { SeoData } from "./SeoData";
import { User } from "./account/User";
export interface QuestionFilterItem {
  user: User;
  subject: string;
  text: string;
  visit: number;
  category: QuestionCategory;
  questionMessagesCount: number;
  isAnyBestAnswer: boolean;
  categoryId: number;
  id: number;
  isDelete: boolean;
  creationDate: string;
}

export interface QuestionDto {
  id: number;
  isDelete: boolean;
  creationDate: string;
  user: User;
  subject: string;
  text: string;
  attachedFile: string;
  visit: number;
  categoryId: number;
  createDate: string;
  questionMessages: QuestionMessage[];
  category: QuestionCategory;
}
export interface QuestionMessage {
  id: number;
  isDelete: boolean;
  creationDate: string;
  user: User;
  questionId: number;
  message: string;
  attachedFile: string;
  isBestAnswer: boolean;
}
export interface QuestionCategory {
  categoryTitle: string;
  slug: string;
  seoData?: SeoData | null;
  id: number;
}
export interface QuestionFilterResult {
  data: QuestionFilterItem[] | undefined;
  entityCount: number;
  currentPage: number;
  pageCount: number;
  startPage: number;
  endPage: number;
  take: number;
  category: QuestionCategory;
}
