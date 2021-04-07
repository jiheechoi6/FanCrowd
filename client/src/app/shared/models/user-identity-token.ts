export interface UserIdentityToken {
  token: string;
  user: UserIdentity;
}

export interface UserIdentity {
  _id: string;
  username: string;
  role: string;
  profileURL: string;
}
