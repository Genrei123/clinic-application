import { Request, Response } from 'express';
import Medicine from '../../model/Medicine/Medicine';
import { logDatabaseAction } from '../../middleware/loggingMiddleware';

export const createMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMedicine = await Medicine.create(req.body);
        
        // Log the creation
        await logDatabaseAction(
            'Medicine',
            'CREATE',
            newMedicine.MedicineID,
            req.user?.id || null,
            null,
            newMedicine.toJSON(),
            `Medicine '${newMedicine.MedicineName}' created`,
            req
        );
        
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

export const readMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        if (id) {
            const medicine = await Medicine.findByPk(id);
            if (!medicine) {
                res.status(404).json({
                    success: false,
                    message: 'Medicine not found'
                });
                return;
            }
            
            // Log the read operation
            await logDatabaseAction(
                'Medicine',
                'READ',
                medicine.MedicineID,
                req.user?.id || null,
                null,
                medicine.toJSON(),
                `Medicine '${medicine.MedicineName}' viewed`,
                req
            );
            
            res.status(200).json({
                success: true,
                data: medicine
            });
        } else {
            const medicines = await Medicine.findAll();
            
            // Log the bulk read operation
            await logDatabaseAction(
                'Medicine',
                'READ',
                0, // Use 0 to indicate "all records"
                req.user?.id || null,
                null,
                { count: medicines.length },
                `All medicines retrieved (${medicines.length} records)`,
                req
            );
            
            res.status(200).json({
                success: true,
                count: medicines.length,
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

export const updateMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        // Get original medicine for logging
        const oldMedicine = await Medicine.findByPk(id);
        
        if (!oldMedicine) {
            res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
            return;
        }
        
        // Update the medicine
        const [updated] = await Medicine.update(req.body, {
            where: { MedicineID: id }
        });
        
        if (updated) {
            const updatedMedicine = await Medicine.findByPk(id);
            
            // Log the update
            await logDatabaseAction(
                'Medicine',
                'UPDATE',
                oldMedicine.MedicineID,
                req.user?.id || null,
                oldMedicine.toJSON(),
                updatedMedicine?.toJSON() || null,
                `Medicine '${oldMedicine.MedicineName}' updated`,
                req
            );
            
            res.status(200).json({
                success: true,
                message: 'Medicine updated successfully',
                data: updatedMedicine
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }
    } catch (error) {
        console.error('Error updating medicine:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update medicine',
            error: error
        });
    }
}

export const deleteMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        // Get original medicine for logging
        const medicine = await Medicine.findByPk(id);
        
        if (!medicine) {
            res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
            return;
        }
        
        // Delete the medicine
        const deleted = await Medicine.destroy({
            where: { MedicineID: id }
        });
        
        if (deleted) {
            // Log the deletion
            await logDatabaseAction(
                'Medicine',
                'DELETE',
                medicine.MedicineID,
                req.user?.id || null,
                medicine.toJSON(),
                null,
                `Medicine '${medicine.MedicineName}' deleted`,
                req
            );
            
            res.status(200).json({
                success: true,
                message: 'Medicine deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }
    } catch (error) {
        console.error('Error deleting medicine:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete medicine',
            error: error
        });
    }
}