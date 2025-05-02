import { Router, RequestHandler } from 'express';
import { createBaby, readBaby, updateBaby, deleteBaby } from '../controllers/baby/babyController';

const babyRoute = Router();

babyRoute.post('/', createBaby as RequestHandler);
babyRoute.get('/', readBaby as RequestHandler);
babyRoute.get('/:id', readBaby as RequestHandler);
babyRoute.put('/:id', updateBaby as RequestHandler);
babyRoute.delete('/:id', deleteBaby as RequestHandler);

export default babyRoute;