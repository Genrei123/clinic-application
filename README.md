# Clinic Management System bundled as Electron Application
This clinic management system aims to transition a traditional pen and paper clinic to a fully digital system. This is to ensure that the there are:
- Data Integrity. Ensures that the data is consistent
- Data Security. Ensures that the data is secured
- Data Persistence. Ensure that the data is persistent

# System Features
The system is designed to streamline clinic operations, managem patient data efficiently, and support staff with essential tools.

## Patient Information Management
- Create Patient Records
- View Patient Information
- Update Patient Information
- Delete Patient Information

## Patient Visit & Check-up Tracking
- Log Patient Visits
- Record Checkup History
- Track Data Change

## PhilHealth Integration
- Generrate PhilHealth Claim Forms

## Reminders and Notifications
- Expected Date of Confinement for potential pregnancies

## Patient List and Filtering
- Staff can access a complete, searchable list of all registered patients
- Filter Patients by branches, gender and expected date of confinement

## Branch and Services Management
- Add New Clinic Branches
- Add or Define Branch Services

## Members
- Cristobal, Genrey O.
- Bolivar, Jhon Emerwin M.
- Sandoval, Shunne Gabriel M.

# How to run this project
This project is in mono-repository style. The backend and the frontend are in the same repository to ensure that the project is centralized and both frontend and backend teams can access the source code of both stack seamlessly.

## How to run the frontend
- Clone the project
- Naigate to frontend/ by cd clinic-application/frontend
- npm install
- npm run dev
- Access localhost:5173/

## How to run the backend
- Clone the project
- Navigate to backend/ by cd clinic-application/backend
- npm install
- npm run start OR nodemon
- Access localhost:3000/ via Postman or CURL
