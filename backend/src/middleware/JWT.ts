import { Request, Response } from 'express';

const JWT_SECRET = process.env.JWT || "SECRET_KEY";

export const createToken = () => {
    console.log("Created Token!");
}

export const decodeToken = () => {
    console.log("Decoded Token!");
}

export const verifyJWT = (req: Request, res: Response) => {
    return "";
}