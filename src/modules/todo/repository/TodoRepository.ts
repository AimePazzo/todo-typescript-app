import { TodoModel } from "../../../databases/models/Todo";

const postTodo = async (body: any) => {
    return await TodoModel.create({ userId: body.userId, title: body.title });
}


const getTodo = async (body: any) => {
    return await TodoModel.find({userId:body});
}

const getAllTodo = async () => {
    return await TodoModel.find();
}

const deleteTodo = async (body: any) => {
    return await TodoModel.findByIdAndDelete(body);
}

const updateTodo = async (body:any) => {
    return await TodoModel.findByIdAndUpdate(body.id, 
        {
        title: body.title,
    }, 
    {
        new: true,
    });
}


export default { postTodo, getTodo, updateTodo, deleteTodo, getAllTodo }