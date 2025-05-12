import { Request, Response } from 'express';
import Service from '../../model/Service/Service';
import { logDatabaseAction } from '../../middleware/loggingMiddleware';

// Create a type to extend Express Request with user
interface AuthRequest extends Request {
  user?: { id: number; username: string; };
}

// Create Service with logging
export const createService = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const newService = await Service.create(req.body);
        
        // Log the creation
        await logDatabaseAction(
            'Service',
            'CREATE',
            newService.ServiceID,
            req.user?.id || null,
            null,
            newService.toJSON(),
            `Service '${newService.ServiceName}' created`,
            req
        );
        
        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: newService
        });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create service',
            error: error
        });
    }
};

// Get all Services with logging
export const getAllServices = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const services = await Service.findAll();
        
        // Log the bulk read operation
        await logDatabaseAction(
            'Service',
            'READ',
            0, // 0 indicates retrieving all records
            req.user?.id || null,
            null,
            { count: services.length },
            `All services retrieved (${services.length} records)`,
            req
        );
        
        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch services',
            error: error
        });
    }
};

// Get Service by ID with logging
export const getServiceById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        const service = await Service.findByPk(id);
        
        if (!service) {
            res.status(404).json({
                success: false,
                message: 'Service not found'
            });
            return;
        }
        
        // Log the read operation
        await logDatabaseAction(
            'Service',
            'READ',
            service.ServiceID,
            req.user?.id || null,
            null,
            service.toJSON(),
            `Service '${service.ServiceName}' viewed`,
            req
        );
        
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch service',
            error: error
        });
    }
};

// Update Service with logging
export const updateService = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        // Get original service for logging
        const oldService = await Service.findByPk(id);
        
        if (!oldService) {
            res.status(404).json({
                success: false,
                message: 'Service not found'
            });
            return;
        }
        
        // Update the service
        const [updated] = await Service.update(req.body, {
            where: { ServiceID: id }
        });
        
        if (updated) {
            const updatedService = await Service.findByPk(id);
            
            // Log the update
            await logDatabaseAction(
                'Service',
                'UPDATE',
                oldService.ServiceID,
                req.user?.id || null,
                oldService.toJSON(),
                updatedService?.toJSON() || null,
                `Service '${oldService.ServiceName}' updated`,
                req
            );
            
            res.status(200).json({
                success: true,
                message: 'Service updated successfully',
                data: updatedService
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update service',
            error: error
        });
    }
};

// Delete Service with logging
export const deleteService = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        // Get original service for logging
        const service = await Service.findByPk(id);
        
        if (!service) {
            res.status(404).json({
                success: false,
                message: 'Service not found'
            });
            return;
        }
        
        // Delete the service
        const deleted = await Service.destroy({
            where: { ServiceID: id }
        });
        
        if (deleted) {
            // Log the deletion
            await logDatabaseAction(
                'Service',
                'DELETE',
                service.ServiceID,
                req.user?.id || null,
                service.toJSON(),
                null,
                `Service '${service.ServiceName}' deleted`,
                req
            );
            
            res.status(200).json({
                success: true,
                message: 'Service deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete service',
            error: error
        });
    }
};