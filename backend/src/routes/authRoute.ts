import { login, register, forgotPassword, verifyEmail, resetPassword } from "../controllers/auth/authController";
import { Router, RequestHandler } from 'express';

const authRoute = Router();

authRoute.post('/login', login as RequestHandler);
authRoute.post('/register', register as RequestHandler);
authRoute.get('/verify', verifyEmail as RequestHandler);
authRoute.post('/forgot-password', forgotPassword as RequestHandler); // Changed from PUT to POST
authRoute.post('/reset-password', resetPassword as RequestHandler); // Add this new route

export default authRoute;