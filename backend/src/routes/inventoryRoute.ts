import { createInventory, readInventory, updateInventory, deleteInventory } from "../controllers/inventory/inventoryController";
import { Router } from 'express';

const inventoryRoute = Router();

inventoryRoute.post('/inventory', createInventory);
inventoryRoute.get('/inventory', readInventory);
inventoryRoute.get('/inventory/:id', readInventory);
inventoryRoute.put('/inventory', updateInventory);
inventoryRoute.delete('/inventory', deleteInventory);

export default inventoryRoute;