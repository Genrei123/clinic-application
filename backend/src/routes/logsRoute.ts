import { Router, RequestHandler } from 'express';
import { getLogs } from '../controllers/logs/logsController';

const logsRoute = Router();

// Option 1: Remove the type casting
logsRoute.get('/', getLogs);

// OR Option 2: Keep the casting but with the correct return type
// logsRoute.get('/', getLogs as RequestHandler);

export default logsRoute;
