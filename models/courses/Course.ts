import { SeoData } from "./../SeoData";
export interface Course {
  id: number;
  isDelete: boolean;
  creationDate: string;
  userId: number;
  teacherFullName: string;
  categoryId: number;
  subCategoryId: number;
  price: number;
  totalPrice: number;
  discountPercentage: number;
  visit: number;
  seoData: SeoData;
  courseToken: string;
  courseTitle: string;
  slug: string;
  description: string;
  shortDescription: string;
  demoFileName: string;
  imageName: string;
  shortLink: string;
  courseLevel: string;
  courseStatus: string;
  progressStatus: string;
  lastModify: string;
  demoDuration: TiemSpan;
  episodeCount: number;
  studentCount: number;
  duration: string;
  requirements: string;
  teacherNote: string;
  sections: Section[];
  faqs: CourseFaq[];
  subCategory: CourseCategory;
  teacherAvatar: string;
}
export interface TiemSpan {
  ticks: number;
  days: number;
  hours: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMilliseconds: number;
  totalMinutes: number;
  totalSeconds: number;
}

export interface Section {
  id: number;
  isDelete: boolean;
  creationDate: string;
  courseId: number;
  title: string;
  episodeCount: number;
  episodes: Episode[];
}
export interface CourseFaq {
  id: number;
  isDelete: boolean;
  creationDate: string;
  courseId: number;
  title: string;
  description: string;
}
export interface Episode {
  id: number;
  isDelete: boolean;
  creationDate: string;
  sectionId: number;
  title: string;
  englishTitle: string;
  description: string;
  videoFileName: string;
  attachmentFileName: string;
  isFree: boolean;
  isActive: boolean;
  duration: TiemSpan;
  token: string;
}
export interface CourseCategory {
  id: number;
  isDelete: boolean;
  creationDate: string;
  parentId: number;
  title: string;
  slug: string;
  seoData: SeoData;
  imageName: string;
}
