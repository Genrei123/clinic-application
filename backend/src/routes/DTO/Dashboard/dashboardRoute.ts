import { Router, RequestHandler } from 'express';
import { getDashboardData } from '../../../controllers/dashboard/dashboardController';

const dashboardRoute = Router();

dashboardRoute.get('/dashboard', getDashboardData as RequestHandler);

export default dashboardRoute;