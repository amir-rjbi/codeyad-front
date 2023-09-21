import { SeoData } from "./../SeoData";
import {SearchOnType} from "../IApiResponse";

export interface CourseFilterData {
  teacherUserId: number;
  courseTitle: string;
  courseLevel: CourseLevel;
  slug: string;
  imageName: string;
  teacherName: string;
  duration: string;
  status: CourseStatus;
  episodeCount: number;
  price: number;
  studentCount: number;
  discountPercentage: number;
  totalPrice: number;
  seoData: SeoData;
  id: number;
  isDelete: boolean;
  creationDate: string;
}
export enum CourseLevel {
  beginner = "beginner",
  intermediate = "intermediate",
  expert = "expert",
}
export interface CourseFilterParams {
  search?: string | null | undefined;
  pageId: number;
  take: number;
  categorySlug?: string | null | undefined;
  filterBy?: CourseFilterBy | null | undefined;
}
export interface TeacherCourseFilterParams extends CourseFilterParams{
  status:CourseStatus | null | undefined;
  orderBy:OrderBy | null | undefined;
  courseLevel: CourseLevel | null | undefined;
  progressStatus : ProgressStatus | null | undefined;
  userId: number | null | undefined;
  searchOn:SearchOnType | null | undefined;

}
export enum CourseFilterBy {
  all = "all",
  free = "free",
  notFreeCourse = "notFreeCourse",
}

export enum CourseStatus {
  active = "active",
  pending = "pending",
  rejected = "rejected",
}

export enum OrderBy {
  all = "all",
  freeCourse = "freeCourse",
  notFreeCourse = "notFreeCourse",
}


export enum ProgressStatus {
  inProgress = "inProgress",
  completed = "completed",
  comingSoon = "comingSoon",
}
