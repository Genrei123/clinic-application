import { login, register, forgotPassword, verifyEmail, resetPassword, renderResetPasswordForm } from "../controllers/auth/authController";
import { Router, RequestHandler } from 'express';

const authRoute = Router();

authRoute.post('/login', login as RequestHandler);
authRoute.post('/register', register as RequestHandler);
authRoute.get('/verify', verifyEmail as RequestHandler);
authRoute.post('/forgot-password', forgotPassword as RequestHandler);
authRoute.get('/reset-password', renderResetPasswordForm as RequestHandler);
authRoute.post('/reset-password', resetPassword as RequestHandler);

export default authRoute;