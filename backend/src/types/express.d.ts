import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        // Add other user properties as needed
      };
    }
  }
}