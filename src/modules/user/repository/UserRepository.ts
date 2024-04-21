import User from "../../../databases/models/User";


const getUser = async (body: string) => {
    return await User.findOne({email:body});
};

const deleteUser = async (id: any) => {
    return await User.findOneAndDelete(id);
};

// const updateUser = async (body: any) => {};

export default { getUser, deleteUser}