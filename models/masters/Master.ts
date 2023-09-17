export interface MasterFilterData {
  id: number;
  userId: number;
  userName: string;
  fullName: string;
  imageName: string;
  email: string;
  courseCount: number;
  followers: number;
  status: string;
  creationDate: Date;
  socialNetworks: SocialNetworks;
}

export interface SingeMasterData {
  teacher: Master;
  isFollow: boolean;
}
export interface Master {
  id: number;
  studentsCount: number;
  isDelete: boolean;
  creationDate: string;
  userId: number;
  imageName: string;
  email: string;
  fullName: string;
  registerDate: string;
  cvImageName: string;
  fieldOfActivity: string;
  nationalId: string;
  userName: string;
  status: string;
  socialNetworks: SocialNetworks;
  followerCount: number;
  aboutMe: string;
  walletAddress: string;
}
export interface SocialNetworks {
  instagram: string;
  linkeDin: string;
  faceBook: string;
  twitter: string;
}
