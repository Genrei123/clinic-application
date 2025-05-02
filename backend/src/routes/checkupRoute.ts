import { Router, RequestHandler } from 'express';
import { createCheckup, readCheckup, updateCheckup, deleteCheckup } from '../controllers/checkup/checkupController';

const checkupRoute = Router();

checkupRoute.post('/', createCheckup as RequestHandler);
checkupRoute.get('/', readCheckup as RequestHandler);
checkupRoute.get('/:id', readCheckup as RequestHandler);
checkupRoute.put('/:id', updateCheckup as RequestHandler);
checkupRoute.delete('/:id', deleteCheckup as RequestHandler);

export default checkupRoute;