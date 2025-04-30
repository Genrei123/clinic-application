// TODO: Implement Authentication
import { Request ,Response } from "express";
import User from "../../model/User/User";
import { comparePassword, hashPassword } from "../../service/authService";

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const result = await comparePassword(username, password);
        if (!result) {
            res.status(401);
            res.send("Username or password does not match");
        }

        // Give token
        res.status(200);
        res.send("Successful login!");


    } catch (error) {
        console.error("Error in logging in: ", error);
    }
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

        // Create new user
        const encryptedPassword = await hashPassword(password);
        const newUser = await User.create({ username: username, password: encryptedPassword});
        console.log("User has been created: ", newUser);
        res.status(200).json({message: "User with username has been created: ", newUser});
        return;

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