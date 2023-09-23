import { Article } from "./articles/Article";
import { CourseSearchData } from "./courses/CourseFilterData";

export interface SearchFilterResult {
  courses: CourseSearchData[];
  articles: Article[];
}
