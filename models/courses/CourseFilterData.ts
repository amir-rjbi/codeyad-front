import { SeoData } from "./../SeoData";
import { SearchOnType } from "../IApiResponse";

export interface CourseSearchData {
  id: number;
  courseTitle: string;
  slug: string;
  imageName: string;
  duration: string;
  courseLevel: CourseLevel;
  episodeCount: number;
  price: number;
  discountPercentage: number;
  totalPrice: number;
}
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
  orderBy?: CourseOrderBy | null | undefined;
  favoriteCategories?: boolean | null | undefined;
  progressStatus?: CourseProgressStatus | null | undefined;
}
export interface TeacherCourseFilterParams extends CourseFilterParams {
  status: CourseStatus | null | undefined;
  filterBy: CourseFilterBy | null | undefined;
  orderBy: CourseOrderBy | null | undefined;
  courseLevel: CourseLevel | null | undefined;
  progressStatus: CourseProgressStatus | null | undefined;
  userId: number | null | undefined;
  searchOn: SearchOnType | null | undefined;
}
export enum CourseFilterBy {
  all = "all",
  free = "freeCourse",
  notFreeCourse = "notFreeCourse",
}
export enum CourseOrderBy {
  visit = "visit",
  popular = "popular",
  latest = "latest",
}
export enum CourseStatus {
  active = "active",
  pending = "pending",
  rejected = "rejected",
}

export enum CourseProgressStatus {
  inProgress = "inProgress",
  completed = "completed",
  comingSoon = "comingSoon",
}
