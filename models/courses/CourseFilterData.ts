import { SeoData } from "./../SeoData";

export interface CourseFilterData {
  teacherUserId: number;
  courseTitle: string;
  courseLevel: CourseLevel;
  slug: string;
  imageName: string;
  teacherName: string;
  duration: string;
  status: string;
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
  expert  = "expert",
}
export interface CourseFilterParams {
  search?: string | null;
  pageId: number;
  take: number;
  categorySlug?: string | null;
}
