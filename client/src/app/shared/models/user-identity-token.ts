interface UserIdentityToken{
    token: string;
    user: {
        _id: string;
        role: string;
        username: string;
        profileURL: string;
    }
}
export default UserIdentityToken