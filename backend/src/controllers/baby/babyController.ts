import { Request, Response } from 'express';
import Baby from '../../model/Baby/Baby';

export const createBaby = async (req: Request, res: Response) => {
    try {
        const newBaby = await Baby.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Baby record created successfully',
            data: newBaby
        });
    } catch (error) {
        console.error('Error creating baby record:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create baby record',
            error: error
        });
    }
}

export const readBaby = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const baby = await Baby.findByPk(id);
            if (!baby) {
                return res.status(404).json({
                    success: false,
                    message: 'Baby record not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: baby
            });
        } else {
            const babies = await Baby.findAll();
            return res.status(200).json({
                success: true,
                data: babies
            });
        }
    } catch (error) {
        console.error('Error fetching baby record(s):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch baby data',
            error: error
        });
    }
}

export const updateBaby = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Baby.update(req.body, {
            where: { BabyID: id }
        });
        
        if (updated) {
            const updatedBaby = await Baby.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Baby record updated successfully',
                data: updatedBaby
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Baby record not found'
        });
    } catch (error) {
        console.error('Error updating baby record:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update baby record',
            error: error
        });
    }
}

export const deleteBaby = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Baby.destroy({
            where: { BabyID: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Baby record deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Baby record not found'
        });
    } catch (error) {
        console.error('Error deleting baby record:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete baby record',
            error: error
        });
    }
}