import { Request, Response } from "express";
import User from "../../model/User/User";
import { comparePassword, hashPassword } from "../../service/authService";
import { sendVerificationEmail } from "../../service/emailService";
import crypto from 'crypto';
import { sequelize } from "../../configs/database"; // Add this import
import { Op } from "sequelize"; // Add this import

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const result = await comparePassword(username, password);
        if (!result) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        if (!user.dataValues.isVerified) {
            return res.status(403).json({ 
                message: "Please verify your email before logging in",
                email: user.dataValues.email 
            });
        }

        // Give token
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.dataValues.id,
                username: user.dataValues.username,
                email: user.dataValues.email
            }
        });

    } catch (error) {
        console.error("Error in logging in: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const register = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ 
            where: { 
                [Op.or]: [{ username }, { email }] // Use Op instead of sequelize.Op
            }
        });
        
        if (existingUser) {
            const field = existingUser.dataValues.username === username ? "username" : "email";
            return res.status(400).json({ message: `This ${field} is already registered.` });
        }

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + parseInt(process.env.RESET_TOKEN_EXPIRATION || '3600000'));
        
        // Create new user
        const encryptedPassword = await hashPassword(password);
        const newUser = await User.create({ 
            username, 
            password: encryptedPassword,
            email,
            verificationToken,
            verificationExpires,
            isVerified: false
        });

        // Send verification email
        const emailSent = await sendVerificationEmail(email, verificationToken);
        
        if (emailSent) {
            res.status(201).json({
                message: "Registration successful! Please check your email to verify your account.",
                userId: newUser.dataValues.id
            });
        } else {
            res.status(500).json({ 
                message: "User created but failed to send verification email. Please contact support.",
                userId: newUser.dataValues.id
            });
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ 
            message: "Registration failed", 
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.query;
    
    if (!token) {
        return res.status(400).json({ message: "Verification token is required" });
    }

    try {
        const user = await User.findOne({ 
            where: { 
                verificationToken: token,
                verificationExpires: { [Op.gt]: new Date() } // Use Op instead of sequelize.Op
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        await User.update(
            { isVerified: true, verificationToken: null, verificationExpires: null },
            { where: { id: user.dataValues.id } }
        );

        res.status(200).json({ message: "Email verification successful! You can now log in." });
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ 
            message: "Email verification failed", 
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    // TODO: Implement forgot password functionality
    res.status(200).json({ message: "Forgot password feature coming soon" });
};