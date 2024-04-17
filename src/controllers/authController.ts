import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';


export const signUp = async (req: Request, res: Response):Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const findUser = await User.findOne({email: email} && {username: username});
    if(!findUser) {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: 'User registered successfully', data: { user: user}});
    }
    else{
      res.status(400).json({
        message: "Email already exists"
    })
    }
  } catch (error) {
     res.status(500).json({ message: 'Internal server error' });
  }
}; 

 export const signIn = async (req: Request, res: Response):Promise<void> =>{
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isValidPassword: boolean = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token: string = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '');
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}