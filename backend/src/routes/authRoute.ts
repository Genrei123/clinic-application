import { login, register, forgotPassword } from "../controllers/auth/authController";
import { Router } from 'express';

const authRoute = Router();
authRoute.post('/login', login);
authRoute.post('/register', register);
authRoute.put('/forgotPassword', forgotPassword);

export default authRoute;