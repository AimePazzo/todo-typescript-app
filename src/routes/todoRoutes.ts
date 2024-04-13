import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getAllTodos,addTodo,deleteTodo,updateTodo } from '../controllers/TodoController';

const router = express.Router();

router.get('/get-todo-list',authenticateToken, getAllTodos);

router.post('/add-todo',authenticateToken, addTodo);

router.delete('/delete-todo/:id',authenticateToken, deleteTodo);

router.put('/update-todo/:id',authenticateToken, updateTodo);

export default router;