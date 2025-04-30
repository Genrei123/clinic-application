import { Router } from 'express';
import { createPatient, readPatient, updatePatient, deletePatient } from '../controllers/patient/patientController';

const patientRoute = Router();

patientRoute.post('/patient', createPatient);
patientRoute.get('/patient/:id', readPatient);
patientRoute.put('/patient/:id', updatePatient);
patientRoute.patch('/patient/:id', updatePatient);
patientRoute.delete('/patient/:id', deletePatient);

export default patientRoute;