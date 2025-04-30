import { Request, Response } from 'express';
import Medicine from '../../model/Medicine/Medicine';

export const createMedicine = async (req: Request, res: Response) => {
    try {
        const newMedicine = await Medicine.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Medicine created successfully',
            data: newMedicine
        });
    } catch (error) {
        console.error('Error creating medicine:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create medicine',
            error: error
        });
    }
}

export const readMedicine = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const medicine = await Medicine.findByPk(id);
            if (!medicine) {
                return res.status(404).json({
                    success: false,
                    message: 'Medicine not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: medicine
            });
        } else {
            const medicines = await Medicine.findAll();
            return res.status(200).json({
                success: true,
                data: medicines
            });
        }
    } catch (error) {
        console.error('Error fetching medicine(s):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch medicine data',
            error: error
        });
    }
}

export const updateMedicine = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Medicine.update(req.body, {
            where: { MedicineID: id }
        });
        
        if (updated) {
            const updatedMedicine = await Medicine.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Medicine updated successfully',
                data: updatedMedicine
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Medicine not found'
        });
    } catch (error) {
        console.error('Error updating medicine:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update medicine',
            error: error
        });
    }
}

export const deleteMedicine = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Medicine.destroy({
            where: { MedicineID: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Medicine deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Medicine not found'
        });
    } catch (error) {
        console.error('Error deleting medicine:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete medicine',
            error: error
        });
    }
}