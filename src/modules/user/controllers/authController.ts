import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../databases/models/User';
import UserRepository from '../repository/UserRepository';
import dotenv from 'dotenv';

dotenv.config
const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const findUser = await UserRepository.getUser(email)
    if (!findUser) {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword
      });
      await user.save();
      res.status(201).json({ message: 'User registered successfully', user: user });
    }
    else {
      res.status(400).json({
      message: "User already exists"
    })
    return
  }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser = await UserRepository.getUser(email);
    if (findUser) {
      const isMatch: boolean = await bcrypt.compare(password, findUser.password);
      if (isMatch) {
        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET ||'', { expiresIn: '2h' });
        res.status(200).json({ message:"Login Successful", user:findUser, token:token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
      return
    }
      res.status(401).json({ message: 'Please create an account 🔐' });
      return
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user by email

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params._id;
    // validateMongoDbId(id)
    const user = await UserRepository.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully', user: user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default { signIn, signUp,deleteUser };