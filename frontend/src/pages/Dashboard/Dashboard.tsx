import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { PatientModal } from './modals/PatientModal';
// Import the new Table component
import { Table } from '../../components/Table';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';


const Dashboard: React.FC = () => {
    const { getUser } = useAuth();
    const username = getUser().username || "Nandor the Relentless";

    const titles = [
        {
            greetings: `Hello, ${username}`,
            cards: [
                {
                    color: "primary",
                    title: "Daily Income",
                    content: "test",
                    redirectUrl: "/daily-income"
                },
                {
                    color: "[#AEA4BF]",
                    title: "Daily Patients",
                    content: "test",
                    redirectUrl: "/daily-patients"
                },
                {
                    color: "[#CDCDCD]",
                    title: "Latest Date",
                    content: "test",
                    redirectUrl: "/latest-date"
                },
                {
                    color: "[#AEA4BF]",
                    title: "Low Stock",
                    content: "test",
                    redirectUrl: "/low-stock"
                }
            ],
        }
    ];

    const [dailyIncome, setDailyIncome] = useState(0);
    const [dailyPatients, setDailyPatients] = useState(0);
    const [latestDate, setLatestDate] = useState(new Date().toLocaleDateString());
    const [stockStatus, setStockStatus] = useState("Low Stock");

    const [showPatientForm, setShowPatientForm] = useState(false);
    const [showInventoryForm, setShowInventoryForm] = useState(false);

    const handleAddPatient = () => {
        setShowPatientForm(true);
    };

    const handleAddInventory = () => {
        setShowInventoryForm(true);
    };

    const dashboardData = titles[0];

    // Define data and columns for the Recent Patients Table
    // For now, we'll use a single row with your current state values
    const recentPatientsData = [
        { date: latestDate, income: dailyIncome, patients: dailyPatients },
        { date: latestDate, income: dailyIncome, patients: dailyPatients }
    ];

    const recentPatientsColumns = [
        {
            key: 'date',
            header: 'Date',
            render: (item: typeof recentPatientsData[0]) => item.date,
        },
        {
            key: 'income',
            header: 'Daily Income',
            render: (item: typeof recentPatientsData[0]) => `$${item.income}`,
        },
        {
            key: 'patients',
            header: 'Daily Patients',
            render: (item: typeof recentPatientsData[0]) => item.patients,
        },
        {
            key: 'action',
            header: 'Action',
            render: () => null, // No default rendering
            navigation: (item: typeof recentPatientsData[0]) => `/patients/1`, // Assuming item has an 'id'
        },
    ];

    // Define data and columns for the Stock Alerts Table
    // For now, using placeholder data
    const stockAlertsData = [
        { item: 'Sample Item 1', status: 'Low' },
        { item: 'Sample Item 2', status: 'Critical' },
        // Add more actual stock alert data objects here
    ];

    const stockAlertsColumns = [
        { key: 'item', header: 'Stock Item', render: (item: typeof stockAlertsData[0]) => item.item },
        { key: 'status', header: 'Status', render: (item: typeof stockAlertsData[0]) => item.status },
        { key: 'view', header: 'Action', render: () => null, navigation: (item: typeof stockAlertsData[0]) => `/inventory/${item.item}` },
    ];


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Header and Buttons */}
                <div className="col-span-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h1 className="text-2xl font-bold text-white">{dashboardData.greetings}</h1>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                                className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded transition-opacity"
                                onClick={handleAddPatient}
                            >
                                Add Patient
                            </button>
                            <button
                                className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded transition-opacity"
                                onClick={handleAddInventory}
                            >
                                Add Inventory
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="col-span-full">
                    <div className="flex space-x-4 overflow-x-auto">
                        {dashboardData.cards.map((card, index) => (
                            <Card
                                key={index}
                                color={card.color}
                                title={card.title}
                                content={
                                    card.title === "Daily Income" ? `$${dailyIncome}` :
                                        card.title === "Daily Patients" ? dailyPatients.toString() :
                                            card.title === "Latest Date" ? latestDate :
                                                card.title === "Low Stock" ? stockStatus :
                                                    card.content
                                }
                                redirectUrl={card.redirectUrl}
                            />
                        ))}
                    </div>
                </div>

                {/* Recent Patients Table - Now using the reusable Table component */}
                <div className="md:col-span-1 col-span-full">
                    <Table
                        title="Recent Patients"
                        columns={recentPatientsColumns}
                        data={recentPatientsData} // Pass the defined data array
                    />
                </div>

                {/* Stock Alerts Table - Now using the reusable Table component */}
                <div className="md:col-span-1 col-span-full md:col-start-2">
                    <Table
                        title="Stock Alerts"
                        columns={stockAlertsColumns}
                        data={stockAlertsData} // Pass the defined data array
                    />
                </div>

                {/* Modals */}
                <PatientModal
                    isOpen={showPatientForm}
                    onClose={() => setShowPatientForm(false)}
                    patient={null}
                />
                {/* {showInventoryForm && <InventoryModal isOpen={showInventoryForm} onClose={() => setShowInventoryForm(false)} />} */}

            </div>
        </>
    );
};

export default Dashboard;