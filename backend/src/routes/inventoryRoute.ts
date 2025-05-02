import { Router, RequestHandler } from 'express';
import { createInventory, readInventory, updateInventory, deleteInventory } from '../controllers/inventory/inventoryController';

const inventoryRoute = Router();

inventoryRoute.post('/', createInventory as RequestHandler);
inventoryRoute.get('/', readInventory as RequestHandler);
inventoryRoute.get('/:id', readInventory as RequestHandler);
inventoryRoute.put('/:id', updateInventory as RequestHandler);
inventoryRoute.delete('/:id', deleteInventory as RequestHandler);

export default inventoryRoute;