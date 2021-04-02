interface SignupRes{
    user:{
        _id: string;
        role: string;
        username: string;
    },
    token: string;
}

export default SignupRes