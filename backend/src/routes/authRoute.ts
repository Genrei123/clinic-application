import { login, register, forgotPassword } from "../controllers/auth/authController";
import express, { Router } from 'express';

const authRoute = Router();

// Use a two-step type assertion to avoid the type error
authRoute.post('/login', (login as unknown) as express.RequestHandler);
authRoute.post('/register', (register as unknown) as express.RequestHandler);
authRoute.put('/forgotPassword', forgotPassword as express.RequestHandler);

export default authRoute;