import React from 'react';
import { Button } from "../../components/Button";
import { Table } from "../../components/Table"; // Assuming this path is correct
import { useNavigate } from 'react-router-dom';

// --- Mock Patient Data ---
const mockPatient = {
  name: "Juan Dela Cruz",
  status: "Active",
  age: 35,
  sex: "Female",
  phone: "0917 123 4567",
  address: "123 Main Street, Barangay Sample, Cityville",
  medicalHistory: {
    condition: "Hypertension",
    diagnosis: "Essential Hypertension, Stage 1",
    medication: "Lisinopril 10mg daily",
    allergies: "Penicillin",
    notes: "Patient reports occasional headaches. Advised lifestyle modifications.",
  },
  pregnancyDetails: { // This section might be conditionally rendered based on sex or status
    pregnancyStatus: "Meron", // Or "Pregnant", "Not Pregnant"
    dueDate: "N/A",
    gestationalAge: "N/A",
    complications: "N/A",
  },
  servicesRendered: [
    { id: 1, date: "2023-10-01", service: "Check-up", notes: "Routine check-up" },
    { id: 2, date: "2024-01-15", service: "Blood Pressure Monitoring", notes: "BP stable" },
     // Add more mock data as needed
  ],
  medicineSold: [
    { id: 101, date: "2023-10-01", medicine: "Lisinopril", quantity: 30, price: 150.00 },
    { id: 102, date: "2024-01-15", medicine: "Paracetamol", quantity: 10, price: 30.00 },
     // Add more mock data as needed
  ],
};

// --- Define Columns for Services Rendered Table ---
// Data items are of type { id: number, date: string, service: string, notes: string }
const servicesColumns = [
    {
        key: 'date',
        header: 'Date',
        render: (item: typeof mockPatient.servicesRendered[0]) => item.date,
    },
    {
        key: 'service',
        header: 'Service',
        render: (item: typeof mockPatient.servicesRendered[0]) => item.service,
    },
    {
        key: 'notes',
        header: 'Notes',
        render: (item: typeof mockPatient.servicesRendered[0]) => item.notes,
    },
];

// --- Define Columns for Medicine Sold Table ---
// Data items are of type { id: number, date: string, medicine: string, quantity: number, price: number }
const medicineColumns = [
    {
        key: 'date',
        header: 'Date',
        render: (item: typeof mockPatient.medicineSold[0]) => item.date,
    },
    {
        key: 'medicine',
        header: 'Medicine',
        render: (item: typeof mockPatient.medicineSold[0]) => item.medicine,
    },
    {
        key: 'quantity',
        header: 'Qty', // Shorter header for quantity
        render: (item: typeof mockPatient.medicineSold[0]) => item.quantity,
        cellClassName: 'text-center', // Optional: center align quantity
    },
     {
        key: 'price',
        header: 'Price',
        // Format price as currency (e.g., ₱150.00)
        render: (item: typeof mockPatient.medicineSold[0]) => `₱${item.price.toFixed(2)}`,
        cellClassName: 'text-right', // Optional: right align price
    },
];


export const Patient: React.FC = () => {
    // In a real application, you would fetch patient data here
    const patient = mockPatient; // Use the mock data

    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-6 space-y-8"> 
            <Button
                label ="Back to Patients"
                onClick={() => navigate("/patients")}
                className="mb-4"
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4"> 
                <h1 className="text-3xl font-bold mb-4 sm:mb-0">{patient.name}</h1> 
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"> 
                    <Button label="Edit Patient" onClick={() => alert("Edit Patient Info Clicked")} />
                    <Button label="Archive Patient" onClick={() => alert("Archive Patient Clicked")} />
                    <Button label="Claimed" onClick={() => alert("Patient has been claimed")} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
                <div className="space-y-8">
                    <div className="p-6 border rounded-lg shadow-sm"> 
                        <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
                        <div className="space-y-2 text-gray-300">
                            <p><strong>Status:</strong> {patient.status}</p>
                            <p><strong>Age:</strong> {patient.age}</p>
                            <p><strong>Sex:</strong> {patient.sex}</p>
                            <p><strong>Phone:</strong> {patient.phone}</p>
                            <p><strong>Address:</strong> {patient.address}</p>
                        </div>
                    </div>

                    <div className="p-6 border rounded-lg shadow-sm"> 
                        <h2 className="text-xl font-semibold mb-4">Medical History</h2>
                        <div className="space-y-2 text-gray-300">
                            <p><strong>Condition:</strong> {patient.medicalHistory.condition}</p>
                            <p><strong>Diagnosis:</strong> {patient.medicalHistory.diagnosis}</p>
                            <p><strong>Medication:</strong> {patient.medicalHistory.medication}</p>
                            <p><strong>Allergies:</strong> {patient.medicalHistory.allergies}</p>
                            <p><strong>Notes:</strong> {patient.medicalHistory.notes}</p>
                        </div>
                    </div>

                    {patient.sex === 'Female' && patient.pregnancyDetails.pregnancyStatus !== 'N/A' && ( 
                         <div className="p-6 border rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Pregnancy Details</h2>
                            <div className="space-y-2 text-gray-300"> {/* inherit text color */}
                                <p><strong>Pregnancy Status:</strong> {patient.pregnancyDetails.pregnancyStatus}</p>
                                <p><strong>Due Date:</strong> {patient.pregnancyDetails.dueDate}</p>
                                <p><strong>Gestational Age:</strong> {patient.pregnancyDetails.gestationalAge}</p>
                                <p><strong>Complications:</strong> {patient.pregnancyDetails.complications}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                     <div className="p-6 border rounded-lg shadow-sm flex flex-col space-y-4"> 
                         <h2 className="text-xl font-semibold mb-4">Actions</h2>
                         <Button label="Render Service" onClick={() => alert("Render Service Clicked")} />
                         <Button label="Sell Medicine" onClick={() => alert("Sell Medicine Clicked")} />
                         <Button label="Generate Claim Forms" onClick={() => alert("Generate Claim Forms")} />
                     </div>

                    <div className="p-0 border rounded-lg shadow-sm overflow-hidden">
                        <Table
                            title="Services Rendered History"
                            columns={servicesColumns}
                            data={patient.servicesRendered}
                        />
                    </div>

                     <div className="p-0 border rounded-lg shadow-sm overflow-hidden"> 
                        <Table
                            title="Medicine Sold History"
                            columns={medicineColumns}
                            data={patient.medicineSold}
                        />
                    </div>
                </div> 
            </div> 
        </div> 
    );
}