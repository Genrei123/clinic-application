import { Input } from "../../../components/Input";
import { Patient } from "../../../types/types";
import React, { useState } from "react";

interface PatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    patient: Patient | null;
}

export const PatientModal: React.FC<PatientModalProps> = ({
    isOpen,
    onClose,
    patient,
}) => {
    if (!isOpen) return null;

    // Initialize form data with patient data or empty defaults
    const [formData, setFormData] = useState<Patient>(
        patient || {
            LastName: '',
            FirstName: '',
            MiddleName: '',
            Extension: '',
            Address: '',
            Region: '',
            Occupation: '',
            BirthDate: '',
            Age: 0,
            ContactNumber: '',
            Branch: '',
            DateAdmitted: '',
            TimeAdmitted: '',
            DateDischarged: '',
            TimeOfDischarged: '',
            DateOfBirth: '',
            TimeOfBirth: '',
            Image: '',
            PhilHealthId: ''
        }
    );

    // State for current page
    const [currentPage, setCurrentPage] = useState(0);

    // Define fields grouped by pages
    const fieldGroups = [
        // Page 1: Personal Info
        [
            { name: 'LastName', label: 'Last Name', type: 'text', required: true },
            { name: 'FirstName', label: 'First Name', type: 'text', required: true },
            { name: 'MiddleName', label: 'Middle Name', type: 'text', required: true },
            { name: 'Extension', label: 'Extension (e.g., Jr.)', type: 'text', required: false },
            { name: 'Occupation', label: 'Occupation', type: 'text', required: true }
        ],
        // Page 2: Contact Info
        [
            { name: 'Address', label: 'Address', type: 'text', required: true },
            { name: 'Region', label: 'Region', type: 'text', required: true },
            { name: 'ContactNumber', label: 'Contact Number', type: 'tel', required: true },
            { name: 'Branch', label: 'Branch', type: 'text', required: true }
        ],
        // Page 3: Admission Info
        [
            { name: 'DateAdmitted', label: 'Date Admitted', type: 'date', required: true },
            { name: 'TimeAdmitted', label: 'Time Admitted', type: 'time', required: true },
            { name: 'DateDischarged', label: 'Date Discharged', type: 'date', required: true },
            { name: 'TimeOfDischarged', label: 'Time of Discharge', type: 'time', required: true }
        ],
        // Page 4: Additional Info
        [
            { name: 'BirthDate', label: 'Birth Date', type: 'date', required: true },
            { name: 'DateOfBirth', label: 'Date of Birth', type: 'date', required: true },
            { name: 'TimeOfBirth', label: 'Time of Birth', type: 'time', required: false },
            { name: 'Age', label: 'Age', type: 'number', required: true },
            { name: 'PhilHealthId', label: 'PhilHealth ID', type: 'text', required: false }
        ],

        // Page 5: Image Upload
        [
            { name: 'Image', label: 'Upload Image', type: 'file', required: false }
        ]
    ];

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'Age' ? Number(value) : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., send formData to an API)
        console.log('Submitted:', formData);
        onClose();
    };

    // Handle page navigation
    const handleNext = () => {
        if (currentPage < fieldGroups.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleClose = () => {
        onClose();
        setCurrentPage(0); // Reset to first page when closing
    }
    

    // Get current page fields
    const currentFields = fieldGroups[currentPage];

    return (
        <>
            <div className="text-black fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h2 className="text-xl font-bold mb-4">Patient Details - Page {currentPage + 1}</h2>
                    <form onSubmit={handleSubmit}>
                        {currentFields.map((field) => (
                            <div key={field.name} className="mb-4">
                                <label className="block text-gray-700">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <Input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name as keyof Patient]}
                                    onChange={handleChange}
                                    required={field.required}
                                    placeholder={`Enter ${field.label}`}
                                />
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                            <div>
                                {currentPage > 0 && (
                                    <button
                                        type="button"
                                        onClick={handlePrevious}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Previous
                                    </button>
                                )}
                                {currentPage < fieldGroups.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="fixed inset-0 bg-black opacity-50"></div>
        </>
    );
};