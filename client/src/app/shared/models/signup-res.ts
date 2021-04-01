interface SignupRes{
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

export default SignupRes