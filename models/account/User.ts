import { CourseFilterData } from "./../courses/CourseFilterData";
import { Course } from "./../courses/Course";
export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  imageName: string;
  roles: string[];
  courseIds: number[];
  fullName: string;
  name: string;
  family: string;
  aboutMe: string;
  walletAmount?: number;
  isCompleteProfile: boolean;
  isVerifyPhoneNumber: boolean;
}
export interface UserAlertsCount {
  newNotificationsCount: number;
  newMessagesCount: number;
}
export interface UserCourse {
  course: CourseFilterData;
  isBought: boolean;
  watchPercentage: number;
  createDate: Date;
}
