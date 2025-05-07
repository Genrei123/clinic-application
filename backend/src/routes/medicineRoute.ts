import { Router } from 'express';
import { 
    createMedicine, 
    getAllMedicine, 
    getMedicineById, 
    updateMedicine, 
    deleteMedicine 
} from '../controllers/medicine/medicineController';

const medicineRoute = Router();

medicineRoute.post('/', createMedicine);
medicineRoute.get('/', getAllMedicine);
medicineRoute.get('/:id', getMedicineById);
medicineRoute.put('/:id', updateMedicine);
medicineRoute.delete('/:id', deleteMedicine);

export default medicineRoute;