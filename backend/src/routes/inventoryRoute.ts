import { createInventory, readInventory, updateInventory, deleteInventory } from "../controllers/inventory/inventoryController";
import { Router } from 'express';

const router = Router();

router.post('/inventory', createInventory);
router.get('/inventory', readInventory);
router.get('/inventory/:id', readInventory);
router.put('/inventory', updateInventory);
router.delete('/inventory', deleteInventory);