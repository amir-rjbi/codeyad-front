import { Course } from "./Course";
export interface CourseLanding {
  courseDto: Course;
  specialComment: CourseSpecialComment[];
}
export interface CourseSpecialComment {
  id:number;
  userFullName: string;
  userAvatar: string;
  text: string;
}
