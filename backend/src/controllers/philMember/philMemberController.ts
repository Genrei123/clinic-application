import { Request, Response } from 'express';
import PhilMember from '../../model/PhilMember/PhilMember';

export const createPhilMember = async (req: Request, res: Response) => {
    try {
        const newPhilMember = await PhilMember.create(req.body);
        res.status(201).json({
            success: true,
            message: 'PhilHealth member created successfully',
            data: newPhilMember
        });
    } catch (error) {
        console.error('Error creating PhilHealth member:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create PhilHealth member',
            error: error
        });
    }
}

export const readPhilMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const philMember = await PhilMember.findByPk(id);
            if (!philMember) {
                return res.status(404).json({
                    success: false,
                    message: 'PhilHealth member not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: philMember
            });
        } else {
            const philMembers = await PhilMember.findAll();
            return res.status(200).json({
                success: true,
                data: philMembers
            });
        }
    } catch (error) {
        console.error('Error fetching PhilHealth member(s):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch PhilHealth member data',
            error: error
        });
    }
}

export const updatePhilMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await PhilMember.update(req.body, {
            where: { MemberID: id }
        });
        
        if (updated) {
            const updatedPhilMember = await PhilMember.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'PhilHealth member updated successfully',
                data: updatedPhilMember
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'PhilHealth member not found'
        });
    } catch (error) {
        console.error('Error updating PhilHealth member:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update PhilHealth member',
            error: error
        });
    }
}

export const deletePhilMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await PhilMember.destroy({
            where: { MemberID: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'PhilHealth member deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'PhilHealth member not found'
        });
    } catch (error) {
        console.error('Error deleting PhilHealth member:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete PhilHealth member',
            error: error
        });
    }
}