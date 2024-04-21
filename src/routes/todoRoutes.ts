import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import todoController from '../modules/todo/controllers/TodoController';

const router = express.Router();

router.get('/get-todo', authenticateToken, todoController.getTodoByUserId);

router.get('/get-todo-list', todoController.getAllTodo);

router.post('/create-todo', authenticateToken, todoController.postTodo);

router.delete('/delete-todo/:id', authenticateToken, todoController.deleteTodo);

router.put('/update-todo/:id', authenticateToken, todoController.updateTodo);

export default router;