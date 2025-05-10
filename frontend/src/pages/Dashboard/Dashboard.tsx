import React from 'react';
import { Sidebar } from "../../components/Sidebar"

const Dashboard: React.FC = () => {

    return (
        <div className="bg-[#0A0E15] h-screen text-white flex justify-center items-center">
        <Sidebar/>
            <h1>Welcome to the Dashboard</h1>
        </div>
    );
};

export default Dashboard;