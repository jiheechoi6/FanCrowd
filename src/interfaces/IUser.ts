export interface IUser {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role: string;
  bio: string;
  profileURL: string;
  city: string;
  country: string;
}

export interface INewUserInputDTO {
  fullName: string;
  email: string;
  username: string;
  password: string;
}
