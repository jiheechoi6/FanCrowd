interface SigninRes{
    usernameValid: boolean;
    pwValid: boolean;
    token: string;
    user: {
        role: string;
        _id: string
        fullName: string;
        email: string;
        username: string;
        createdAt: string;
    }
}
export default SigninRes