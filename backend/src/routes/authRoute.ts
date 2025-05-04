import { login, register, forgotPassword } from "../controllers/auth/authController";
import express, { Request, Response } from 'express';

const authRoute = express.Router();

// Use a two-step type assertion to avoid the type error
authRoute.post('/login', login);
authRoute.post('/register', register);
authRoute.put('/forgotPassword', forgotPassword);

export default authRoute;