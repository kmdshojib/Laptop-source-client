import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardNavigation = () => {
    return (
        <div className="mt-10">
            <ul className="menu flex flex-row bg-base-100 text-base-content w-100 p-4 lg:flex-col lg:w-80  ">
                <li className='mb-5'><NavLink to="/admindashboard/allsellers">All Sellers</NavLink></li>
                <li><NavLink to="/admindashboard/allbuyers">All Buyers</NavLink></li>
                <li><NavLink to="/admindashboard/reoprtedissues">Reported Issue</NavLink></li>
            </ul>
        </div>
    );
}

export default DashboardNavigation;