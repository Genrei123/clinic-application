import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class SafePatientResponseDTO {
  @Expose()
  fullName: string;

  @Expose()
  ClientNumber: number;

  @Expose()
  Branch: string;

  @Expose()
  PAddress: string;

  @Expose()
  Admitted: string;

  constructor(patient: any) {
    const names = [
      patient.PFirstName,
      patient.PMiddleName,
      patient.PLastName,
      patient.PExtName
    ].filter(Boolean);

    const admit = [
        patient.DateAdmitted,
        patient.TimeAdmitted
    ]
    this.fullName = names.join(' ');
    this.ClientNumber = patient.ClientNumber;
    this.Branch = patient.Branch;
    this.PAddress = patient.PAddress;
    this.Admitted = admit.join(' ');
    // Add other properties as needed
  }
}
