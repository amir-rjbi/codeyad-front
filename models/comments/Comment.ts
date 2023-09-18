import { string } from 'yup';
export interface Comment {
  id: number;
  creationDate: Date;
  text: string;
  fullName: string;
  userId: number;
  userImageName:string;
  replies: Comment[];
}
export enum CommentType {
  article = "article",
  course = "course",
  codeYadTv = "codeYadTv",
  roadMap = "roadMap",
}
