import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies?.user_accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token found' });
    }

    try {
        const secret = 'hi';
        const decoded = JWT.verify(token, secret) as any;
        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};


export const adminAuthMiddleware = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies?.admin_accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token found from admin' });
    }

    try {
        const secret = 'hi';
        const decoded = JWT.verify(token, secret) as any;
        req.admin = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};
