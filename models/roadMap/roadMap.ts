import { SeoData } from './../SeoData';
import { User } from "./../account/User";
import { Article } from "./../articles/Article";
export interface RoadMap {
  id:number;
  title: string;
  description: string;
  slug: string;
  imageName: string;
  thumbnailName: string;
  videoName: string;
  seoData: SeoData;
  userId: number;
  videoTime: string;
  shortLink: string;
  visit: number;
  createDate: string;
  lastModify: string;
  roadMapStatus: string;
  roadMapType: RoadMapType;
  teacher: {
    fullName: string;
    imageName: string;
    email: string;
    phoneNumber: string;
    userId: number;
  };
}
export interface RoadMapPageData {
  parentRoadMap: RoadMap;
  roadMapCards: RoadMapCard[];
}
export interface RoadMapCard {
  imageName: string;
  thumbnailName: string;
  teacherName: string;
  slug: string;
  title: string;
  roadMapType: RoadMapType;
}
export enum RoadMapType {
  parent = "parent",
  programminglanguage = "programminglanguage",
  special = "special",
}
