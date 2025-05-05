import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";
const JWT_EXPIRES_IN = '1h';

// Create a token for authentication
export const createToken = (userId: number, username: string) => {
    return jwt.sign(
        { userId, username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

// Decode token (useful for getting user info without verification)
export const decodeToken = (token: string) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

// Middleware to verify JWT token
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No token provided" });
        }
        
        const token = authHeader.split(' ')[1];
        
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Add the decoded user data to the request object
        (req as any).user = decoded;
        
        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}