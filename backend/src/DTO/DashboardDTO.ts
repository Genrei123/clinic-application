import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class DashboardDTO {
  // Branch statistics
  @Expose()
  totalBranches: number;
  
  @Expose()
  activeBranches: number;
  
  @Expose()
  branchList: {
    id: number,
    name: string,
    location: string,
    isActive: boolean
  }[];
  
  // Patient statistics
  @Expose()
  totalPatients: number;
  
  @Expose()
  currentlyAdmitted: number;
  
  @Expose()
  recentAdmissions: {
    clientNumber: number,
    fullName: string,
    branch: string,
    dateAdmitted: string
  }[];
  
  // Service statistics
  @Expose()
  totalServices: number;
  
  @Expose()
  activeServices: number;
  
  @Expose()
  servicesByType: {
    type: string,
    count: number
  }[];
  
  constructor(data: {
    branches: any[],
    patients: any[],
    services: any[]
  }) {
    // Branch calculations
    this.totalBranches = data.branches.length;
    this.activeBranches = data.branches.filter(b => b.BranchStatus).length;
    this.branchList = data.branches.map(branch => ({
      id: branch.BranchID,
      name: branch.BranchName,
      location: branch.BranchLocation,
      isActive: branch.BranchStatus
    }));
    
    // Patient calculations
    this.totalPatients = data.patients.length;
    this.currentlyAdmitted = data.patients.filter(p => 
      p.DateAdmitted && !p.DateDischarged
    ).length;
    
    // Get 5 most recent admissions
    this.recentAdmissions = data.patients
      .filter(p => p.DateAdmitted)
      .sort((a, b) => new Date(b.DateAdmitted).getTime() - new Date(a.DateAdmitted).getTime())
      .slice(0, 5)
      .map(patient => ({
        clientNumber: patient.ClientNumber,
        fullName: [patient.PFirstName, patient.PMiddleName, patient.PLastName, patient.PExtName]
          .filter(Boolean).join(' '),
        branch: patient.Branch,
        dateAdmitted: patient.DateAdmitted
      }));
    
    // Service calculations
    this.totalServices = data.services.length;
    this.activeServices = data.services.filter(s => s.ServiceStatus).length;
    
    // Group services by type
    const serviceTypes: Record<string, number> = {};
    data.services.forEach(service => {
      if (!serviceTypes[service.ServiceType]) {
        serviceTypes[service.ServiceType] = 0;
      }
      serviceTypes[service.ServiceType]++;
    });
    
    this.servicesByType = Object.keys(serviceTypes).map(type => ({
      type,
      count: serviceTypes[type]
    }));
  }
}