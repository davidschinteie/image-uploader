export interface UserType {
  userId: string;
  name: string;
  email: string;
  authToken?: string;
}

export type UserImageType = {
  imageUrl: string;
  imageTags: string[];
};
