import { login, register, forgotPassword, verifyEmail } from "../controllers/auth/authController";
import { Router, RequestHandler } from 'express';

const authRoute = Router();

authRoute.post('/login', login as RequestHandler);
authRoute.post('/register', register as RequestHandler);
authRoute.get('/verify', verifyEmail as RequestHandler);
authRoute.put('/forgotPassword', forgotPassword as RequestHandler);

export default authRoute;