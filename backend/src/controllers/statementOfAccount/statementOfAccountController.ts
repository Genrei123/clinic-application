import { Request, Response } from 'express';
import StatementOfAccount from '../../model/StatementOfAccount/StatementOfAccount';

export const createStatementOfAccount = async (req: Request, res: Response) => {
    try {
        const newStatementOfAccount = await StatementOfAccount.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Statement of Account created successfully',
            data: newStatementOfAccount
        });
    } catch (error) {
        console.error('Error creating Statement of Account:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create Statement of Account',
            error: error
        });
    }
}

export const readStatementOfAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const statementOfAccount = await StatementOfAccount.findByPk(id);
            if (!statementOfAccount) {
                return res.status(404).json({
                    success: false,
                    message: 'Statement of Account not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: statementOfAccount
            });
        } else {
            const statementsOfAccount = await StatementOfAccount.findAll();
            return res.status(200).json({
                success: true,
                data: statementsOfAccount
            });
        }
    } catch (error) {
        console.error('Error fetching Statement(s) of Account:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch Statement of Account data',
            error: error
        });
    }
}

export const updateStatementOfAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await StatementOfAccount.update(req.body, {
            where: { AccountID: id }
        });
        
        if (updated) {
            const updatedStatementOfAccount = await StatementOfAccount.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Statement of Account updated successfully',
                data: updatedStatementOfAccount
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Statement of Account not found'
        });
    } catch (error) {
        console.error('Error updating Statement of Account:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update Statement of Account',
            error: error
        });
    }
}

export const deleteStatementOfAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await StatementOfAccount.destroy({
            where: { AccountID: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Statement of Account deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Statement of Account not found'
        });
    } catch (error) {
        console.error('Error deleting Statement of Account:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete Statement of Account',
            error: error
        });
    }
}