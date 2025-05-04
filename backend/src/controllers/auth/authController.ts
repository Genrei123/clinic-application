// TODO: Implement Authentication
import { Request, Response } from "express";
import User from "../../model/User/User";
import { comparePassword, hashPassword } from "../../service/authService";
import { createToken } from "../../middleware/JWT";

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        // Find user
        const user = await User.findOne({ where: { username }});
        if (!user) {
            res.status(401).json({ message: "Username or password does not match" });
            return;
        }
        
        // Verify password
        const result = await comparePassword(username, password);
        if (!result) {
            res.status(401).json({ message: "Username or password does not match" });
            return;
        }

        // Extract user data
        const userData = user.get({ plain: true });
        
        // Generate token using the JWT middleware
        const token = createToken(userData.id, userData.username);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: userData.id,
                username: userData.username
            },
            token: token
        });

    } catch (error: any) {
        console.error("Error in logging in: ", error);
        res.status(500).json({ 
            message: "An error occurred during login", 
            error: error.message 
        });
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const existingUsername = await User.findOne({ where: { username }});
        if (existingUsername) {
            res.status(400).json({ message: 'Username already exists. Please try another username.'});
            return;
        }

        // Validate input
        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }
        
        if (password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters' });
            return;
        }

        // Create new user
        const encryptedPassword = await hashPassword(password);
        const newUser = await User.create({ 
            username: username, 
            password: encryptedPassword
        });
        
        // Extract user data
        const userData = newUser.get({ plain: true });
        
        // Generate token using the JWT middleware
        const token = createToken(userData.id, userData.username);
        
        console.log("User has been created:", userData.username);
        
        // Return success with token (don't include password in response)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: userData.id,
                username: userData.username
            },
            token: token
        });

    } catch (error: any) {
        console.error("Registration error:", error);
        res.status(500).json({ 
            message: "An error occurred during registration", 
            error: error.message 
        });
    }
};

export const forgotPassword = (req: Request, res: Response) => {
    // TODO
    res.status(200).send("Forgot password functionality not yet implemented");
};