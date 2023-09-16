import { SeoData } from './../SeoData';

export interface CourseFilterData {
  teacherUserId: number;
  courseTitle: string;
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
