import { Article } from "./articles/Article";
import { CourseFilterData } from "./courses/CourseFilterData";
export interface HomePageData {
  usersCount: number;
  courseCount: number;
  userAvatars: string[];
  latestCourses: CourseFilterData[];
  latestArticles: Article[];
}
