import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserInterface } from '../interfaces/userInterface'; // Assuming you have a UserInterface defined

interface ExtendedRequest extends Request {
    user?: UserInterface; 
}
export const authenticateToken = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        if (token) {
            try {
                if(process.env.JWT_SECRET){
                    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
                req.user = decoded as UserInterface;
                next();
                }
            } catch (error) {
                throw new Error('Not Authorized! Token expired. Please login again.');
            }
        } else {
            throw new Error('No token provided');
        }
    } else {
        throw new Error('Not Authorized! No token provided');
    }
};
