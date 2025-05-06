import { Request, Response } from 'express';
import Branch from '../../model/Branch/Branch';
import { logDatabaseAction } from '../../middleware/loggingMiddleware';

export const createBranch = async (req: Request, res: Response) => {
    try {
        const { BranchName, BranchLocation, BranchStatus, BranchRequest } = req.body;
        
        const newBranch = await Branch.create({
            BranchName,
            BranchLocation,
            BranchStatus,
            BranchRequest
        });
        
        // Log the creation
        await logDatabaseAction(
            'Branch',
            'CREATE',
            newBranch.BranchID,
            req.user?.id || null,
            null,
            newBranch,
            `Branch '${BranchName}' created`
        );
        
        res.status(201).json(newBranch);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create branch' });
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
            
            // Log the update
            await logDatabaseAction(
                'Branch',
                'UPDATE',
                id,
                req.user?.id || null,
                req.body,
                updatedBranch,
                `Branch '${updatedBranch?.BranchName}' updated`
            );
            
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
            // Log the deletion
            await logDatabaseAction(
                'Branch',
                'DELETE',
                id,
                req.user?.id || null,
                null,
                null,
                `Branch with ID '${id}' deleted`
            );
            
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