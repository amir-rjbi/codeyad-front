import { Article } from "./articles/Article";
import { CourseSearchData } from "./courses/CourseFilterData";
export interface HomePageData {
  usersCount: number;
  coursesCount: number;
  userAvatars: string[];
  latestCourses: CourseSearchData[];
  latestArticles: Article[];
}
