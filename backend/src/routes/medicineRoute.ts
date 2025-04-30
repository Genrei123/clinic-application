import { Router, RequestHandler } from 'express';
import { createMedicine, readMedicine, updateMedicine, deleteMedicine } from '../controllers/medicine/medicineController';

const medicineRoute = Router();

medicineRoute.post('/', createMedicine as RequestHandler);
medicineRoute.get('/', readMedicine as RequestHandler);
medicineRoute.get('/:id', readMedicine as RequestHandler);
medicineRoute.put('/:id', updateMedicine as RequestHandler);
medicineRoute.delete('/:id', deleteMedicine as RequestHandler);

export default medicineRoute;