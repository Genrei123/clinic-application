import React from 'react';

const Dashboard: React.FC = () => {
    const styles = {
        backgroundColor: '#0A0E15',
        height: '100vh',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={styles}>
            <h1>Welcome to the Dashboard</h1>
        </div>
    );
};

export default Dashboard;