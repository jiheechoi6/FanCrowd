interface UserIdentityToken{
    token: string;
    user: {
        _id: string;
        role: string;
        username: string;
    }
}
export default UserIdentityToken