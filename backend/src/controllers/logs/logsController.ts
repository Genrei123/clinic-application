import { Request, Response } from 'express';
import Logs from '../../model/Logs/Logs';

export const getLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const { table, action, limit = 100 } = req.query;
        
        let whereClause: any = {};
        
        if (table) {
            whereClause.TableName = table;
        }
        
        if (action) {
            whereClause.ActionType = action;
        }
        
        const logs = await Logs.findAll({
            where: whereClause,
            limit: Number(limit),
            order: [['Timestamp', 'DESC']]
        });
        
        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs
        });
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve logs',
            error: error
        });
    }
};