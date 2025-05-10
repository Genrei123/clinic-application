import { Request, Response } from 'express';
import { instanceToPlain } from "class-transformer";    
import { SafePatientResponseDTO } from '../../DTO/PatientDTO';
import Patient from '../../model/Patient/Patient';

export const createPatient = async (req: Request, res: Response) => {
    try {
        const newPatient = await Patient.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Patient created successfully',
            data: newPatient
        });
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create patient',
            error: error
        });
    }
}

export const readPatient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const patient = await Patient.findByPk(id);
            if (!patient) {
                return res.status(404).json({
                    success: false,
                    message: 'Patient not found'
                });
            }
            const patientResponseDTO = new SafePatientResponseDTO(patient);
            return res.status(200).json({
                success: true,
                data: instanceToPlain(patientResponseDTO)
            });
        } else {
            const patients = await Patient.findAll();
            const patientResponseDTOs = patients.map(patient => new SafePatientResponseDTO(patient));
            return res.status(200).json({
                success: true,
                data: instanceToPlain(patientResponseDTOs)
            });
        }
    } catch (error) {
        console.error('Error fetching patient(s):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch patient data',
            error: error
        });
    }
}

export const updatePatient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Patient.update(req.body, {
            where: { ClientNumber: id }
        });
        
        if (updated) {
            const updatedPatient = await Patient.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Patient updated successfully',
                data: updatedPatient
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Patient not found'
        });
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update patient',
            error: error
        });
    }
}

export const deletePatient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Patient.destroy({
            where: { ClientNumber: id }
        });
        
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Patient deleted successfully'
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Patient not found'
        });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete patient',
            error: error
        });
    }
}