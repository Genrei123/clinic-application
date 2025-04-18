import { login, register } from "../../controllers/auth/authController";
import { Request, Response } from "express";

describe('Login Controller', () => {
    it('should successfully login the user with status 200', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });    
});

describe('Register Controller', () => {
    it('should successfully register the user with status 200', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        register(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});