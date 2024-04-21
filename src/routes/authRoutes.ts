import express from 'express';
import authControllers from '../modules/user/controllers/authController'; 

const authRouter = express.Router();
authRouter.post('/login',authControllers.signIn);
authRouter.post('/signup',authControllers.signUp);
authRouter.delete('/delete/:id',authControllers.deleteUser);
export default authRouter;
