interface SigninRes{
    user:{
        _id: string;
        role: string;
        fullName: string;
        email: string;
        username: string;
        createdAt: string;
    },
    token: string;
}

export default SigninRes;