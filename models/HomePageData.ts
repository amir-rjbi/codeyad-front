import { Article } from "./articles/Article";
import { CourseFilterData } from "./courses/CourseFilterData";
export interface HomePageData {
  usersCount: number;
  coursesCount: number;
  userAvatars: string[];
  latestCourses: CourseFilterData[];
  latestArticles: Article[];
}
