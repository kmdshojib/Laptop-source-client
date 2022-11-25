import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavigation from './dashboardNavigation';


const DashBoard = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <DashboardNavigation />
            <Outlet />
        </div>
    );
}

export default DashBoard;