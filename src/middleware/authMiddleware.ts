import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface ExtendedRequest extends Request {
    userId?: string;
}

export const authenticateToken = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const jwtSecret: Secret | undefined = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return res.status(500).json({ error: 'JWT secret is not defined' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        } else {
            const userId = (decoded as any).id;
            if (!userId) {
                return res.status(401).json({ error: 'User ID not found in token' });
            }
            req.userId = userId;
            next();
        }
    });
};
