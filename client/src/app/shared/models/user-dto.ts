interface UserProfileDTO {
  _id?: string;
  username: string;
  fullName: string;
  email: string;
  country: string;
  city: string;
  bio: string;
  profileURL: string;
  role: string;
}

export interface UserSearchDTO {
  _id: string;
  fullName: string;
  username: string;
  profileURL: string;
}

export default UserProfileDTO;
