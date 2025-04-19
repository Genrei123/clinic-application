import { login, register, forgotPassword } from "../controllers/auth/authController";
import { Router } from 'express';

const router = Router();
router.post('/login', login);
router.post('/register', register);
router.put('/forgotPassword', forgotPassword);