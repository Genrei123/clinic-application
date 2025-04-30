import { Request, Response } from 'express';
import Service from '../../model/Service/Service';

export const createService = async (req: Request, res: Response) => {
    try {
        // Check if name is within length limit
        if (req.body.ServiceName && req.body.ServiceName.length > 25) {
            return res.status(400).json({
                success: false,
                message: 'Service name cannot exceed 25 characters'
            });
        }

        const newService = await Service.create(req.body);
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
}

export const readService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: service
            });
        } else {
            const services = await Service.findAll();
            return res.status(200).json({
                success: true,
                data: services
            });
        }
    } catch (error) {
        console.error('Error fetching service(s):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch service data',
            error: error
        });
    }
}

export const updateService = async (req: Request, res: Response) => {
    try {
        // Check if name is within length limit
        if (req.body.ServiceName && req.body.ServiceName.length > 25) {
            return res.status(400).json({
                success: false,
                message: 'Service name cannot exceed 25 characters'
            });
        }
        
        const { id } = req.params;
        const [updated] = await Service.update(req.body, {
            where: { ServiceID: id }
        });
        
        if (updated) {
            const updatedService = await Service.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Service updated successfully',
                data: updatedService
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Service not found'
        });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update service',
            error: error
        });
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Service.destroy({
            where: { ServiceID: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Service deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Service not found'
        });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete service',
            error: error
        });
    }
}