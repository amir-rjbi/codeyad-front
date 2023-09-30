import { BaseFilterResult } from "./../IApiResponse";
export interface BootCampFilterData {
  id: number;
  title: string;
  slug: string;
  imageName: string;
  teacherName: string;
  startDate: Date;
  endDate: Date;
  status: BootcampStatus;
}
export interface BootCampFilterResult extends BaseFilterResult {
  bootCamps: BootCampFilterData[];
}
export enum BootcampStatus {
  شروع_ثبت_نام = "شروع_ثبت_نام",
  درحال_برگزاری = "درحال_برگزاری",
  به_اتمام_رسیده = "به_اتمام_رسیده",
}
export interface BootCamp {
  id: number;
  title: string;
  slug: string;
  teacherName: string;
  imageName: string;
  shortDescription: string;
  content: string;
  price: number;
  demo: string;
  startDate: string;
  endDate: string;
  eventHoldDayAndTime: string;
  holdType: string;
  holdPlace: string;
  status: BootcampStatus;
  faqs: BootcampFAQ[];
  sections: BootcampSection[];
}

export interface BootcampFAQ {
  bootCampId: number;
  title: string;
  description: string;
}
export interface BootcampSection {
  bootCampId: number;
  title: string;
  description: string;
  teachers?: Teacher[];
}

export interface Teacher {
  bootCampId: number;
  sectionId: number;
  avatarName: string;
  fullName: string;
  expertise: string;
}
