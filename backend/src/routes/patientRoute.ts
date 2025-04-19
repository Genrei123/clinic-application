import { Router } from 'express';
import { createPatient, readPatient, updatePatient, deletePatient } from '../controllers/patient/patientController';

const router = Router();

router.post('/patient', createPatient);
router.get('/patient/:id', readPatient);
router.put('/patient/:id', updatePatient);
router.patch('/patient/:id', updatePatient);
router.delete('/patient/:id', deletePatient);