import { Request, Response } from 'express';
import TodoRepository from '../repository/TodoRepository';




interface ExtendedRequest extends Request {
  userId?: string;
}
// Get Todo Items By User Id
const getTodoByUserId = async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req.userId
    const data = await TodoRepository.getTodo(userId);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all Todo Items
const getAllTodo = async (req: Request, res: Response) => {
  try {
    const data = await TodoRepository.getAllTodo();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list all Task' });
  }
};

// Add a new todo Item to the list

const postTodo = async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req.userId
    const { title } = req.body;
    
    const todoData = { userId:userId, title:title };
    const data = await TodoRepository.postTodo(todoData);
    res.status(200).json({data, message: 'New Task added'});
  } catch (error) {
    // console.error('Error in postTodo:', error); 
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

// Update a todo
const updateTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const id = req.params.id;
    const todoData = {id,title}
    
    const data = await TodoRepository.updateTodo(todoData);
    if (data) {
      res.status(200).json({ message: 'Task updated successfully', data: data });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    // console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update Task' });
  }
};

// Delete a todo
const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    
    const todo = await TodoRepository.deleteTodo(id);
    if (!todo) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Task' });
  }
};
export default { postTodo, deleteTodo, updateTodo, getTodoByUserId, getAllTodo }