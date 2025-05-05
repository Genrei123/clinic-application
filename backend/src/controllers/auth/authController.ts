import { Request, Response } from "express";
import User from "../../model/User/User";
import { comparePassword, hashPassword } from "../../service/authService";
import { sendVerificationEmail, sendPasswordResetEmail } from "../../service/emailService";
import crypto from 'crypto';
import { sequelize } from "../../configs/database";
import { Op } from "sequelize";
import fs from 'fs';
import path from 'path';
import { createToken } from "../../middleware/JWT";

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        // Find user
        const user = await User.findOne({ where: { username } });
        if (!user) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }

        // Verify password
        const result = await comparePassword(username, password);
        if (!result) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }

        // Check if email is verified (from Email-Authentication branch)
        if (!user.dataValues.isVerified) {
            res.status(403).json({ 
                message: "Please verify your email before logging in",
                email: user.dataValues.email 
            });
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
                username: userData.username,
                email: userData.email
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
    const { username, password, email } = req.body;
    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ 
            where: { 
                [Op.or]: [{ username }, { email }]
            }
        });
        
        if (existingUser) {
            const field = existingUser.dataValues.username === username ? "username" : "email";
            res.status(400).json({ message: `This ${field} is already registered.` });
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

        // Generate token using the JWT middleware
        const userData = newUser.get({ plain: true });
        const token = createToken(userData.id, userData.username);

        // Send verification email
        const emailSent = await sendVerificationEmail(email, verificationToken);
        
        if (emailSent) {
            res.status(201).json({
                message: "Registration successful! Please check your email to verify your account.",
                userId: userData.id,
                token: token
            });
        } else {
            res.status(500).json({ 
                message: "User created but failed to send verification email. Please contact support.",
                userId: userData.id,
                token: token
            });
        }
    } catch (error: any) {
        console.error("Registration error:", error);
        res.status(500).json({ 
            message: "Registration failed", 
            error: error.message
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
                verificationExpires: { [Op.gt]: new Date() }
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
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Find user with this email
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            // For security reasons, still return success even if email doesn't exist
            // This prevents user enumeration attacks
            return res.status(200).json({ 
                message: "If your email is registered, you will receive password reset instructions."
            });
        }

        // Generate reset token (same mechanism as verification token)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + parseInt(process.env.RESET_TOKEN_EXPIRATION || '3600000'));
        
        // Save token to user
        await User.update(
            { 
                verificationToken: resetToken, 
                verificationExpires: resetExpires 
            },
            { where: { id: user.dataValues.id } }
        );

        // Send password reset email
        const emailSent = await sendPasswordResetEmail(email, resetToken);
        
        if (emailSent) {
            return res.status(200).json({ 
                message: "If your email is registered, you will receive password reset instructions." 
            });
        } else {
            console.error("Failed to send password reset email");
            // Still return success for security reasons
            return res.status(200).json({ 
                message: "If your email is registered, you will receive password reset instructions." 
            });
        }
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ 
            message: "Password reset request failed", 
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
    }

    try {
        // Find user with this token and check it's not expired
        const user = await User.findOne({ 
            where: { 
                verificationToken: token,
                verificationExpires: { [Op.gt]: new Date() }
            }
        });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired password reset token" });
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);
        
        // Update user password and clear token
        await User.update(
            { 
                password: hashedPassword,
                verificationToken: null,
                verificationExpires: null
            },
            { where: { id: user.dataValues.id } }
        );

        return res.status(200).json({ message: "Password has been reset successfully. You can now log in with your new password." });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ 
            message: "Password reset failed", 
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

export const renderResetPasswordForm = async (req: Request, res: Response) => {
    const { token } = req.query;
    
    if (!token) {
        return res.status(400).send('Token is required');
    }
    
    try {
        // Check if token is valid and not expired
        const user = await User.findOne({ 
            where: { 
                verificationToken: token,
                verificationExpires: { [Op.gt]: new Date() }
            }
        });
        
        if (!user) {
            return res.status(400).send('Invalid or expired token');
        }
        
        // Read the HTML file
        const filePath = path.join(__dirname, '../../templates/password-reset-form.html');
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Send the HTML response
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);
    } catch (error) {
        console.error('Error rendering password reset form:', error);
        res.status(500).send('Error loading password reset page');
    }
};