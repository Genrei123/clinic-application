// filepath: backend/src/middleware/loggingMiddleware.ts
import { Request } from 'express';
import Logs from '../model/Logs/Logs';

type ActionType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

export const logDatabaseAction = async (
    tableName: string, 
    actionType: ActionType,
    recordId: number,
    userId: number | null,
    oldValues: object | null,
    newValues: object | null,
    description: string,
    req?: Request
) => {
    try {
        await Logs.create({
            TableName: tableName,
            ActionType: actionType,
            RecordID: recordId,
            UserID: userId,
            OldValues: oldValues,
            NewValues: newValues,
            Description: description,
            IPAddress: req?.ip || null,
            UserAgent: req?.headers['user-agent'] || null
        });
        
        console.log(`Logged ${actionType} action on ${tableName} record ${recordId}`);
    } catch (error) {
        console.error('Failed to log database action:', error);
    }
};