import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify Your Email - Jimirine Maternity Clinic',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4a4a4a;">Welcome to Jimirine Maternity Clinic</h2>
                <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
                </div>
                <p>If the button doesn't work, you can also click on the link below or copy it into your browser:</p>
                <p><a href="${verificationLink}">${verificationLink}</a></p>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't create an account, you can safely ignore this email.</p>
                <hr style="border: 1px solid #eee; margin: 20px 0;">
                <p style="color: #777; font-size: 12px;">© 2023 Jimirine Maternity Clinic. All rights reserved.</p>
            </div>
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