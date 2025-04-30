import { Router, RequestHandler } from 'express';
import { createService, readService, updateService, deleteService } from '../controllers/service/serviceController';

const serviceRoute = Router();

serviceRoute.post('/', createService as RequestHandler);
serviceRoute.get('/', readService as RequestHandler);
serviceRoute.get('/:id', readService as RequestHandler);
serviceRoute.put('/:id', updateService as RequestHandler);
serviceRoute.delete('/:id', deleteService as RequestHandler);

export default serviceRoute;