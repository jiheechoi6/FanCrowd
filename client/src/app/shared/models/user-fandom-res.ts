interface UserFandomRes{
    backgroundURL: string;
    _id: string;
    name: string,
    category: {
        backgroundURL: string;
        _id: string,
        createdBy: string,
        name: string
    },
    createdBy: string,
}

export default UserFandomRes;