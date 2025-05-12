import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { DashboardDTO } from '../../DTO/DashboardDTO';
import Branch from '../../model/Branch/Branch';
import Patient from '../../model/Patient/Patient';
import Service from '../../model/Service/Service';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // Fetch data from all three tables in parallel
    const [branches, patients, services] = await Promise.all([
      Branch.findAll(),
      Patient.findAll(),
      Service.findAll({
        include: [Branch] // Include Branch data with Service
      })
    ]);
    
    // Create the dashboard DTO
    const dashboardData = new DashboardDTO({
      branches,
      patients,
      services
    });
    
    // Return the plain object (only exposed properties)
    return res.status(200).json({
      success: true,
      data: instanceToPlain(dashboardData)
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error
    });
  }
};