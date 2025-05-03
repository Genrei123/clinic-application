import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// Function to read email template files
const readEmailTemplate = (templateName: string): string => {
    try {
        const templatePath = path.join(__dirname, '..', 'templates', 'emails', templateName);
        return fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
        console.error(`Error reading template ${templateName}:`, error);
        return ''; // Return empty string if template cannot be read
    }
};

// Function to replace placeholders in templates
const replacePlaceholders = (template: string, replacements: Record<string, string>): string => {
    let result = template;
    for (const [key, value] of Object.entries(replacements)) {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(placeholder, value);
    }
    return result;
};

export const sendVerificationEmail = async (email: string, token: string): Promise<boolean> => {
    const verificationLink = `http://localhost:3000/auth/verify?token=${token}`;
    const clinicLogo = 'https://i.imgur.com/s9Wkgyf.png'; // Use a publicly accessible image URL
    const currentYear = new Date().getFullYear().toString();
    
    try {
        // Read the template or use the inline version if file reading fails
        let template = readEmailTemplate('verification-email.html');
        if (!template) {
            console.warn('Verification email template file not found, using inline template');
            template = emailService.verificationTemplate;
        }
        
        // Replace placeholders in the template
        const emailContent = replacePlaceholders(template, {
            verificationLink,
            clinicLogo,
            currentYear
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Verify Your Email - Jimirine Maternity Clinic',
            html: emailContent
        };

        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        return false;
    }
};

export const sendPasswordResetEmail = async (email: string, token: string): Promise<boolean> => {
    const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;
    const clinicLogo = 'https://i.imgur.com/s9Wkgyf.png'; // Use a publicly accessible image URL
    const currentYear = new Date().getFullYear().toString();
    
    try {
        // Read the template or use the inline version if file reading fails
        let template = readEmailTemplate('password-reset.html');
        if (!template) {
            console.warn('Password reset email template file not found, using inline template');
            template = emailService.passwordResetTemplate;
        }
        
        // Replace placeholders in the template
        const emailContent = replacePlaceholders(template, {
            resetLink,
            clinicLogo,
            currentYear
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Reset Your Password - Jimirine Maternity Clinic',
            html: emailContent
        };

        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return false;
    }
};

// Backup inline templates in case file reading fails
const emailService = {
    verificationTemplate: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
                body { background-color: #f7f9fc; color: #333; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%); padding: 30px 0; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }
                .button { display: inline-block; background-color: #ff6b6b; color: white !important; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: 600; margin: 15px 0; }
                .footer { margin-top: 30px; text-align: center; color: #999; font-size: 14px; }
                .divider { height: 1px; background-color: #eaeaea; margin: 30px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="color: #fff; font-size: 28px;">Jimirine Maternity Clinic</h1>
                </div>
                <div class="content">
                    <h2 style="margin-bottom: 20px;">Verify Your Email Address</h2>
                    <p style="margin-bottom: 25px;">Thank you for registering with Jimirine Maternity Clinic. To complete your registration, please verify your email address by clicking the button below:</p>
                    <div style="text-align: center;">
                        <a href="{{verificationLink}}" class="button">Verify Email Address</a>
                    </div>
                    <p style="margin: 20px 0;">If the button doesn't work, you can copy and paste this link: {{verificationLink}}</p>
                    <div class="divider"></div>
                    <p style="font-style: italic;">If you didn't create an account, you can safely ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; {{currentYear}} Jimirine Maternity Clinic</p>
                </div>
            </div>
        </body>
        </html>
    `,
    passwordResetTemplate: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
                body { background-color: #f7f9fc; color: #333; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #a6c0fe 0%, #f68084 100%); padding: 30px 0; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }
                .button { display: inline-block; background-color: #5e72e4; color: white !important; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: 600; margin: 15px 0; }
                .footer { margin-top: 30px; text-align: center; color: #999; font-size: 14px; }
                .divider { height: 1px; background-color: #eaeaea; margin: 30px 0; }
                .security-notice { background-color: #fff8e1; border-left: 4px solid #ffca28; padding: 15px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="color: #fff; font-size: 28px;">Jimirine Maternity Clinic</h1>
                </div>
                <div class="content">
                    <h2 style="margin-bottom: 20px;">Reset Your Password</h2>
                    <p style="margin-bottom: 25px;">You recently requested to reset your password. Click the button below to reset it:</p>
                    <div style="text-align: center;">
                        <a href="{{resetLink}}" class="button">Reset Your Password</a>
                    </div>
                    <p style="margin: 20px 0;">If the button doesn't work, you can copy and paste this link: {{resetLink}}</p>
                    <div class="security-notice">
                        <p style="font-weight: 600; margin-bottom: 5px;">Security Notice:</p>
                        <p>If you didn't request a password reset, please ignore this email or contact support.</p>
                    </div>
                    <div class="divider"></div>
                    <p style="font-style: italic;">This link will expire in 1 hour for security reasons.</p>
                </div>
                <div class="footer">
                    <p>&copy; {{currentYear}} Jimirine Maternity Clinic</p>
                </div>
            </div>
        </body>
        </html>
    `
};