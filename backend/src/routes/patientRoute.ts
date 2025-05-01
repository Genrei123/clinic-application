import { Router, RequestHandler } from 'express';
import { createPatient, readPatient, updatePatient, deletePatient } from '../controllers/patient/patientController';

const patientRoute = Router();

patientRoute.post('/', createPatient as RequestHandler);
patientRoute.get('/', readPatient as RequestHandler);
patientRoute.get('/:id', readPatient as RequestHandler);
patientRoute.put('/:id', updatePatient as RequestHandler);
patientRoute.delete('/:id', deletePatient as RequestHandler);

export default patientRoute;