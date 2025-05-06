// filepath: backend/src/middleware/loggingMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { sequelize } from '../configs/database';

export const logDatabaseAction = async (
    tableName: string, 
    actionType: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE',
    recordId: number,
    userId: number | null,
    oldValues: any | null,
    newValues: any | null,
    description: string
) => {
    try {
        await sequelize.query(
            `INSERT INTO "Logs" ("TableName", "ActionType", "RecordID", "UserID", 
                                "OldValues", "NewValues", "Description", "IPAddress", "UserAgent")
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            {
                bind: [
                    tableName,
                    actionType,
                    recordId,
                    userId,
                    oldValues ? JSON.stringify(oldValues) : null,
                    newValues ? JSON.stringify(newValues) : null,
                    description,
                    null, // IP Address would be captured in actual requests
                    null  // User Agent would be captured in actual requests
                ]
            }
        );
    } catch (error) {
        console.error('Failed to log database action:', error);
    }
};