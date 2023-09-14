export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  imageName: string;
  roles: string[];
  courseIds: number[];
  fullName: string;
}
