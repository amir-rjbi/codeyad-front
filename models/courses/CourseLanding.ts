import { Course } from "./Course";
export interface CourseLanding {
  courseDto: Course;
  specialComment: CourseSpecialComment[];
}
export interface CourseSpecialComment {
  userFullName: string;
  userAvatar: string;
  text: string;
}
