import { Request, Response } from 'express';
import Inventory from '../../model/Inventory/Inventory';

export const createInventory = async (req: Request, res: Response) => {
    try {
        const newInventory = await Inventory.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Inventory item created successfully',
            data: newInventory
        });
    } catch (error) {
        console.error('Error creating inventory item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create inventory item',
            error: error
        });
    }
}

export const readInventory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const inventory = await Inventory.findByPk(id);
            if (!inventory) {
                return res.status(404).json({
                    success: false,
                    message: 'Inventory item not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: inventory
            });
        } else {
            const inventoryItems = await Inventory.findAll();
            return res.status(200).json({
                success: true,
                data: inventoryItems
            });
        }
    } catch (error) {
        console.error('Error fetching inventory item(s):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch inventory data',
            error: error
        });
    }
}

export const updateInventory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Inventory.update(req.body, {
            where: { InventoryID: id }
        });
        
        if (updated) {
            const updatedInventory = await Inventory.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Inventory item updated successfully',
                data: updatedInventory
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Inventory item not found'
        });
    } catch (error) {
        console.error('Error updating inventory item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update inventory item',
            error: error
        });
    }
}

export const deleteInventory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Inventory.destroy({
            where: { InventoryID: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Inventory item deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Inventory item not found'
        });
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete inventory item',
            error: error
        });
    }
}