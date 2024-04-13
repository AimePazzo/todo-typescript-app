// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt,{JwtPayload} from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../models/User';
import { UserInterface } from '../interfaces/userInterface';


export const authenticateToken =asyncHandler(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(" ")[1];
      try {
          if (token) {
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
              if(decoded) {
              req.user = decoded as UserInterface;
              next();
              } else {
              res.status(403).json({ message: 'Forbidden' });
              }
          }
      } catch (error) {
          throw new Error("Not Authorized token expired, please login again")
      }
  }else{
      throw new Error('There is no token attached to header')
  }
});
