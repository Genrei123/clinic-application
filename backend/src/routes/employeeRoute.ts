import { Router, RequestHandler } from 'express';
import { createEmployee, readEmployee, updateEmployee, deleteEmployee } from '../controllers/employee/employeeController';

const employeeRoute = Router();

employeeRoute.post('/', createEmployee as RequestHandler);
employeeRoute.get('/', readEmployee as RequestHandler);
employeeRoute.get('/:id', readEmployee as RequestHandler);
employeeRoute.put('/:id', updateEmployee as RequestHandler);
employeeRoute.delete('/:id', deleteEmployee as RequestHandler);

export default employeeRoute;