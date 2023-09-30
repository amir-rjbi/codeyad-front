import { Course } from "./Course";
export interface CourseLanding {
  courseDto: Course;
  specialComment: CourseSpecialComment[];
  specifications: Coursespecification[];
}
export interface CourseSpecialComment {
  id: number;
  userFullName: string;
  userAvatar: string;
  text: string;
}
export interface Coursespecification {
  id: number;
  title: string;
  description: string;
}
