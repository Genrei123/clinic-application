import { Router, RequestHandler } from 'express';
import { createPhilMember, readPhilMember, updatePhilMember, deletePhilMember } from '../controllers/philMember/philMemberController';

const philMemberRoute = Router();

philMemberRoute.post('/', createPhilMember as RequestHandler);
philMemberRoute.get('/', readPhilMember as RequestHandler);
philMemberRoute.get('/:id', readPhilMember as RequestHandler);
philMemberRoute.put('/:id', updatePhilMember as RequestHandler);
philMemberRoute.delete('/:id', deletePhilMember as RequestHandler);

export default philMemberRoute;