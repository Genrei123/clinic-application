import { Router, RequestHandler } from 'express';
import { createBranch, readBranch, updateBranch, deleteBranch } from '../controllers/branch/branchController';

const branchRoute = Router();

branchRoute.post('/', createBranch as RequestHandler);
branchRoute.get('/', readBranch as RequestHandler);
branchRoute.get('/:id', readBranch as RequestHandler);
branchRoute.put('/:id', updateBranch as RequestHandler);
branchRoute.delete('/:id', deleteBranch as RequestHandler);

export default branchRoute;