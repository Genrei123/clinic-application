import { Router, RequestHandler } from 'express';
import { createStatementOfAccount, readStatementOfAccount, updateStatementOfAccount, deleteStatementOfAccount } from '../controllers/statementOfAccount/statementOfAccountController';

const statementOfAccountRoute = Router();

statementOfAccountRoute.post('/', createStatementOfAccount as RequestHandler);
statementOfAccountRoute.get('/', readStatementOfAccount as RequestHandler);
statementOfAccountRoute.get('/:id', readStatementOfAccount as RequestHandler);
statementOfAccountRoute.put('/:id', updateStatementOfAccount as RequestHandler);
statementOfAccountRoute.delete('/:id', deleteStatementOfAccount as RequestHandler);

export default statementOfAccountRoute;