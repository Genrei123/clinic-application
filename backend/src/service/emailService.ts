import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationLink = `http://localhost:3000/auth/verify?token=${token}`;
    const clinicLogo = 'https://i.imgur.com/s9Wkgyf.png'; // Replace with your actual logo URL

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify Your Email - Jimirine Maternity Clinic',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    body {
                        background-color: #f7f9fc;
                        color: #333;
                        line-height: 1.6;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
                        padding: 30px 0;
                        text-align: center;
                        border-radius: 8px 8px 0 0;
                    }
                    .logo {
                        width: 120px;
                        height: auto;
                        margin-bottom: 15px;
                    }
                    .content {
                        background-color: #ffffff;
                        padding: 40px 30px;
                        border-radius: 0 0 8px 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                    }
                    .heading {
                        color: #4a4a4a;
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 20px;
                    }
                    .text {
                        color: #666;
                        margin-bottom: 25px;
                    }
                    .button {
                        display: inline-block;
                        background-color: #ff6b6b;
                        color: white !important;
                        text-decoration: none;
                        padding: 12px 25px;
                        border-radius: 25px;
                        font-weight: 600;
                        margin: 15px 0;
                        transition: background-color 0.3s;
                    }
                    .button:hover {
                        background-color: #ff5252;
                    }
                    .link {
                        word-break: break-all;
                        color: #4a90e2;
                        margin: 20px 0;
                        display: block;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        color: #999;
                        font-size: 14px;
                    }
                    .footer p {
                        margin: 5px 0;
                    }
                    .divider {
                        height: 1px;
                        background-color: #eaeaea;
                        margin: 30px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img class="logo" src="${clinicLogo}" alt="Jimirine Maternity Clinic Logo">
                        <h1 style="color: #fff; font-size: 28px;">Jimirine Maternity Clinic</h1>
                    </div>
                    <div class="content">
                        <h2 class="heading">Verify Your Email Address</h2>
                        <p class="text">Thank you for registering with Jimirine Maternity Clinic. To complete your registration and access your account, please verify your email address by clicking the button below:</p>
                        <div style="text-align: center;">
                            <a href="${verificationLink}" class="button">Verify Email Address</a>
                        </div>
                        <p class="text" style="margin-top: 20px;">If the button doesn't work, you can copy and paste the following link into your browser:</p>
                        <a href="${verificationLink}" class="link">${verificationLink}</a>
                        <p class="text">This verification link will expire in 1 hour for security reasons.</p>
                        <div class="divider"></div>
                        <p class="text" style="font-style: italic;">If you didn't create an account with Jimirine Maternity Clinic, please ignore this email or contact our support team if you have concerns.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Jimirine Maternity Clinic. All rights reserved.</p>
                        <p>Providing compassionate maternal care</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        return false;
    }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;
    const clinicLogo = 'https://i.imgur.com/s9Wkgyf.png'; // Replace with your actual logo URL

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Reset Your Password - Jimirine Maternity Clinic',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    body {
                        background-color: #f7f9fc;
                        color: #333;
                        line-height: 1.6;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background: linear-gradient(135deg, #a6c0fe 0%, #f68084 100%);
                        padding: 30px 0;
                        text-align: center;
                        border-radius: 8px 8px 0 0;
                    }
                    .logo {
                        width: 120px;
                        height: auto;
                        margin-bottom: 15px;
                    }
                    .content {
                        background-color: #ffffff;
                        padding: 40px 30px;
                        border-radius: 0 0 8px 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                    }
                    .heading {
                        color: #4a4a4a;
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 20px;
                    }
                    .text {
                        color: #666;
                        margin-bottom: 25px;
                    }
                    .button {
                        display: inline-block;
                        background-color: #5e72e4;
                        color: white !important;
                        text-decoration: none;
                        padding: 12px 25px;
                        border-radius: 25px;
                        font-weight: 600;
                        margin: 15px 0;
                        transition: background-color 0.3s;
                    }
                    .button:hover {
                        background-color: #324cdd;
                    }
                    .link {
                        word-break: break-all;
                        color: #4a90e2;
                        margin: 20px 0;
                        display: block;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        color: #999;
                        font-size: 14px;
                    }
                    .footer p {
                        margin: 5px 0;
                    }
                    .divider {
                        height: 1px;
                        background-color: #eaeaea;
                        margin: 30px 0;
                    }
                    .security-notice {
                        background-color: #fff8e1;
                        border-left: 4px solid #ffca28;
                        padding: 15px;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img class="logo" src="${clinicLogo}" alt="Jimirine Maternity Clinic Logo">
                        <h1 style="color: #fff; font-size: 28px;">Jimirine Maternity Clinic</h1>
                    </div>
                    <div class="content">
                        <h2 class="heading">Reset Your Password</h2>
                        <p class="text">You recently requested to reset your password for your Jimirine Maternity Clinic account. Click the button below to reset it:</p>
                        <div style="text-align: center;">
                            <a href="${resetLink}" class="button">Reset Your Password</a>
                        </div>
                        <p class="text" style="margin-top: 20px;">If the button doesn't work, you can copy and paste the following link into your browser:</p>
                        <a href="${resetLink}" class="link">${resetLink}</a>
                        <p class="text">This password reset link will expire in 1 hour for security reasons.</p>
                        <div class="security-notice">
                            <p style="font-weight: 600; margin-bottom: 5px;">Security Notice:</p>
                            <p>If you didn't request a password reset, please ignore this email or contact our support team - your account security is important to us.</p>
                        </div>
                        <div class="divider"></div>
                        <p class="text" style="font-style: italic;">For security, this request was received from the Jimirine Maternity Clinic web application.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Jimirine Maternity Clinic. All rights reserved.</p>
                        <p>Providing compassionate maternal care</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return false;
    }
};