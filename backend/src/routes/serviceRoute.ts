import { Router } from 'express';
import { 
    createService, 
    getAllServices, 
    getServiceById, 
    updateService, 
    deleteService 
} from '../controllers/service/serviceController';

const serviceRoute = Router();

serviceRoute.post('/', createService);
serviceRoute.get('/', getAllServices);
serviceRoute.get('/:id', getServiceById);
serviceRoute.put('/:id', updateService);
serviceRoute.delete('/:id', deleteService);

export default serviceRoute;