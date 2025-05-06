import { Router } from 'express';
import { getLogs } from '../controllers/logs/logsController';

const logsRoute = Router();

// No type casting needed now
logsRoute.get('/', getLogs);

export default logsRoute;
