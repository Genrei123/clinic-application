import { Router, RequestHandler } from 'express';
import { getLogs } from '../controllers/logs/logsController';

const logsRoute = Router();

logsRoute.get('/', getLogs as RequestHandler);

export default logsRoute;

import logsRoute from './routes/logsRoute';

app.use('/logs', logsRoute);