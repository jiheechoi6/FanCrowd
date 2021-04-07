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

export default UserProfileDTO;
