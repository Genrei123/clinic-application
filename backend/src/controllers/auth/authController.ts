// TODO: Implement Authentication
import { Request ,Response } from "express";
import User from "../../model/User/User";

export const login = (req: Request, res: Response) => {
    // TODO
    res.status(200);
};

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {

        const existingUsername = await User.findOne({ where: { username }});
        if (existingUsername) {
            res.status(400).json({ message: 'Username already exists. Please try another username.'});
            return;
        }
        res.status(200);

    } catch (error) {
        res.status(400).json({ message: error });
    }

    // Something went wrong dito
    res.status(500);
};

export const forgotPassword = (req: Request, res: Response) => {
    // TODO
    res.status(200);
}