import { Request, Response} from 'express';
import { TodoModel } from '../models/Todo';
import { UserInterface } from '../interfaces/userInterface';


interface ExtendedRequest extends Request {
  user?: UserInterface; // Make the 'user' property optional or initialize it with an appropriate type
}
// Get all Todo Items
export const getAllTodos = async (req:ExtendedRequest, res:Response) => {
  try {
    type User = {
      userId: string;
    }
    const userId = (req.user as User | undefined)?.userId;
    const todos = await TodoModel.find({ userId: userId});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Add a new todo Item to the list

export const addTodo = async (req: ExtendedRequest, res: Response) => {
  try {
    type User = {
      userId: string;
    }
    const userId = (req.user as User | undefined)?.userId;
    const { title } = req.body;
    const todo = await TodoModel.create({ title, userId });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};
// Update a todo
export const updateTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title } = req.body;
  try {
    const todo = await TodoModel.findById(id);
    if (todo) {
      todo.title = title || todo.title;
      await todo.save();
      res.status(200).json({ message: 'Todo updated successfully', todo });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

// Delete a todo
export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const todo = await TodoModel.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
