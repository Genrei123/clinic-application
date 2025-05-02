import { Request, Response } from 'express';
import Checkup from '../../model/Checkup/Checkup';

export const createCheckup = async (req: Request, res: Response) => {
    try {
        const newCheckup = await Checkup.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Checkup record created successfully',
            data: newCheckup
        });
    } catch (error) {
        console.error('Error creating checkup record:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create checkup record',
            error: error
        });
    }
}

export const readCheckup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const checkup = await Checkup.findByPk(id);
            if (!checkup) {
                return res.status(404).json({
                    success: false,
                    message: 'Checkup record not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: checkup
            });
        } else {
            const checkups = await Checkup.findAll();
            return res.status(200).json({
                success: true,
                data: checkups
            });
        }
    } catch (error) {
        console.error('Error fetching checkup record(s):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch checkup data',
            error: error
        });
    }
}

export const updateCheckup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Checkup.update(req.body, {
            where: { CheckUpID: id }
        });
        
        if (updated) {
            const updatedCheckup = await Checkup.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Checkup record updated successfully',
                data: updatedCheckup
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Checkup record not found'
        });
    } catch (error) {
        console.error('Error updating checkup record:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update checkup record',
            error: error
        });
    }
}

export const deleteCheckup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Checkup.destroy({
            where: { CheckUpID: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Checkup record deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Checkup record not found'
        });
    } catch (error) {
        console.error('Error deleting checkup record:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete checkup record',
            error: error
        });
    }
}