import { Request, Response } from 'express';
import Branch from '../../model/Branch/Branch';

export const createBranch = async (req: Request, res: Response) => {
    try {
        const newBranch = await Branch.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Branch created successfully',
            data: newBranch
        });
    } catch (error) {
        console.error('Error creating branch:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create branch',
            error: error
        });
    }
}

export const readBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const branch = await Branch.findByPk(id);
            if (!branch) {
                return res.status(404).json({
                    success: false,
                    message: 'Branch not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: branch
            });
        } else {
            const branches = await Branch.findAll();
            return res.status(200).json({
                success: true,
                data: branches
            });
        }
    } catch (error) {
        console.error('Error fetching branch(es):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch branch data',
            error: error
        });
    }
}

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Branch.update(req.body, {
            where: { BranchID: id }
        });
        
        if (updated) {
            const updatedBranch = await Branch.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Branch updated successfully',
                data: updatedBranch
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Branch not found'
        });
    } catch (error) {
        console.error('Error updating branch:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update branch',
            error: error
        });
    }
}

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Branch.destroy({
            where: { BranchID: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Branch deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Branch not found'
        });
    } catch (error) {
        console.error('Error deleting branch:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete branch',
            error: error
        });
    }
}