import { Request, Response } from 'express';
import Employee from '../../model/Employee/Employee';

export const createEmployee = async (req: Request, res: Response) => {
    try {
        // Check if email is within length limit
        if (req.body.EEmail && req.body.EEmail.length > 25) {
            return res.status(400).json({
                success: false,
                message: 'Email cannot exceed 25 characters'
            });
        }
        
        // Check if password is within length limit
        if (req.body.EPassword && req.body.EPassword.length > 18) {
            return res.status(400).json({
                success: false,
                message: 'Password cannot exceed 18 characters'
            });
        }

        const newEmployee = await Employee.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: newEmployee
        });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create employee',
            error: error
        });
    }
}

export const readEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const employee = await Employee.findByPk(id);
            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: employee
            });
        } else {
            const employees = await Employee.findAll();
            return res.status(200).json({
                success: true,
                data: employees
            });
        }
    } catch (error) {
        console.error('Error fetching employee(s):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch employee data',
            error: error
        });
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        // Check if email is within length limit
        if (req.body.EEmail && req.body.EEmail.length > 25) {
            return res.status(400).json({
                success: false,
                message: 'Email cannot exceed 25 characters'
            });
        }
        
        const { id } = req.params;
        const [updated] = await Employee.update(req.body, {
            where: { EmployeeID: id }
        });
        
        if (updated) {
            const updatedEmployee = await Employee.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Employee updated successfully',
                data: updatedEmployee
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Employee not found'
        });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update employee',
            error: error
        });
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Employee.destroy({
            where: { EmployeeID: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Employee deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Employee not found'
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete employee',
            error: error
        });
    }
}