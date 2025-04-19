import { createPatient, readPatient, updatePatient, deletePatient } from "../../../controllers/patient/patientController";
import { Request, Response } from 'express';

describe('Create Patient Controller', () => {
    it('should add patients', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        createPatient(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Read Patient Controller', () => {
    it('should give the patient information', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        readPatient(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Update Patient Controller', () => {
    it('should update the patient information', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        updatePatient(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Delete Patient Controller', () => {
    it('should delete the patient', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        deletePatient(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
})
